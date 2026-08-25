# 🎨 UI / Wireframes & Futuristic Obsidian Design System

**Project Name:** NextGen-Projector  
**Design Theme:** Obsidian Cyber-Glass  
**Core Aesthetic:** Deep OLED Blacks, Translucent Glassmorphic Panels, Neon Cyan / Galactic Purple Glow Accents, Micro-Interactions.

---

## 1. Design System Tokens & Color Palette

| Token Name | Hex / Value | Description & Purpose |
| :--- | :--- | :--- |
| **`--bg-canvas`** | `#05070B` | Deep OLED obsidian canvas background |
| **`--bg-surface`** | `rgba(13, 18, 28, 0.75)` | Translucent frosted glass panel with `backdrop-filter: blur(16px)` |
| **`--border-glass`** | `rgba(255, 255, 255, 0.08)` | Subtle 1px translucent glass border |
| **`--accent-cyan`** | `#00F0FF` | High-energy neon cyan for primary buttons, active nodes, and key highlights |
| **`--accent-purple`** | `#8A2BE2` | Galactic violet for secondary accents, AI badges, and gradients |
| **`--accent-emerald`** | `#00FF9D` | Matrix neon green for completed milestones and high match scores |
| **`--accent-amber`** | `#FFB800` | Warning, in-progress indicators, and difficulty tags |
| **`--text-primary`** | `#F8FAFC` | Crisp white primary typography |
| **`--text-muted`** | `#94A3B8` | Subdued slate text for metadata and descriptions |

### Typography
- **Headings:** `Outfit` / `Space Grotesk` (Geometric, Modern, Tech-First)
- **Body & Controls:** `Inter` / `Plus Jakarta Sans` (Clean, Legible)
- **Code & Syntax:** `JetBrains Mono` / `Fira Code` (Monospaced with ligatures)

---

## 2. ASCII Wireframes & Screen Layouts

### 2.1 The Matrix Ideation Hub
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

### 2.2 Interactive Visual Roadmap Canvas
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

### 2.3 Deep Blueprint Inspector Studio
```
+-----------------------------------------------------------------------------------------+
| 📋 DEEP BLUEPRINT STUDIO: Architecture Breakdown & System Specifications                |
+-----------------------------------------------------------------------------------------+
| [ Architecture Diagram ] [ Database ERD ] [ REST API Specs ] [ Edge Cases & Security ]  |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
| 1. System Architecture Overview:                                                        |
|    - Style: Asynchronous Event-Driven Microservice with Redis Buffer                     |
|    - Visual Mermaid Diagram:                                                            |
|      [ FastAPI Webhook ] -> [ Redis Stream ] -> [ Background Worker ] -> [ Gemini LLM ] |
|                                                                                         |
| 2. File & Directory Layout:                                                             |
|    ├── backend/                                                                         |
|    │   ├── app/                                                                         |
|    │   │   ├── api/v1/endpoints/ (webhooks.py, agents.py, traces.py)                    |
|    │   │   ├── core/ (config.py, security.py, redis_pool.py)                            |
|    │   │   ├── models/ (sql models, pydantic schemas)                                   |
|    │   │   └── services/ (gemini_agent.py, git_analyzer.py)                             |
|    └── frontend/ (src/components, src/features, src/hooks)                              |
|                                                                                         |
| 3. Database Schema Models:                                                              |
|    - Table `events`: (id UUID PK, repo_name VARCHAR, payload JSONB, status VARCHAR)     |
|    - Table `agent_traces`: (id UUID PK, event_id FK, tokens_used INT, result JSONB)    |
+-----------------------------------------------------------------------------------------+
```
