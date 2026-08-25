# 🗄️ Database Design (PostgreSQL ERD & Schema)

**Project Name:** NextGen-Projector  
**Database Engine:** PostgreSQL 16  
**ORM / Driver:** SQLAlchemy 2.0 (Async) + `asyncpg`  
**Migration Tool:** Alembic  

---

## 1. Entity-Relationship Diagram (ERD)

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

---

## 2. PostgreSQL DDL SQL Script

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
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

-- 2. Project Ideas Table
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

-- 3. Project Blueprints Table
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

-- 4. Roadmap Milestones Table
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

-- 5. User Progress Table
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    milestone_id UUID NOT NULL REFERENCES roadmap_milestones(id) ON DELETE CASCADE,
    status VARCHAR(32) DEFAULT 'COMPLETED', -- 'IN_PROGRESS', 'COMPLETED'
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, milestone_id)
);

-- 6. Saved Blueprints (Bookmarks)
CREATE TABLE saved_blueprints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    blueprint_id UUID NOT NULL REFERENCES project_blueprints(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, blueprint_id)
);

-- 7. Blueprint Likes Table
CREATE TABLE blueprint_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    blueprint_id UUID NOT NULL REFERENCES project_blueprints(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, blueprint_id)
);

-- Performance Indexes
CREATE INDEX idx_project_ideas_user ON project_ideas(user_id);
CREATE INDEX idx_project_ideas_difficulty ON project_ideas(difficulty);
CREATE INDEX idx_project_ideas_public ON project_ideas(is_public);
CREATE INDEX idx_roadmap_milestones_blueprint ON roadmap_milestones(blueprint_id);
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_saved_blueprints_user ON saved_blueprints(user_id);
```
