from typing import List, Set
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.milestone import RoadmapMilestone
from backend.app.models.progress import UserProgress
from backend.app.schemas.milestone import MilestoneNodeSchema, CodeSnippetSchema


class RoadmapService:
    """Calculates node graph statuses, unlocks dependencies, and calculates completion stats."""

    @staticmethod
    async def get_blueprint_milestones_with_progress(
        db: AsyncSession,
        blueprint_id: str,
        user_id: str = None,
    ) -> tuple[List[MilestoneNodeSchema], float]:
        # Fetch all milestones ordered by phase number
        result = await db.execute(
            select(RoadmapMilestone)
            .where(RoadmapMilestone.blueprint_id == blueprint_id)
            .order_by(RoadmapMilestone.phase_number.asc())
        )
        milestones = result.scalars().all()
        if not milestones:
            return [], 0.0

        # Fetch user completed milestone IDs
        completed_ids: Set[str] = set()
        if user_id:
            prog_result = await db.execute(
                select(UserProgress.milestone_id)
                .where(
                    and_(
                        UserProgress.user_id == user_id,
                        UserProgress.status == "COMPLETED",
                    )
                )
            )
            completed_ids = set(prog_result.scalars().all())

        node_schemas: List[MilestoneNodeSchema] = []
        for idx, m in enumerate(milestones):
            is_done = m.id in completed_ids

            # Determine unlock status based on phase order and prerequisites
            if is_done:
                status = "COMPLETED"
            elif idx == 0:
                status = "AVAILABLE"  # Root node is always unlocked
            else:
                # Check if previous milestone is completed
                prev_id = milestones[idx - 1].id
                if prev_id in completed_ids:
                    status = "AVAILABLE"
                else:
                    status = "LOCKED"

            code_snips = [
                CodeSnippetSchema(
                    title=c.get("title", "Code Snippet"),
                    language=c.get("language", "python"),
                    code=c.get("code", "# Code placeholder"),
                )
                for c in (m.code_snippets or [])
            ]

            node_schemas.append(
                MilestoneNodeSchema(
                    id=m.id,
                    phase_number=m.phase_number,
                    title=m.title,
                    description=m.description,
                    deliverable=m.deliverable,
                    prerequisites=m.prerequisites or [],
                    verification_criteria=m.verification_criteria or [],
                    code_snippets=code_snips,
                    status=status,
                    is_completed=is_done,
                )
            )

        completion_pct = (len(completed_ids) / len(milestones) * 100.0) if milestones else 0.0
        return node_schemas, round(completion_pct, 1)

    @staticmethod
    async def toggle_milestone(
        db: AsyncSession,
        milestone_id: str,
        user_id: str,
    ) -> tuple[str, float]:
        # Check if progress record exists
        result = await db.execute(
            select(UserProgress).where(
                and_(
                    UserProgress.user_id == user_id,
                    UserProgress.milestone_id == milestone_id,
                )
            )
        )
        existing = result.scalars().first()

        # Find milestone to get blueprint_id
        m_result = await db.execute(select(RoadmapMilestone).where(RoadmapMilestone.id == milestone_id))
        milestone = m_result.scalars().first()
        if not milestone:
            return "NOT_FOUND", 0.0

        if existing:
            await db.delete(existing)
            new_status = "AVAILABLE"
        else:
            new_progress = UserProgress(
                user_id=user_id,
                milestone_id=milestone_id,
                status="COMPLETED",
            )
            db.add(new_progress)
            new_status = "COMPLETED"

        await db.commit()

        # Recalculate blueprint overall percentage
        _, pct = await RoadmapService.get_blueprint_milestones_with_progress(
            db, milestone.blueprint_id, user_id
        )
        return new_status, pct
