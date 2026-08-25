import io
import json
import zipfile
from typing import Any, Dict
from backend.app.models.blueprint import ProjectBlueprint
from backend.app.models.idea import ProjectIdea


class ScaffoldingService:
    """Generates an in-memory, production-grade starter boilerplate .zip repository."""

    @staticmethod
    def generate_starter_zip(blueprint: ProjectBlueprint, idea: ProjectIdea) -> io.BytesIO:
        zip_buffer = io.BytesIO()

        title_slug = idea.title.lower().replace(" ", "-").replace(":", "").replace("/", "-")

        with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
            # 1. Root README.md
            readme_content = f"""# {idea.title}

> {idea.tagline}

## 🚀 Project Overview
- **Difficulty:** {idea.difficulty}
- **Estimated Timeline:** {idea.estimated_completion_weeks} Weeks
- **Core Architecture:** {blueprint.system_architecture.get('style', 'MODULAR_MICROSERVICES')}

### Why This Project Stands Out
{idea.why_unique}

### Industry Relevance
{idea.industry_relevance}

---

## 🛠️ Recommended Tech Stack
- **Frontend:** {', '.join(idea.tech_stack.get('frontend', ['React', 'TypeScript']))}
- **Backend:** {', '.join(idea.tech_stack.get('backend', ['Python', 'FastAPI']))}
- **Database:** {', '.join(idea.tech_stack.get('database', ['PostgreSQL']))}
- **DevOps:** {', '.join(idea.tech_stack.get('devops', ['Docker']))}

---

## 📁 Architecture Directory Structure
```
{blueprint.folder_structure}
```

---

## ⚡ Quick Start with Docker
```bash
# 1. Clone & enter repository
cd {title_slug}

# 2. Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 3. Start full-stack services
docker compose up --build
```

---

## 📑 Key Features
{chr(10).join([f"- {feat}" for feat in idea.key_features])}

---

## 🎯 ATS Resume Impact Bullets
{chr(10).join([f"- {bullet}" for bullet in blueprint.resume_bullets])}
"""
            zf.writestr("README.md", readme_content)

            # 2. Docker Compose
            docker_compose = f"""version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: {title_slug}-postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgrespassword
      POSTGRES_DB: {title_slug.replace('-', '_')}
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: {title_slug}-redis
    ports:
      - "6379:6379"

  backend:
    build: ./backend
    container_name: {title_slug}-backend
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql+asyncpg://postgres:postgrespassword@postgres:5432/{title_slug.replace('-', '_')}
      REDIS_URL: redis://redis:6379/0
    depends_on:
      - postgres
      - redis

  frontend:
    build: ./frontend
    container_name: {title_slug}-frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend

volumes:
  pgdata:
"""
            zf.writestr("docker-compose.yml", docker_compose)
            zf.writestr(".gitignore", "node_modules/\n__pycache__/\n*.pyc\n.env\ndist/\n.DS_Store\n")

            # 3. Backend Files
            backend_reqs = "fastapi>=0.115.0\nuvicorn[standard]>=0.30.0\npydantic>=2.8.0\nsqlalchemy[asyncio]>=2.0.30\nasyncpg>=0.29.0\nredis>=5.0.0\npython-dotenv>=1.0.0\n"
            zf.writestr("backend/requirements.txt", backend_reqs)

            backend_main = f"""from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="{idea.title} API",
    version="1.0.0",
    description="{idea.tagline}",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {{"status": "healthy", "service": "{idea.title} API"}}

@app.get("/")
async def root():
    return {{"message": "Welcome to {idea.title} API backend."}}
"""
            zf.writestr("backend/main.py", backend_main)
            zf.writestr("backend/.env.example", f"DATABASE_URL=postgresql+asyncpg://postgres:postgrespassword@localhost:5432/{title_slug.replace('-', '_')}\nREDIS_URL=redis://localhost:6379/0\nPORT=8000\n")
            
            backend_dockerfile = """FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
"""
            zf.writestr("backend/Dockerfile", backend_dockerfile)

            # 4. Frontend Files
            frontend_pkg = {
                "name": title_slug + "-frontend",
                "private": True,
                "version": "1.0.0",
                "type": "module",
                "scripts": {
                    "dev": "vite",
                    "build": "tsc && vite build",
                    "preview": "vite preview"
                },
                "dependencies": {
                    "react": "^18.3.1",
                    "react-dom": "^18.3.1",
                    "lucide-react": "^0.436.0"
                },
                "devDependencies": {
                    "@types/react": "^18.3.5",
                    "@types/react-dom": "^18.3.0",
                    "@vitejs/plugin-react": "^4.3.1",
                    "typescript": "^5.5.3",
                    "vite": "^5.4.2"
                }
            }
            zf.writestr("frontend/package.json", json.dumps(frontend_pkg, indent=2))
            
            frontend_app = f"""import React, {{ useEffect, useState }} from 'react';

export default function App() {{
  const [status, setStatus] = useState('Connecting to backend...');

  useEffect(() => {{
    fetch('http://localhost:8000/api/health')
      .then(res => res.json())
      .then(data => setStatus(`Backend is ${{data.status}}`))
      .catch(() => setStatus('Backend offline (Run backend server on port 8000)'));
  }}, []);

  return (
    <div style={{{{ minHeight: '100vh', backgroundColor: '#07090E', color: '#F8FAFC', padding: '3rem', fontFamily: 'sans-serif' }}}}>
      <h1 style={{{{ color: '#00F0FF', fontSize: '2.5rem', marginBottom: '0.5rem' }}}}>{idea.title}</h1>
      <p style={{{{ color: '#94A3B8', fontSize: '1.2rem', marginBottom: '2rem' }}}}>{idea.tagline}</p>
      
      <div style={{{{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}}}>
        <p style={{{{ fontWeight: 'bold' }}}}>System Status:</p>
        <p style={{{{ color: '#00FF9D' }}}}>{{status}}</p>
      </div>
    </div>
  );
}}
"""
            zf.writestr("frontend/src/App.tsx", frontend_app)
            zf.writestr("frontend/src/main.tsx", "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\n\nReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);\n")
            zf.writestr("frontend/index.html", f'<!DOCTYPE html><html><head><title>{idea.title}</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>')
            zf.writestr("frontend/vite.config.ts", "import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nexport default defineConfig({ plugins: [react()], server: { port: 5173, host: true } });\n")
            zf.writestr("frontend/.env.example", "VITE_API_URL=http://localhost:8000/api\n")
            
            frontend_dockerfile = """FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
"""
            zf.writestr("frontend/Dockerfile", frontend_dockerfile)

        zip_buffer.seek(0)
        return zip_buffer
