# 📋 Product Requirements Document (PRD)

**Project Name:** NextGen-Projector  
**Tagline:** AI-Powered Engineering Architecture Cockpit & Career Capstone Engine  
**Version:** 1.0.0  
**Stack Target:** React (Vite + TypeScript) + Python (FastAPI + AsyncIO) + PostgreSQL + Google Gemini AI  

---

## 1. Executive Summary & Problem Statement

### 1.1 The Problem
Aspiring software engineers, computer science students, and career transitioners frequently struggle to build portfolio projects that differentiate them to tech recruiters and engineering managers.
- Most developers fall back on generic tutorial clones (e.g., standard Todo apps, basic eCommerce sites, weather widgets) that lack complex business logic, architectural trade-offs, scalability considerations, or production-grade reliability.
- When attempting to build larger systems, developers often get stuck on architectural design (folder layout, database schemas, asynchronous queues, API design) and fail to complete their projects.
- Developers struggle to articulate their projects effectively on their resumes, missing out on quantifiable, ATS-friendly action statements.

### 1.2 The Solution
**NextGen-Projector** solves this problem by functioning as an intelligent AI engineering cockpit. By analyzing a developer's current skills, target tech stack, difficulty aspirations, and career goals, it:
1. Generates unique, non-generic, trending project ideas with verified market relevance.
2. Deconstructs each idea into a production-grade blueprint (system architecture, folder structure, database schema, API specifications, and edge-case mitigations).
3. Provides an interactive visual node-based roadmap canvas to guide step-by-step implementation.
4. Generates ATS-optimized Google XYZ-formula resume bullet points and one-click starter code scaffolds.

---

## 2. Target Personas

| Persona | Background | Core Pain Point | How NextGen-Projector Solves It |
| :--- | :--- | :--- | :--- |
| **The CS Student / Entry-Level Dev** | Knows fundamental syntax (Python, JavaScript, SQL); lacks production system experience. | Builds generic tutorial clones that get rejected by automated ATS screeners. | Provides resume-defining capstones with distributed caching, async workers, and vector search. |
| **The Career Transitioner** | Mid-level developer switching from legacy stacks to modern AI / Full-Stack engineering. | Needs to demonstrate competence in modern technologies (FastAPI, React 19, LangGraph, PostgreSQL). | Curates tailored projects with clear architectural trade-offs and domain alignment. |
| **The Hackathon Builder / Indie Hacker** | Rapid prototype creator looking for fresh ideas. | Spends too much time on boilerplate ideation and initial architecture setup. | Instant deep blueprints, interactive roadmap milestones, and starter code generator. |

---

## 3. Core Value Propositions

- **Zero-Generic Guarantee:** Every generated project idea includes real-world enterprise nuances (edge cases, concurrency management, caching strategies, schema definitions, and observability).
- **Interactive Visual Roadmap Canvas:** Node-based progression tree with milestone dependencies, verification tests, and inline code snippets.
- **Resume Impact Engine:** Directly translates completed milestones into quantifiable, ATS-friendly action statements.
- **Obsidian Cyber-Glass UI:** Futuristic dark-mode cockpit designed for software engineers with micro-interactions, canvas node visualizers, and streaming AI responses.

---

## 4. Functional Requirements (FR)

### FR-1: Multi-Parametric Ideation Engine
- **Input Matrix:** Users configure technical skills, preferred tech stack, experience level (`BEGINNER`, `INTERMEDIATE`, `ADVANCED`, `STAFF_DISTRIBUTED`), target career role, and industry domain.
- **Live Match Scoring:** Calculates a match percentage score based on input parameters.
- **Diversity of Ideas:** Generates 3 distinct concepts per query with zero duplicate overlap.

### FR-2: Deep Architectural Blueprint Decomposition
- **System Architecture:** Detailed explanation of architecture style (`MONOLITH`, `MICROSERVICES`, `EVENT_DRIVEN_FASTAPI`, `RAG_AGENTIC`) with Mermaid diagrams.
- **Folder Structure:** Multi-tier directory layout with explanations for each module.
- **Database Schema:** Full ERD diagram and table definitions with types, relationships, and indexes.
- **API Specifications:** Complete REST and WebSocket endpoint specifications with request/response JSON payloads.
- **Edge-Case & Security Analysis:** Highlights failure modes, concurrency issues, and mitigation strategies.

### FR-3: Interactive Visual Roadmap Canvas
- **Node-Based Graph:** Visual representation of project phases powered by React Flow.
- **Milestone Details:** Prerequisites, deliverables, step-by-step instructions, and syntax-highlighted code snippets.
- **State Progression:** Nodes unlock dynamically as prerequisite milestones are satisfied.

### FR-4: Resume Impact Simulator
- **ATS Bullet Points:** Generates XYZ-formula bullet points (e.g., *"Architected asynchronous FastAPI event ingestion pipeline handling 10k+ events/sec with Redis caching, reducing p99 latency by 65%"*).
- **One-Click Export:** Copy formatted bullet points or download Markdown/PDF summaries.

### FR-5: Starter Kit Scaffolder
- **Automated Boilerplate Generator:** Creates a downloadable `.zip` archive or GitHub repository containing project directory layout, `requirements.txt`, `package.json`, Dockerfile, `.env.example`, and `README.md`.

### FR-6: Community Discovery & Showcase
- **Public Feed:** Explore trending community blueprints filtered by stack, difficulty, and role.
- **Social Features:** Like, bookmark, and fork blueprints into personal workspaces.

---

## 5. Non-Functional Requirements (NFR)

| Metric | Requirement | Justification |
| :--- | :--- | :--- |
| **Response Latency** | Time-To-First-Token (TTFT) $< 800\text{ ms}$ for AI streaming. Full idea generation $< 3\text{ s}$. | Ensures fluid, real-time user experience. |
| **System Throughput** | Support 1,000+ concurrent active roadmap streaming sessions on standard container tiers. | FastAPI async event loop efficiency. |
| **Availability** | 99.9% uptime with automated AI provider failover. | High reliability for active builders. |
| **Security & Privacy** | OAuth2 + JWT authentication, bcrypt password hashing, SSL/TLS, strict prompt sanitization. | Protects user accounts and prevents prompt injection attacks. |
| **UI Performance** | 60 FPS smooth canvas panning and zooming on React Flow canvas. | Fluid and responsive developer experience. |
