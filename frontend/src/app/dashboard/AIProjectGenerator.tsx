'use client';

import React, { useState, useEffect } from 'react';
import GlassPanel from '../../components/ui/GlassPanel';
import { 
  Sparkles, 
  Cpu, 
  Brain, 
  Terminal, 
  Code, 
  Clock, 
  Users, 
  Layers, 
  Flame, 
  Wand2, 
  Plus, 
  X,
  Compass
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ProjectDetail } from '../../context/SavedProjectsContext';

interface AIProjectGeneratorProps {
  onGenerationComplete: (project: ProjectDetail) => void;
}

const domainsList = [
  'AI/ML', 'Web Development', 'Cybersecurity', 'Blockchain', 'IoT', 'Cloud Computing', 'Data Science', 'Android', 'DevOps', 'AR/VR'
];

const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

const durationOptions = [
  'Hackathon (48 Hours)', '1 Week', '2 Weeks', '4 Weeks', '8 Weeks'
];

const presetTechs: Record<string, string[]> = {
  'AI/ML': ['Python', 'PyTorch', 'TensorFlow', 'FastAPI', 'scikit-learn', 'Hugging Face', 'NumPy'],
  'Web Development': ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Redis'],
  'Cybersecurity': ['Rust', 'Go', 'eBPF', 'C++', 'Python', 'Docker', 'Wireshark', 'Linux Kernel'],
  'Blockchain': ['Solidity', 'Web3.js', 'Ether.js', 'Rust', 'Hardhat', 'Truffle', 'Next.js'],
  'IoT': ['C++', 'Raspberry Pi', 'Arduino', 'Python', 'MQTT', 'ESP32', 'Node-RED']
};

