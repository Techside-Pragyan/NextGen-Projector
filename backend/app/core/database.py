import logging
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import declarative_base
from backend.app.core.config import settings

logger = logging.getLogger("uvicorn")

Base = declarative_base()

# Determine database engine with fallback handling
try:
    engine = create_async_engine(
        settings.DATABASE_URL,
        echo=False,
        future=True,
        pool_pre_ping=True,
    )
except Exception as e:
    logger.warning(f"Failed to connect with DATABASE_URL, switching to fallback SQLite: {e}")
    engine = create_async_engine(
        settings.SQLITE_FALLBACK_URL,
        echo=False,
        future=True,
    )

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)


async def init_db():
    """Initializes database schema tables."""
    global engine, AsyncSessionLocal
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("Database tables initialized successfully.")
    except Exception as e:
        logger.warning(f"Could not initialize PostgreSQL ({e}). Falling back to SQLite async engine...")
        engine = create_async_engine(
            settings.SQLITE_FALLBACK_URL,
            echo=False,
            future=True,
        )
        AsyncSessionLocal = async_sessionmaker(
            bind=engine,
            class_=AsyncSession,
            expire_on_commit=False,
            autocommit=False,
            autoflush=False,
        )
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("SQLite fallback tables initialized successfully.")


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Dependency for obtaining an asynchronous database session."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
