'use client';

import React, { useState } from 'react';
import GlassPanel from '../../components/ui/GlassPanel';
import { Flame, Sparkles, AlertCircle, Wand2, Slider, Brain, Cpu, Terminal } from 'lucide-react';
import { ProjectDetail } from '../../context/SavedProjectsContext';

interface HackathonModeProps {
  onGenerationComplete: (project: ProjectDetail) => void;
}

export const HackathonMode: React.FC<HackathonModeProps> = ({ onGenerationComplete }) => {
  const [scope, setScope] = useState(2); // 1 = minimal, 2 = full, 3 = enterprise
  const [theme, setTheme] = useState('Cybersecurity & Security Intercepts');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Accessing high-frequency prompt layers...');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const scopes = [
    { level: 1, label: "Barebones Prototype", description: "Completed in 24 hours. Focused on core logic & mocked schemas." },
    { level: 2, label: "Decent Full-Stack MVP", description: "Completed in 48 hours. Working WebSockets, dynamic UI, & simple REST API." },
    { level: 3, label: "Scale SaaS Scaffolding", description: "Completed in 72 hours. isolated DB pools, Stripe hooks & full Docker setup." }
  ];

  const handleGenerate = () => {
    setLoading(true);
    
    // Simulate high-velocity Hackathon Generation
    const statuses = [
      "Accessing high-frequency prompt layers...",
      "Stripping non-essential architectures...",
      "Synthesizing high-innovation MVP wireframes...",
      "Synthesizing quick-setup database templates...",
      "Done!"
    ];

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < statuses.length - 1) {
        idx++;
        setStatus(statuses[idx]);
      }
    }, 800);

    setTimeout(() => {
      clearInterval(interval);
      setLoading(false);
      
      const matchedScope = scopes.find(s => s.level === scope);

      const hackathonProject: ProjectDetail = {
        _id: 'hack_proj_' + Math.floor(Math.random() * 100000),
        title: "AegisShield eBPF Guard: Real-time Micro-Security Threat Sensor",
        domain: "Cybersecurity",
        difficulty: "Advanced",
        duration: scope === 1 ? "24 Hours" : scope === 2 ? "48 Hours" : "72 Hours",
        teamSize: 3,
        problemStatement: "Traditional servers lack simple, low-overhead tracing setups to detect rogue curl connections or terminal exploits in real time.",
        description: `Synthesized under extreme pressure for the *${theme}* vector. AegisShield processes system event logs at the kernel level using eBPF, sending threat warnings to a Next.js dashboard within milliseconds. Fully stripped of boilerplate code, focusing 100% on high-innovation MVP metrics.`,
        techStack: ["Go", "C++", "eBPF", "Next.js", "Tailwind CSS", "WebSockets"],
        features: [
          "Low-overhead kernel event tracing.",
          "Instantly streams connection anomalies over WebSockets.",
          "Visual alert matrix using Framer Motion color flashes."
        ],
        databaseSchema: `// Minimalist schema\nconst ThreatLog = new mongoose.Schema({\n  processName: String,\n  pid: Number,\n  threatScore: Number,\n  timestamp: { type: Date, default: Date.now }\n});`,
        folderStructure: `aegis-shield/\n├── bpf/ # kernel sensors\n├── gateway/ # Go WS broadcaster\n└── ui/ # Next.js frontend`,
        architecture: {
          diagramData: {
            nodes: [
              { id: "1", label: "Kernel (eBPF)", type: "sensor" },
              { id: "2", label: "Go broad-cast", type: "server" },
              { id: "3", label: "Next.js visual panel", type: "client" }
            ],
            connections: [
              { from: "1", to: "2", label: "Bpf map ring buffer" },
              { from: "2", to: "3", label: "WebSockets" }
            ]
          },
          description: "Stripped MVP. Kernel traces feed straight into Go socket gateway to maximize efficiency."
        },
        roadmap: [
          {
            week: 1,
            topic: "BPF Compiler setup & Broadcaster",
            tasks: ["Write kernel traces", "Wire Go channels"],
            resources: ["eBPF reference sheets"]
          }
        ],
        resumeImpact: {
          score: 95,
          skillsGained: ["eBPF", "Go Channels", "Socket Streams"],
          bulletPoints: [
            `Built an eBPF guard MVP processing kernel events in real-time during a 48h hackathon challenge.`,
            `Created lightweight Go broadcasting gateways streaming anomaly alerts with <5ms latency.`
          ]
        },
        readmeContent: `# 🛡️ AegisShield eBPF Guard\n\nHackathon MVP generated.`,
        codeStarter: `// main.go - Go threat broadcaster\npackage main`
      };

      onGenerationComplete(hackathonProject);
    }, 4000);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-[#030303]/95 z-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-orange-500 animate-spin" style={{ animationDuration: '6s' }} />
            <div className="absolute inset-2 w-16 h-16 rounded-full border-t border-b border-indigo-500 animate-spin" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-3 w-14 h-14 bg-gradient-to-tr from-orange-950 to-red-950 rounded-full flex items-center justify-center">
              <Flame className="w-7 h-7 text-orange-400 animate-bounce" />
            </div>
          </div>
          <h3 className="text-lg font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 uppercase font-mono">
            HACKATHON ENGINE OVERCLOCK
          </h3>
          <div className="max-w-md w-full glass-panel border-orange-500/20 bg-zinc-950/60 p-4 rounded-2xl mt-4">
            <div className="flex items-center gap-1.5 border-b border-zinc-800 pb-2 mb-2">
              <Terminal className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-[10px] font-mono text-zinc-500">hack-turbo@synthesizer-core</span>
            </div>
            <p className="text-xs text-zinc-300 font-mono tracking-wide pulse-glow">
              {status}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
          <h2 className="text-3xl font-extrabold tracking-wide text-white">HACKATHON MODE</h2>
        </div>
        <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
          Overclock your synthesis channels. Set the speed slider and synthesize highly innovative prototype concepts within seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sliders and Configurations */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <GlassPanel glowColor="pink" className="flex flex-col gap-6">
            
            {/* Scope select */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase">TARGET DEVELOPMENT SCOPE</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="3"
                  value={scope}
                  onChange={e => setScope(Number(e.target.value))}
                  className="flex-1 accent-orange-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs font-bold font-mono text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded uppercase">
                  Level {scope}
                </span>
              </div>
              
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl mt-1.5">
                <h5 className="text-xs font-bold text-zinc-200">{scopes[scope-1].label}</h5>
                <p className="text-[11px] text-zinc-400 mt-1 font-sans leading-relaxed">
                  {scopes[scope-1].description}
                </p>
              </div>
            </div>

            {/* Topic dropdown */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase">HACKATHON VECTOR THEME</label>
              <select
                value={theme}
                onChange={e => setTheme(e.target.value)}
                className="bg-zinc-950 border border-zinc-900 focus:border-orange-500/50 rounded-xl px-3.5 py-3 text-xs text-zinc-200 outline-none transition-all duration-300 cursor-pointer"
              >
                <option>Cybersecurity & Security Intercepts</option>
                <option>Smart Finance Yield & DeFi Protocols</option>
                <option>Immersive Graphics & WebAssembly</option>
                <option>Autonomous Agents & Swarm Robotics</option>
              </select>
            </div>

            <button
              onClick={handleGenerate}
              className="bg-gradient-to-tr from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white text-xs font-extrabold py-3.5 rounded-xl border border-orange-400/30 transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Flame className="w-4 h-4 animate-bounce" />
              Overclock & Synthesize MVP
            </button>

          </GlassPanel>
        </div>

        {/* Analytics panel info */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <GlassPanel className="flex flex-col gap-4 bg-gradient-to-br from-zinc-950 to-zinc-900 border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400">
              <Brain className="w-4.5 h-4.5" /> INNOVATION COEFFICIENTS
            </div>
            
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500">Uniqueness Vector</span>
                <span className="font-mono text-zinc-200">96.8%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500">Boilerplate Penalty</span>
                <span className="font-mono text-emerald-400">-0.00%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500">Pitchability index</span>
                <span className="font-mono text-zinc-200">92/100</span>
              </div>
            </div>

            <div className="border-t border-zinc-800/80 pt-4 flex gap-2 text-[10px] text-zinc-500 leading-relaxed font-sans">
              <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
              Hackathon blueprints are highly stripped structures geared towards rapid coding sessions. Fully compatible with Replit and Codespaces templates.
            </div>
          </GlassPanel>
        </div>

      </div>

    </div>
  );
};

export default HackathonMode;