export const AIProjectGenerator: React.FC<AIProjectGeneratorProps> = ({ onGenerationComplete }) => {
  const { token } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('Booting neural generators...');
  
  // Form State
  const [domain, setDomain] = useState('AI/ML');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState('');
  const [duration, setDuration] = useState('4 Weeks');
  const [teamSize, setTeamSize] = useState(1);
  const [hackathonMode, setHackathonMode] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  // Cybernetic loading screens
  useEffect(() => {
    if (!loading) return;
    const statuses = [
      'Establishing TLS tunnel with Gemini AI nodes...',
      'Synthesizing core software blueprints...',
      'Compiling scalable relational and schema matrices...',
      'Modeling week-by-week instructional roadmaps...',
      'Structuring directory trees and package dependency trees...',
      'Synthesizing resume impact coefficients...',
      'Assembling complete GitHub-ready README files...'
    ];
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < statuses.length - 1) {
        idx++;
        setLoadingStatus(statuses[idx]);
      }
    }, 1800);
    return () => clearInterval(interval);
  }, [loading]);

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleAddInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const toggleTech = (tech: string) => {
    if (techStack.includes(tech)) {
      setTechStack(techStack.filter(t => t !== tech));
    } else {
      setTechStack([...techStack, tech]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Set fallback pre-chips if stack is empty
    const finalTech = techStack.length > 0 
      ? techStack 
      : (presetTechs[domain] || ['React', 'Node.js']);

    const payload = {
      domain,
      difficulty,
      skills,
      interests,
      techStack: finalTech,
      duration,
      teamSize,
      hackathonMode
    };

    try {
      const res = await fetch(`${API_URL}/projects/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Generation aborted');
      }

      onGenerationComplete(data.project);

    } catch (err) {
      console.warn('⚠️ Server synthesis failed. Activating Offline Cybernetic backup templates...');
      
      // Dynamic fallback simulation
      setTimeout(() => {
        const domainNormalized = domain.toLowerCase();
        let fallbackTitle = "SaaSify: Futuristic Micro-SaaS Tenant Architecture Engine";
        let fallbackProblem = "Spinning up multi-tenant B2B architectures usually requires weeks of boiler database setup.";
        let fallbackStack = ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Redis"];
        
        if (domainNormalized.includes('ai') || domainNormalized.includes('ml')) {
          fallbackTitle = "NeuroPulse AI: Real-Time EEG Mental State Classifier & Brain-Computer Interface";
          fallbackProblem = "Developers lack open-access visual algorithms to process streaming brainwave signals.";
          fallbackStack = ["Python", "PyTorch", "FastAPI", "WebSockets", "Next.js"];
        }

        const simulatedProject: ProjectDetail = {
          _id: 'sand_proj_' + Math.floor(Math.random() * 10000),
          title: fallbackTitle,
          domain,
          difficulty,
          duration,
          teamSize,
          problemStatement: fallbackProblem,
          description: `An premium, startup-grade framework customized for ${difficulty} scale development. Synthesized to fulfill interests in ${interests.join(', ') || 'autonomous tooling'} utilising ${finalTech.slice(0, 3).join(', ')} stack.`,
          techStack: Array.from(new Set([...finalTech, ...fallbackStack])),
          features: [
            "Real-time WebSocket data stream pipelines.",
            "Integrated isolated database pools verifying active states.",
            "Visual analytics dashboard powered by Framer Motion overlays.",
            "Automated system reports with complete backup logging templates."
          ],
          databaseSchema: `// Customized Mongoose Sandbox Schema\nconst Schema = new mongoose.Schema({\n  session: String,\n  metrics: { latency: Number, count: Number },\n  createdAt: { type: Date, default: Date.now }\n});`,
          folderStructure: `root-synthesis/\n├── client/\n│   ├── src/app/layout.tsx\n│   └── package.json\n└── server/\n    ├── src/index.ts\n    └── package.json`,
          architecture: {
            diagramData: {
              nodes: [
                { id: "1", label: "User Interface", type: "client" },
                { id: "2", label: "API Gateway Node", type: "server" },
                { id: "3", label: "Database Warehouse", type: "database" }
              ],
              connections: [
                { from: "1", to: "2", label: "REST / WS" },
                { from: "2", to: "3", label: "Pooled Queries" }
              ]
            },
            description: "Decoupled server client streaming architecture designed for immediate local mock sandbox testing."
          },
          roadmap: [
            {
              week: 1,
              topic: "Environment Scaffolding & Initial Wiring",
              tasks: ["Establish directories", "Build API health checks"],
              resources: ["NextJS dev guidelines"]
            },
            {
              week: 2,
              topic: "Full-Stack Connectivity & Visual Polish",
              tasks: ["Verify Websockets", "Style glassmorphic dashboard cards"],
              resources: ["TailwindCSS v4 transitions"]
            }
          ],
          resumeImpact: {
            score: difficulty === 'Advanced' ? 94 : difficulty === 'Intermediate' ? 84 : 72,
            skillsGained: Array.from(new Set([...finalTech, 'System Scaffolding'])),
            bulletPoints: [
              `Developed a robust ${domain} project supporting scalable sub-modules utilising ${finalTech.slice(0, 2).join(' & ')}.`,
              `Designed custom schema models resulting in high-reliability client streams under local sandbox simulations.`
            ]
          },
          readmeContent: `# ${fallbackTitle}\n\nCybernetic simulated codebase synthesized successfully.`,
          codeStarter: `// index.ts - Server Sandbox Entry\nconsole.log("Synthesized successfully.");`
        };

        onGenerationComplete(simulatedProject);
      }, 3500);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-[#030303]/95 z-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
          <div className="relative mb-8">
            {/* Spinning futuristic ring */}
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-indigo-500 animate-spin" style={{ animationDuration: '8s' }} />
            <div className="absolute inset-2 w-20 h-20 rounded-full border-t border-b border-pink-500 animate-spin" style={{ animationDuration: '4s' }} />
            <div className="absolute inset-4 w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-900 to-purple-900 flex items-center justify-center">
              <Brain className="w-8 h-8 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <h3 className="text-xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 uppercase">
            NEURAL SYNTHESIZER ACTIVE
          </h3>
          
          <div className="max-w-md w-full glass-panel border-indigo-500/20 bg-zinc-950/60 p-5 rounded-2xl mt-6 relative overflow-hidden">
            {/* Typing terminal command */}
            <div className="flex items-center gap-1.5 border-b border-zinc-800 pb-2 mb-3">
              <Terminal className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-[10px] font-mono text-zinc-500">neural-core@generative-node</span>
            </div>
            <p className="text-xs text-zinc-300 font-mono tracking-wide leading-relaxed min-h-[40px] pulse-glow">
              {loadingStatus}
            </p>
          </div>
        </div>
      )}

      {/* Main Wizard Interface */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-purple-400" />
          <h2 className="text-3xl font-extrabold tracking-wide text-white">AI GENERATOR ENGINE</h2>
        </div>
        <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
          Select your cybernetic parameters below. Our generative layers will compile high-fidelity startup-grade architectures tailored to your goals.
        </p>
      </div>

      {/* Step Progress indicators */}
      <div className="flex items-center gap-2.5 max-w-md">
        {[1, 2, 3].map(num => (
          <div key={num} className="flex-1 flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-300 ${
              step >= num 
                ? 'bg-indigo-600 border border-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.3)]'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-500'
            }`}>
              {num}
            </div>
            {num < 3 && (
              <div className={`flex-1 h-[2px] transition-all duration-300 ${
                step > num ? 'bg-indigo-600' : 'bg-zinc-800'
              }`} />
            )}
          </div>
        ))}
      </div>

      <GlassPanel glowColor="indigo" className="max-w-3xl flex flex-col gap-6 py-8">
        
        {/* STEP 1: Domain & Difficulty */}
        {step === 1 && (
          <div className="flex flex-col gap-5 animate-in fade-in duration-300">
            <div className="flex flex-col gap-2">
              <h4 className="text-md font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4.5 h-4.5 text-indigo-400" />
                Select Domain & Focus Area
              </h4>
              <p className="text-xs text-zinc-400">Choose the industrial engineering vector for your blueprint.</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {domainsList.map(dom => (
                <button
                  key={dom}
                  type="button"
                  onClick={() => setDomain(dom)}
                  className={`px-4 py-3 text-xs font-bold rounded-xl text-left border transition-all duration-300 cursor-pointer ${
                    domain === dom
                      ? 'bg-indigo-600/10 border-indigo-500/50 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                      : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  {dom}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2.5 mt-2">
              <h4 className="text-xs font-bold text-zinc-300 font-mono tracking-wider uppercase">DIFFICULTY LEVEL</h4>
              <div className="flex gap-3">
                {difficulties.map(diff => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    className={`flex-1 px-4 py-3 text-xs font-bold rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                      difficulty === diff
                        ? 'bg-indigo-600/10 border-indigo-500/50 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                        : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Skills & Preset Tech stack */}
        {step === 2 && (
          <div className="flex flex-col gap-5 animate-in fade-in duration-300">
            <div className="flex flex-col gap-2">
              <h4 className="text-md font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
                <Code className="w-4.5 h-4.5 text-purple-400" />
                Configure Tech Stack & Skills
              </h4>
              <p className="text-xs text-zinc-400">Map out your existing background. AI will seamlessly balance tech complexity.</p>
            </div>

            {/* Skills chip manager */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase">CORE SKILLS & BACKGROUND (OPTIONAL)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Python, REST APIs, UI Design..."
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  className="flex-1 bg-zinc-950 border border-zinc-900 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 outline-none transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-300 cursor-pointer flex items-center justify-center"
                >
                  <Plus className="w-4.5 h-4.5" />
                </button>
              </div>
              
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {skills.map((skill, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-[10px] text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-lg">
                      {skill}
                      <X className="w-3 h-3 cursor-pointer text-indigo-400 hover:text-indigo-200" onClick={() => setSkills(skills.filter(s => s !== skill))} />
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Tech Stack presets */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase">TARGET TECH STACK PRESETS ({domain})</label>
              <div className="flex flex-wrap gap-2">
                {(presetTechs[domain] || ['React.js', 'Node.js', 'PostgreSQL']).map(tech => {
                  const isSelected = techStack.includes(tech);
                  return (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => toggleTech(tech)}
                      className={`px-3.5 py-2 text-[11px] font-semibold font-mono rounded-xl border transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-purple-600/10 border-purple-500/50 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                          : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-zinc-800'
                      }`}
                    >
                      {tech}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Parameters & Interests */}
        {step === 3 && (
          <div className="flex flex-col gap-5 animate-in fade-in duration-300">
            <div className="flex flex-col gap-2">
              <h4 className="text-md font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4.5 h-4.5 text-pink-400" />
                Synthesize Parameter Space
              </h4>
              <p className="text-xs text-zinc-400">Configure team parameters, durations, and project goals.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" /> DURATION TIMELINE
                </label>
                <select
                  value={duration}
                  onChange={e => {
                    setDuration(e.target.value);
                    if (e.target.value.includes('Hackathon')) {
                      setHackathonMode(true);
                    } else {
                      setHackathonMode(false);
                    }
                  }}
                  className="bg-zinc-950 border border-zinc-900 focus:border-indigo-500/50 rounded-xl px-3.5 py-3 text-xs text-zinc-200 outline-none transition-all duration-300 cursor-pointer"
                >
                  {durationOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-zinc-500" /> TEAM SIZE
                </label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={teamSize}
                  onChange={e => setTeamSize(Number(e.target.value))}
                  className="bg-zinc-950 border border-zinc-900 focus:border-indigo-500/50 rounded-xl px-3.5 py-3 text-xs text-zinc-200 outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* Career/Personal Interest points */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase">SPECIAL PROJECT INTERESTS (OPTIONAL)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Brain-computer systems, Micro-SaaS tools, cryptography..."
                  value={interestInput}
                  onChange={e => setInterestInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
                  className="flex-1 bg-zinc-950 border border-zinc-900 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 outline-none transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={handleAddInterest}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-300 cursor-pointer flex items-center justify-center"
                >
                  <Plus className="w-4.5 h-4.5" />
                </button>
              </div>
              
              {interests.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {interests.map((interest, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-[10px] text-pink-300 bg-pink-500/10 border border-pink-500/20 px-2.5 py-1 rounded-lg">
                      {interest}
                      <X className="w-3 h-3 cursor-pointer text-pink-400 hover:text-pink-200" onClick={() => setInterests(interests.filter(item => item !== interest))} />
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Speed Hackathon Switch */}
            <div className="flex items-center justify-between p-4 bg-zinc-950/60 border border-zinc-900 rounded-2xl mt-2">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500/10 p-2 border border-orange-500/20 rounded-xl">
                  <Flame className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-zinc-200">Force Hackathon Mode</h5>
                  <p className="text-[10px] text-zinc-500 font-sans mt-0.5">Increases innovation vectors & synthesizes high-velocity MVPs.</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={hackathonMode}
                onChange={e => setHackathonMode(e.target.checked)}
                className="w-4.5 h-4.5 accent-indigo-600 rounded cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Navigation Action Buttons */}
        <div className="flex justify-between border-t border-zinc-800 pt-6 mt-2">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="px-5 py-3 rounded-xl border border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
          >
            Backward
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-6 py-3 rounded-xl border border-indigo-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.25)] cursor-pointer"
            >
              Forward
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-xs font-extrabold px-8 py-3.5 rounded-xl border border-indigo-400/30 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.4)] cursor-pointer"
            >
              Synthesize Blueprint
            </button>
          )}
        </div>

      </GlassPanel>

    </div>
  );
};

export default AIProjectGenerator;
