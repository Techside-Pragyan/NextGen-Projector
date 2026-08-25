import logging
from typing import AsyncGenerator
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import declarative_base
from backend.app.core.config import settings

logger = logging.getLogger("uvicorn")

Base = declarative_base()

# Initialize primary engine
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,
    future=True,
    pool_pre_ping=True,
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

_is_db_initialized = False


async def init_db():
    """Initializes database schema tables, falling back to SQLite if PostgreSQL is unreachable."""
    global engine, AsyncSessionLocal, _is_db_initialized
    if _is_db_initialized:
        return

    try:
        # Test connection to configured PostgreSQL
        async with engine.begin() as conn:
            await conn.execute(text("SELECT 1"))
            await conn.run_sync(Base.metadata.create_all)
        logger.info("Connected to PostgreSQL and initialized tables successfully.")
        _is_db_initialized = True
    except Exception as e:
        logger.warning(
            f"PostgreSQL at localhost:5432 unreachable ({e}). Switching to local async SQLite engine ({settings.SQLITE_FALLBACK_URL})."
        )
        engine = create_async_engine(
            settings.SQLITE_FALLBACK_URL,
            echo=False,
            future=True,
        )
        AsyncSessionLocal.configure(bind=engine)
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("Local SQLite database tables initialized successfully.")
        _is_db_initialized = True


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Dependency for obtaining an asynchronous database session."""
    if not _is_db_initialized:
        await init_db()

    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
