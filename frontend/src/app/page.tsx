'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import GlassPanel from '../components/ui/GlassPanel';
import FloatingParticles from '../components/animations/FloatingParticles';
import { 
  Sparkles, 
  Terminal, 
  Wand2, 
  Layers, 
  Flame, 
  ShieldCheck, 
  ArrowRight,
  ChevronDown,
  Cpu,
  Brain
} from 'lucide-react';

const technologiesList = [
  'Next.js', 'PyTorch', 'Rust', 'FastAPI', 'Solidity', 'Go', 'Tailwind CSS', 'Docker', 'WebSockets', 'Kubernetes', 'gRPC', 'TypeScript'
];

const faqItems = [
  {
    q: "How does the AI synthesize the project blueprints?",
    a: "The platform integrates with Gemini AI models utilizing hyper-engineered system prompt instructions to synthesize real-time software specifications, database models, detailed week-by-week roadmaps, and full directory architectures."
  },
  {
    q: "Can I use the generated blueprints immediately for my portfolio?",
    a: "Yes! Every generated blueprint contains industry-compliant structures, a complete copy-paste markdown README.md, and code boilerplate classes to spin up repositories instantly."
  },
  {
    q: "Do I need a MongoDB connection to run the application?",
    a: "No! The application features a robust offline Sandbox fallback that uses simulated mock state managers, so it functions flawlessly out-of-the-box."
  }
];

