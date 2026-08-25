import uuid
from sqlalchemy import Column, String, Text, Integer, JSON, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.core.database import Base


class RoadmapMilestone(Base):
    __tablename__ = "roadmap_milestones"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    blueprint_id = Column(String(36), ForeignKey("project_blueprints.id", ondelete="CASCADE"), nullable=False, index=True)
    phase_number = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    deliverable = Column(Text, nullable=False)
    prerequisites = Column(JSON, default=list, nullable=False)  # List of prerequisite milestone ids or titles
    verification_criteria = Column(JSON, default=list, nullable=False)  # List of test/verification points
    code_snippets = Column(JSON, default=list, nullable=False)  # [{title, language, code}]

    # Relationships
    blueprint = relationship("ProjectBlueprint", back_populates="milestones")
    progress_records = relationship("UserProgress", back_populates="milestone", cascade="all, delete-orphan")
