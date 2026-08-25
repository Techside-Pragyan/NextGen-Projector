from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status
from backend.app.models.user import User
from backend.app.schemas.auth import UserRegister, UserLogin, UserResponse, AuthResponse
from backend.app.core.security import get_password_hash, verify_password, create_access_token


class AuthService:
    """Service handling user registration, authentication and session retrieval."""

    @staticmethod
    async def register(db: AsyncSession, data: UserRegister) -> AuthResponse:
        # Check if user already exists
        result = await db.execute(select(User).where(User.email == data.email.lower()))
        existing_user = result.scalars().first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="An account with this email address already exists.",
            )

        new_user = User(
            email=data.email.lower(),
            name=data.name.strip(),
            password_hash=get_password_hash(data.password),
            role="USER",
            tier="FREE",
        )
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)

        token = create_access_token(subject=new_user.id)
        return AuthResponse(
            success=True,
            user=UserResponse.model_validate(new_user),
            access_token=token,
            token_type="bearer",
        )

    @staticmethod
    async def login(db: AsyncSession, data: UserLogin) -> AuthResponse:
        result = await db.execute(select(User).where(User.email == data.email.lower()))
        user = result.scalars().first()
        if not user or not user.password_hash or not verify_password(data.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password.",
            )

        token = create_access_token(subject=user.id)
        return AuthResponse(
            success=True,
            user=UserResponse.model_validate(user),
            access_token=token,
            token_type="bearer",
        )

    @staticmethod
    async def get_current_user(db: AsyncSession, user_id: str) -> UserResponse:
        result = await db.execute(select(User).where(User.id == user_id))
        user = result.scalars().first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found.",
            )
        return UserResponse.model_validate(user)
