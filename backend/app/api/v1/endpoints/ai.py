from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.core.database import get_db
from backend.app.core.security import get_current_user_id_optional
from backend.app.models.idea import ProjectIdea
from backend.app.schemas.idea import IdeaListResponse, IdeaRequestSchema
from backend.app.services.ai_service import ai_service

router = APIRouter()


@router.post("/generate-ideas", response_model=IdeaListResponse, summary="Generate Tailored Project Ideas")
async def generate_ideas(
    params: IdeaRequestSchema,
    user_id: Optional[str] = Depends(get_current_user_id_optional),
    db: AsyncSession = Depends(get_db),
):
    ideas = await ai_service.generate_ideas(params, db, user_id)
    return IdeaListResponse(success=True, data=ideas)


@router.get("/stream-blueprint/{idea_id}", summary="Stream Real-Time Decomposed Blueprint (SSE)")
async def stream_blueprint(
    idea_id: str,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(ProjectIdea).where(ProjectIdea.id == idea_id))
    idea = result.scalars().first()
    if not idea:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project idea with ID {idea_id} not found.",
        )

    return StreamingResponse(
        ai_service.stream_blueprint(idea, db),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )
