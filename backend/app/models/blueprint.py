import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.core.database import Base


class ProjectBlueprint(Base):
    __tablename__ = "project_blueprints"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    idea_id = Column(String(36), ForeignKey("project_ideas.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    system_architecture = Column(JSON, nullable=False)  # Overview, style, diagramMermaid, components
    folder_structure = Column(Text, nullable=False)
    database_schema = Column(JSON, nullable=False)  # ERD, models, fields
    api_specifications = Column(JSON, nullable=False)  # List of endpoints
    edge_cases = Column(JSON, nullable=False)  # Failure modes and mitigations
    resume_bullets = Column(JSON, nullable=False)  # List of XYZ resume bullets
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    idea = relationship("ProjectIdea", back_populates="blueprint")
    milestones = relationship("RoadmapMilestone", back_populates="blueprint", cascade="all, delete-orphan", order_by="RoadmapMilestone.phase_number")
    saved_records = relationship("SavedBlueprint", back_populates="blueprint", cascade="all, delete-orphan")
    likes = relationship("BlueprintLike", back_populates="blueprint", cascade="all, delete-orphan")
