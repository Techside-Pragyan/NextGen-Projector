'use client';

import React, { useState, useEffect } from 'react';
import GlassPanel from '../../components/ui/GlassPanel';
import { 
  Sparkles, 
  Search, 
  Flame, 
  Layers, 
  Compass, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  Globe
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ProjectDetail } from '../../context/SavedProjectsContext';

interface DashboardHomeProps {
  onSelectProject: (project: ProjectDetail) => void;
  onGenerateTab: () => void;
}

const mockTrendingTech = [
  { name: 'Jan', nextjs: 400, pytorch: 240, rust: 120 },
  { name: 'Feb', nextjs: 460, pytorch: 280, rust: 150 },
  { name: 'Mar', nextjs: 540, pytorch: 310, rust: 190 },
  { name: 'Apr', nextjs: 620, pytorch: 420, rust: 240 },
  { name: 'May', nextjs: 740, pytorch: 510, rust: 320 }
];

const mockPopularDomains = [
  { name: 'AI/ML', value: 486, fill: '#6366f1' },
  { name: 'Web Dev', value: 382, fill: '#a855f7' },
  { name: 'Security', value: 184, fill: '#ec4899' },
  { name: 'Blockchain', value: 120, fill: '#f59e0b' },
  { name: 'IoT', value: 76, fill: '#14b8a6' }
];

