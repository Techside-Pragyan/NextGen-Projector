from enum import Enum
from typing import List, Optional
import uuid
from pydantic import BaseModel, ConfigDict, Field


class DifficultyLevel(str, Enum):
    BEGINNER = "BEGINNER"
    INTERMEDIATE = "INTERMEDIATE"
    ADVANCED = "ADVANCED"
    STAFF_DISTRIBUTED = "STAFF_DISTRIBUTED"


class CareerGoal(str, Enum):
    FRONTEND_DEV = "FRONTEND_DEV"
    BACKEND_ENGINEER = "BACKEND_ENGINEER"
    FULLSTACK_ARCHITECT = "FULLSTACK_ARCHITECT"
    AI_ML_ENGINEER = "AI_ML_ENGINEER"
    DEVOPS_SRE = "DEVOPS_SRE"
    SYSTEMS_ENGINEER = "SYSTEMS_ENGINEER"


class TechStackSchema(BaseModel):
    frontend: List[str] = Field(default_factory=list)
    backend: List[str] = Field(default_factory=list)
    database: List[str] = Field(default_factory=list)
    ai_ml: Optional[List[str]] = Field(default_factory=list)
    devops: List[str] = Field(default_factory=list)


class IdeaRequestSchema(BaseModel):
    skills: List[str] = Field(..., min_length=1, description="List of user skills, e.g. ['React', 'Python']")
    preferred_stack: List[str] = Field(default_factory=list, description="Target stack, e.g. ['FastAPI', 'PostgreSQL']")
    difficulty: DifficultyLevel = DifficultyLevel.ADVANCED
    career_goal: CareerGoal = CareerGoal.FULLSTACK_ARCHITECT
    domain_interest: Optional[str] = Field(default="AI DevTools & Observability", description="Target industry domain")
    time_commitment_weeks: Optional[int] = Field(default=4, ge=1, le=16)


class GeneratedIdeaSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    tagline: str
    difficulty: DifficultyLevel
    career_goal: Optional[str] = None
    domain_interest: Optional[str] = None
    match_score_percentage: int = 95
    why_unique: str
    industry_relevance: str
    recommended_tech_stack: TechStackSchema
    key_features: List[str]
    estimated_completion_weeks: int = 4


class IdeaListResponse(BaseModel):
    success: bool = True
    data: List[GeneratedIdeaSchema]
