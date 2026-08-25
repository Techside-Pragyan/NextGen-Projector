# 🔄 Data Flow Diagrams (DFD)

**Project Name:** NextGen-Projector  
**System Scope:** Data movement across React Client, FastAPI ASGI Backend, PostgreSQL Database, Redis Cache, and Google Gemini AI Engine.

---

## 1. DFD Level 0 (Context Diagram)

The Level 0 diagram shows the overall system boundary, external actors (Users, Google Gemini AI, PostgreSQL, Redis, GitHub), and high-level data exchanges.

```mermaid
graph TD
    User([User / Developer]) <-->|1. Input Skills, Career Target, Tech Stack\n2. View Generated Ideas, Interactive Roadmaps, Blueprints| System[NextGen-Projector System\n(React 19 + Python FastAPI)]
    
    System <-->|Structured Prompts & Context / Streamed Token Deltas| GeminiAI[Google Gemini 1.5 Pro AI Engine]
    System <-->|Async SQL Queries & Relational State Persistence| Postgres[(PostgreSQL 16 Database)]
    System <-->|Prompt Cache Lookups & Rate Limit Counters| RedisCache[(Redis Cache & Session Store)]
    System <-->|OAuth Identity Tokens & Repo Scaffolding| GitHub[GitHub API]
```

---

## 2. DFD Level 1 (Major Subsystems Data Flow)

The Level 1 diagram breaks the platform into primary functional processes:
1. Input Validation & Enrichment
2. Cache Verification & Prompt Builder
3. Gemini AI Generation Pipeline
4. Schema Validation & Asynchronous Database Persistence
5. Interactive UI Stream Delivery

```mermaid
graph TD
    User([User]) -->|Submits Matrix Form| P1[1. Input Validation & Filter Parsing]
    
    P1 -->|Validated Params| P2{2. Redis Cache Lookup}
    P2 -->|Cache Hit| ReturnCache[Return Cached Ideas] --> User
    
    P2 -->|Cache Miss| P3[3. Prompt Construction & Context Injection]
    P3 -->|Engineered System Prompt + JSON Schema| P4[4. Google Gemini AI Async Client]
    
    P4 -->|Raw LLM Response Tokens| P5[5. Pydantic v2 Schema Validator & Sanitizer]
    
    P5 -->|Valid Idea Schemas| P6[6. Async DB Writer (SQLAlchemy 2.0)]
    P6 --> Postgres[(PostgreSQL Database)]
    P6 --> Redis[(Redis Prompt Cache)]
    
    P5 -->|JSON Response Payload| P7[7. React UI Renderer & Node Graph Builder]
    P7 --> User
```

---

## 3. DFD Level 2 (AI Blueprint Decomposition & Roadmap Flow)

The Level 2 diagram details how a chosen project idea is decomposed into a deep engineering blueprint and streamed as an interactive roadmap.

```mermaid
graph TD
    ReactClient([React Client]) -->|GET /api/v1/ai/stream-blueprint/{idea_id}| SSEHandler[FastAPI SSE Streaming Controller]
    
    SSEHandler --> LoadIdea[Fetch Idea Context & Preferences from PostgreSQL]
    LoadIdea --> BuildDeepPrompt[Construct Multi-Stage Architecture Prompt]
    BuildDeepPrompt --> StreamLLM[Gemini 1.5 Pro Async Token Streamer]
    
    StreamLLM --> ChunkParser[Chunk Parser & Delimiter Extractor]
    
    ChunkParser -->|event: architecture| SSE1[Stream System Architecture & Diagram]
    ChunkParser -->|event: schemas| SSE2[Stream Database ERD & Models]
    ChunkParser -->|event: apis| SSE3[Stream REST & WebSocket Specs]
    ChunkParser -->|event: roadmap| SSE4[Stream Interactive Milestone Nodes]
    ChunkParser -->|event: resume| SSE5[Stream ATS Resume Bullets]
    ChunkParser -->|event: done| SSE6[Stream Completion Event]
    
    SSE1 & SSE2 & SSE3 & SSE4 & SSE5 & SSE6 --> EventStream[text/event-stream] --> ReactClient
    
    SSE6 --> AsyncPersist[Async Background Task: Persist Blueprint & Milestones]
    AsyncPersist --> Postgres[(PostgreSQL Database)]
    
    ReactClient --> NodeGraph[Render React Flow Interactive Canvas]
    ReactClient --> BlueprintStudio[Render Blueprint Inspector Panels]
```
