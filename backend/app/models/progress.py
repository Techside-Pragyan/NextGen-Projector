import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from backend.app.core.database import Base


class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    milestone_id = Column(String(36), ForeignKey("roadmap_milestones.id", ondelete="CASCADE"), nullable=False, index=True)
    status = Column(String(32), default="COMPLETED", nullable=False)  # 'IN_PROGRESS', 'COMPLETED'
    completed_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    __table_args__ = (
        UniqueConstraint("user_id", "milestone_id", name="uq_user_milestone_progress"),
    )

    # Relationships
    user = relationship("User", back_populates="progress_records")
    milestone = relationship("RoadmapMilestone", back_populates="progress_records")
