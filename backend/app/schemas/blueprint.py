from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field
from backend.app.schemas.milestone import MilestoneNodeSchema


class ArchitectureComponent(BaseModel):
    name: str
    role: str
    tech: str
    communication: str


class SystemArchitectureSchema(BaseModel):
    overview: str
    style: str
    diagram_mermaid: str
    components: List[ArchitectureComponent] = Field(default_factory=list)


class DatabaseFieldSchema(BaseModel):
    name: str
    type: str
    constraints: str


class DatabaseModelSchema(BaseModel):
    table_name: str
    fields: List[DatabaseFieldSchema] = Field(default_factory=list)


class DatabaseSchemaSpec(BaseModel):
    type: str
    erd_mermaid: str
    models: List[DatabaseModelSchema] = Field(default_factory=list)


class APISpecification(BaseModel):
    method: str
    endpoint: str
    description: str
    request_body_sample: Optional[Dict[str, Any]] = None
    response_body_sample: Dict[str, Any]


class EdgeCaseSpec(BaseModel):
    risk: str
    mitigation_strategy: str


class ProjectBlueprintSchema(BaseModel):
    id: str
    idea_id: str
    system_architecture: SystemArchitectureSchema
    folder_structure: str
    database_schema: DatabaseSchemaSpec
    api_specifications: List[APISpecification] = Field(default_factory=list)
    edge_cases: List[EdgeCaseSpec] = Field(default_factory=list)
    resume_bullets: List[str] = Field(default_factory=list)
    milestones: List[MilestoneNodeSchema] = Field(default_factory=list)
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class BlueprintDetailResponse(BaseModel):
    success: bool = True
    data: ProjectBlueprintSchema
    is_saved: bool = False
    likes_count: int = 0
    completion_percentage: float = 0.0
