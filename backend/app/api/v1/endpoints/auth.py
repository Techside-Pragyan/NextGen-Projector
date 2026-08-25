from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.core.database import get_db
from backend.app.core.security import get_current_user_id
from backend.app.schemas.auth import UserRegister, UserLogin, AuthResponse, UserResponse
from backend.app.services.auth_service import AuthService

router = APIRouter()


@router.post("/register", response_model=AuthResponse, summary="Register New User")
async def register(data: UserRegister, db: AsyncSession = Depends(get_db)):
    return await AuthService.register(db, data)


@router.post("/login", response_model=AuthResponse, summary="User Login")
async def login(data: UserLogin, db: AsyncSession = Depends(get_db)):
    return await AuthService.login(db, data)


@router.get("/me", response_model=UserResponse, summary="Get Current User Profile")
async def get_me(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    return await AuthService.get_current_user(db, user_id)
