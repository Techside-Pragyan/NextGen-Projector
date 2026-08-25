# 🚀 NextGen-Projector: Complete System Design & Specifications Document (Master Spec)

> **Platform Overview:** NextGen-Projector is an AI-powered, futuristic engineering workspace and intelligent ideation engine that transforms developer skills, target tech stacks, difficulty aspirations, and career milestones into trending, resume-worthy, industry-grade project ideas, accompanied by real-time interactive roadmaps, deep technical blueprints, automated architecture scaffolders, and resume impact analyzers.

---

## 📑 Table of Contents
1. [Product Requirements Document (PRD)](#1-product-requirements-document-prd)
2. [Technical Requirements Document (TRD)](#2-technical-requirements-document-trd)
3. [Data Flow Diagrams (DFD)](#3-data-flow-diagrams-dfd)
4. [High-Level Design (HLD)](#4-high-level-design-hld)
5. [Low-Level Design (LLD)](#5-low-level-design-lld)
6. [UI / Wireframes & Futuristic Design System](#6-ui--wireframes--futuristic-design-system)
7. [User Stories & Acceptance Criteria](#7-user-stories--acceptance-criteria)
8. [Database Design (ERD & Schemas)](#8-database-design)
9. [API Design & Interface Specifications](#9-api-design--interface-specifications)
10. [Master Phased Implementation TODO](#10-master-phased-implementation-todo)

---

# 1. Product Requirements Document (PRD)

## 1.1 Executive Summary & Problem Statement
- **The Problem:** Modern aspiring software engineers, students, and experienced developers transitioning to new domains struggle to find project ideas that stand out to tech recruiters. Most end up building generic tutorial clones (e.g., standard Todo apps, basic E-commerce, simple Weather apps) that fail to impress hiring managers or showcase real architectural mastery.
- **The Solution:** **NextGen-Projector** bridges this gap by leveraging Generative AI (LLMs), live GitHub/tech industry trend signals, and algorithmic difficulty calibration to generate hyper-personalized, market-relevant project concepts with production-grade blueprints, step-by-step interactive visual milestones, architecture diagrams, resume bullet generators, and one-click starter scaffolds.

## 1.2 Target Audience & Personas
1. **The Entry-Level Developer / CS Student:** Needs resume-defining capstone projects that prove competence with modern stacks (e.g., Next.js, FastAPI, Vector Databases, Distributed Systems).
2. **The Career Switcher / Mid-Level Upskiller:** Wants to master specific domains (e.g., AI/ML Agents, Web3/DeFi, Real-Time WebSockets, High-Throughput Microservices) by building real-world enterprise architectures.
3. **The Hackathon Enthusiast & Indie Hacker:** Needs innovative, novel, and high-impact concepts with rapid prototype roadmaps and tech stack recommendations.

## 1.3 Value Propositions
- **Zero-Generic Guarantee:** Every idea is contextualized with real-world enterprise nuances (edge cases, caching strategies, observability, testing).
- **Interactive Visual Roadmaps:** Dynamic node-based graphs showing prerequisite concepts, phase checkpoints, and milestone verification tests.
- **Resume Impact Engine:** Translates completed milestones directly into quantifiable, ATS-friendly action-oriented resume bullet points (e.g., *"Engineered distributed cache with Redis achieving <15ms p99 latency"*).
- **Futuristic Cockpit UI:** Cyberpunk / Glassmorphic dark aesthetic with ultra-responsive micro-interactions, canvas graph visualizers, and live streaming AI responses.

## 1.4 Functional Requirements (FR)
- **FR-1: Multi-Parametric Ideation Engine:** Input skills, target tech stack, experience level (Beginner/Intermediate/Advanced/Staff), target job role (e.g., Full-Stack, AI Engineer, DevOps, Systems), and time commitment.
- **FR-2: Dynamic Blueprint Decomposition:** Generates system architecture, folder structure, API specs, database schemas, edge-case analysis, and deployment strategy.
- **FR-3: Step-by-Step Interactive Roadmap:** Node-based learning/building tree with progress tracking, task checkboxes, code snippets, and automated milestone completion validation.
- **FR-4: Tech Stack Matcher & Trade-Off Analyzer:** Recommends libraries/frameworks and provides side-by-side pros/cons (e.g., PostgreSQL vs. MongoDB for this specific project).
- **FR-5: Resume Bullet Generator:** Extracts quantifiable metrics and technical highlights from the generated blueprint to populate user portfolios.
- **FR-6: Project Starter Scaffolder:** Generates downloadable boilerplates or GitHub repository creation workflows with pre-configured directory layouts, Dockerfiles, and CI/CD actions.
- **FR-7: Community Discovery & Showcase:** Explore, bookmark, fork, upvote, and share community-generated project blueprints.

## 1.5 Non-Functional Requirements (NFR)
- **Performance:** Initial idea generation TTFT (Time-to-First-Token) $< 800\text{ ms}$ via streaming Server-Sent Events (SSE). Full blueprint generation within 3–5 seconds.
- **Scalability:** Horizontal scaling of API gateways and worker queues capable of handling 10,000+ concurrent roadmap generations.
- **Availability:** 99.9% uptime with multi-region redundancy and graceful degradation / fallback LLM provider switching (Gemini / OpenAI / Anthropic / Groq).
- **Security:** Strict rate-limiting, JWT authentication, OAuth2 (GitHub/Google), AES-256 encryption at rest, secure prompt isolation preventing prompt injections.
- **Accessibility & Responsiveness:** Fully responsive across mobile, tablet, ultra-wide screens; WCAG AA compliant contrast ratios with high-visibility neon/glow accents.

---

# 2. Technical Requirements Document (TRD)

## 2.1 Technology Stack Selection
| Layer | Technologies & Tools | Justification |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 15+ (App Router) / React 19** | SSR/SSG capabilities, Server Components, Streaming UI, optimized V8 performance |
| **Styling & Theming** | **TailwindCSS v3.4 + Vanilla CSS Custom Tokens + Framer Motion + Lucide Icons** | Ultra-slick cyberpunk/glassmorphism dark UI, smooth canvas transitions, fluid animations |
| **Interactive Graph UI** | **React Flow (@xyflow/react)** | Canvas node-based visual roadmap editor and interactive tree graph visualization |
| **Backend / API Engine** | **Node.js + Express / Fastify (TypeScript)** | Asynchronous I/O, native TypeScript types sharing with frontend, robust ecosystem |
| **AI Orchestration** | **Google Gemini 1.5/2.0 API & LangChain/LangGraph** | High token throughput, large context window (1M+ tokens), low latency structured JSON generation |
| **Primary Database** | **PostgreSQL (via Prisma ORM / Neon / Supabase)** | Relational integrity for user profiles, saved blueprints, roadmaps, social forks, and metrics |
| **Caching & Queue** | **Redis (Upstash / Redis Cloud) + BullMQ** | Sub-millisecond prompt caching, token bucket rate limiting, and background export jobs |
| **Search & Discovery** | **PostgreSQL Full-Text Search / pgvector** | Vector similarity search for matching existing community ideas and avoiding duplicate generations |
| **Auth & Security** | **NextAuth.js / Supabase Auth / Custom JWT with bcrypt** | GitHub & Google OAuth login, role-based access control (Admin, User, Pro) |
| **Deployment / CI/CD** | **Vercel (Frontend) + Render / Railway / Docker (Backend) + GitHub Actions** | Automated testing, linting, preview deployments, containerized execution |

## 2.2 System Configurations & Environment Variables
```env
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/nextgen_projector?schema=public

# Redis & Cache
REDIS_URL=redis://default:password@localhost:6379

# Authentication & Security
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRATION=7d
GITHUB_CLIENT_ID=gh_client_xxx
GITHUB_CLIENT_SECRET=gh_secret_xxx
GOOGLE_CLIENT_ID=google_client_xxx
GOOGLE_CLIENT_SECRET=google_secret_xxx

# AI Service Providers
GEMINI_API_KEY=AIzaSy...
OPENAI_API_KEY=sk-... (optional fallback)
AI_MODEL_PRIMARY=gemini-1.5-pro-latest
AI_MODEL_FAST=gemini-1.5-flash-latest

# Rate Limiting & Limits
RATE_LIMIT_MAX_REQUESTS=60
RATE_LIMIT_WINDOW_MS=60000
AI_GENERATION_DAILY_QUOTA_FREE=10
AI_GENERATION_DAILY_QUOTA_PRO=100
```

---

# 3. Data Flow Diagrams (DFD)

## 3.1 DFD Level 0 (Context Diagram)
```mermaid
graph TD
    User([User / Developer]) <-->|1. Input Skills, Goals, Stack preferences\n2. View Generated Ideas, Blueprints, Roadmaps| System[NextGen-Projector System]
    System <-->|Prompt Context & Extraction Schema / Streamed Responses| AI[AI Engine - Gemini / OpenAI]
    System <-->|OAuth Profile & Repo Forking| GitHub[GitHub API]
    System <-->|Persist User Progress, Blueprints, Likes| DB[(PostgreSQL Database)]
    System <-->|Rate Limit & Cache Hits| Cache[(Redis Cache)]
```

## 3.2 DFD Level 1 (Major Subsystems Data Flow)
```mermaid
graph TD
    User([User]) -->|Inputs Form Data| FormHandler[1. Input Validation & Enrichment]
    FormHandler -->|Check Cached Prompts| CacheLookup{Cache Hit?}
    CacheLookup -->|Yes| FastReturn[Return Cached Ideas] --> User
    CacheLookup -->|No| PromptBuilder[2. Dynamic Prompt Orchestrator]
    PromptBuilder -->|Optimized System Prompt + JSON Schema| LLMGateway[3. AI LLM Gateway (Gemini)]
    LLMGateway -->|Raw Stream / Tokens| StreamParser[4. Stream Parser & Validator]
    StreamParser -->|Validate JSON Structure| PersistEngine[5. DB Persistence & Cache Write]
    PersistEngine --> DB[(PostgreSQL)]
    PersistEngine --> Cache[(Redis)]
    StreamParser -->|Stream Server-Sent Events| Visualizer[6. Interactive Canvas & UI Renderer]
    Visualizer --> User
```

## 3.3 DFD Level 2 (AI Blueprint Decomposition & Roadmap Flow)
```mermaid
graph TD
    IdeaID[Selected Idea ID] --> BlueprintReq[Blueprint Generator Service]
    BlueprintReq --> ContextAggregator[Aggregate Target Stack, Difficulty, Edge Cases]
    ContextAggregator --> AIPrompt[Inject Architecture Blueprint Prompt]
    AIPrompt --> LLM[Gemini 1.5 Pro]
    LLM --> JSONStructure{Valid Blueprint JSON?}
    JSONStructure -->|No| Fixer[Schema Auto-Repair Engine] --> JSONStructure
    JSONStructure -->|Yes| Decompose[Decompose into 5 Modules]
    Decompose --> Mod1[Architecture & Folder Structure]
    Decompose --> Mod2[Database Schema & ERD Model]
    Decompose --> Mod3[Step-by-Step Milestone Graph]
    Decompose --> Mod4[API Route Specifications]
    Decompose --> Mod5[Resume Impact Bullet Points]
    Mod1 & Mod2 & Mod3 & Mod4 & Mod5 --> StoreBlueprint[(Save Blueprint to DB)]
    StoreBlueprint --> UIStream[Deliver to Interactive Viewer]
```

---

# 4. High-Level Design (HLD)

## 4.1 System Architecture Overview
```mermaid
graph TB
    subgraph Client Tier
        WebClient[Next.js 15 Client App]
        ReactFlowUI[Interactive Node Graph Visualizer]
        StateStore[Zustand State Store]
    end

    subgraph Edge & Gateway Tier
        ReverseProxy[Nginx / Cloudflare CDN]
        RateLimiter[Redis Rate Limiting Middleware]
        AuthGuard[JWT / OAuth2 Guard]
    end

    subgraph Application Service Tier
        API[Express.js / Fastify API Server]
        IdeaService[Idea Generation Service]
        BlueprintService[Blueprint & Schema Service]
        RoadmapService[Visual Roadmap Generator]
        ResumeService[Resume Bullet Optimizer]
        ScaffoldingService[Project Zip / GitHub Exporter]
    end

    subgraph AI Gateway & Engine Tier
        PromptEngine[Prompt Builder & Context Injector]
        LLMManager[LLM Provider Failover Controller]
        GeminiPro[Google Gemini 1.5 Pro]
        GeminiFlash[Google Gemini 1.5 Flash]
        OpenAIFallback[OpenAI GPT-4o Fallback]
    end

    subgraph Data & Storage Tier
        Postgres[(PostgreSQL Relational DB)]
        RedisCache[(Redis Cache & Session Store)]
        S3Bucket[(AWS S3 / Cloudflare R2 - Export Bundles)]
    end

    WebClient --> ReverseProxy
    ReverseProxy --> RateLimiter --> AuthGuard --> API
    API --> IdeaService & BlueprintService & RoadmapService & ResumeService & ScaffoldingService
    IdeaService & BlueprintService & RoadmapService & ResumeService --> PromptEngine
    PromptEngine --> LLMManager
    LLMManager --> GeminiPro
    LLMManager -.->|Failover| GeminiFlash
    LLMManager -.->|Backup| OpenAIFallback
    API --> Postgres
    API --> RedisCache
    ScaffoldingService --> S3Bucket
```

## 4.2 Architectural Layers & Patterns
1. **Presentation Layer:** Next.js 15 App router with Server Components for SEO and fast TTFB, Client Components for dynamic canvas graphs and real-time streaming updates.
2. **API & Gateway Layer:** Modular RESTful + SSE architecture, central error handling, schema validation with Zod, CORS and Helmet security headers.
3. **AI Pipeline & Prompt Engineering Layer:**
   - **Few-Shot Template Engine:** Injects industry best practices, current-year technology trends, architectural patterns (Microservices, Event-Driven, Serverless, Monolith).
   - **Streaming Tokenizer:** Uses SSE (`text/event-stream`) to pipe token deltas to the frontend for zero-latency feeling.
   - **Self-Healing Output Validator:** Verifies schema structure against strict JSON schema definitions; re-prompts if corrupt.
4. **Data & Persistence Layer:** Relational models with cascade updates, optimistic UI caching, and indexed foreign keys for lightning-fast queries.

---

# 5. Low-Level Design (LLD)

## 5.1 Core Class / Service Diagram
```mermaid
classDiagram
    class AIOrchestrator {
        +generateIdeas(params: IdeaRequestDto): Promise<IdeaResponse[]>
        +generateBlueprint(ideaId: string): Promise<BlueprintResponse>
        +generateRoadmapGraph(blueprintId: string): Promise<RoadmapGraph>
        +generateResumeBullets(ideaId: string): Promise<ResumeBullet[]>
        -callLLMWithRetry(prompt: string, schema: object): Promise<string>
    }

    class PromptBuilder {
        +buildIdeaPrompt(params: IdeaRequestDto): string
        +buildBlueprintPrompt(idea: ProjectIdea): string
        +buildScaffoldPrompt(blueprint: ProjectBlueprint): string
    }

    class ProjectController {
        +getIdeas(req: Request, res: Response): Promise<void>
        +streamBlueprint(req: Request, res: Response): Promise<void>
        +saveBlueprint(req: Request, res: Response): Promise<void>
        +updateMilestoneProgress(req: Request, res: Response): Promise<void>
        +exportStarterKit(req: Request, res: Response): Promise<void>
    }

    class RoadmapService {
        +convertToReactFlowGraph(milestones: Milestone[]): ReactFlowGraph
        +calculateCompletionPercentage(userId: string, roadmapId: string): number
        +unlockNextNode(userId: string, nodeId: string): void
    }

    class ScaffoldingEngine {
        +generateZipArchive(blueprint: ProjectBlueprint): Promise<Buffer>
        +pushToGitHub(userId: string, repoName: string, blueprint: ProjectBlueprint): Promise<string>
    }

    ProjectController --> AIOrchestrator
    ProjectController --> RoadmapService
    ProjectController --> ScaffoldingEngine
    AIOrchestrator --> PromptBuilder
```

## 5.2 Core Data Interfaces (TypeScript Types)
```typescript
export type DifficultyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'STAFF_DISTRIBUTED';
export type CareerGoal = 'FRONTEND_DEV' | 'BACKEND_ENGINEER' | 'FULLSTACK_ARCHITECT' | 'AI_ML_ENGINEER' | 'DEVOPS_SRE' | 'WEB3_DEV';

export interface IdeaRequestParams {
  skills: string[];
  preferredStack: string[];
  difficulty: DifficultyLevel;
  careerGoal: CareerGoal;
  domainInterest?: string; // e.g. "Fintech", "Healthtech", "DevTools", "AI Agents"
  timeEstimateHours?: number;
}

export interface GeneratedIdea {
  id: string;
  title: string;
  tagline: string;
  difficulty: DifficultyLevel;
  matchScorePercentage: number;
  whyUnique: string;
  industryRelevance: string;
  recommendedTechStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    aiMl?: string[];
    devops: string[];
  };
  keyFeatures: string[];
  estimatedCompletionWeeks: number;
}

export interface ProjectBlueprint {
  id: string;
  ideaId: string;
  systemArchitecture: {
    overview: string;
    style: 'MONOLITH' | 'MICROSERVICES' | 'EVENT_DRIVEN' | 'SERVERLESS' | 'RAG_AGENTIC';
    diagramMermaid: string;
    components: Array<{
      name: string;
      role: string;
      tech: string;
      communication: string;
    }>;
  };
  folderStructure: string;
  databaseSchema: {
    type: 'POSTGRESQL' | 'MONGODB' | 'HYBRID';
    erdMermaid: string;
    models: Array<{
      tableName: string;
      fields: Array<{ name: string; type: string; constraints: string }>;
    }>;
  };
  apiSpecifications: Array<{
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    endpoint: string;
    description: string;
    requestBodySample?: object;
    responseBodySample: object;
  }>;
  edgeCasesAndSecurity: Array<{
    risk: string;
    mitigationStrategy: string;
  }>;
  resumeBullets: string[];
}

export interface RoadmapNode {
  id: string;
  phaseNumber: number;
  title: string;
  description: string;
  prerequisites: string[];
  deliverable: string;
  verificationCriteria: string[];
  codeSnippets: Array<{ title: string; language: string; code: string }>;
  isCompleted: boolean;
  status: 'LOCKED' | 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED';
}
```

---

# 6. UI / Wireframes & Futuristic Design System

## 6.1 Design System & Aesthetic Foundation
- **Theme:** "Obsidian Cyber-Glass" (Deep OLED blacks `#07090E`, Neon Cyan `#00F0FF`, Galactic Purple `#8A2BE2`, Emerald Glow `#00FF9D`, Laser Amber `#FFB800`).
- **Surface Elevation:** Translucent acrylic panels with `backdrop-filter: blur(16px)`, `1px border: rgba(255, 255, 255, 0.08)`, and dynamic radial gradient glows on hover.
- **Typography:**
  - Headings: `Outfit`, `Space Grotesk`, or `Syne` (Geometric, Futuristic, High-Tech).
  - Body & UI: `Inter` or `Plus Jakarta Sans` (Crisp readability).
  - Code & Monospace: `JetBrains Mono` or `Fira Code`.
- **Interactive Micro-Animations:**
  - Particle starfields & glowing ambient grid background.
  - Hover tilt with 3D perspective shifts on idea cards.
  - Live animated pulse indicators on active streaming nodes.
  - Confetti and neon laser blast on milestone completion.

## 6.2 Application Navigation & Screen Layout
```
+-----------------------------------------------------------------------------------------+
| [⚡ NEXTGEN-PROJECTOR]   [Explore Ideas]  [My Workspace]  [Community Showcase]  [Sign In / Profile] |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  🌟 AI-POWERED ARCHITECTURE & CAPSTONE COCKPIT                                         |
|  "Turn your tech stack into industry-shattering resume projects in seconds."             |
|                                                                                         |
|  +-----------------------------------------------------------------------------------+  |
|  | 🛠️ INPUT MATRIX CONFIGURATOR                                                      |  |
|  | Skills: [React (x)] [Node.js (x)] [TypeScript (x)] [Postgres (x)] [+ Add Skill]    |  |
|  | Target Stack: [Next.js, Tailwind, LangChain, Redis]                               |  |
|  | Level: [ ] Beginner   [ ] Intermediate   [*] Advanced   [ ] Staff Distributed     |  |
|  | Career Target: [*] Full-Stack AI Engineer    Domain: [*] AI Agents & DevTools     |  |
|  |                                                                                   |  |
|  |                             [ 🚀 GENERATE BLUEPRINT IDEAS ]                       |  |
|  +-----------------------------------------------------------------------------------+  |
|                                                                                         |
|  🔥 GENERATED TRENDING PROJECT IDEAS                                                    |
|  +---------------------------+ +---------------------------+ +------------------------+ |
|  | 💎 Autonomous PR Reviewer | | 🛡️ Distributed Zero-Trust | | ⚡ Real-Time Edge Video | |
|  | Multi-Agent CI/CD Bot     | | Auth Mesh & Audit Logger  | | Analytics Pipeline     | |
|  | Match Score: 98% ⭐       | | Match Score: 94% ⭐       | | Match Score: 91% ⭐    | |
|  | Stack: Next/TS/Gemini/Go  | | Stack: Rust/Redis/Postgres| | Stack: WebRTC/Wasm/Node| |
|  | [ View Deep Blueprint → ] | | [ View Deep Blueprint → ] | | [ View Deep Blueprint →]| |
|  +---------------------------+ +---------------------------+ +------------------------+ |
+-----------------------------------------------------------------------------------------+
```

## 6.3 Interactive Node Graph Visualizer (Roadmap Canvas)
```
+-----------------------------------------------------------------------------------------+
| 🗺️ INTERACTIVE PROJECT ROADMAP CANVAS: "Autonomous PR Reviewer AI Agent"                 |
| [ 🔄 Auto-Layout ] [ 💾 Save Roadmap ] [ 📥 Export Starter Code ] [ 📋 Copy Resume Bullets ]|
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|    [ (1) Architecture & Setup ] ---> [ (2) GitHub Webhook Ingestion ]                  |
|               ✅ COMPLETED                           ⏳ IN PROGRESS                     |
|                    |                                       |                            |
|                    v                                       v                            |
|    [ (3) AST & Vector Embeddings ] -> [ (4) Multi-Agent Critique Loop ]                 |
|               🔒 LOCKED                                🔒 LOCKED                        |
|                    |                                       |                            |
|                    +------------------->+<-----------------+                            |
|                                         |                                               |
|                                         v                                               |
|                       [ (5) Automated PR Commenting & Bot CI/CD ]                       |
|                                         🔒 LOCKED                                       |
|                                                                                         |
|  +-----------------------------------------------------------------------------------+  |
|  | 📌 ACTIVE NODE INSPECTOR: Phase 2 - GitHub Webhook Ingestion Engine                |  |
|  | Objective: Implement secure HMAC SHA256 payload verification and event dispatchers|  |
|  | Deliverable: POST /api/webhooks/github endpoint with retry buffer                 |  |
|  | [✓] Verify Webhook Secret    [ ] Rate Limit with Redis    [ ] Queue in BullMQ       |  |
|  | Code Boilerplate: (View TS snippet) | [ Mark Milestone Complete ]                 |  |
|  +-----------------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------------+
```

---

# 7. User Stories & Acceptance Criteria

### Epic 1: Multi-Parametric Idea Discovery
- **US-1.1: Skill & Stack Customization**
  - *As a* developer,
  - *I want to* enter my current languages, target tech stack, and experience level,
  - *So that* I get customized project ideas that directly leverage and push my current capabilities.
  - **Acceptance Criteria:**
    - User can add/remove tags for 50+ languages/frameworks.
    - System validates minimum 1 skill tag.
    - Generation responds within $< 3$ seconds with at least 3 distinct, non-generic concepts.
- **US-1.2: Career & Domain Alignment**
  - *As a* job seeker targeting high-frequency trading or AI engineering,
  - *I want to* filter ideas by industry domain (Fintech, Healthcare, AI Agents, DevTools),
  - *So that* my portfolio speaks directly to my target industry recruiters.

### Epic 2: Deep Technical Blueprint Engine
- **US-2.1: Architectural Breakdown**
  - *As an* engineer,
  - *I want to* see detailed system architecture, component diagrams, and folder layouts,
  - *So that* I know how to design the project from scratch without getting stuck on folder structure.
  - **Acceptance Criteria:**
    - Generates complete ASCII / Mermaid diagram for the system.
    - Provides realistic multi-file folder structure with explanations for each module.
- **US-2.2: Edge Cases & Security Guidance**
  - *As a* candidate preparing for technical interviews,
  - *I want* the blueprint to highlight real-world edge cases, failure modes, and mitigation strategies,
  - *So that* I can discuss these architectural trade-offs during interviews.

### Epic 3: Interactive Visual Roadmap
- **US-3.1: Visual Node Graph Progression**
  - *As a* visual learner,
  - *I want* the project broken into phased visual milestone nodes,
  - *So that* I can tackle complex architectures incrementally.
  - **Acceptance Criteria:**
    - Interactive canvas with pan, zoom, drag, and node clicks.
    - Nodes have clear prerequisites and status tags (Locked, Available, In-Progress, Completed).
    - Unlocking dependencies recalculates overall project completion percentage.

### Epic 4: Resume Impact & Scaffolding
- **US-4.1: ATS-Optimized Resume Bullet Points**
  - *As an* applicant,
  - *I want to* generate quantified, XYZ-formula resume bullet points for the project,
  - *So that* I can immediately paste high-impact descriptions into my CV.
- **US-4.2: Starter Kit Boilerplate Export**
  - *As a* builder,
  - *I want to* download a pre-configured `.zip` or create a GitHub repo with `README.md`, configs, and directory layout,
  - *So that* I can start coding in under 60 seconds.

---

# 8. Database Design

## 8.1 Entity Relationship Diagram (ERD)
```mermaid
erDiagram
    USER ||--o{ PROJECT_IDEA : generates
    USER ||--o{ SAVED_BLUEPRINT : saves
    USER ||--o{ USER_PROGRESS : tracks
    USER ||--o{ BLUEPRINT_LIKE : likes
    
    PROJECT_IDEA ||--|| PROJECT_BLUEPRINT : has_deep_spec
    PROJECT_BLUEPRINT ||--|{ ROADMAP_MILESTONE : contains
    PROJECT_BLUEPRINT ||--o{ SAVED_BLUEPRINT : bookmarked_in
    PROJECT_BLUEPRINT ||--o{ BLUEPRINT_LIKE : received_likes
    
    USER_PROGRESS }|--|| ROADMAP_MILESTONE : completes
    
    USER {
        uuid id PK
        string email UK
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
        string folder_structure
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

## 8.2 PostgreSQL SQL Schema Definitions
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
    role VARCHAR(32) DEFAULT 'USER', -- 'USER', 'ADMIN', 'PRO'
    tier VARCHAR(32) DEFAULT 'FREE', -- 'FREE', 'PRO', 'ENTERPRISE'
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

-- Deep Blueprints Table
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

-- User Roadmap Progress Tracking
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    milestone_id UUID NOT NULL REFERENCES roadmap_milestones(id) ON DELETE CASCADE,
    status VARCHAR(32) DEFAULT 'COMPLETED', -- 'IN_PROGRESS', 'COMPLETED'
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, milestone_id)
);

-- Indexes for lightning fast queries
CREATE INDEX idx_project_ideas_user ON project_ideas(user_id);
CREATE INDEX idx_project_ideas_difficulty ON project_ideas(difficulty);
CREATE INDEX idx_project_ideas_public ON project_ideas(is_public);
CREATE INDEX idx_roadmap_milestones_blueprint ON roadmap_milestones(blueprint_id);
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
```

---

# 9. API Design & Interface Specifications

### 9.1 Authentication & Profile
- `POST /api/v1/auth/register` — Register new user with email & password.
- `POST /api/v1/auth/login` — Login user & return JWT token + user profile.
- `GET /api/v1/auth/me` — Retrieve current authenticated user session.
- `POST /api/v1/auth/github` — OAuth callback handler for GitHub login.

### 9.2 AI Generation Engine
- `POST /api/v1/ai/generate-ideas`
  - **Description:** Generates 3 unique project ideas matching criteria.
  - **Request Body:**
    ```json
    {
      "skills": ["React", "TypeScript", "Node.js", "Docker"],
      "preferredStack": ["Next.js", "FastAPI", "PostgreSQL", "Redis"],
      "difficulty": "ADVANCED",
      "careerGoal": "FULLSTACK_ARCHITECT",
      "domainInterest": "DevTools & Observability"
    }
    ```
  - **Response (200 OK):**
    ```json
    {
      "success": true,
      "data": [
        {
          "id": "idea-912a-431f",
          "title": "HyperWatch: Distributed OpenTelemetry Edge Tracer",
          "tagline": "A high-throughput telemetry aggregator with real-time anomaly detection and flamegraph visualizer.",
          "difficulty": "ADVANCED",
          "matchScorePercentage": 96,
          "whyUnique": "Implements custom eBPF edge sampling and streaming WebSockets instead of passive logging.",
          "recommendedTechStack": {
            "frontend": ["Next.js 15", "TailwindCSS", "React Flow", "D3.js"],
            "backend": ["Node.js / Express", "Go / Rust Worker"],
            "database": ["ClickHouse / PostgreSQL", "Redis"],
            "devops": ["Docker", "Kubernetes", "Prometheus"]
          },
          "keyFeatures": [
            "Real-time distributed span visualization",
            "Streaming anomaly alerts via Discord/Slack webhooks",
            "WASM-powered client-side flamegraph generation"
          ],
          "estimatedCompletionWeeks": 4
        }
      ]
    }
    ```

- `GET /api/v1/ai/stream-blueprint/:ideaId` (SSE Endpoint)
  - **Headers:** `Accept: text/event-stream`
  - **Description:** Streams modular blueprint segments in real-time.
  - **Event Stream Flow:**
    1. `event: architecture` — Emits system diagram & component map.
    2. `event: schemas` — Emits database models & ERD.
    3. `event: apis` — Emits REST & WebSocket endpoint specs.
    4. `event: roadmap` — Emits array of milestone nodes.
    5. `event: resume` — Emits ATS bullet points.
    6. `event: done` — Generation complete.

### 9.3 Blueprints & Workspace Operations
- `GET /api/v1/blueprints/:id` — Retrieve full blueprint and milestone state.
- `POST /api/v1/blueprints/:id/save` — Bookmark blueprint to user's saved workspace.
- `POST /api/v1/blueprints/:id/milestones/:milestoneId/toggle` — Mark milestone step as completed / pending.
- `POST /api/v1/blueprints/:id/export/zip` — Generate and stream downloadable project boilerplate `.zip`.
- `POST /api/v1/blueprints/:id/export/github` — Create private/public repo on user's GitHub account with complete scaffolded boilerplate.

### 9.4 Community Showcase & Social
- `GET /api/v1/community/explore?sort=trending&page=1&limit=12` — Browse community blueprints.
- `POST /api/v1/community/blueprints/:id/like` — Toggle like/upvote.
- `POST /api/v1/community/blueprints/:id/fork` — Clone blueprint into user's private workspace.

---

# 10. Master Phased Implementation TODO

## Phase 1: Core Foundation & Modern Design System (Days 1–2)
- [ ] Initialize clean monorepo or standard client-server workspace with TypeScript.
- [ ] Setup Next.js frontend with TailwindCSS, Lucide Icons, and Framer Motion.
- [ ] Establish Cyberpunk "Obsidian Cyber-Glass" theme tokens, glowing card components, custom scrollbars, and animated background particles.
- [ ] Build Express/Fastify TypeScript backend server with robust CORS, helmet, and rate limiting.
- [ ] Integrate PostgreSQL database with Prisma schema, connection pooling, and migration scripts.
- [ ] Implement JWT / OAuth authentication with user registration, login, and secure sessions.

## Phase 2: AI Engine & Ideation Pipeline (Days 3–4)
- [ ] Setup Google Gemini API SDK / LangChain orchestrator with structured JSON output prompts.
- [ ] Create robust Prompt Builders with few-shot examples, domain injections, and edge-case mandates.
- [ ] Implement Idea Generation REST endpoint with input validation (Zod) and Redis prompt caching.
- [ ] Build interactive Input Matrix UI with instant tag additions, difficulty sliders, and role selectors.
- [ ] Build Idea Showcase Grid with dynamic match scores, hover glows, and tech stack badges.

## Phase 3: Deep Blueprint & Visual Roadmap Engine (Days 5–6)
- [ ] Build SSE (Server-Sent Events) streaming endpoint for real-time progressive blueprint generation.
- [ ] Integrate React Flow (@xyflow/react) for interactive node-based visual roadmap canvas.
- [ ] Create custom Node UI components (Status badges, milestone checklist drawers, code snippet viewer).
- [ ] Build Architecture Diagram renderer (Mermaid.js / SVG graph views).
- [ ] Build Database Schema ERD visualizer and interactive REST API documentation inspector.

## Phase 4: Resume Impact Simulator & Scaffold Generator (Days 7–8)
- [ ] Build ATS Resume Bullet Point generator with one-click copy and impact metric modifiers.
- [ ] Implement Automated Project Scaffolder (generate `package.json`, `README.md`, folder structure, `.env.example`, and Dockerfile).
- [ ] Create `.zip` download stream and GitHub Octokit API integration for one-click repository creation.
- [ ] Implement Milestone Progress Tracker with local storage backup and database sync.

## Phase 5: Community Showcase, Analytics & Polishing (Days 9–10)
- [ ] Build Community Discovery feed with search, filters (stack, difficulty, role), and bookmarking.
- [ ] Add like, view count, and fork counts with optimistic UI updates.
- [ ] Conduct end-to-end performance audits (Lighthouse $> 95$, TTFB $< 100\text{ ms}$).
- [ ] Add comprehensive automated test suites (Vitest for frontend components, Jest/Supertest for API endpoints).
- [ ] Finalize production deployment setup (Vercel + Render/Railway + PostgreSQL DB).

---
*Document Version: 1.0.0 | Status: APPROVED & READY FOR IMPLEMENTATION*
