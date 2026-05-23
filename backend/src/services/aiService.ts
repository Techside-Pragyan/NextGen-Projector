import { GoogleGenAI } from '@google/generative-ai';

interface AIParams {
  domain: string;
  skills: string[];
  interests: string[];
  techStack: string[];
  difficulty: string;
  duration: string;
  teamSize: number;
  hackathonMode?: boolean;
}

// Highly comprehensive pre-built mock templates for key domains
const mockProjects: Record<string, any> = {
  aiml: {
    title: "NeuroPulse AI: Real-Time EEG Brainwave State Classifier & Cognitive Coach",
    problemStatement: "Traditional brain-computer interfaces (BCIs) are restricted to high-cost clinical setups. Developers and students lack open-access, low-latency, and visual AI pipelines to classify multi-channel EEG signals for mental fatigue, focus tracking, and motor-imagery controls.",
    description: "NeuroPulse AI is a futuristic Brain-Computer Interface (BCI) analytical pipeline. It processes multi-channel electroencephalogram (EEG) signals in real time, leveraging an interactive Next.js dashboard, a Node.js streaming gateway, and a PyTorch Deep Learning Classifier to detect neurological states (Alpha/Beta/Theta rhythms). It visualizes cognitive metrics using responsive 3D charts, helping researchers track productivity and control digital interfaces via cognitive state projection.",
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Python", "PyTorch", "FastAPI", "WebSockets", "Recharts"],
    features: [
      "Real-time WebSocket streaming ingestion of multi-channel EEG data.",
      "PyTorch temporal-convolutional neural network (TCN) classifying focus, fatigue, and relaxation.",
      "Dynamic 3D brain activity map visualization using Canvas & Recharts.",
      "Cognitive coaching assistant providing smart audio cues when focus drops below 30%.",
      "Robust exportable REST API for researchers to integrate third-party neuro-headsets."
    ],
    databaseSchema: `// Mongoose schema for EEG Session Logs
const EEGLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  channels: { type: [String], default: ['FP1', 'FP2', 'O1', 'O2'] },
  metrics: {
    focusIndex: Number,
    fatigueIndex: Number,
    calmnessIndex: Number
  },
  timestamps: [Date],
  rawBufferRef: String,
  createdAt: { type: Date, default: Date.now }
});`,
    folderStructure: `neuropulse-ai/
├── client/                 # Next.js & Framer Motion Frontend
│   ├── src/
│   │   ├── app/            # Dashboard pages, 3D Canvas views
│   │   └── components/     # Recharts, WebSocket stream listener
├── brain-server/           # Python & PyTorch Classification Engine
│   ├── app/
│   │   ├── core/           # Signal filters (Bandpass, ICA)
│   │   ├── models/         # TCN PyTorch Net weights
│   │   └── main.py         # FastAPI WebSockets endpoints
├── docker-compose.yml`,
    architecture: {
      diagramData: {
        nodes: [
          { id: "1", label: "EEG Headset Simulator", type: "sensor" },
          { id: "2", label: "FastAPI WebSocket Gateway", type: "server" },
          { id: "3", label: "PyTorch Inference Engine", type: "ai" },
          { id: "4", label: "MongoDB Session Logs", type: "database" },
          { id: "5", label: "Next.js Futuristic Client", type: "client" }
        ],
        connections: [
          { from: "1", to: "2", label: "Raw Signals (WS)" },
          { from: "2", to: "3", label: "Tensors Ingest" },
          { from: "3", to: "2", label: "Classified Brain States" },
          { from: "2", to: "4", label: "Store JSON Metrics" },
          { from: "2", to: "5", label: "State Stream (JSON)" }
        ]
      },
      description: "Uses a decoupled WebSocket pipeline. Raw microvolt EEG feeds stream directly into a FastAPI signal filter (Bandpass & Notch), which is then parsed by PyTorch for focus metrics and broadcasted back to the Next.js visual client within 15ms."
    },
    roadmap: [
      {
        week: 1,
        topic: "Signal Modeling & Filter Architecture",
        tasks: [
          "Set up the FastAPI scaffolding and Python MNE libraries.",
          "Implement Bandpass filtering (1Hz - 50Hz) and Notch filtering to strip 50Hz AC noise."
        ],
        resources: [
          "MNE Python Signal Processing Documentation",
          "FastAPI WebSocket Starter Guide"
        ]
      },
      {
        week: 2,
        topic: "PyTorch Classifier Training",
        tasks: [
          "Acquire public DEAP or BCICIV dataset for focus/fatigue categories.",
          "Construct a Temporal Convolutional Network (TCN) in PyTorch and train to 88% accuracy."
        ],
        resources: [
          "PyTorch Deep Learning BCI tutorial on Github",
          "DEAP Dataset access portal"
        ]
      },
      {
        week: 3,
        topic: "Real-time WebSocket Streaming",
        tasks: [
          "Configure Python WebSockets to stream synthetic brainwaves at 250Hz sampling rate.",
          "Implement high-performance state buffer in Next.js using Zustand and Canvas render loops."
        ],
        resources: [
          "MDN WebSockets Client APIs",
          "React 2D Canvas render patterns"
        ]
      },
      {
        week: 4,
        topic: "Futuristic Dashboard & Production Release",
        tasks: [
          "Style glassmorphic panels and dark charts in Tailwind and Recharts.",
          "Compose Docker Compose configurations to containerize the FastAPI, PyTorch, and Next.js layers."
        ],
        resources: [
          "Vercel Deployment guide",
          "Dockerizing multi-container microservices"
        ]
      }
    ],
    resumeImpact: {
      score: 96,
      skillsGained: ["Digital Signal Processing (DSP)", "PyTorch Inference", "WebSocket Stream Optimizations", "Canvas Graphics"],
      bulletPoints: [
        "Architected an eeg BCI pipeline processing 250Hz streaming signals with <15ms latency using FastAPI & WebSockets.",
        "Built a PyTorch Temporal Convolutional Network (TCN) classifying mental states with an 88.4% validation accuracy score.",
        "Created a glassmorphic dashboard visualizing neural signals via Recharts and Canvas 3D brain map triggers."
      ]
    },
    readmeContent: `# 🧠 NeuroPulse AI - Real-time EEG Brainwave State Classifier

NeuroPulse AI is a futuristic Brain-Computer Interface (BCI) ingestion and analytical pipeline.

## 🚀 Features
- **Real-Time Streaming**: High-frequency streaming over WebSockets.
- **AI Classification**: PyTorch-backed classifier identifying focus, fatigue, and calmness.
- **Glassmorphic UI**: Dynamic charts with responsive modern themes.

## 🛠️ Installation
\`\`\`bash
# Clone the repository
git clone https://github.com/username/neuropulse-ai.git

# Set up PyTorch engine
cd brain-server
pip install -r requirements.txt
python main.py

# Start Next.js client
cd ../client
npm install
npm run dev
\`\`\`

## 📄 License
MIT License`,
    codeStarter: `// main.py - FastAPI Brainwave Classification Server
from fastapi import FastAPI, WebSocket
import numpy as np
import torch
import json

app = FastAPI()

class BrainClassifier(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.conv = torch.nn.Conv1d(4, 16, kernel_size=3, padding=1)
        self.fc = torch.nn.Linear(16 * 100, 3) # Focus, Fatigue, Calm
        
    def forward(self, x):
        x = torch.relu(self.conv(x))
        x = x.view(x.size(0), -1)
        return torch.softmax(self.fc(x), dim=1)

model = BrainClassifier()
model.eval()

@app.websocket("/stream/eeg")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("EEG Sensor feed connected.")
    try:
        while True:
            # Expecting 4 channels x 100 time points data
            data = await websocket.receive_text()
            signals = np.array(json.loads(data)["signals"])
            tensor = torch.tensor(signals, dtype=torch.float32).unsqueeze(0)
            
            with torch.no_grad():
                predictions = model(tensor).squeeze(0).tolist()
                
            await websocket.send_json({
                "focus": predictions[0],
                "fatigue": predictions[1],
                "calm": predictions[2]
            })
    except Exception as e:
        print(f"Disconnected: {e}")
`
  },
  webdev: {
    title: "SaaSify: High-Performance Multi-Tenant Micro-SaaS Scaffolding & Dynamic Tenant Router",
    problemStatement: "Creating scalable SaaS templates that support dynamic subdomains, custom database tenancy, multi-tenant caching, stripe billing tiers, and fully automated sub-client customization requires reinventing the wheel for every product.",
    description: "SaaSify is a highly modular, professional software architecture designed to let founders spin up multi-tenant B2B platforms within minutes. It features custom subdomains (e.g., tenant.saasify.co), automated database-level tenancy (separate databases per tenant created dynamically), fully integrated Stripe billing dashboards, scalable JWT sessions, and a comprehensive drag-and-drop dashboard builder.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "Express", "MongoDB", "Redis", "Stripe API"],
    features: [
      "Dynamic subdomain routing using Next.js middleware wildcard intercepts.",
      "Multi-tenant data isolation using dynamic MongoDB connection pooling.",
      "Redis cached subscription validation checking Stripe webhook syncs in real-time.",
      "Customizable theme injector pulling CSS configurations dynamically based on the tenant's brand settings."
    ],
    databaseSchema: `// Master Tenant Schema
const TenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subdomain: { type: String, unique: true, required: true },
  databaseUri: String, // Individual isolated connection string
  customDomain: String,
  subscriptionPlan: { type: String, enum: ['Basic', 'Growth', 'Enterprise'] },
  stripeCustomerId: String,
  themeConfig: {
    primaryColor: String,
    logoUrl: String
  },
  createdAt: { type: Date, default: Date.now }
});`,
    folderStructure: `saasify-engine/
├── frontend/               # Next.js App Router (Multi-Tenant interceptor)
│   ├── middleware.ts       # Subdomain rewrites to tenant workspace
│   ├── src/
│   │   ├── app/
│   │   │   ├── [tenant]/   # Dynamic tenant interface
│   │   │   └── page.tsx    # Primary Landing Page
├── backend/                # Tenant API Hub
│   ├── src/
│   │   ├── middleware/     # tenantDbConnector pool builder
│   │   └── index.ts        # Dynamic Stripe Webhooks
├── redis-cache/            # Tenancy validation speedup`,
    architecture: {
      diagramData: {
        nodes: [
          { id: "1", label: "User Client (tenant.app.com)", type: "client" },
          { id: "2", label: "Next.js Middleware Domain Rewrite", type: "router" },
          { id: "3", label: "Express App Tenant Controller", type: "server" },
          { id: "4", label: "Redis Subscription Cache", type: "cache" },
          { id: "5", label: "Multi-Tenant Mongo DB Pool", type: "database" }
        ],
        connections: [
          { from: "1", to: "2", label: "GET /dashboard" },
          { from: "2", to: "3", label: "Rewritten Internal Route" },
          { from: "3", to: "4", label: "Verify Active Plan" },
          { from: "3", to: "5", label: "Select Isolated DB Connection" }
        ]
      },
      description: "Traffic hits the Next.js middleware, which parses the hostname (e.g. tenantA.saasify.co). It rewrites the page query to the dynamic route path. The backend Express layer intercepts headers to open a dedicated connection pool to MongoDB specific to that tenant, maintaining absolute tenant data isolation."
    },
    roadmap: [
      {
        week: 1,
        topic: "Wildcard Subdomain Routing Middleware",
        tasks: [
          "Initialize Next.js with app router and typescript.",
          "Write middleware.ts to intercept hostnames and rewrite them to custom client-sub-paths dynamically."
        ],
        resources: [
          "Next.js Wildcard Middleware Subdomains Tutorial",
          "Vercel Multi-tenant deployment guide"
        ]
      },
      {
        week: 2,
        topic: "Dynamic Database Tenant Pooler",
        tasks: [
          "Build Express server that listens for subdomain headers.",
          "Implement connection pooler in Mongoose using `mongoose.createConnection` to load separate databases per request dynamically."
        ],
        resources: [
          "Mongoose Dynamic Connection Pools documentation",
          "Designing secure multi-tenant SaaS structures"
        ]
      },
      {
        week: 3,
        topic: "Stripe Billing & Redis Caching",
        tasks: [
          "Integrate Stripe Node SDK and implement webhooks for purchase/cancellation events.",
          "Write a Redis cache validation class to avoid querying MongoDB on every page loading event."
        ],
        resources: [
          "Stripe Webhook Node API Integration Guides",
          "Redis caching strategies in Express"
        ]
      },
      {
        week: 4,
        topic: "Theme Configuration & Live Deploy",
        tasks: [
          "Build custom workspace layout changing primary/secondary CSS colors based on Mongo configs.",
          "Deploy Express backend to Render and Next.js frontend to Vercel configuring wildcard DNS records."
        ],
        resources: [
          "Tailwind CSS CSS variables custom theme injectors",
          "Deploying SaaS products on Vercel"
        ]
      }
    ],
    resumeImpact: {
      score: 93,
      skillsGained: ["Multi-Tenancy Architectures", "Dynamic Database Pooling", "Edge Middleware Interceptors", "Redis Subscription caching"],
      bulletPoints: [
        "Built a multi-tenant B2B SaaS boiler engine supporting dynamic wildcard subdomains and isolated data schemas.",
        "Created an Express.js middleware connection pooler that dynamically switches MongoDB clients, optimizing memory limits by 40%.",
        "Configured Redis cache layers reducing database latency from 120ms to 4.2ms for core auth checks."
      ]
    },
    readmeContent: `# 🚀 SaaSify - Scalable Multi-Tenant B2B SaaS Starter Kit

SaaSify is a premium software scaffolding designed to launch secure B2B products instantly.

## 🛠️ Features
- **Data Isolation**: Dynamic DB pooling secures user isolation.
- **Subdomains Intercept**: Next.js Edge Routing handles custom client domains.
- **Ultra-fast Caching**: Cache user sessions inside Redis.

## 📄 License
MIT`,
    codeStarter: `// middleware.ts - Next.js Wildcard Tenant Router
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Exclude assets and default routes
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.includes('.') ||
    url.pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // Extract tenant name from subdomain (e.g. clientA.saasify.com)
  const isLocal = hostname.includes('localhost');
  const domainParts = hostname.split('.');
  const isSubdomain = isLocal ? domainParts.length > 1 : domainParts.length > 2;

  if (isSubdomain) {
    const tenant = domainParts[0];
    if (tenant !== 'www' && tenant !== 'app') {
      // Rewrite the URL to the dynamic folder
      url.pathname = \`/\${tenant}\${url.pathname}\`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
`
  }
};

