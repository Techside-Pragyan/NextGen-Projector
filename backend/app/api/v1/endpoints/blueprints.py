from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.core.database import get_db
from backend.app.core.security import get_current_user_id, get_current_user_id_optional
from backend.app.models.blueprint import ProjectBlueprint
from backend.app.models.idea import ProjectIdea
from backend.app.models.social import SavedBlueprint, BlueprintLike
from backend.app.schemas.blueprint import (
    BlueprintDetailResponse,
    ProjectBlueprintSchema,
    SystemArchitectureSchema,
    DatabaseSchemaSpec,
    APISpecification,
    EdgeCaseSpec,
)
from backend.app.schemas.milestone import ToggleMilestoneResponse
from backend.app.schemas.community import ActionResponse
from backend.app.services.roadmap_service import RoadmapService
from backend.app.services.scaffolder_service import ScaffoldingService

router = APIRouter()


@router.get("/{blueprint_id}", response_model=BlueprintDetailResponse, summary="Get Blueprint Details")
async def get_blueprint(
    blueprint_id: str,
    user_id: Optional[str] = Depends(get_current_user_id_optional),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(ProjectBlueprint).where(ProjectBlueprint.id == blueprint_id))
    blueprint = result.scalars().first()
    if not blueprint:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Blueprint with ID {blueprint_id} not found.",
        )

    # Get milestones with user progress
    milestones, completion_pct = await RoadmapService.get_blueprint_milestones_with_progress(
        db, blueprint_id, user_id
    )

    # Check if saved or liked
    is_saved = False
    is_liked = False
    if user_id:
        s_res = await db.execute(
            select(SavedBlueprint).where(
                and_(SavedBlueprint.user_id == user_id, SavedBlueprint.blueprint_id == blueprint_id)
            )
        )
        is_saved = s_res.scalars().first() is not None

        l_res = await db.execute(
            select(BlueprintLike).where(
                and_(BlueprintLike.user_id == user_id, BlueprintLike.blueprint_id == blueprint_id)
            )
        )
        is_liked = l_res.scalars().first() is not None

    likes_res = await db.execute(
        select(BlueprintLike).where(BlueprintLike.blueprint_id == blueprint_id)
    )
    total_likes = len(likes_res.scalars().all())

    schema_data = ProjectBlueprintSchema(
        id=blueprint.id,
        idea_id=blueprint.idea_id,
        system_architecture=SystemArchitectureSchema(**blueprint.system_architecture),
        folder_structure=blueprint.folder_structure,
        database_schema=DatabaseSchemaSpec(**blueprint.database_schema),
        api_specifications=[APISpecification(**a) for a in blueprint.api_specifications],
        edge_cases=[EdgeCaseSpec(**e) for e in blueprint.edge_cases],
        resume_bullets=blueprint.resume_bullets or [],
        milestones=milestones,
        created_at=blueprint.created_at,
    )

    return BlueprintDetailResponse(
        success=True,
        data=schema_data,
        is_saved=is_saved,
        likes_count=total_likes,
        completion_percentage=completion_pct,
    )


@router.post("/{blueprint_id}/save", response_model=ActionResponse, summary="Save/Bookmark Blueprint")
async def save_blueprint(
    blueprint_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(SavedBlueprint).where(
            and_(SavedBlueprint.user_id == user_id, SavedBlueprint.blueprint_id == blueprint_id)
        )
    )
    existing = result.scalars().first()
    if existing:
        await db.delete(existing)
        await db.commit()
        return ActionResponse(success=True, message="Blueprint removed from saved workspaces", status="UNSAVED")
    else:
        new_save = SavedBlueprint(user_id=user_id, blueprint_id=blueprint_id)
        db.add(new_save)
        await db.commit()
        return ActionResponse(success=True, message="Blueprint saved to personal workspaces", status="SAVED")


@router.post("/{blueprint_id}/milestones/{milestone_id}/toggle", response_model=ToggleMilestoneResponse, summary="Toggle Milestone Completion")
async def toggle_milestone(
    blueprint_id: str,
    milestone_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    new_status, pct = await RoadmapService.toggle_milestone(db, milestone_id, user_id)
    if new_status == "NOT_FOUND":
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Milestone {milestone_id} not found.",
        )

    return ToggleMilestoneResponse(
        success=True,
        milestone_id=milestone_id,
        status=new_status,
        overall_completion_percentage=pct,
    )


@router.post("/{blueprint_id}/export/zip", summary="Export Starter Kit ZIP Archive")
async def export_starter_zip(
    blueprint_id: str,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(ProjectBlueprint).where(ProjectBlueprint.id == blueprint_id))
    blueprint = result.scalars().first()
    if not blueprint:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Blueprint {blueprint_id} not found.",
        )

    idea_result = await db.execute(select(ProjectIdea).where(ProjectIdea.id == blueprint.idea_id))
    idea = idea_result.scalars().first()
    if not idea:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Associated project idea not found.",
        )

    zip_buffer = ScaffoldingService.generate_starter_zip(blueprint, idea)
    slug = idea.title.lower().replace(" ", "_").replace(":", "")[:30]

    return Response(
        content=zip_buffer.getvalue(),
        media_type="application/zip",
        headers={
            "Content-Disposition": f'attachment; filename="{slug}_starter_kit.zip"',
        },
    )
