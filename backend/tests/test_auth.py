import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from backend.app.main import app


@pytest.mark.asyncio
async def test_health_check():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"


@pytest.mark.asyncio
async def test_user_registration_and_login():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # 1. Register user
        reg_payload = {
            "email": "test_user_unique@nextgen.dev",
            "password": "Password123!",
            "name": "Alex Architect",
        }
        res_reg = await ac.post("/api/v1/auth/register", json=reg_payload)
        assert res_reg.status_code == 200
        data_reg = res_reg.json()
        assert data_reg["success"] is True
        assert "access_token" in data_reg
        token = data_reg["access_token"]

        # 2. Login user
        login_payload = {
            "email": "test_user_unique@nextgen.dev",
            "password": "Password123!",
        }
        res_login = await ac.post("/api/v1/auth/login", json=login_payload)
        assert res_login.status_code == 200
        data_login = res_login.json()
        assert data_login["success"] is True

        # 3. Get /me with Bearer token
        res_me = await ac.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
        assert res_me.status_code == 200
        data_me = res_me.json()
        assert data_me["email"] == "test_user_unique@nextgen.dev"
        assert data_me["name"] == "Alex Architect"