// Generates highly detailed fallbacks if the key is not valid, or uses the API.
export const generateProjectIdea = async (params: AIParams): Promise<any> => {
  const apiKey = process.env.GEMINI_API_KEY;
  const isMock = !apiKey || apiKey.trim() === '' || apiKey.includes('your_') || apiKey.includes('GEMINI_API_KEY');

  const domainNormalized = params.domain.toLowerCase().replace(/[^a-z]/g, '');

  if (isMock) {
    console.log('🔮 Gemini Key absent/placeholder. Deploying Cybernetic Mock Generator...');
    // Match based on selected domain
    let matchedMock = mockProjects.webdev; // Default
    if (domainNormalized.includes('ai') || domainNormalized.includes('ml') || domainNormalized.includes('data')) {
      matchedMock = mockProjects.aiml;
    }

    // Customize the template parameters slightly to match user inputs dynamically
    const finalProject = { ...matchedMock };
    finalProject._id = new mongoose.Types.ObjectId().toString();
    finalProject.domain = params.domain;
    finalProject.difficulty = params.difficulty;
    finalProject.teamSize = params.teamSize;
    finalProject.duration = params.duration;
    
    // Inject user specific tech stack
    const customTech = Array.from(new Set([...params.techStack, ...finalProject.techStack])).slice(0, 8);
    finalProject.techStack = customTech;
    
    // Set customized timeline durations dynamically
    const totalWeeks = params.duration.includes('Day') || params.duration.includes('Hackathon') ? 1 : 4;
    finalProject.roadmap = finalProject.roadmap.slice(0, totalWeeks).map((item: any, index: number) => ({
      ...item,
      week: index + 1
    }));

    return finalProject;
  }

  // REAL GEMINI API CALL
  try {
    const genAI = new GoogleGenAI({ apiKey });
    // Use Gemini 1.5 Flash for high speed and reliability
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are an expert AI software architect. Generate a highly unique, modern, and realistic project idea based on these inputs:
- Domain: ${params.domain}
- Core Skills: ${params.skills.join(', ')}
- Interests: ${params.interests.join(', ')}
- Target Tech Stack: ${params.techStack.join(', ')}
- Difficulty Level: ${params.difficulty}
- Target Duration: ${params.duration}
- Team Size: ${params.teamSize}
- Hackathon Mode: ${params.hackathonMode ? 'YES (Make it dynamic, high-innovation MVP-focused)' : 'NO'}

YOUR RESPONSE MUST BE A SINGLE VALID JSON OBJECT matching this exact structure:
{
  "title": "A short, futuristic, premium title of the project (e.g. AstroCore AI)",
  "problemStatement": "A thorough, 1-2 sentence problem statement explaining the current industry challenge or gap.",
  "description": "A 2-3 paragraph premium startup-level description of what the project does and why it is revolutionary.",
  "techStack": ["Array", "of", "technologies"],
  "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
  "databaseSchema": "A clear textual code representation of the Mongoose schema or PostgreSQL schema tailored to this project.",
  "folderStructure": "A visualization of the directory tree hierarchy (frontend, backend, configs, docker-compose).",
  "architecture": {
    "diagramData": {
      "nodes": [
        {"id": "1", "label": "Label of Component", "type": "client/server/database/ai/router"}
      ],
      "connections": [
        {"from": "1", "to": "2", "label": "API request / Stream / etc"}
      ]
    },
    "description": "An explanation of the system data flow and architecture patterns used (e.g., event-driven microservices, WebSocket piping)."
  },
  "roadmap": [
    {
      "week": 1,
      "topic": "Topic of the week",
      "tasks": ["Detailed Task 1", "Detailed Task 2"],
      "resources": ["E.g. MDN WebSockets API Doc", "PyTorch quickstart tutorial"]
    }
  ],
  "resumeImpact": {
    "score": 85, // A dynamic numeric score out of 100 representing career impact
    "skillsGained": ["Skill A", "Skill B"],
    "bulletPoints": [
      "Resume copy-paste bullet point 1 starting with strong action verb.",
      "Resume copy-paste bullet point 2 starting with strong action verb."
    ]
  },
  "readmeContent": "# Dynamic readme markdown in standard formatting",
  "codeStarter": "// Starter boilerplate file code snippet (e.g. server.js or App.tsx in chosen language)"
}

Do not include any markdown fences (like \`\`\`json) or conversational text. Output ONLY the JSON string.
`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const responseText = result.response.text();
    const parsedData = JSON.parse(responseText.trim());
    return parsedData;

  } catch (error: any) {
    console.error(`💥 Gemini Generation crashed: ${error.message}. Falling back to cybernetic mock backup...`);
    // Safe fallback to mock structure
    let matchedMock = mockProjects.webdev;
    if (domainNormalized.includes('ai') || domainNormalized.includes('ml')) {
      matchedMock = mockProjects.aiml;
    }
    const finalProject = { ...matchedMock };
    finalProject._id = new mongoose.Types.ObjectId().toString();
    finalProject.domain = params.domain;
    finalProject.difficulty = params.difficulty;
    return finalProject;
  }
};
