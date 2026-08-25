import pytest
from httpx import AsyncClient, ASGITransport
from backend.app.main import app


@pytest.mark.asyncio
async def test_generate_ideas_endpoint():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        payload = {
            "skills": ["React", "Python", "PostgreSQL"],
            "preferred_stack": ["FastAPI", "React", "Redis"],
            "difficulty": "ADVANCED",
            "career_goal": "FULLSTACK_ARCHITECT",
            "domain_interest": "AI Agents & DevTools",
            "time_commitment_weeks": 4,
        }
        res = await ac.post("/api/v1/ai/generate-ideas", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["success"] is True
        assert len(data["data"]) >= 1
        first_idea = data["data"][0]
        assert "id" in first_idea
        assert "title" in first_idea
        assert "recommended_tech_stack" in first_idea
        assert "key_features" in first_idea


@pytest.mark.asyncio
async def test_stream_blueprint_endpoint():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # First generate an idea to get a valid idea_id
        payload = {
            "skills": ["Python", "FastAPI"],
            "preferred_stack": ["PostgreSQL"],
            "difficulty": "ADVANCED",
            "career_goal": "BACKEND_ENGINEER",
        }
        gen_res = await ac.post("/api/v1/ai/generate-ideas", json=payload)
        assert gen_res.status_code == 200
        idea_id = gen_res.json()["data"][0]["id"]

        # Now test streaming SSE endpoint
        stream_res = await ac.get(f"/api/v1/ai/stream-blueprint/{idea_id}")
        assert stream_res.status_code == 200
        assert "text/event-stream" in stream_res.headers["content-type"]
        body_text = stream_res.text
        assert "event: architecture" in body_text
        assert "event: schemas" in body_text
        assert "event: apis" in body_text
        assert "event: roadmap" in body_text
        assert "event: resume" in body_text
        assert "event: done" in body_text
