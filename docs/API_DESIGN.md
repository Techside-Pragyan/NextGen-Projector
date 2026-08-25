# 🌐 API Design & Interface Specifications

**Project Name:** NextGen-Projector  
**Framework:** Python FastAPI (ASGI)  
**Standard:** OpenAPI 3.1 & RESTful JSON + Server-Sent Events (SSE)  
**Base URL:** `/api/v1`  

---

## 1. Authentication Endpoints (`/api/v1/auth`)

### 1.1 Register User
- **Method:** `POST /api/v1/auth/register`
- **Request Body:**
  ```json
  {
    "email": "developer@nextgen.dev",
    "password": "SecurePassword123!",
    "name": "Jane Developer"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "user": {
      "id": "c7a8b9e0-1234-5678-90ab-cdef12345678",
      "email": "developer@nextgen.dev",
      "name": "Jane Developer",
      "role": "USER",
      "tier": "FREE"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
    "token_type": "bearer"
  }
  ```

### 1.2 User Login
- **Method:** `POST /api/v1/auth/login`
- **Request Body:**
  ```json
  {
    "email": "developer@nextgen.dev",
    "password": "SecurePassword123!"
  }
  ```
- **Response (200 OK):** (Same schema as register).

### 1.3 Get Current User Session
- **Method:** `GET /api/v1/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):** Returns current user profile details.

---

## 2. AI Ideation & Generation Endpoints (`/api/v1/ai`)

### 2.1 Generate Project Ideas
- **Method:** `POST /api/v1/ai/generate-ideas`
- **Headers:** `Authorization: Bearer <token>` (Optional for guests, tracked by IP)
- **Request Body:**
  ```json
  {
    "skills": ["React", "Python", "PostgreSQL", "Docker"],
    "preferred_stack": ["FastAPI", "React 19", "TailwindCSS", "Redis"],
    "difficulty": "ADVANCED",
    "career_goal": "FULLSTACK_ARCHITECT",
    "domain_interest": "AI DevTools & Observability",
    "time_commitment_weeks": 4
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "912a431f-8234-4bc1-a2fe-43189fa31102",
        "title": "AgentTrace: Distributed Multi-Agent LLM Observability Cockpit",
        "tagline": "An async telemetry pipeline tracking agent decision DAGs, token economics, and hallucination scores.",
        "difficulty": "ADVANCED",
        "match_score_percentage": 98,
        "why_unique": "Features OpenTelemetry span graphs for agent sub-calls with real-time SSE streaming visualizers.",
        "recommended_tech_stack": {
          "frontend": ["React 19", "TypeScript", "React Flow", "TailwindCSS"],
          "backend": ["Python", "FastAPI", "AsyncIO", "Celery"],
          "database": ["PostgreSQL", "Redis"],
          "ai_ml": ["Google Gemini 1.5 Pro", "LangGraph"],
          "devops": ["Docker", "Prometheus"]
        },
        "key_features": [
          "Real-time LangGraph execution trace visualizer",
          "Streaming hallucination detection scoring engine",
          "Cost & token budget circuit breaker"
        ],
        "estimated_completion_weeks": 4
      }
    ]
  }
  ```

### 2.2 Stream Deep Blueprint (Server-Sent Events)
- **Method:** `GET /api/v1/ai/stream-blueprint/{idea_id}`
- **Headers:** `Accept: text/event-stream`
- **Stream Events Sequence:**
  - `event: architecture` $\rightarrow$ System Architecture, style, and Mermaid diagram.
  - `event: schemas` $\rightarrow$ Database tables, ERD diagram, and models.
  - `event: apis` $\rightarrow$ REST & WebSocket endpoints list.
  - `event: roadmap` $\rightarrow$ Array of milestone nodes with code snippets and deliverables.
  - `event: resume` $\rightarrow$ ATS-optimized Google XYZ resume bullets.
  - `event: done` $\rightarrow$ Signals completion and returns persisted `blueprint_id`.

---

## 3. Blueprint & Workspace Endpoints (`/api/v1/blueprints`)

### 3.1 Get Blueprint Details
- **Method:** `GET /api/v1/blueprints/{id}`
- **Response (200 OK):** Returns complete blueprint object with milestones and user progress if authenticated.

### 3.2 Toggle Milestone Completion
- **Method:** `POST /api/v1/blueprints/{id}/milestones/{milestone_id}/toggle`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "milestone_id": "71fb2c31-9011-48e2-b118-2009aa47161b",
    "status": "COMPLETED",
    "completed_at": "2026-08-25T23:15:00Z",
    "overall_completion_percentage": 40.0
  }
  ```

### 3.3 Export Starter Kit ZIP Archive
- **Method:** `POST /api/v1/blueprints/{id}/export/zip`
- **Response (200 OK):** Streams binary ZIP file attachment (`application/zip`) containing scaffolded project repository.

---

## 4. Community Showcase Endpoints (`/api/v1/community`)

### 4.1 Browse Trending Blueprints
- **Method:** `GET /api/v1/community/explore?sort=trending&page=1&limit=12`
- **Response (200 OK):** Paginated list of public project blueprints with like counts and creator metadata.

### 4.2 Upvote Blueprint
- **Method:** `POST /api/v1/community/blueprints/{id}/like`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):** `{ "success": true, "liked": true, "total_likes": 142 }`
