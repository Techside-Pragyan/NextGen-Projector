import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from backend.app.core.database import Base


class SavedBlueprint(Base):
    __tablename__ = "saved_blueprints"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    blueprint_id = Column(String(36), ForeignKey("project_blueprints.id", ondelete="CASCADE"), nullable=False, index=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    __table_args__ = (
        UniqueConstraint("user_id", "blueprint_id", name="uq_user_saved_blueprint"),
    )

    # Relationships
    user = relationship("User", back_populates="saved_blueprints")
    blueprint = relationship("ProjectBlueprint", back_populates="saved_records")


class BlueprintLike(Base):
    __tablename__ = "blueprint_likes"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    blueprint_id = Column(String(36), ForeignKey("project_blueprints.id", ondelete="CASCADE"), nullable=False, index=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    __table_args__ = (
        UniqueConstraint("user_id", "blueprint_id", name="uq_user_blueprint_like"),
    )

    # Relationships
    user = relationship("User", back_populates="likes")
    blueprint = relationship("ProjectBlueprint", back_populates="likes")
