import pytest
from httpx import AsyncClient, ASGITransport
from backend.app.main import app


@pytest.mark.asyncio
async def test_blueprint_and_milestones_flow():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # 1. Register a test user
        user_res = await ac.post(
            "/api/v1/auth/register",
            json={"email": "bp_tester@nextgen.dev", "password": "Password123!", "name": "BP Tester"},
        )
        token = user_res.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # 2. Generate idea and stream blueprint to ensure it exists in DB
        gen_res = await ac.post(
            "/api/v1/ai/generate-ideas",
            json={"skills": ["Python", "FastAPI"], "difficulty": "ADVANCED", "career_goal": "FULLSTACK_ARCHITECT"},
        )
        idea_id = gen_res.json()["data"][0]["id"]
        stream_res = await ac.get(f"/api/v1/ai/stream-blueprint/{idea_id}")
        assert stream_res.status_code == 200

        # Find blueprint_id from done event
        for line in stream_res.text.split("\n"):
            if "blueprint_id" in line:
                import json
                data = json.loads(line.replace("data: ", ""))
                blueprint_id = data["blueprint_id"]
                break

        # 3. Get blueprint details
        bp_res = await ac.get(f"/api/v1/blueprints/{blueprint_id}", headers=headers)
        assert bp_res.status_code == 200
        bp_data = bp_res.json()
        assert bp_data["success"] is True
        assert len(bp_data["data"]["milestones"]) > 0
        first_milestone = bp_data["data"]["milestones"][0]
        milestone_id = first_milestone["id"]

        # 4. Toggle milestone completion
        toggle_res = await ac.post(
            f"/api/v1/blueprints/{blueprint_id}/milestones/{milestone_id}/toggle",
            headers=headers,
        )
        assert toggle_res.status_code == 200
        assert toggle_res.json()["status"] == "COMPLETED"
        assert toggle_res.json()["overall_completion_percentage"] > 0

        # 5. Bookmark blueprint
        save_res = await ac.post(f"/api/v1/blueprints/{blueprint_id}/save", headers=headers)
        assert save_res.status_code == 200
        assert save_res.json()["status"] == "SAVED"
