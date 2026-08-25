from typing import List, Optional
from pydantic import BaseModel, Field


class CodeSnippetSchema(BaseModel):
    title: str
    language: str
    code: str


class MilestoneNodeSchema(BaseModel):
    id: str
    phase_number: int
    title: str
    description: str
    deliverable: str
    prerequisites: List[str] = Field(default_factory=list)
    verification_criteria: List[str] = Field(default_factory=list)
    code_snippets: List[CodeSnippetSchema] = Field(default_factory=list)
    status: str = "LOCKED"  # 'LOCKED', 'AVAILABLE', 'IN_PROGRESS', 'COMPLETED'
    is_completed: bool = False

    class Config:
        from_attributes = True


class ToggleMilestoneResponse(BaseModel):
    success: bool = True
    milestone_id: str
    status: str
    overall_completion_percentage: float
