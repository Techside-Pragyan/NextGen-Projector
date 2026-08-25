from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, and_, func
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.core.database import get_db
from backend.app.core.security import get_current_user_id, get_current_user_id_optional
from backend.app.models.blueprint import ProjectBlueprint
from backend.app.models.idea import ProjectIdea
from backend.app.models.social import SavedBlueprint, BlueprintLike
from backend.app.schemas.community import CommunityBlueprintItem, CommunityExploreResponse, ActionResponse
from backend.app.schemas.idea import GeneratedIdeaSchema, TechStackSchema

router = APIRouter()


@router.get("/explore", response_model=CommunityExploreResponse, summary="Browse Community Showcase")
async def explore_community(
    page: int = Query(1, ge=1),
    limit: int = Query(12, ge=1, le=50),
    difficulty: Optional[str] = None,
    domain: Optional[str] = None,
    user_id: Optional[str] = Depends(get_current_user_id_optional),
    db: AsyncSession = Depends(get_db),
):
    offset = (page - 1) * limit

    # Query public ideas with blueprints
    query = (
        select(ProjectBlueprint, ProjectIdea)
        .join(ProjectIdea, ProjectBlueprint.idea_id == ProjectIdea.id)
        .where(ProjectIdea.is_public == True)
    )

    if difficulty:
        query = query.where(ProjectIdea.difficulty == difficulty.upper())
    if domain:
        query = query.where(ProjectIdea.domain_interest.ilike(f"%{domain}%"))

    # Count total
    count_query = select(func.count(ProjectBlueprint.id)).join(ProjectIdea, ProjectBlueprint.idea_id == ProjectIdea.id).where(ProjectIdea.is_public == True)
    total_res = await db.execute(count_query)
    total_count = total_res.scalar() or 0

    results = await db.execute(query.order_by(ProjectBlueprint.created_at.desc()).offset(offset).limit(limit))
    rows = results.all()

    items: list[CommunityBlueprintItem] = []
    for bp, idea in rows:
        # Check likes
        likes_count_res = await db.execute(
            select(func.count(BlueprintLike.id)).where(BlueprintLike.blueprint_id == bp.id)
        )
        likes_cnt = likes_count_res.scalar() or 0

        is_liked = False
        is_saved = False
        if user_id:
            l_res = await db.execute(
                select(BlueprintLike).where(and_(BlueprintLike.user_id == user_id, BlueprintLike.blueprint_id == bp.id))
            )
            is_liked = l_res.scalars().first() is not None

            s_res = await db.execute(
                select(SavedBlueprint).where(and_(SavedBlueprint.user_id == user_id, SavedBlueprint.blueprint_id == bp.id))
            )
            is_saved = s_res.scalars().first() is not None

        idea_schema = GeneratedIdeaSchema(
            id=idea.id,
            title=idea.title,
            tagline=idea.tagline,
            difficulty=idea.difficulty,
            career_goal=idea.career_goal,
            domain_interest=idea.domain_interest,
            match_score_percentage=idea.match_score_percentage,
            why_unique=idea.why_unique,
            industry_relevance=idea.industry_relevance,
            recommended_tech_stack=TechStackSchema(**idea.tech_stack),
            key_features=idea.key_features or [],
            estimated_completion_weeks=idea.estimated_completion_weeks,
        )

        items.append(
            CommunityBlueprintItem(
                id=bp.id,
                idea_id=idea.id,
                idea=idea_schema,
                likes_count=likes_cnt,
                views_count=idea.view_count or 0,
                is_liked_by_me=is_liked,
                is_saved_by_me=is_saved,
                created_at=bp.created_at,
            )
        )

    return CommunityExploreResponse(
        success=True,
        total=total_count,
        page=page,
        limit=limit,
        items=items,
    )


@router.post("/blueprints/{blueprint_id}/like", response_model=ActionResponse, summary="Like/Upvote Blueprint")
async def like_blueprint(
    blueprint_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(BlueprintLike).where(
            and_(BlueprintLike.user_id == user_id, BlueprintLike.blueprint_id == blueprint_id)
        )
    )
    existing = result.scalars().first()
    if existing:
        await db.delete(existing)
        await db.commit()
        return ActionResponse(success=True, message="Blueprint unliked", status="UNLIKED")
    else:
        new_like = BlueprintLike(user_id=user_id, blueprint_id=blueprint_id)
        db.add(new_like)
        await db.commit()
        return ActionResponse(success=True, message="Blueprint upvoted", status="LIKED")