// Pre-compiled gorgeous blueprints that load instantly
const communityFavorites: ProjectDetail[] = [
  {
    _id: "fav_neuro",
    title: "NeuroPulse AI: Real-Time EEG Brainwave State Classifier & Cognitive Coach",
    domain: "AI/ML",
    difficulty: "Advanced",
    duration: "4 Weeks",
    teamSize: 2,
    problemStatement: "Traditional brain-computer interfaces (BCIs) are restricted to high-cost clinical setups. Developers and students lack open-access, low-latency, and visual AI pipelines to classify multi-channel EEG signals for mental fatigue, focus tracking, and motor-imagery controls.",
    description: "NeuroPulse AI is a futuristic Brain-Computer Interface (BCI) analytical pipeline. It processes multi-channel electroencephalogram (EEG) signals in real time, leveraging an interactive Next.js dashboard, a Node.js streaming gateway, and a PyTorch Deep Learning Classifier to detect neurological states (Alpha/Beta/Theta rhythms). It visualizes cognitive metrics using responsive 3D charts, helping researchers track productivity and control digital interfaces via cognitive state projection.",
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Python", "PyTorch", "FastAPI", "WebSockets"],
    features: [
      "Real-time WebSocket streaming ingestion of multi-channel EEG data.",
      "PyTorch temporal-convolutional neural network (TCN) classifying focus, fatigue, and relaxation.",
      "Dynamic 3D brain activity map visualization using Canvas & Recharts.",
      "Cognitive coaching assistant providing smart audio cues when focus drops below 30%.",
      "Robust exportable REST API for researchers to integrate third-party neuro-headsets."
    ],
    databaseSchema: `const EEGLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  channels: { type: [String], default: ['FP1', 'FP2', 'O1', 'O2'] },
  metrics: { focusIndex: Number, fatigueIndex: Number, calmIndex: Number },
  createdAt: { type: Date, default: Date.now }
});`,
    folderStructure: `neuropulse-ai/\n├── client/ # Next.js Client\n├── brain-server/ # Python FastAPI Signal Processor\n└── docker-compose.yml`,
    architecture: {
      diagramData: {
        nodes: [
          { id: "1", label: "EEG Headset Simulator", type: "sensor" },
          { id: "2", label: "FastAPI WebSocket Gateway", type: "server" },
          { id: "3", label: "PyTorch Inference Engine", type: "ai" },
          { id: "4", label: "MongoDB Session Logs", type: "database" }
        ],
        connections: [
          { from: "1", to: "2", label: "Raw Signals (WS)" },
          { from: "2", to: "3", label: "Tensors Ingest" },
          { from: "3", to: "2", label: "Classified Brain States" },
          { from: "2", to: "4", label: "Store JSON Metrics" }
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
          "PyTorch Deep Learning BCI tutorial on Github"
        ]
      }
    ],
    resumeImpact: {
      score: 96,
      skillsGained: ["Digital Signal Processing (DSP)", "PyTorch Inference", "WebSocket Stream Optimizations", "Canvas Graphics"],
      bulletPoints: [
        "Architected an eeg BCI pipeline processing 250Hz streaming signals with <15ms latency using FastAPI & WebSockets.",
        "Built a PyTorch Temporal Convolutional Network (TCN) classifying mental states with an 88.4% validation accuracy score."
      ]
    },
    readmeContent: `# 🧠 NeuroPulse AI - Real-time EEG Brainwave State Classifier\n\nNeuroPulse AI is a futuristic Brain-Computer Interface (BCI) ingestion and analytical pipeline.`,
    codeStarter: `// main.py - FastAPI BCI Server\nimport torch\nimport json`
  },
  {
    _id: "fav_saas",
    title: "SaaSify: High-Performance Multi-Tenant Micro-SaaS Scaffolding & Dynamic Tenant Router",
    domain: "Web Development",
    difficulty: "Intermediate",
    duration: "2 Weeks",
    teamSize: 1,
    problemStatement: "Creating scalable SaaS templates that support dynamic subdomains, custom database tenancy, multi-tenant caching, stripe billing tiers, and fully automated sub-client customization requires reinventing the wheel for every product.",
    description: "SaaSify is a highly modular, professional software architecture designed to let founders spin up multi-tenant B2B platforms within minutes. It features custom subdomains (e.g., tenant.saasify.co), automated database-level tenancy (separate databases per tenant created dynamically), fully integrated Stripe billing dashboards, scalable JWT sessions, and a comprehensive drag-and-drop dashboard builder.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "Express", "MongoDB", "Redis", "Stripe API"],
    features: [
      "Dynamic subdomain routing using Next.js middleware wildcard intercepts.",
      "Multi-tenant data isolation using dynamic MongoDB connection pooling.",
      "Redis cached subscription validation checking Stripe webhook syncs in real-time.",
      "Customizable theme injector pulling CSS configurations dynamically based on the tenant's brand settings."
    ],
    databaseSchema: `const TenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subdomain: { type: String, unique: true, required: true },
  databaseUri: String,
  subscriptionPlan: { type: String, enum: ['Basic', 'Growth', 'Enterprise'] },
  createdAt: { type: Date, default: Date.now }
});`,
    folderStructure: `saasify-engine/\n├── frontend/\n│   ├── middleware.ts # Subdomain rewrites\n│   └── src/app/[tenant]/ # Dynamic tenant view\n└── backend/ # Express tenant connector`,
    architecture: {
      diagramData: {
        nodes: [
          { id: "1", label: "User Client (tenant.app.com)", type: "client" },
          { id: "2", label: "Next.js Edge Middleware", type: "router" },
          { id: "3", label: "Express App Tenant Controller", type: "server" },
          { id: "4", label: "Multi-Tenant Mongo DB Pool", type: "database" }
        ],
        connections: [
          { from: "1", to: "2", label: "GET /dashboard" },
          { from: "2", to: "3", label: "Rewritten Internal Path" },
          { from: "3", to: "4", label: "Select isolated Connection" }
        ]
      },
      description: "Traffic hits the Next.js middleware, which parses the hostname. It rewrites the page query to the dynamic route path. The backend Express layer intercepts headers to open a dedicated connection pool to MongoDB specific to that tenant, maintaining absolute tenant data isolation."
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
          "Next.js Wildcard Middleware Subdomains Tutorial"
        ]
      }
    ],
    resumeImpact: {
      score: 93,
      skillsGained: ["Multi-Tenancy Architectures", "Dynamic Database Pooling", "Edge Middleware Interceptors", "Redis Caching"],
      bulletPoints: [
        "Built a multi-tenant B2B SaaS boiler engine supporting dynamic wildcard subdomains and isolated data schemas.",
        "Created an Express.js middleware connection pooler that dynamically switches MongoDB clients, optimizing memory limits by 40%."
      ]
    },
    readmeContent: `# 🚀 SaaSify - Scalable Multi-Tenant B2B SaaS Starter Kit\n\nSaaSify is a premium software scaffolding designed to launch secure B2B products instantly.`,
    codeStarter: `// middleware.ts - Next.js Wildcard Tenant Router\nimport { NextResponse } from 'next/server';`
  }
];

