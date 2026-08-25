# ⚙️ Technical Requirements Document (TRD)

**Project Name:** NextGen-Projector  
**Architecture:** Modern Client-Server Decoupled Architecture  
**Frontend:** React (Vite + TypeScript)  
**Backend:** Python (FastAPI + AsyncIO + Pydantic v2)  
**Database:** PostgreSQL 16 (SQLAlchemy 2.0 Async + Alembic)  
**AI Service:** Google Gemini 1.5/2.0 API  

---

## 1. System Architecture & Component Stack

```
+-----------------------------------------------------------------------------------+
|                              REACT FRONTEND (SPA)                                 |
|  React 19 + TypeScript + Vite + TailwindCSS + React Flow + Zustand + React Query  |
+----------------------------------------+------------------------------------------+
                                         |  HTTPS / REST / Server-Sent Events (SSE)
                                         v
+-----------------------------------------------------------------------------------+
|                           PYTHON FASTAPI BACKEND (ASGI)                           |
|      FastAPI + Uvicorn + Pydantic v2 + Python-Jose + Google GenAI SDK             |
+-------------------+--------------------+--------------------+---------------------+
                    |                    |                    |
                    v                    v                    v
          +-------------------+ +------------------+ +------------------+
          | PostgreSQL 16 DB  | |   Redis Cache    | | Google Gemini AI |
          | (SQLAlchemy 2.0)  | | (Upstash/Local)  | | 1.5 Pro / Flash  |
          +-------------------+ +------------------+ +------------------+
```

---

## 2. Technology Stack Breakdown

### 2.1 Frontend Tier
- **Framework:** React 19 with Vite build tool and TypeScript for compile-time type safety.
- **Styling:** TailwindCSS v3.4 + Vanilla CSS custom design tokens for the Obsidian Cyber-Glass theme.
- **Interactive Graphing:** `@xyflow/react` (React Flow) for interactive roadmap node graph rendering.
- **State Management:**
  - `zustand`: Ultra-lightweight global client state (active workspace, filters, auth session).
  - `@tanstack/react-query` (React Query v5): Server-state caching, optimistic updates, and background refetching.
- **Icons & Animation:** `lucide-react` for iconography and `framer-motion` for micro-interactions and transitions.

### 2.2 Backend Tier
- **Framework:** Python 3.11+ with **FastAPI** running on the **Uvicorn** ASGI server.
- **Data Validation & Serialization:** **Pydantic v2** for schema validation and OpenAPI doc generation.
- **Asynchronous Execution:** Native Python `asyncio` for non-blocking database queries and streaming AI token deltas.
- **Security & Authentication:** `python-jose` / `pyjwt` for JWT access tokens, `passlib[bcrypt]` for password hashing, and OAuth2 password bearer schemes.
- **AI Integration:** `google-generativeai` / `google-genai` Python SDK for structured JSON output and token streaming.

### 2.3 Database & Cache Tier
- **Primary Database:** **PostgreSQL 16** with native JSONB support for dynamic schemas, foreign key constraints, and relational models.
- **ORM & Migrations:** **SQLAlchemy 2.0 (Async)** with `asyncpg` database driver and **Alembic** for schema migrations.
- **Cache & Rate Limiting:** **Redis** for prompt response caching and token-bucket rate limiting via `slowapi` or Redis middleware.

---

## 3. Environment Variables & Configuration

### Backend Configuration (`backend/.env`)
```env
# Application
PROJECT_NAME="NextGen-Projector API"
VERSION="1.0.0"
API_V1_STR="/api/v1"
PORT=8000
HOST="0.0.0.0"
DEBUG=True
CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]

# PostgreSQL Database Connection
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=nextgen_projector
DATABASE_URL="postgresql+asyncpg://postgres:postgres@localhost:5432/nextgen_projector"

# Redis Cache
REDIS_URL="redis://localhost:6379/0"

# JWT Authentication
SECRET_KEY="your-super-secret-hex-key-change-in-production"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=10080  # 7 Days

# Google Gemini AI
GEMINI_API_KEY="AIzaSy..."
AI_PRIMARY_MODEL="gemini-1.5-pro-latest"
AI_FAST_MODEL="gemini-1.5-flash-latest"

# Rate Limiting
RATE_LIMIT_MAX_REQUESTS_PER_MINUTE=60
DAILY_AI_GENERATION_QUOTA_FREE=10
```

### Frontend Configuration (`frontend/.env`)
```env
VITE_API_BASE_URL="http://localhost:8000/api/v1"
VITE_APP_TITLE="NextGen-Projector"
```

---

## 4. Hardware & Infrastructure Requirements

- **Development Environment:** Node.js 20+, Python 3.11+, PostgreSQL 16, Redis.
- **Containerization:** Multi-stage `Dockerfile` for React (Nginx alpine) and FastAPI (Python slim), orchestrated with `docker-compose.yml`.
- **Production Deployment:**
  - Frontend: Vercel / Cloudflare Pages / AWS S3 + CloudFront.
  - Backend: Render / Railway / AWS ECS / Google Cloud Run.
  - Database: Neon / Supabase / AWS RDS PostgreSQL.
