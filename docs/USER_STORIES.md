# 📖 User Stories & Acceptance Criteria

**Project Name:** NextGen-Projector  
**Methodology:** Agile Epics with INVEST-Compliant User Stories and Gherkin Acceptance Criteria.

---

## Epic 1: Multi-Parametric Ideation & Calibration Engine

### Story 1.1: Skill Matrix & Target Stack Configuration
- **As a** software engineer preparing for job applications,
- **I want to** select my current skills, desired tech stack, and difficulty level,
- **So that** I get tailored project concepts that challenge me without overwhelming me.
- **Acceptance Criteria:**
  - **Given** I am on the Ideation Hub,
  - **When** I search for skills (e.g. "Python", "React", "PostgreSQL"),
  - **Then** I can select them and see them added to my active matrix tags.
  - **When** I click "Generate Blueprints",
  - **Then** the system sends a validated request to FastAPI and returns at least 3 distinct concepts with match scores in $< 3$ seconds.

### Story 1.2: Industry Domain & Career Alignment
- **As a** career transitioner targeting AI engineering or distributed systems,
- **I want to** filter project ideas by specific industry domains (Fintech, Healthtech, DevTools, AI Agents),
- **So that** my portfolio directly aligns with the job descriptions I am targeting.
- **Acceptance Criteria:**
  - **Given** I select "AI DevTools & Observability" as my target domain,
  - **Then** all generated ideas emphasize agent tracing, telemetry, or code intelligence.

---

## Epic 2: Deep Technical Blueprint Engine

### Story 2.1: Production-Grade Architectural Deconstruction
- **As an** engineer building from scratch,
- **I want** an end-to-end breakdown including architecture diagram, directory layout, database schema, and REST/WebSocket API specs,
- **So that** I know exactly how to structure the repository without getting blocked.
- **Acceptance Criteria:**
  - **Given** I select a generated project idea,
  - **When** the blueprint studio opens,
  - **Then** I see a rendered system architecture diagram, multi-level folder structure, PostgreSQL table definitions, and sample API request/response payloads.

### Story 2.2: Edge Cases & Security Trade-Off Analysis
- **As an** interviewee preparing for system design rounds,
- **I want** the blueprint to outline concurrency challenges, failure modes, and mitigation strategies,
- **So that** I can speak fluently about architectural trade-offs during technical interviews.

---

## Epic 3: Interactive Visual Roadmap Canvas

### Story 3.1: React Flow Visual Graph Navigation
- **As a** visual learner,
- **I want** my project milestones mapped onto an interactive node graph with prerequisites and lock states,
- **So that** I can build my project incrementally with clear feedback loops.
- **Acceptance Criteria:**
  - **Given** I open the roadmap view,
  - **Then** I can pan, zoom, and select milestone nodes.
  - **When** I complete a milestone,
  - **Then** downstream connected nodes unlock with an animated visual pulse, and the progress bar updates.

---

## Epic 4: Resume Impact Simulator & Scaffolder

### Story 4.1: ATS-Optimized Action Bullet Points
- **As a** job applicant,
- **I want to** generate Google XYZ-formula resume bullet points based on the project blueprint,
- **So that** I can copy high-impact, quantified bullets directly into my resume.
- **Acceptance Criteria:**
  - **Given** a generated blueprint,
  - **When** I click "Resume Bullets",
  - **Then** I receive 3–5 bullet points formatted as: *"Accomplished [X] as measured by [Y] by doing [Z]"*.

### Story 4.2: Starter Kit Boilerplate Export
- **As a** developer ready to code,
- **I want to** download a starter `.zip` archive containing the pre-configured project scaffold,
- **So that** I can start coding in under 60 seconds.
- **Acceptance Criteria:**
  - **Given** an active blueprint,
  - **When** I click "Download Starter Zip",
  - **Then** the FastAPI backend streams a `.zip` file with configured `requirements.txt`, `package.json`, Dockerfile, `.env.example`, and directory structure.