export const DashboardHome: React.FC<DashboardHomeProps> = ({ onSelectProject, onGenerateTab }) => {
  const [search, setSearch] = useState('');
  const [filteredTemplates, setFilteredTemplates] = useState<ProjectDetail[]>(communityFavorites);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredTemplates(communityFavorites);
      return;
    }
    const filtered = communityFavorites.filter(p => 
      p.title.toLowerCase().includes(search.toLowerCase()) || 
      p.domain.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );
    setFilteredTemplates(filtered);
  }, [search]);

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      
      {/* Welcome banner */}
      <div className="flex flex-col gap-2 relative">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
          <h2 className="text-3xl font-extrabold tracking-wide text-white">DEVELOPER WORKSPACE</h2>
        </div>
        <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
          Welcome to the neural command hub. Synthesize production-ready project blueprints, model resume performance, and monitor active tech surges in real time.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <GlassPanel glowColor="indigo" className="flex items-center justify-between p-6">
          <div>
            <div className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase">BLUEPRINTS SYNTHESIZED</div>
            <div className="text-3xl font-extrabold tracking-wide mt-1.5 text-white">1,248</div>
            <div className="text-[11px] text-zinc-500 font-mono mt-1">+14% Growth this cycle</div>
          </div>
          <div className="bg-indigo-500/10 p-3.5 border border-indigo-500/20 rounded-2xl flex items-center justify-center">
            <Cpu className="w-6 h-6 text-indigo-400" />
          </div>
        </GlassPanel>

        <GlassPanel glowColor="pink" className="flex items-center justify-between p-6">
          <div>
            <div className="text-[10px] text-pink-400 font-mono tracking-widest uppercase">ACTIVE DEVELOPERS</div>
            <div className="text-3xl font-extrabold tracking-wide mt-1.5 text-white">312</div>
            <div className="text-[11px] text-zinc-500 font-mono mt-1">Ingesting GitHub stream logs</div>
          </div>
          <div className="bg-pink-500/10 p-3.5 border border-pink-500/20 rounded-2xl flex items-center justify-center">
            <Globe className="w-6 h-6 text-pink-400" />
          </div>
        </GlassPanel>

        <GlassPanel glowColor="none" className="flex items-center justify-between p-6 hover:border-indigo-500/30 transition-all duration-300">
          <div>
            <div className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">SYNTHESIS SUCCESS RATE</div>
            <div className="text-3xl font-extrabold tracking-wide mt-1.5 text-emerald-400">99.8%</div>
            <div className="text-[11px] text-zinc-500 font-mono mt-1">Zero downtime recorded</div>
          </div>
          <div className="bg-emerald-500/10 p-3.5 border border-emerald-500/20 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
        </GlassPanel>
      </div>

      {/* Interactive visualizer charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <GlassPanel className="col-span-1 lg:col-span-2 flex flex-col gap-4 h-[300px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">Surging Technologies (Monthly Search Index)</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500" /> Next.js</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500" /> PyTorch</span>
            </div>
          </div>
          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTrendingTech} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNext" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#52525b" fontSize={10} fontStyle="monospace" tickLine={false} />
                <YAxis stroke="#52525b" fontSize={10} fontStyle="monospace" tickLine={false} />
                <Tooltip contentStyle={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', fontSize: '11px', color: '#f5f5f7' }} />
                <Area type="monotone" dataKey="nextjs" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorNext)" />
                <Area type="monotone" dataKey="pytorch" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorPy)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        <GlassPanel className="flex flex-col gap-4 h-[300px]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">Blueprints By Domain</span>
          </div>
          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockPopularDomains} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#52525b" fontSize={10} fontStyle="monospace" tickLine={false} />
                <YAxis stroke="#52525b" fontSize={10} fontStyle="monospace" tickLine={false} />
                <Tooltip contentStyle={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', fontSize: '11px', color: '#f5f5f7' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

      </div>

      {/* Community Showcase and Search */}
      <div className="flex flex-col gap-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4.5 h-4.5 text-pink-400" />
            <h3 className="text-lg font-bold text-white tracking-wide">Community Favorites Showcase</h3>
          </div>
          
          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by tech, name, domain..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500/50 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 outline-none transition-all duration-300"
            />
          </div>
        </div>

        {/* Templates grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map(proj => (
              <GlassPanel
                key={proj._id}
                hoverGlow
                onClick={() => onSelectProject(proj)}
                className="flex flex-col justify-between gap-4 group h-56 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono font-bold tracking-wider px-2 py-0.5 rounded uppercase">
                      {proj.domain}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {proj.difficulty} • {proj.duration}
                    </span>
                  </div>
                  <h4 className="text-md font-bold text-zinc-200 mt-2.5 leading-snug group-hover:text-indigo-300 transition-colors duration-300">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed font-sans">
                    {proj.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-800/80 pt-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {proj.techStack.slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-[10px] text-zinc-500 font-mono bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-indigo-400 group-hover:translate-x-1 transition-transform duration-300 font-bold uppercase tracking-wider">
                    Inspect
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </GlassPanel>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 glass-panel border-dashed border-zinc-800">
              <p className="text-sm text-zinc-500 font-mono">No templates matching your query were scanned.</p>
              <button
                onClick={onGenerateTab}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-bold font-mono mt-3 underline underline-offset-4 flex items-center gap-1 mx-auto cursor-pointer"
              >
                Launch Generator <Flame className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default DashboardHome;
