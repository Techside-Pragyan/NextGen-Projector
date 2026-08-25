from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from backend.app.schemas.idea import GeneratedIdeaSchema


class CommunityBlueprintItem(BaseModel):
    id: str
    idea_id: str
    idea: GeneratedIdeaSchema
    likes_count: int = 0
    views_count: int = 0
    is_liked_by_me: bool = False
    is_saved_by_me: bool = False
    created_at: Optional[datetime] = None


class CommunityExploreResponse(BaseModel):
    success: bool = True
    total: int
    page: int
    limit: int
    items: List[CommunityBlueprintItem]


class ActionResponse(BaseModel):
    success: bool = True
    message: str
    status: Optional[str] = None
