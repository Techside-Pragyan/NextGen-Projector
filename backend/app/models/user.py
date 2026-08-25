import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, Text
from sqlalchemy.orm import relationship
from backend.app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=True)
    name = Column(String(128), nullable=False)
    avatar_url = Column(Text, nullable=True)
    github_username = Column(String(100), nullable=True)
    role = Column(String(32), default="USER", nullable=False)  # 'USER', 'ADMIN', 'PRO'
    tier = Column(String(32), default="FREE", nullable=False)  # 'FREE', 'PRO', 'ENTERPRISE'
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    # Relationships
    ideas = relationship("ProjectIdea", back_populates="user", cascade="all, delete-orphan")
    saved_blueprints = relationship("SavedBlueprint", back_populates="user", cascade="all, delete-orphan")
    progress_records = relationship("UserProgress", back_populates="user", cascade="all, delete-orphan")
    likes = relationship("BlueprintLike", back_populates="user", cascade="all, delete-orphan")
