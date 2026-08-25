import asyncio
import json
import logging
import uuid
from typing import AsyncGenerator, Dict, List, Optional
import google.generativeai as genai
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.core.config import settings
from backend.app.core.redis_client import cache_manager
from backend.app.models.blueprint import ProjectBlueprint
from backend.app.models.idea import ProjectIdea
from backend.app.models.milestone import RoadmapMilestone
from backend.app.schemas.idea import GeneratedIdeaSchema, IdeaRequestSchema, TechStackSchema

logger = logging.getLogger("uvicorn")


class AIService:
    """Orchestrates Google Gemini AI generation, JSON parsing, prompt engineering, and SSE streaming."""

    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        if self.api_key:
            try:
                genai.configure(api_key=self.api_key)
                self.model = genai.GenerativeModel(settings.AI_PRIMARY_MODEL)
                self.fast_model = genai.GenerativeModel(settings.AI_FAST_MODEL)
                self.is_gemini_active = True
            except Exception as e:
                logger.warning(f"Gemini initialization error: {e}. Using generative fallback engine.")
                self.is_gemini_active = False
        else:
            self.is_gemini_active = False

    async def generate_ideas(
        self,
        params: IdeaRequestSchema,
        db: AsyncSession,
        user_id: Optional[str] = None,
    ) -> List[GeneratedIdeaSchema]:
        cache_key = f"ideas:{','.join(sorted(params.skills))}:{params.difficulty}:{params.career_goal}:{params.domain_interest}"
        cached = await cache_manager.get(cache_key)
        if cached:
            return [GeneratedIdeaSchema(**item) for item in cached]

        ideas: List[GeneratedIdeaSchema] = []

        if self.is_gemini_active:
            try:
                prompt = self._build_ideas_prompt(params)
                response = await asyncio.to_thread(
                    self.fast_model.generate_content,
                    prompt,
                    generation_config={"response_mime_type": "application/json"},
                )
                data = json.loads(response.text)
                raw_ideas = data if isinstance(data, list) else data.get("ideas", [])
                for item in raw_ideas:
                    idea_obj = GeneratedIdeaSchema(
                        id=str(uuid.uuid4()),
                        title=item.get("title", "Advanced Capstone Project"),
                        tagline=item.get("tagline", "Production-grade distributed system"),
                        difficulty=params.difficulty,
                        career_goal=params.career_goal.value,
                        domain_interest=params.domain_interest,
                        match_score_percentage=item.get("match_score_percentage", 96),
                        why_unique=item.get("why_unique", "Implements event-driven architecture and streaming telemetry"),
                        industry_relevance=item.get("industry_relevance", "High recruiter value for senior roles"),
                        recommended_tech_stack=TechStackSchema(**item.get("recommended_tech_stack", {
                            "frontend": params.preferred_stack or ["React", "TypeScript", "TailwindCSS"],
                            "backend": ["Python", "FastAPI", "AsyncIO"],
                            "database": ["PostgreSQL", "Redis"],
                            "ai_ml": ["Google Gemini 1.5 Pro"],
                            "devops": ["Docker", "Prometheus"]
                        })),
                        key_features=item.get("key_features", ["Distributed worker queue", "Real-time SSE visualizer"]),
                        estimated_completion_weeks=params.time_commitment_weeks or 4,
                    )
                    ideas.append(idea_obj)
            except Exception as e:
                logger.error(f"Gemini API error during idea generation: {e}. Falling back to generative generator.")
                ideas = self._get_fallback_ideas(params)
        else:
            ideas = self._get_fallback_ideas(params)

        # Persist generated ideas to database
        for idea_schema in ideas:
            db_idea = ProjectIdea(
                id=idea_schema.id,
                user_id=user_id,
                title=idea_schema.title,
                tagline=idea_schema.tagline,
                difficulty=idea_schema.difficulty.value,
                career_goal=idea_schema.career_goal,
                domain_interest=idea_schema.domain_interest,
                match_score_percentage=idea_schema.match_score_percentage,
                why_unique=idea_schema.why_unique,
                industry_relevance=idea_schema.industry_relevance,
                tech_stack=idea_schema.recommended_tech_stack.model_dump(),
                key_features=idea_schema.key_features,
                estimated_completion_weeks=idea_schema.estimated_completion_weeks,
                is_public=True,
            )
            db.add(db_idea)
        
        await db.commit()
        await cache_manager.set(cache_key, [i.model_dump() for i in ideas], ttl_seconds=3600)
        return ideas

    async def stream_blueprint(
        self,
        idea: ProjectIdea,
        db: AsyncSession,
    ) -> AsyncGenerator[str, None]:
        """Streams decomposed blueprint sections via Server-Sent Events (SSE) and persists to DB."""

        # 1. Architecture Section
        arch_data = {
            "overview": f"A scalable, asynchronous system designed for {idea.title}. Leverages FastAPI ASGI event loop, PostgreSQL relational persistence, and Redis pub/sub buffers.",
            "style": "EVENT_DRIVEN_MICROSERVICES",
            "diagram_mermaid": """graph TD
    Client[React 19 Frontend SPA] -->|REST & SSE Stream| Gateway[FastAPI Async Gateway]
    Gateway -->|Async Ingestion| RedisQueue[(Redis Stream & Worker Buffer)]
    RedisQueue -->|Event Dispatch| Worker[Async Background Engine]
    Worker -->|Inference & Agent Loop| GeminiAI[Google Gemini 1.5 Pro]
    Worker -->|Relational Persistence| Postgres[(PostgreSQL 16 DB)]
    Gateway -->|Query State| Postgres
""",
            "components": [
                {"name": "API Gateway", "role": "Authentication, rate limiting, and SSE token streaming", "tech": "FastAPI + Uvicorn", "communication": "HTTP/2 + SSE"},
                {"name": "Worker Node", "role": "Asynchronous job processing and batch evaluation", "tech": "Python AsyncIO + Redis", "communication": "Redis Streams"},
                {"name": "Persistence Layer", "role": "Structured data storage and relational integrity", "tech": "PostgreSQL 16", "communication": "asyncpg pool"},
            ],
        }
        yield f"event: architecture\ndata: {json.dumps(arch_data)}\n\n"
        await asyncio.sleep(0.3)

        # 2. Database Schemas Section
        schema_data = {
            "type": "POSTGRESQL_RELATIONAL",
            "erd_mermaid": """erDiagram
    USERS ||--o{ SESSIONS : has
    USERS ||--o{ TRACES : owns
    TRACES ||--|{ LOGS : contains
""",
            "models": [
                {
                    "table_name": "users",
                    "fields": [
                        {"name": "id", "type": "UUID", "constraints": "PRIMARY KEY"},
                        {"name": "email", "type": "VARCHAR(255)", "constraints": "UNIQUE NOT NULL"},
                        {"name": "created_at", "type": "TIMESTAMP", "constraints": "DEFAULT CURRENT_TIMESTAMP"},
                    ],
                },
                {
                    "table_name": "events_pipeline",
                    "fields": [
                        {"name": "id", "type": "UUID", "constraints": "PRIMARY KEY"},
                        {"name": "payload", "type": "JSONB", "constraints": "NOT NULL"},
                        {"name": "status", "type": "VARCHAR(32)", "constraints": "INDEXED"},
                    ],
                },
            ],
        }
        yield f"event: schemas\ndata: {json.dumps(schema_data)}\n\n"
        await asyncio.sleep(0.3)

        # 3. API Specifications Section
        apis_data = [
            {
                "method": "POST",
                "endpoint": "/api/v1/events/ingest",
                "description": "Asynchronously ingests telemetry events into Redis buffer with HMAC SHA256 verification.",
                "request_body_sample": {"event_type": "SPAN_TRACE", "latency_ms": 42.5},
                "response_body_sample": {"success": True, "event_id": "evt-7281", "status": "QUEUED"},
            },
            {
                "method": "GET",
                "endpoint": "/api/v1/telemetry/stream",
                "description": "Server-Sent Events streaming live aggregate metrics to React visualizer.",
                "request_body_sample": None,
                "response_body_sample": {"timestamp": "2026-08-25T23:00:00Z", "p99_latency": 14.2, "qps": 4200},
            },
        ]
        yield f"event: apis\ndata: {json.dumps(apis_data)}\n\n"
        await asyncio.sleep(0.3)

        # 4. Roadmap Milestones Section
        milestones_data = [
            {
                "phase_number": 1,
                "title": "Foundation & Async Telemetry Ingestion Gateway",
                "description": "Setup FastAPI project structure, async SQLAlchemy models, and high-throughput ingestion endpoint.",
                "deliverable": "Working POST /api/v1/events/ingest endpoint handling 5,000 requests/sec with Redis queue.",
                "prerequisites": ["Python 3.11+", "PostgreSQL", "Redis"],
                "verification_criteria": [
                    "Locust load test achieves > 5,000 RPS without dropped packets",
                    "HMAC signature validation rejects unauthorized payloads",
                ],
                "code_snippets": [
                    {
                        "title": "FastAPI Async Webhook Ingest Endpoint",
                        "language": "python",
                        "code": """from fastapi import FastAPI, BackgroundTasks, HTTPException
import hmac, hashlib

app = FastAPI()

@app.post("/api/v1/events/ingest")
async def ingest_event(payload: dict, background_tasks: BackgroundTasks):
    # Process event asynchronously in Redis buffer
    background_tasks.add_task(process_telemetry_batch, payload)
    return {"status": "QUEUED", "event_id": payload.get("id")}
""",
                    }
                ],
            },
            {
                "phase_number": 2,
                "title": "Distributed Worker Engine & Gemini AI Analyzer",
                "description": "Implement Redis Stream consumer with Gemini 1.5 Pro structured anomaly detection and root-cause analysis.",
                "deliverable": "Async background worker processing batch events and flagging high-anomaly traces.",
                "prerequisites": ["Phase 1 (Ingestion Gateway)"],
                "verification_criteria": [
                    "Gemini prompt extracts root-cause analysis in structured JSON",
                    "Redis queue latency stays under 100ms during peak load",
                ],
                "code_snippets": [
                    {
                        "title": "Gemini Structured Analysis Worker",
                        "language": "python",
                        "code": """import google.generativeai as genai

model = genai.GenerativeModel("gemini-1.5-flash")

async def analyze_anomalies(trace_batch: list):
    prompt = f"Analyze these telemetry traces for systemic bottlenecks: {trace_batch}"
    response = model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
    return response.text
""",
                    }
                ],
            },
            {
                "phase_number": 3,
                "title": "Interactive React 19 Flow Visualizer & Live Dashboard",
                "description": "Build Obsidian Cyber-Glass dashboard with React Flow canvas rendering real-time execution DAGs.",
                "deliverable": "Interactive visual cockpit with streaming token updates and node graph animations.",
                "prerequisites": ["Phase 2 (Worker Engine)"],
                "verification_criteria": [
                    "React Flow canvas renders 100+ nodes at smooth 60 FPS",
                    "Live SSE stream updates DAG node statuses without full re-render",
                ],
                "code_snippets": [
                    {
                        "title": "React Flow Node DAG Visualizer",
                        "language": "typescript",
                        "code": """import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export function TraceDAGVisualizer({ nodes, edges }) {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background color="#00F0FF" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
""",
                    }
                ],
            },
        ]
        yield f"event: roadmap\ndata: {json.dumps(milestones_data)}\n\n"
        await asyncio.sleep(0.3)

        # 5. Resume Impact Section
        resume_bullets = [
            f"Architected high-throughput asynchronous telemetry platform with FastAPI and Redis Streams, achieving <15ms p99 latency under 5,000 QPS load.",
            f"Engineered real-time DAG execution visualizer using React 19 and React Flow, reducing developer incident diagnosis time by 45%.",
            f"Integrated Google Gemini 1.5 Pro structured AI agent loop with automated prompt retry fallbacks and zero schema violations across 100k+ traces.",
        ]
        yield f"event: resume\ndata: {json.dumps(resume_bullets)}\n\n"
        await asyncio.sleep(0.3)

        # 6. Persist complete blueprint to database
        folder_structure = """├── backend/
│   ├── app/
│   │   ├── api/v1/ (endpoints, routers)
│   │   ├── core/ (config, security, database)
│   │   ├── models/ (SQLAlchemy models)
│   │   ├── schemas/ (Pydantic schemas)
│   │   └── services/ (ai_service, worker)
│   ├── requirements.txt
│   ├── Dockerfile
│   └── main.py
├── frontend/
│   ├── src/
│   │   ├── components/ (canvas, cockpit)
│   │   ├── features/ (telemetry, nodes)
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
└── docker-compose.yml"""

        edge_cases = [
            {"risk": "Redis Stream consumer lag during sudden traffic spikes", "mitigation_strategy": "Auto-scale worker consumer groups and apply backpressure throttling."},
            {"risk": "LLM token rate limit exhaustion", "mitigation_strategy": "Implement Redis token bucket rate limiter with exponential backoff and Flash model failover."},
        ]

        # Save or update blueprint in DB
        blueprint = ProjectBlueprint(
            id=str(uuid.uuid4()),
            idea_id=idea.id,
            system_architecture=arch_data,
            folder_structure=folder_structure,
            database_schema=schema_data,
            api_specifications=apis_data,
            edge_cases=edge_cases,
            resume_bullets=resume_bullets,
        )
        db.add(blueprint)
        await db.flush()

        for m in milestones_data:
            milestone_row = RoadmapMilestone(
                id=str(uuid.uuid4()),
                blueprint_id=blueprint.id,
                phase_number=m["phase_number"],
                title=m["title"],
                description=m["description"],
                deliverable=m["deliverable"],
                prerequisites=m["prerequisites"],
                verification_criteria=m["verification_criteria"],
                code_snippets=m["code_snippets"],
            )
            db.add(milestone_row)

        await db.commit()

        # 7. Done Event
        yield f"event: done\ndata: {json.dumps({'status': 'COMPLETED', 'blueprint_id': blueprint.id})}\n\n"

    def _build_ideas_prompt(self, params: IdeaRequestSchema) -> str:
        return f"""You are an elite Staff Software Architect and Principal Engineer at a tier-1 tech company.
Generate 3 unique, ultra-impressive, non-generic, resume-defining project ideas.

CANDIDATE PROFILE:
- Current Skills: {', '.join(params.skills)}
- Target Preferred Tech Stack: {', '.join(params.preferred_stack) if params.preferred_stack else 'Modern Full-Stack'}
- Difficulty Target: {params.difficulty.value} (Ensure architecture reflects this difficulty accurately)
- Career Goal: {params.career_goal.value}
- Industry Domain: {params.domain_interest}
- Target Timeline: {params.time_commitment_weeks} weeks

REQUIREMENTS FOR IDEAS:
1. STRICT ANTI-GENERIC RULE: NO simple CRUD apps, basic todo lists, generic eCommerce shops, or basic weather widgets.
2. Every idea MUST include enterprise engineering challenges (e.g. real-time WebSockets/SSE, distributed caching, asynchronous workers, vector embeddings, AST parsing, or telemetry).
3. Include clear quantifiable resume value and unique architecture design.

Return ONLY a valid JSON array of 3 objects with this exact structure:
[
  {{
    "title": "Project Name",
    "tagline": "A one-sentence compelling technical summary.",
    "match_score_percentage": 98,
    "why_unique": "Specific architectural reasons why this impresses recruiters.",
    "industry_relevance": "Why this domain is in high demand right now.",
    "recommended_tech_stack": {{
      "frontend": ["React 19", "TypeScript", "TailwindCSS"],
      "backend": ["Python", "FastAPI", "AsyncIO"],
      "database": ["PostgreSQL", "Redis"],
      "ai_ml": ["Google Gemini 1.5 Pro"],
      "devops": ["Docker", "Prometheus"]
    }},
    "key_features": [
      "Feature 1 with technical depth",
      "Feature 2 with technical depth",
      "Feature 3 with technical depth"
    ]
  }}
]"""

    def _get_fallback_ideas(self, params: IdeaRequestSchema) -> List[GeneratedIdeaSchema]:
        """Generates domain-aware fallback ideas when offline or during test runs."""
        domain = params.domain_interest or "AI DevTools & Distributed Systems"
        return [
            GeneratedIdeaSchema(
                id=str(uuid.uuid4()),
                title="AgentTrace: Distributed Multi-Agent LLM Observability Cockpit",
                tagline="An asynchronous telemetry pipeline tracking LLM agent decision DAGs, token economics, and hallucination scores in real time.",
                difficulty=params.difficulty,
                career_goal=params.career_goal.value,
                domain_interest=domain,
                match_score_percentage=98,
                why_unique="Implements custom OpenTelemetry trace spans for multi-agent DAGs with streaming WebSockets and WASM flamegraphs instead of passive logging.",
                industry_relevance="Agentic AI observability and cost control are the #1 hiring priority for enterprise AI infrastructure teams.",
                recommended_tech_stack=TechStackSchema(
                    frontend=["React 19", "TypeScript", "React Flow", "TailwindCSS"],
                    backend=["Python", "FastAPI", "AsyncIO", "Redis Streams"],
                    database=["PostgreSQL", "Redis"],
                    ai_ml=["Google Gemini 1.5 Pro", "LangGraph"],
                    devops=["Docker", "Prometheus"],
                ),
                key_features=[
                    "Live DAG visualization of multi-step agent tool calls with token breakdown",
                    "Streaming hallucination detection scoring engine with automated circuit breakers",
                    "Zero-overhead eBPF-style async telemetry ingestion buffering 10,000+ spans/sec",
                ],
                estimated_completion_weeks=4,
            ),
            GeneratedIdeaSchema(
                id=str(uuid.uuid4()),
                title="ZeroMesh: Real-Time Event-Driven Policy & Audit Mesh",
                tagline="A high-throughput distributed zero-trust access gateway featuring HMAC payload verification, Redis idempotency buffers, and streaming audit logs.",
                difficulty=params.difficulty,
                career_goal=params.career_goal.value,
                domain_interest=domain,
                match_score_percentage=95,
                why_unique="Engineered with sub-millisecond asynchronous policy evaluation rules and cryptographic audit tamper-detection.",
                industry_relevance="High-frequency financial tech and cloud security compliance require rock-solid distributed audit logs.",
                recommended_tech_stack=TechStackSchema(
                    frontend=["React 19", "TypeScript", "TailwindCSS"],
                    backend=["Python", "FastAPI", "AsyncIO"],
                    database=["PostgreSQL", "Redis"],
                    devops=["Docker", "GitHub Actions"],
                ),
                key_features=[
                    "Cryptographically signed immutable audit event ledger",
                    "Sub-10ms policy enforcement engine with distributed Redis caching",
                    "Interactive security dashboard with anomaly alerts and live event playback",
                ],
                estimated_completion_weeks=4,
            ),
            GeneratedIdeaSchema(
                id=str(uuid.uuid4()),
                title="HyperVector: Async Streaming Hybrid Vector RAG Pipeline",
                tagline="A multi-modal RAG retrieval engine combining dense vector embeddings with sparse BM25 indexing and async reranking.",
                difficulty=params.difficulty,
                career_goal=params.career_goal.value,
                domain_interest=domain,
                match_score_percentage=93,
                why_unique="Features dynamic token streaming with cross-encoder reranking achieving top-1 accuracy without latency penalties.",
                industry_relevance="Hybrid search and high-speed RAG architectures are essential for all modern AI applications.",
                recommended_tech_stack=TechStackSchema(
                    frontend=["React 19", "TypeScript", "TailwindCSS"],
                    backend=["Python", "FastAPI", "AsyncIO"],
                    database=["PostgreSQL (pgvector)", "Redis"],
                    ai_ml=["Google Gemini 1.5 Pro", "SentenceTransformers"],
                    devops=["Docker"],
                ),
                key_features=[
                    "Hybrid dense + sparse semantic search with reciprocal rank fusion",
                    "Server-Sent Events streaming token generation directly to the client",
                    "Automated document chunking and background embedding worker queue",
                ],
                estimated_completion_weeks=3,
            ),
        ]


ai_service = AIService()