export default function LandingPage() {
  const [typingText, setTypingText] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Interactive Mini-Demo State
  const [demoLevel, setDemoLevel] = useState('Intermediate');
  const [demoDomain, setDemoDomain] = useState('AI/ML');
  const [demoResult, setDemoResult] = useState<any>(null);
  const [demoLoading, setDemoLoading] = useState(false);

  // Core typing loops
  useEffect(() => {
    const ideas = [
      "Real-Time EEG signal classification with PyTorch...",
      "Multi-Tenant Micro-SaaS scaffolding with Redis pools...",
      "eBPF-powered kernel intrusion sensors in Rust...",
      "Decentralized yield liquidation protocols with Solidity..."
    ];
    let ideaIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let speed = 80;

    const handleType = () => {
      const currentIdea = ideas[ideaIdx];
      if (isDeleting) {
        setTypingText(currentIdea.slice(0, charIdx - 1));
        charIdx--;
        speed = 40;
      } else {
        setTypingText(currentIdea.slice(0, charIdx + 1));
        charIdx++;
        speed = 80;
      }

      if (!isDeleting && charIdx === currentIdea.length) {
        isDeleting = true;
        speed = 1500; // Pause at end
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        ideaIdx = (ideaIdx + 1) % ideas.length;
        speed = 400; // Pause at start
      }

      setTimeout(handleType, speed);
    };

    const timer = setTimeout(handleType, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleTriggerDemo = () => {
    setDemoLoading(true);
    setDemoResult(null);
    
    setTimeout(() => {
      setDemoLoading(false);
      if (demoDomain === 'AI/ML') {
        setDemoResult({
          title: "NeuroPulse AI Engine",
          desc: "Processes 250Hz temporal EEG streams via Python WebSockets, classifying mental fatigue using custom PyTorch CNN nodes.",
          tech: ["PyTorch", "FastAPI", "WebSockets"]
        });
      } else {
        setDemoResult({
          title: "SaaSify Boilerplate",
          desc: "Stitches wildcard subdomain middleware intercepts with isolated dynamic Mongoose pooling structures.",
          tech: ["Next.js", "Redis", "MongoDB"]
        });
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-[#f5f5f7] relative grid-bg flex flex-col justify-between overflow-x-hidden">
      
      {/* Background stars */}
      <FloatingParticles />

      {/* Header element */}
      <header className="z-10 px-6 py-5 flex items-center justify-between border-b border-white/5 bg-[#030303]/60 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <Terminal className="w-5 h-5 text-indigo-400" />
          <span className="font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400 text-md">
            AI PROJECT IDEA GENERATOR
          </span>
        </div>
        <Link
          href="/dashboard"
          className="bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.1)] cursor-pointer"
        >
          Workspace Hub
        </Link>
      </header>

      {/* Hero section */}
      <section className="z-10 px-6 pt-16 pb-20 flex flex-col items-center justify-center text-center max-w-4xl mx-auto gap-8">
        
        {/* Dynamic badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] text-indigo-300 font-mono tracking-widest uppercase animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          GENERATIVE INTELLIGENCE VERSION 2.5
        </div>

        {/* Breathtaking titles */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
          Synthesize Premium Software <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Blueprints Instantly
          </span>
        </h1>

        {/* Dynamic typewriter */}
        <div className="min-h-[24px] text-zinc-400 font-mono text-sm tracking-wide bg-zinc-950 border border-zinc-900 px-4 py-2 rounded-xl">
          <span className="text-indigo-400">$</span> synth --active-idea:{" "}
          <span className="text-zinc-200">{typingText}</span>
          <span className="w-1.5 h-3.5 bg-indigo-400 inline-block ml-0.5 animate-pulse" />
        </div>

        <p className="text-sm md:text-md text-zinc-400 max-w-2xl leading-relaxed">
          Skip generic todo list templates. Synthesize professional, unique, and highly structured codebase specifications tailored with database models, vector diagrams, and week-by-week roadmap roadmaps.
        </p>

        {/* Call to action */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Link
            href="/dashboard"
            className="bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-sm px-8 py-3.5 rounded-xl border border-indigo-400/30 transition-all duration-300 shadow-[0_0_25px_rgba(99,102,241,0.4)] flex items-center gap-2 cursor-pointer"
          >
            Launch Neural Workspace
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

      {/* Tech marquee strip */}
      <section className="z-10 border-y border-white/5 py-4 bg-zinc-950/40 relative overflow-hidden flex items-center">
        <div className="flex gap-10 whitespace-nowrap animate-marquee">
          {Array.from({ length: 3 }).flatMap(() => technologiesList).map((tech, i) => (
            <span key={i} className="text-[11px] font-mono font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-zinc-700" />
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Interactive Micro Demo */}
      <section className="z-10 px-6 py-20 max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Pitch */}
        <div className="flex flex-col gap-4">
          <span className="text-[10px] text-pink-400 font-mono font-bold tracking-widest uppercase">SANDBOX ENGINE PREVIEW</span>
          <h3 className="text-2xl font-extrabold tracking-wide text-white leading-snug">
            Interactive Synthesis
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Adjust the slider parameters to test how our generative pipeline models stack structures. Click "Synthesize Mock" to verify.
          </p>

          <div className="flex flex-col gap-3.5 mt-2">
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-mono text-zinc-500">LEVEL</span>
              <div className="flex gap-2">
                {['Intermediate', 'Advanced'].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setDemoLevel(lvl)}
                    className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg border transition-all duration-300 cursor-pointer ${
                      demoLevel === lvl ? 'bg-indigo-600/10 border-indigo-500/40 text-indigo-300' : 'bg-zinc-950 border-zinc-900 text-zinc-500'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-mono text-zinc-500">VECTOR AREA</span>
              <div className="flex gap-2">
                {['AI/ML', 'Web Dev'].map(dom => (
                  <button
                    key={dom}
                    onClick={() => setDemoDomain(dom)}
                    className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg border transition-all duration-300 cursor-pointer ${
                      demoDomain === dom ? 'bg-indigo-600/10 border-indigo-500/40 text-indigo-300' : 'bg-zinc-950 border-zinc-900 text-zinc-500'
                    }`}
                  >
                    {dom}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleTriggerDemo}
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold text-xs py-2 rounded-xl transition-all duration-300 cursor-pointer mt-1.5 flex items-center justify-center gap-1.5"
            >
              <Wand2 className="w-3.5 h-3.5" />
              Synthesize Mock
            </button>
          </div>
        </div>

        {/* Demo Result Visual Card */}
        <div className="flex items-center justify-center min-h-[220px]">
          {demoLoading ? (
            <div className="glass-panel border-indigo-500/20 w-full h-44 flex flex-col items-center justify-center text-center p-6 rounded-2xl animate-pulse">
              <Brain className="w-8 h-8 text-indigo-400 animate-bounce" />
              <span className="text-[10px] font-mono text-zinc-500 mt-3">Synthesizing blueprint...</span>
            </div>
          ) : demoResult ? (
            <GlassPanel glowColor="indigo" className="w-full animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center">
                <span className="text-[8px] bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-mono px-2 py-0.5 rounded uppercase">
                  {demoDomain}
                </span>
                <span className="text-[9px] text-zinc-500 font-mono">{demoLevel}</span>
              </div>
              <h4 className="text-sm font-extrabold text-white mt-2">{demoResult.title}</h4>
              <p className="text-[11px] text-zinc-400 mt-1.5 leading-relaxed font-sans">
                {demoResult.desc}
              </p>
              <div className="flex gap-1.5 mt-3 border-t border-zinc-900 pt-2.5">
                {demoResult.tech.map((t: string) => (
                  <span key={t} className="text-[9px] font-mono text-zinc-500 bg-zinc-950 border border-zinc-900 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </GlassPanel>
          ) : (
            <div className="glass-panel border-dashed border-zinc-800 w-full h-44 flex items-center justify-center text-center p-6 rounded-2xl">
              <p className="text-[11px] text-zinc-600 font-mono max-w-[180px]">Adjust settings and trigger synthesis scanner.</p>
            </div>
          )}
        </div>

      </section>

      {/* Operational Features */}
      <section className="z-10 px-6 py-10 max-w-4xl mx-auto w-full flex flex-col gap-6">
        <div className="text-center">
          <span className="text-[10px] text-indigo-400 font-mono font-bold tracking-widest uppercase">SYNTHESIS HIGHLIGHTS</span>
          <h3 className="text-2xl font-extrabold text-white mt-1">Core Operational Services</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <GlassPanel className="flex flex-col gap-2 p-5">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <h5 className="text-xs font-extrabold text-white uppercase tracking-wider">Blueprints</h5>
            <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">Synthesize complete specifications, database models, and structured tree maps.</p>
          </GlassPanel>
          <GlassPanel className="flex flex-col gap-2 p-5">
            <Layers className="w-5 h-5 text-purple-400" />
            <h5 className="text-xs font-extrabold text-white uppercase tracking-wider">Roadmaps</h5>
            <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">Generate week-by-week interactive progress trackers with tasks and learning items.</p>
          </GlassPanel>
          <GlassPanel className="flex flex-col gap-2 p-5">
            <ShieldCheck className="w-5 h-5 text-pink-400" />
            <h5 className="text-xs font-extrabold text-white uppercase tracking-wider">Portfolio</h5>
            <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">Derive strong bullet points for resumes and technical questions for interview prep.</p>
          </GlassPanel>
        </div>
      </section>

      {/* Accordion FAQ Accordion */}
      <section className="z-10 px-6 py-20 max-w-2xl mx-auto w-full flex flex-col gap-6">
        <div className="text-center mb-2">
          <h3 className="text-2xl font-extrabold text-white">Frequently Asked Questions</h3>
        </div>

        <div className="flex flex-col gap-3">
          {faqItems.map((item, i) => {
            const isActive = activeFaq === i;
            return (
              <GlassPanel
                key={i}
                className="py-3 px-4 flex flex-col justify-between gap-1.5 cursor-pointer"
                onClick={() => setActiveFaq(isActive ? null : i)}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-xs font-bold text-zinc-300 font-sans">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
                </div>
                {isActive && (
                  <p className="text-xs text-zinc-500 leading-relaxed pt-2 border-t border-zinc-900 font-sans">
                    {item.a}
                  </p>
                )}
              </GlassPanel>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="z-10 border-t border-white/5 py-6 text-center text-[10px] text-zinc-600 font-mono uppercase bg-zinc-950/20">
        © 2026 AI Project Idea Generator. Under NextGen-Projector Framework. MIT License.
      </footer>

    </div>
  );
}
