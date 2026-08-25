# 🎯 Master Phased Implementation Plan & Checklist

**Project Name:** NextGen-Projector  
**Target Architecture:** React (Vite + TypeScript) + Python (FastAPI + AsyncIO) + PostgreSQL + Google Gemini AI  

---

## 📌 Implementation Milestones Overview

```
Phase 1: Foundation, Auth & Database ────► Phase 2: AI Engine & Ideation Hub
                                                    │
                                                    ▼
Phase 4: Scaffolder & Resume Engine  ◄─── Phase 3: Visual Canvas & Blueprint Studio
         │
         ▼
Phase 5: Community Showcase, Polish & Deploy
```

---

## 🚀 Detailed Phase Breakdown

### Phase 1: Environment Setup & Core Full-Stack Foundation
- [ ] **1.1 Workspace Setup**
  - [ ] Initialize frontend directory with React 19, Vite, TypeScript, and TailwindCSS.
  - [ ] Configure `lucide-react`, `clsx`, `tailwind-merge`, and `@xyflow/react`.
  - [ ] Initialize backend directory with Python 3.11+, FastAPI, Uvicorn, and Pydantic v2.
  - [ ] Configure `requirements.txt` / `pyproject.toml` with dependencies (`fastapi`, `uvicorn`, `sqlalchemy[asyncio]`, `asyncpg`, `alembic`, `pydantic-settings`, `python-jose`, `passlib[bcrypt]`, `google-generativeai`, `redis`, `slowapi`).
- [ ] **1.2 Database & Migrations**
  - [ ] Setup PostgreSQL connection pool in `backend/app/core/database.py` with SQLAlchemy 2.0 async engine.
  - [ ] Implement declarative models in `backend/app/models/` (`User`, `ProjectIdea`, `ProjectBlueprint`, `RoadmapMilestone`, `UserProgress`, `SavedBlueprint`, `BlueprintLike`).
  - [ ] Initialize Alembic migrations environment and generate baseline schema migration.
- [ ] **1.3 Authentication & Security**
  - [ ] Implement JWT token generation, password hashing (bcrypt), and current user dependency.
  - [ ] Build `/api/v1/auth/register`, `/api/v1/auth/login`, and `/api/v1/auth/me` endpoints.
  - [ ] Build React Auth Modal and authentication state in Zustand.

---

### Phase 2: AI Ideation Engine & Input Matrix Hub
- [ ] **2.1 Gemini AI Integration**
  - [ ] Setup Google Gemini async API client with fallback models (`gemini-1.5-pro-latest` & `gemini-1.5-flash-latest`).
  - [ ] Engineer structured prompt templates with few-shot industry examples, anti-generic constraints, and strict JSON output schemas.
  - [ ] Implement Redis cache wrapper to cache identical matrix requests.
- [ ] **2.2 Frontend Ideation Cockpit**
  - [ ] Implement Obsidian Cyber-Glass theme tokens and layout in `frontend/src/index.css`.
  - [ ] Build interactive Input Matrix component with skill tag auto-complete, difficulty slider, career role picker, and domain interest cards.
  - [ ] Build Idea Grid cards with glowing hover states, match score indicators, and recommended tech stack badges.

---

### Phase 3: Deep Blueprint & Interactive Visual Roadmap Canvas
- [ ] **3.1 Streaming Blueprint Pipeline**
  - [ ] Build FastAPI Server-Sent Events (SSE) endpoint `GET /api/v1/ai/stream-blueprint/{idea_id}`.
  - [ ] Stream architecture diagrams, database ERDs, REST endpoint specs, milestone nodes, and resume bullets.
  - [ ] Persist completed blueprints and milestones to PostgreSQL via async background task.
- [ ] **3.2 Interactive Node Graph Canvas**
  - [ ] Integrate React Flow (`@xyflow/react`) with custom glowing node components (`Locked`, `Available`, `In-Progress`, `Completed`).
  - [ ] Implement milestone progress drawer with deliverable checklist, prerequisites tree, and syntax-highlighted code snippets.
  - [ ] Implement dynamic milestone completion toggle with real-time percentage progress bar.
- [ ] **3.3 Blueprint Inspector Studio**
  - [ ] Build System Architecture tab with Mermaid diagram viewer.
  - [ ] Build Database Schema tab with interactive model viewer.
  - [ ] Build API Specifications tab with collapsible route cards.

---

### Phase 4: Resume Impact Simulator & Automated Starter Scaffolder
- [ ] **4.1 Resume Impact Engine**
  - [ ] Build ATS-optimized Google XYZ bullet point generator.
  - [ ] Add one-click clipboard copy and markdown export.
- [ ] **4.2 Project Starter Scaffolder**
  - [ ] Implement Python scaffolding engine to dynamically generate directory trees, `requirements.txt`, `package.json`, `.env.example`, Dockerfile, and `README.md`.
  - [ ] Build FastAPI `POST /api/v1/blueprints/{id}/export/zip` streaming endpoint.
  - [ ] Add one-click starter code download button on frontend canvas.

---

### Phase 5: Community Showcase, Testing & Production Deployment
- [ ] **5.1 Community Discovery Feed**
  - [ ] Build `/api/v1/community/explore` endpoint with pagination, sorting (trending, newest), and stack filtering.
  - [ ] Implement Like / Bookmark / Fork actions with optimistic React Query updates.
- [ ] **5.2 Testing & Quality Assurance**
  - [ ] Write unit tests for FastAPI endpoints (Pytest + HTTPX AsyncClient).
  - [ ] Write component tests for React UI and React Flow canvas (Vitest + React Testing Library).
  - [ ] Validate TTFT latency ($< 800\text{ ms}$) and UI Lighthouse performance score ($> 95$).
- [ ] **5.3 Containerization & Deployment**
  - [ ] Create production `Dockerfile` for React (Nginx) and FastAPI (Uvicorn).
  - [ ] Create root `docker-compose.yml` for single-command full-stack deployment (`frontend`, `backend`, `postgres`, `redis`).
  - [ ] Add GitHub Actions CI/CD workflow for automated test runs and lint checks.

---
*Status: READY FOR PHASE 1 EXECUTION*
