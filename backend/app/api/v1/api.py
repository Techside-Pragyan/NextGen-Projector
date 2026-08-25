from fastapi import APIRouter
from backend.app.api.v1.endpoints import auth, ai, blueprints, community, health

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(ai.router, prefix="/ai", tags=["AI Engine"])
api_router.include_router(blueprints.router, prefix="/blueprints", tags=["Blueprints & Roadmaps"])
api_router.include_router(community.router, prefix="/community", tags=["Community Showcase"])
