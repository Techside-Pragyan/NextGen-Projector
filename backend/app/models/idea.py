import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, Text, Boolean, Integer, JSON, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.core.database import Base


class ProjectIdea(Base):
    __tablename__ = "project_ideas"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    title = Column(String(255), nullable=False)
    tagline = Column(Text, nullable=False)
    difficulty = Column(String(50), nullable=False, index=True)
    career_goal = Column(String(100), nullable=False)
    domain_interest = Column(String(100), nullable=True)
    match_score_percentage = Column(Integer, default=95)
    why_unique = Column(Text, nullable=False)
    industry_relevance = Column(Text, nullable=False)
    tech_stack = Column(JSON, nullable=False)  # JSON structure with frontend, backend, database, etc.
    key_features = Column(JSON, nullable=False)  # List of string features
    estimated_completion_weeks = Column(Integer, default=4)
    is_public = Column(Boolean, default=True, index=True)
    view_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    user = relationship("User", back_populates="ideas")
    blueprint = relationship("ProjectBlueprint", back_populates="idea", uselist=False, cascade="all, delete-orphan")
