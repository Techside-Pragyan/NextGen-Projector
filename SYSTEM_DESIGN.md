# 🚀 NextGen-Projector: Master System Architecture & Specifications

> **Stack Specification:** **React (Vite + TypeScript)** + **Python (FastAPI + AsyncIO + SQLAlchemy 2.0)** + **PostgreSQL (pgvector + JSONB)** + **Google Gemini AI Engine**.

---

## 📑 Table of Contents
1. [Product Requirements Document (PRD)](#1-product-requirements-document-prd)
2. [Technical Requirements Document (TRD)](#2-technical-requirements-document-trd)
3. [Data Flow Diagrams (DFD)](#3-data-flow-diagrams-dfd)
4. [High-Level Design (HLD)](#4-high-level-design-hld)
5. [Low-Level Design (LLD)](#5-low-level-design-lld)
6. [UI / Wireframes & Futuristic Design System](#6-ui--wireframes--futuristic-design-system)
7. [User Stories & Acceptance Criteria](#7-user-stories--acceptance-criteria)
8. [Database Design (ERD & PostgreSQL Schemas)](#8-database-design)
9. [API Design & Interface Specifications (FastAPI)](#9-api-design--interface-specifications)
10. [Master Phased Implementation TODO](#10-master-phased-implementation-todo)

---

# 1. Product Requirements Document (PRD)

## 1.1 Executive Summary & Problem Statement
- **The Problem:** Modern engineering students and software developers struggle to discover project ideas that impress tech recruiters. Most end up building generic tutorial clones (e.g., standard Todo apps, basic E-commerce, simple Weather apps) that fail to showcase real architectural competence, system design trade-offs, or production nuances.
- **The Solution:** **NextGen-Projector** is an AI-powered engineering cockpit that transforms a developer's skills, preferred tech stack, difficulty aspirations, and career milestones into market-relevant, resume-worthy project concepts. It provides deep production blueprints, interactive visual roadmaps, automated architectural scaffolding, and ATS-optimized resume bullet generators.

## 1.2 Target Personas
1. **The Entry-Level Developer / CS Student:** Needs capstone projects demonstrating modern architectural patterns (e.g., streaming APIs, async queues, distributed caching, Vector DBs).
2. **The Career Switcher / Mid-Level Upskiller:** Seeks structured domain transition projects (e.g., Full-Stack AI Engineer, Distributed Systems, High-Frequency Microservices).
3. **The Hackathon Builder & Indie Hacker:** Needs rapid, high-impact concepts with turnkey technical blueprints and starter boilerplates.

## 1.3 Core Value Propositions
- **Zero-Generic Guarantee:** Every idea includes enterprise nuances: edge cases, concurrency, caching strategies, schema definitions, and observability.
- **Interactive Visual Roadmap Canvas:** Interactive node graphs with milestone locks, code snippets, and automated verification tests.
- **Resume Impact Engine:** Translates completed milestones directly into quantifiable, ATS-friendly action bullets (Google XYZ formula).
- **Futuristic Obsidian Cyber-Glass UI:** Cyberpunk dark aesthetic with fluid micro-interactions, canvas node visualizers, and real-time streaming AI responses.

## 1.4 Functional Requirements (FR)
- **FR-1: Multi-Parametric Ideation Engine:** Filter by programming languages, frameworks, difficulty (Beginner, Intermediate, Advanced, Staff Distributed), career target, and domain.
- **FR-2: Deep Blueprint Generation:** Deconstructs selected projects into system architecture, folder layouts, database models, REST/WebSocket API specs, and edge-case mitigations.
- **FR-3: Step-by-Step Interactive Roadmap:** Node-based graph showing prerequisites, deliverables, and progress tracking.
- **FR-4: Tech Stack Matcher & Trade-Off Analyzer:** Recommends libraries with side-by-side pros/cons (e.g., FastAPI vs. Express, PostgreSQL vs. MongoDB).
- **FR-5: Resume Bullet Generator:** Extracts quantifiable metrics and technical highlights from blueprints.
- **FR-6: Project Starter Scaffolder:** Generates downloadable `.zip` bundles or GitHub repositories with pre-configured directory layouts, Dockerfiles, and CI/CD pipelines.
- **FR-7: Community Showcase & Bookmarks:** Browse, bookmark, fork, and upvote community project blueprints.

## 1.5 Non-Functional Requirements (NFR)
- **Performance:** Time-To-First-Token (TTFT) $< 800\text{ ms}$ via Server-Sent Events (SSE). Full blueprint generation $< 4\text{ s}$.
- **Scalability:** Python ASGI (Uvicorn/FastAPI) async event loops supporting 10,000+ concurrent roadmap streaming sessions.
- **Availability:** 99.9% uptime with fallback AI provider handling (Gemini 1.5 Pro $\rightarrow$ Gemini 1.5 Flash $\rightarrow$ OpenAI/Groq).
- **Security:** OAuth2 + JWT authentication, bcrypt password hashing, CORS protection, SQL injection prevention via SQLAlchemy 2.0 parameterized queries, and strict prompt sanitization.
- **Responsiveness:** Fluid rendering across desktop, tablet, and mobile with high-performance 60fps canvas node rendering.

---

# 2. Technical Requirements Document (TRD)

## 2.1 Technology Stack Architecture
| Layer | Technologies & Tools | Justification |
| :--- | :--- | :--- |
| **Frontend Framework** | **React (Vite + TypeScript)** | Lightning-fast HMR, lean bundle size, strong type safety, modern React 19 hooks |
| **Styling & Theming** | **TailwindCSS v3.4 + Vanilla CSS Custom Tokens + Lucide Icons + Framer Motion** | Futuristic Obsidian Cyber-Glass aesthetic, fluid animations, custom glassmorphism |
| **Interactive Graph UI** | **React Flow (`@xyflow/react`)** | High-performance interactive node canvas for roadmap visualization |
| **State Management** | **Zustand + TanStack Query (React Query v5)** | Lightweight global state and optimized server-state caching & synchronization |
| **Backend Framework** | **Python (FastAPI + Pydantic v2 + Uvicorn)** | High-performance async ASGI framework, native typing, automatic OpenAPI docs |
| **Database & ORM** | **PostgreSQL + SQLAlchemy 2.0 (Async) + Alembic** | Robust relational model, JSONB indexing, async I/O via `asyncpg`, migration tracking |
| **AI Orchestration** | **Google Gemini Python SDK (`google-genai` / `google-generativeai`)** | High context window (1M+ tokens), fast structured JSON generation, SSE streaming |
| **Caching & Tasks** | **Redis + Python AsyncIO BackgroundTasks / Celery** | Sub-millisecond prompt caching, rate limiting, background starter kit compression |
| **Auth & Security** | **Python-Jose / PyJWT + Passlib (Bcrypt) + OAuth2** | Secure JWT Bearer token authentication with GitHub & Google OAuth login |
| **Deployment / CI/CD** | **Docker + Nginx + GitHub Actions + Render/Railway/AWS** | Containerized microservices, reverse proxying, automated test pipelines |

## 2.2 System Configurations & Environment Variables
```env
# Backend Server Configuration (.env)
PROJECT_NAME="NextGen-Projector API"
VERSION="1.0.0"
API_V1_STR="/api/v1"
PORT=8000
HOST="0.0.0.0"
DEBUG=True
CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]

# PostgreSQL Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=nextgen_projector
DATABASE_URL="postgresql+asyncpg://postgres:postgres@localhost:5432/nextgen_projector"

# Redis Cache
REDIS_URL="redis://localhost:6379/0"

# Authentication & Security
SECRET_KEY="your-super-secret-hex-key-change-in-production"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=10080  # 7 Days

# AI Engine Credentials
GEMINI_API_KEY="AIzaSy..."
AI_PRIMARY_MODEL="gemini-1.5-pro-latest"
AI_FAST_MODEL="gemini-1.5-flash-latest"

# GitHub OAuth (Optional / Production)
GITHUB_CLIENT_ID="gh_client_xxx"
GITHUB_CLIENT_SECRET="gh_secret_xxx"
```

---

# 3. Data Flow Diagrams (DFD)

## 3.1 DFD Level 0 (Context Diagram)
```mermaid
graph TD
    User([User / Developer]) <-->|1. Submit Skills, Career Target, Stack\n2. View Generated Ideas, Interactive Roadmaps, Blueprints| System[NextGen-Projector (React + FastAPI)]
    System <-->|Prompts & Schema Constraints / Streaming Token Deltas| GeminiAI[Google Gemini 1.5 Pro AI]
    System <-->|Async Queries & Relational Persistence| Postgres[(PostgreSQL 16 Database)]
    System <-->|Prompt Cache Hits & Rate Limits| RedisCache[(Redis Cache)]
    System <-->|OAuth Identity & Repository Creation| GitHub[GitHub API]
```

## 3.2 DFD Level 1 (Major Subsystems Data Flow)
```mermaid
graph TD
    User([User]) -->|Input Matrix Form| ReactClient[React 19 Frontend SPA]
    ReactClient -->|POST /api/v1/ai/generate-ideas| FastAPIGateway[FastAPI API Gateway]
    FastAPIGateway --> AuthMiddleware{Verify JWT / Rate Limit}
    AuthMiddleware -->|Pass| CacheService{Check Redis Cache}
    CacheService -->|Hit| ReturnCache[Return Cached Ideas] --> ReactClient
    CacheService -->|Miss| PromptEngine[Prompt Construction Engine]
    PromptEngine --> GeminiService[Gemini AI Async Client]
    GeminiService -->|Structured JSON Response| Validator[Pydantic v2 Schema Validator]
    Validator --> DBWriter[Async SQLAlchemy DB Writer]
    DBWriter --> Postgres[(PostgreSQL Database)]
    DBWriter --> Redis[(Redis Cache)]
    Validator --> ResponsePayload[JSON Response] --> ReactClient
    ReactClient --> VisualRenderer[React Flow Interactive Canvas & Blueprint Studio]
```

## 3.3 DFD Level 2 (Streaming Blueprint & Roadmap Decomposition)
```mermaid
graph TD
    ReactClient([React Client]) -->|GET /api/v1/ai/stream-blueprint/{idea_id}| SSEHandler[FastAPI SSE Streaming Endpoint]
    SSEHandler --> FetchIdea[Load Idea Context from PostgreSQL]
    FetchIdea --> BuildDeepPrompt[Construct Multi-Stage Architecture Prompt]
    BuildDeepPrompt --> StreamLLM[Gemini Async Token Streamer]
    StreamLLM --> ChunkParser[Chunk Parser & Section Delimiter]
    
    ChunkParser -->|event: architecture| SSE1[Stream System Architecture & Diagram]
    ChunkParser -->|event: schemas| SSE2[Stream Database ERD & Models]
    ChunkParser -->|event: apis| SSE3[Stream REST & WebSocket Specs]
    ChunkParser -->|event: roadmap| SSE4[Stream Interactive Milestone Nodes]
    ChunkParser -->|event: resume| SSE5[Stream ATS Resume Bullets]
    ChunkParser -->|event: done| SSE6[Stream Completion Event]
    
    SSE1 & SSE2 & SSE3 & SSE4 & SSE5 & SSE6 --> EventStream[text/event-stream] --> ReactClient
    SSE6 --> AsyncPersist[Async Background DB Task: Save ProjectBlueprint & Milestones] --> Postgres[(PostgreSQL)]
```

---

# 4. High-Level Design (HLD)

## 4.1 System Architecture Overview
```mermaid
graph TB
    subgraph Client Tier [React Frontend SPA]
        ReactApp[React 19 + TypeScript + Vite]
        ZustandStore[Zustand State Store]
        ReactFlowView[React Flow Roadmap Canvas]
        QueryClient[TanStack Query v5 Cache]
    end

    subgraph Edge & API Tier [Python FastAPI Backend]
        ReverseProxy[Nginx / Cloudflare]
        FastAPIApp[FastAPI ASGI Application]
        RateLimiter[SlowAPI / Redis Rate Limiter]
        AuthHandler[OAuth2 + PyJWT Guard]
    end

    subgraph Business Logic Tier [Python Services]
        IdeaService[Idea Generation Service]
        BlueprintService[Blueprint Orchestration Service]
        RoadmapService[Visual Node Graph Service]
        ResumeService[Resume Optimizer Service]
        ScaffoldService[Project Starter Scaffolder]
    end

    subgraph AI Gateway Tier
        PromptEngine[Prompt Builder & Context Injector]
        GeminiClient[Google Gemini 1.5 Pro / Flash Async]
        FailoverEngine[LLM Fallback Controller]
    end

    subgraph Persistence & Infrastructure Tier
        Postgres[(PostgreSQL 16 Relational DB)]
        Redis[(Redis Cache & Session Store)]
        FileStore[(Local Storage / S3 Starter Zip Bundles)]
    end

    ReactApp --> ReverseProxy
    ReverseProxy --> FastAPIApp
    FastAPIApp --> RateLimiter --> AuthHandler
    FastAPIApp --> IdeaService & BlueprintService & RoadmapService & ResumeService & ScaffoldService
    IdeaService & BlueprintService & RoadmapService & ResumeService --> PromptEngine
    PromptEngine --> GeminiClient
    GeminiClient -.-> FailoverEngine
    FastAPIApp --> Postgres
    FastAPIApp --> Redis
    ScaffoldService --> FileStore
```

## 4.2 System Components & Responsibilities
1. **React Frontend SPA:** Single-Page Application with instant client-side routing, optimistic UI updates, interactive canvas drag/zoom, syntax-highlighted code viewer, and dark cyber-glass UI.
2. **FastAPI Backend Application:** Fully asynchronous REST + SSE endpoints utilizing Python's `asyncio` event loop, Pydantic v2 data validation, and automated Swagger/OpenAPI documentation at `/docs`.
3. **SQLAlchemy 2.0 Async Data Layer:** Database access layer utilizing `asyncpg` drivers, connection pooling, and declarative models with JSONB support.
4. **AI Generation Pipeline:** Integrates with Google Gemini models using structured system prompts with strict JSON Schema output guarantees.

---

# 5. Low-Level Design (LLD)

## 5.1 Python Backend Class / Module Structure
```mermaid
classDiagram
    class AIService {
        +generate_ideas(params: IdeaRequestSchema): List[GeneratedIdeaSchema]
        +stream_blueprint(idea_id: UUID): AsyncGenerator[str, None]
        +generate_resume_bullets(blueprint_id: UUID): List[ResumeBulletSchema]
        -call_gemini_async(prompt: str, json_schema: dict): dict
    }

    class PromptBuilder {
        +build_idea_prompt(params: IdeaRequestSchema): str
        +build_blueprint_prompt(idea: ProjectIdea): str
        +build_scaffold_prompt(blueprint: ProjectBlueprint): str
    }

    class RoadmapGraphService {
        +build_react_flow_nodes(milestones: List[RoadmapMilestone]): dict
        +update_milestone_progress(user_id: UUID, milestone_id: UUID, status: str): UserProgress
        +get_user_completion_stats(user_id: UUID, blueprint_id: UUID): dict
    }

    class ScaffoldingService {
        +generate_starter_zip(blueprint_id: UUID): BytesIO
        +create_github_repo(user_token: str, blueprint_id: UUID, repo_name: str): str
    }

    class ProjectController {
        +post_generate_ideas()
        +get_stream_blueprint()
        +post_save_blueprint()
        +post_toggle_milestone()
        +post_export_zip()
    }

    ProjectController --> AIService
    ProjectController --> RoadmapGraphService
    ProjectController --> ScaffoldingService
    AIService --> PromptBuilder
```

## 5.2 Python Pydantic Models & Schemas
```python
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from enum import Enum
import uuid

class DifficultyLevel(str, Enum):
    BEGINNER = "BEGINNER"
    INTERMEDIATE = "INTERMEDIATE"
    ADVANCED = "ADVANCED"
    STAFF_DISTRIBUTED = "STAFF_DISTRIBUTED"

class CareerGoal(str, Enum):
    FRONTEND_DEV = "FRONTEND_DEV"
    BACKEND_ENGINEER = "BACKEND_ENGINEER"
    FULLSTACK_ARCHITECT = "FULLSTACK_ARCHITECT"
    AI_ML_ENGINEER = "AI_ML_ENGINEER"
    DEVOPS_SRE = "DEVOPS_SRE"
    SYSTEMS_ENGINEER = "SYSTEMS_ENGINEER"

class IdeaRequestSchema(BaseModel):
    skills: List[str] = Field(..., min_items=1, example=["React", "Python", "PostgreSQL"])
    preferred_stack: List[str] = Field(default=[], example=["FastAPI", "React", "Redis"])
    difficulty: DifficultyLevel = DifficultyLevel.ADVANCED
    career_goal: CareerGoal = CareerGoal.FULLSTACK_ARCHITECT
    domain_interest: Optional[str] = Field(None, example="AI Agents & DevTools")
    time_commitment_weeks: Optional[int] = Field(4, ge=1, le=16)

class RecommendedTechStack(BaseModel):
    frontend: List[str]
    backend: List[str]
    database: List[str]
    ai_ml: Optional[List[str]] = []
    devops: List[str]

class GeneratedIdeaSchema(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    tagline: str
    difficulty: DifficultyLevel
    match_score_percentage: int
    why_unique: str
    industry_relevance: str
    recommended_tech_stack: RecommendedTechStack
    key_features: List[str]
    estimated_completion_weeks: int

class CodeSnippetSchema(BaseModel):
    title: str
    language: str
    code: str

class MilestoneNodeSchema(BaseModel):
    id: str
    phase_number: int
    title: str
    description: str
    deliverable: str
    prerequisites: List[str]
    verification_criteria: List[str]
    code_snippets: List[CodeSnippetSchema]
    status: str = "LOCKED"  # LOCKED, AVAILABLE, IN_PROGRESS, COMPLETED

class ProjectBlueprintSchema(BaseModel):
    id: str
    idea_id: str
    system_architecture: Dict[str, Any]
    folder_structure: str
    database_schema: Dict[str, Any]
    api_specifications: List[Dict[str, Any]]
    edge_cases: List[Dict[str, str]]
    resume_bullets: List[str]
    milestones: List[MilestoneNodeSchema]
```

---

# 6. UI / Wireframes & Futuristic Design System

## 6.1 Design System & Aesthetic Foundation
- **Theme Palette:** "Obsidian Cyber-Glass"
  - Background Base: `#05070B` (Deep OLED Space Black)
  - Surface Glass: `rgba(13, 18, 28, 0.7)` with `backdrop-filter: blur(16px)`
  - Accent Primary: `#00F0FF` (Electric Cyan Neon)
  - Accent Secondary: `#8A2BE2` (Galactic Violet Glow)
  - Accent Success: `#00FF9D` (Matrix Emerald)
  - Accent Warning: `#FFB800` (Cyber Amber)
  - Border Accents: `rgba(255, 255, 255, 0.08)` and glowing gradient borders
- **Typography:**
  - Headings: `Outfit` / `Space Grotesk`
  - Body & UI: `Inter` / `Plus Jakarta Sans`
  - Code Snippets: `JetBrains Mono` / `Fira Code`

## 6.2 Application Wireframe & Component Hierarchy

### Screen 1: The Input Matrix & Ideation Hub
```
+-----------------------------------------------------------------------------------------+
| [⚡ NEXTGEN-PROJECTOR]   [Explore Ideas]  [My Workspaces]  [Showcase]   [Login / Profile] |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   🪐 AI-POWERED ARCHITECTURE COCKPIT                                                    |
|   "Architect industry-grade capstones and portfolio-defining systems."                  |
|                                                                                         |
|   +---------------------------------------------------------------------------------+   |
|   | 🛠️ INPUT MATRIX CONFIGURATOR                                                    |   |
|   | Your Skills:       [ React (x) ] [ Python (x) ] [ PostgreSQL (x) ] [+ Add Skill] |   |
|   | Target Tech Stack: [ FastAPI, React 19, Tailwind, Redis, Gemini AI ]             |   |
|   | Difficulty:        [ ] Beginner   [ ] Intermediate   [*] Advanced   [ ] Staff    |   |
|   | Target Role:       [*] Full-Stack AI Architect    Domain: [*] AI DevTools & Agents|   |
|   |                                                                                 |   |
|   |                          [ 🚀 GENERATE BLUEPRINTS ]                             |   |
|   +---------------------------------------------------------------------------------+   |
|                                                                                         |
|   🔥 GENERATED TRENDING PROJECT IDEAS                                                   |
|   +---------------------------+ +---------------------------+ +-----------------------+ |
|   | 🤖 Autonomous Code Agent  | | 🛡️ Distributed Real-Time  | | ⚡ High-Throughput    | |
|   | Self-healing CI/CD Bot    | | Zero-Trust Audit Mesh     | | Vector RAG Pipeline   | |
|   | Match Score: 98% ⭐       | | Match Score: 95% ⭐       | | Match Score: 92% ⭐   | |
|   | Stack: React/FastAPI/Pg   | | Stack: Python/Redis/Pg    | | Stack: React/Qdrant/Py| |
|   | [ View Deep Blueprint → ] | | [ View Deep Blueprint → ] | | [ View Deep Blueprint→| |
|   +---------------------------+ +---------------------------+ +-----------------------+ |
+-----------------------------------------------------------------------------------------+
```

### Screen 2: Interactive Node Graph & Blueprint Studio
```
+-----------------------------------------------------------------------------------------+
| 🗺️ ROADMAP CANVAS: "Autonomous Code Agent (Self-Healing CI/CD Bot)"                      |
| [ 🔄 Auto-Layout ] [ 💾 Save Workspace ] [ 📦 Download Starter Zip ] [ 📋 Resume Bullets]|
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|     +---------------------------+        +---------------------------+                  |
|     | (1) Architecture & Setup  | -----> | (2) Webhook Event Engine  |                  |
|     |        ✅ COMPLETED       |        |        ⏳ IN PROGRESS     |                  |
|     +---------------------------+        +---------------------------+                  |
|                   |                                    |                                |
|                   v                                    v                                |
|     +---------------------------+        +---------------------------+                  |
|     | (3) AST & Vector Embeddings|-----> | (4) Multi-Agent AI Loop   |                  |
|     |        🔒 LOCKED          |        |        🔒 LOCKED          |                  |
|     +---------------------------+        +---------------------------+                  |
|                   |                                    |                                |
|                   +----------------->+<----------------+                                |
|                                      |                                                  |
|                                      v                                                  |
|                        +---------------------------+                                    |
|                        | (5) Automated PR Fixer Bot|                                    |
|                        |        🔒 LOCKED          |                                    |
|                        +---------------------------+                                    |
|                                                                                         |
|  +-----------------------------------------------------------------------------------+  |
|  | 📌 ACTIVE NODE INSPECTOR: Phase 2 - Webhook Event Ingestion Engine                |  |
|  | Objective: Build FastAPI async webhook receiver with HMAC signature verification  |  |
|  | Deliverable: POST /api/v1/webhooks/github endpoint with retry buffer & Redis cache |  |
|  | [✓] HMAC SHA256 Verification    [ ] Redis Idempotency Buffer   [ ] Background Task|  |
|  | Code Snippet: (View Python FastAPI snippet) | [ Mark Milestone Complete ]         |  |
|  +-----------------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------------+
```

---

# 7. User Stories & Acceptance Criteria

### Epic 1: Multi-Parametric Ideation Engine
- **US-1.1: Skill Matrix & Target Calibration**
  - *As a* software engineer,
  - *I want to* specify my technical skills, target technologies, difficulty level, and career aspirations,
  - *So that* I receive tailored, non-generic project ideas that challenge me and look impressive on my resume.
  - **Acceptance Criteria:**
    - User can add and remove skills with auto-suggestions for 60+ technologies.
    - System enforces at least 1 skill before generation.
    - AI generation responds with 3 distinct ideas in $< 3$ seconds.
- **US-1.2: Industry Domain Selection**
  - *As an* applicant targeting specific tech verticals (Fintech, Healthtech, AI Agents, DevTools, CyberSecurity),
  - *I want to* filter idea generation by industry domain,
  - *So that* the project directly matches job descriptions I am targeting.

### Epic 2: Deep Technical Blueprint Decomposition
- **US-2.1: System Architecture & Schemas**
  - *As a* builder,
  - *I want* a complete system architecture breakdown, folder structure, database schema, and REST API specification,
  - *So that* I can implement the project with production-grade engineering standards.
  - **Acceptance Criteria:**
    - Generates Mermaid diagram for architecture and ERD for PostgreSQL models.
    - Provides explicit RESTful API routes with request/response sample JSON payloads.
- **US-2.2: Edge Cases & Trade-Off Analysis**
  - *As an* interviewee,
  - *I want* the blueprint to document real-world edge cases, concurrency challenges, and architectural trade-offs,
  - *So that* I can speak fluently about design decisions in technical interviews.

### Epic 3: Interactive Visual Roadmap Canvas
- **US-3.1: React Flow Graph Progression**
  - *As a* visual learner,
  - *I want to* navigate my project as an interactive node graph with phases, dependencies, and code snippets,
  - *So that* I can track my progress step-by-step without feeling overwhelmed.
  - **Acceptance Criteria:**
    - Graph supports pan, zoom, drag, and node selection.
    - Nodes unlock progressively as preceding milestone prerequisites are satisfied.
    - Dynamic progress bar updates in real time.

### Epic 4: Resume Impact Simulator & Scaffolder
- **US-4.1: ATS-Friendly Action Bullets**
  - *As a* job seeker,
  - *I want to* generate Google XYZ-formula resume bullet points highlighting technical decisions and quantifiable outcomes,
  - *So that* I can paste them onto my resume.
- **US-4.2: Starter Kit Boilerplate Export**
  - *As a* developer,
  - *I want to* download a pre-configured `.zip` containing directory structure, `requirements.txt`/`package.json`, `README.md`, Dockerfile, and `.env.example`,
  - *So that* I can start coding in under 60 seconds.

---

# 8. Database Design

## 8.1 Entity Relationship Diagram (ERD)
```mermaid
erDiagram
    USER ||--o{ PROJECT_IDEA : creates
    USER ||--o{ SAVED_BLUEPRINT : bookmarks
    USER ||--o{ USER_PROGRESS : tracks
    USER ||--o{ BLUEPRINT_LIKE : likes
    
    PROJECT_IDEA ||--|| PROJECT_BLUEPRINT : has_blueprint
    PROJECT_BLUEPRINT ||--|{ ROADMAP_MILESTONE : contains
    PROJECT_BLUEPRINT ||--o{ SAVED_BLUEPRINT : saved_by
    PROJECT_BLUEPRINT ||--o{ BLUEPRINT_LIKE : liked_by
    
    USER_PROGRESS }|--|| ROADMAP_MILESTONE : completes
    
    USER {
        uuid id PK
        string email UK
        string password_hash
        string name
        string avatar_url
        string github_username
        string role
        string tier
        datetime created_at
        datetime updated_at
    }

    PROJECT_IDEA {
        uuid id PK
        uuid user_id FK
        string title
        string tagline
        string difficulty
        string career_goal
        jsonb tech_stack
        jsonb key_features
        boolean is_public
        int view_count
        datetime created_at
    }

    PROJECT_BLUEPRINT {
        uuid id PK
        uuid idea_id FK UK
        jsonb system_architecture
        text folder_structure
        jsonb database_schema
        jsonb api_specifications
        jsonb edge_cases
        jsonb resume_bullets
        datetime created_at
    }

    ROADMAP_MILESTONE {
        uuid id PK
        uuid blueprint_id FK
        int phase_number
        string title
        text description
        text deliverable
        jsonb prerequisites
        jsonb verification_criteria
        jsonb code_snippets
    }

    USER_PROGRESS {
        uuid id PK
        uuid user_id FK
        uuid milestone_id FK
        string status
        datetime completed_at
    }

    SAVED_BLUEPRINT {
        uuid id PK
        uuid user_id FK
        uuid blueprint_id FK
        datetime created_at
    }

    BLUEPRINT_LIKE {
        uuid id PK
        uuid user_id FK
        uuid blueprint_id FK
        datetime created_at
    }
```

## 8.2 PostgreSQL SQL Database Schema
```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    name VARCHAR(128) NOT NULL,
    avatar_url TEXT,
    github_username VARCHAR(100),
    role VARCHAR(32) DEFAULT 'USER',
    tier VARCHAR(32) DEFAULT 'FREE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Project Ideas Table
CREATE TABLE project_ideas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    tagline TEXT NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    career_goal VARCHAR(100) NOT NULL,
    tech_stack JSONB NOT NULL,
    key_features JSONB NOT NULL,
    is_public BOOLEAN DEFAULT true,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Project Blueprints Table
CREATE TABLE project_blueprints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    idea_id UUID UNIQUE NOT NULL REFERENCES project_ideas(id) ON DELETE CASCADE,
    system_architecture JSONB NOT NULL,
    folder_structure TEXT NOT NULL,
    database_schema JSONB NOT NULL,
    api_specifications JSONB NOT NULL,
    edge_cases JSONB NOT NULL,
    resume_bullets JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Roadmap Milestones Table
CREATE TABLE roadmap_milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    blueprint_id UUID NOT NULL REFERENCES project_blueprints(id) ON DELETE CASCADE,
    phase_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    deliverable TEXT NOT NULL,
    prerequisites JSONB DEFAULT '[]'::jsonb,
    verification_criteria JSONB DEFAULT '[]'::jsonb,
    code_snippets JSONB DEFAULT '[]'::jsonb
);

-- User Progress Table
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    milestone_id UUID NOT NULL REFERENCES roadmap_milestones(id) ON DELETE CASCADE,
    status VARCHAR(32) DEFAULT 'COMPLETED',
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, milestone_id)
);

-- Saved Blueprints (Bookmarks)
CREATE TABLE saved_blueprints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    blueprint_id UUID NOT NULL REFERENCES project_blueprints(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, blueprint_id)
);

-- Blueprint Likes
CREATE TABLE blueprint_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    blueprint_id UUID NOT NULL REFERENCES project_blueprints(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, blueprint_id)
);

-- Optimized Performance Indexes
CREATE INDEX idx_project_ideas_user ON project_ideas(user_id);
CREATE INDEX idx_project_ideas_difficulty ON project_ideas(difficulty);
CREATE INDEX idx_project_ideas_public ON project_ideas(is_public);
CREATE INDEX idx_roadmap_milestones_blueprint ON roadmap_milestones(blueprint_id);
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_saved_blueprints_user ON saved_blueprints(user_id);
```

---

# 9. API Design & Interface Specifications (FastAPI)

### 9.1 Authentication & Profile (`/api/v1/auth`)
- `POST /api/v1/auth/register` — Register new user with email & password.
- `POST /api/v1/auth/login` — Login user & return JWT Bearer access token.
- `GET /api/v1/auth/me` — Retrieve current authenticated user profile.
- `POST /api/v1/auth/github` — OAuth2 exchange code for user session.

### 9.2 AI Generation Engine (`/api/v1/ai`)
- `POST /api/v1/ai/generate-ideas`
  - **Request Body:**
    ```json
    {
      "skills": ["React", "Python", "PostgreSQL", "Docker"],
      "preferred_stack": ["FastAPI", "React 19", "TailwindCSS", "Redis"],
      "difficulty": "ADVANCED",
      "career_goal": "FULLSTACK_ARCHITECT",
      "domain_interest": "AI DevTools & Observability"
    }
    ```
  - **Response (200 OK):**
    ```json
    {
      "success": true,
      "data": [
        {
          "id": "idea-912a-431f",
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

- `GET /api/v1/ai/stream-blueprint/{idea_id}` (Server-Sent Events)
  - **Headers:** `Accept: text/event-stream`
  - **Event Streams:**
    - `event: architecture` $\rightarrow$ `{ "style": "EVENT_DRIVEN_FASTAPI", "diagram": "..." }`
    - `event: schemas` $\rightarrow$ `{ "erd": "...", "models": [...] }`
    - `event: apis` $\rightarrow$ `[{ "method": "POST", "path": "/api/v1/trace", ... }]`
    - `event: roadmap` $\rightarrow$ `[{ "phase": 1, "title": "Setup & Telemetry Gateway", ... }]`
    - `event: resume` $\rightarrow$ `["Architected async FastAPI telemetry ingestion pipeline...", ...]`
    - `event: done` $\rightarrow$ `{ "status": "completed", "blueprint_id": "..." }`

### 9.3 Blueprints & Workspaces (`/api/v1/blueprints`)
- `GET /api/v1/blueprints/{id}` — Retrieve full blueprint and milestone state.
- `POST /api/v1/blueprints/{id}/save` — Save blueprint to user's personal workspace.
- `POST /api/v1/blueprints/{id}/milestones/{milestone_id}/toggle` — Toggle milestone completion status.
- `POST /api/v1/blueprints/{id}/export/zip` — Stream downloadable starter `.zip` archive containing scaffolded project structure.

### 9.4 Community Showcase (`/api/v1/community`)
- `GET /api/v1/community/explore?sort=trending&page=1&limit=12` — Browse community blueprints.
- `POST /api/v1/community/blueprints/{id}/like` — Upvote / like blueprint.
- `POST /api/v1/community/blueprints/{id}/fork` — Fork blueprint into personal workspace.

---

# 10. Master Phased Implementation TODO

## Phase 1: Environment & Full-Stack Foundation (Days 1–2)
- [ ] Initialize frontend directory with **React (Vite + TypeScript)**, TailwindCSS, Lucide Icons, and React Flow.
- [ ] Initialize backend directory with **Python 3.11+**, **FastAPI**, **Uvicorn**, **SQLAlchemy 2.0 (async)**, and **Alembic**.
- [ ] Configure PostgreSQL database connection with `asyncpg` connection pool.
- [ ] Implement database models in SQLAlchemy (`User`, `ProjectIdea`, `ProjectBlueprint`, `RoadmapMilestone`, `UserProgress`).
- [ ] Setup Alembic migration environment and generate baseline schema migrations.
- [ ] Implement JWT authentication (Register, Login, Token verify, Current User dependency).

## Phase 2: AI Engine & Ideation Pipeline (Days 3–4)
- [ ] Configure Google Gemini API async client (`google-genai` / `google-generativeai`) with structured JSON schema output prompts.
- [ ] Implement Prompt Engineering templates with few-shot domain examples, edge cases, and difficulty constraints.
- [ ] Build FastAPI `POST /api/v1/ai/generate-ideas` endpoint with Pydantic validation and Redis caching.
- [ ] Build React Input Matrix UI with skill tag adder, difficulty slider, role selector, and domain cards.
- [ ] Build Idea Grid UI with hover glowing cards, match score badges, and tech stack tags.

## Phase 3: Deep Blueprint & Visual Roadmap Engine (Days 5–6)
- [ ] Build FastAPI SSE streaming endpoint `GET /api/v1/ai/stream-blueprint/{idea_id}` for real-time section streaming.
- [ ] Implement React Flow (`@xyflow/react`) interactive roadmap canvas with custom animated nodes.
- [ ] Build Blueprint Viewer components: Architecture Diagram visualizer, Database ERD viewer, and REST API specification table.
- [ ] Build Milestone Inspector drawer with deliverables, prerequisites checklist, and syntax-highlighted code snippets.

## Phase 4: Resume Optimizer, Scaffolding & State Sync (Days 7–8)
- [ ] Build ATS Resume Bullet Point generator with one-click copy and quantified impact metrics.
- [ ] Implement Python Starter Kit Scaffolding Engine (generates directory tree, `requirements.txt`, `package.json`, `README.md`, Dockerfile, `.env.example`).
- [ ] Implement `POST /api/v1/blueprints/{id}/export/zip` in FastAPI returning streaming zip bytes.
- [ ] Implement Milestone Progress tracking with optimistic UI updates and PostgreSQL persistence.

## Phase 5: Community Showcase, Polish & Deployment (Days 9–10)
- [ ] Build Community Showcase feed with search, category filters, and sorting (trending, newest).
- [ ] Add like, bookmark, and fork capabilities with optimistic updates.
- [ ] Conduct end-to-end performance audits (TTFT $< 800\text{ ms}$, Lighthouse score $> 95$).
- [ ] Setup Docker Compose for local full-stack development (`frontend`, `backend`, `postgres`, `redis`).
- [ ] Prepare production deployment configuration (Vercel / Render / Railway / Docker).

---
*Document Version: 2.0.0 | Architecture: React (Vite) + Python (FastAPI) + PostgreSQL + Gemini AI | Status: READY FOR IMPLEMENTATION*
