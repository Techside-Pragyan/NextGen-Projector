import io
import zipfile
import pytest
from httpx import AsyncClient, ASGITransport
from backend.app.main import app


@pytest.mark.asyncio
async def test_starter_zip_export():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # 1. Generate idea and blueprint
        gen_res = await ac.post(
            "/api/v1/ai/generate-ideas",
            json={"skills": ["React", "Python"], "difficulty": "ADVANCED", "career_goal": "FULLSTACK_ARCHITECT"},
        )
        idea_id = gen_res.json()["data"][0]["id"]
        stream_res = await ac.get(f"/api/v1/ai/stream-blueprint/{idea_id}")
        
        import json
        for line in stream_res.text.split("\n"):
            if "blueprint_id" in line:
                blueprint_id = json.loads(line.replace("data: ", ""))["blueprint_id"]
                break

        # 2. Export starter zip
        export_res = await ac.post(f"/api/v1/blueprints/{blueprint_id}/export/zip")
        assert export_res.status_code == 200
        assert export_res.headers["content-type"] == "application/zip"
        assert len(export_res.content) > 500  # Non-empty zip file

        # 3. Verify zip archive contents
        zip_file = zipfile.ZipFile(io.BytesIO(export_res.content))
        file_list = zip_file.namelist()
        assert "README.md" in file_list
        assert "docker-compose.yml" in file_list
        assert "backend/requirements.txt" in file_list
        assert "backend/main.py" in file_list
        assert "frontend/package.json" in file_list
        assert "frontend/src/App.tsx" in file_list
