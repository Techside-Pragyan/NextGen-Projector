import json
import logging
from typing import Any, Optional
import redis.asyncio as aioredis
from backend.app.core.config import settings

logger = logging.getLogger("uvicorn")


class CacheManager:
    """Async Redis cache manager with graceful in-memory fallback."""

    def __init__(self):
        self._redis: Optional[aioredis.Redis] = None
        self._memory_cache: dict[str, Any] = {}
        self._is_redis_available = False

    async def connect(self):
        try:
            self._redis = aioredis.from_url(
                settings.REDIS_URL,
                decode_responses=True,
                socket_connect_timeout=1.0,
            )
            await self._redis.ping()
            self._is_redis_available = True
            logger.info("Connected to Redis successfully.")
        except Exception as e:
            self._is_redis_available = False
            logger.warning(f"Redis not available ({e}). Using in-memory fallback cache.")

    async def close(self):
        if self._redis:
            await self._redis.close()

    async def get(self, key: str) -> Optional[Any]:
        if self._is_redis_available and self._redis:
            try:
                data = await self._redis.get(key)
                if data:
                    return json.loads(data)
            except Exception:
                pass
        return self._memory_cache.get(key)

    async def set(self, key: str, value: Any, ttl_seconds: int = 3600):
        serialized = json.dumps(value)
        if self._is_redis_available and self._redis:
            try:
                await self._redis.setex(key, ttl_seconds, serialized)
                return
            except Exception:
                pass
        self._memory_cache[key] = value

    async def delete(self, key: str):
        if self._is_redis_available and self._redis:
            try:
                await self._redis.delete(key)
            except Exception:
                pass
        self._memory_cache.pop(key, None)


cache_manager = CacheManager()
