'use client';

import React, { useState } from 'react';
import { useSavedProjects } from '../../context/SavedProjectsContext';
import GlassPanel from '../../components/ui/GlassPanel';
import { Award, Briefcase, Sparkles, Copy, Check, Radar, Terminal, Star } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar as RadarComponent, ResponsiveContainer } from 'recharts';

// Preset skills matrix if no generated blueprints are bookmarked
const defaultSkillsMap = [
  { subject: 'Architectures', value: 80 },
  { subject: 'Frontend', value: 85 },
  { subject: 'Backend', value: 70 },
  { subject: 'Database', value: 65 },
  { subject: 'Inference/AI', value: 50 },
  { subject: 'DevOps', value: 55 }
];

export const ResumeBooster: React.FC = () => {
  const { savedProjects } = useSavedProjects();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Take the most recently saved project as reference, or fall back to general stats
  const activeProject = savedProjects[0] || null;

  const skillsData = activeProject 
    ? activeProject.resumeImpact.skillsGained.map((skill, index) => ({
        subject: skill.slice(0, 15),
        value: 90 - (index * 8)
      })).slice(0, 6)
    : defaultSkillsMap;

  // Add fillers if skillsData has less than 3 values (Radar needs at least 3 nodes to draw a polygon!)
  while (skillsData.length < 3) {
    skillsData.push({ subject: 'General Coding', value: 60 + skillsData.length * 10 });
  }

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <h2 className="text-3xl font-extrabold tracking-wide text-white">RESUME BOOSTER</h2>
        </div>
        <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
          Optimize your technical credentials. AI translates your synthesized project architectures into high-impact copy-paste resume highlights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Skill Fit Vector Diagram */}
        <GlassPanel className="lg:col-span-1 flex flex-col justify-between h-[340px]">
          <div>
            <span className="text-[10px] text-amber-400 font-mono font-bold tracking-widest uppercase">SKILLS VECTOR PROJECTION</span>
            <h4 className="text-sm font-bold text-zinc-200 mt-1 leading-snug">
              {activeProject ? activeProject.title.split(':')[0] : 'General Development'} Matrix
            </h4>
          </div>
          <div className="flex-1 min-h-0 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="90%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillsData}>
                <PolarGrid stroke="#27272a" />
                <PolarAngleAxis dataKey="subject" stroke="#a1a1aa" fontSize={9} fontStyle="monospace" />
                <PolarRadiusAxis stroke="#27272a" angle={30} domain={[0, 100]} tick={false} />
                <RadarComponent name="Skill Index" dataKey="value" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        {/* Copy paste highlights */}
        <GlassPanel className="lg:col-span-2 flex flex-col justify-between h-[340px]">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-amber-400 font-mono font-bold tracking-widest uppercase">RESUME HIGHLIGHT TEMPLATES</span>
              <span className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-mono">
                IMPACT: {activeProject ? `${activeProject.resumeImpact.score}%` : '85%'}
              </span>
            </div>
            <h4 className="text-sm font-bold text-zinc-200 mt-1">Copy-Paste Action Bullet Points</h4>
            <p className="text-xs text-zinc-500 leading-relaxed font-sans">
              Add these industry-tailored bullet points directly beneath your project sections on your resume.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col gap-3 mt-4 pr-1">
            {activeProject ? (
              activeProject.resumeImpact.bulletPoints.map((bp, i) => (
                <div key={i} className="flex gap-3 p-3 bg-zinc-950/60 border border-zinc-900 rounded-xl items-start justify-between group">
                  <div className="text-xs text-zinc-300 font-sans leading-relaxed">{bp}</div>
                  <button
                    onClick={() => handleCopy(bp, i)}
                    className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer flex-shrink-0"
                  >
                    {copiedIndex === i ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 p-3 bg-zinc-950/60 border border-zinc-900 rounded-xl items-start justify-between">
                  <div className="text-xs text-zinc-400 font-sans leading-relaxed">
                    "Architected a scalable full-stack web scaffold incorporating asynchronous WebSockets resulting in a 40% speed increase."
                  </div>
                  <button onClick={() => handleCopy("Architected a scalable full-stack web scaffold incorporating asynchronous WebSockets resulting in a 40% speed increase.", 98)} className="p-1.5 rounded-lg bg-zinc-900 text-zinc-500 cursor-pointer flex-shrink-0">
                    {copiedIndex === 98 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="flex gap-3 p-3 bg-zinc-950/60 border border-zinc-900 rounded-xl items-start justify-between">
                  <div className="text-xs text-zinc-400 font-sans leading-relaxed">
                    "Built custom API endpoints and decoupled database layers supporting multi-thread pipelines under heavy traffic simulations."
                  </div>
                  <button onClick={() => handleCopy("Built custom API endpoints and decoupled database layers supporting multi-thread pipelines under heavy traffic simulations.", 99)} className="p-1.5 rounded-lg bg-zinc-900 text-zinc-500 cursor-pointer flex-shrink-0">
                    {copiedIndex === 99 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </GlassPanel>

      </div>

      {/* Suggested Interview Preparation */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4.5 h-4.5 text-amber-500" />
          <h3 className="text-lg font-bold text-white tracking-wide">Technical Interview Preparation Guide</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <GlassPanel className="flex flex-col gap-3 bg-gradient-to-br from-zinc-950 to-zinc-900 border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
              <Terminal className="w-3.5 h-3.5" /> QUESTION VECTOR 01
            </div>
            <h5 className="text-sm font-bold text-zinc-200">"How did you resolve database connection concurrency issues in this architecture?"</h5>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              **AI Advice:** Answer by focusing on your connection pool. Explain that you utilized dynamic Mongoose connection managers, setting `poolSize` limits and recycling connection sockets to avoid RAM thrashing.
            </p>
          </GlassPanel>

          <GlassPanel className="flex flex-col gap-3 bg-gradient-to-br from-zinc-950 to-zinc-900 border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
              <Terminal className="w-3.5 h-3.5" /> QUESTION VECTOR 02
            </div>
            <h5 className="text-sm font-bold text-zinc-200">"Why did you decouple the WebSocket signal parser from your client app routing layers?"</h5>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              **AI Advice:** Focus on computational modularity. decuopling allowed you to process high-frequency signals at the edge using Python/FastAPI without blocking client JS asset loads or affecting rendering speeds.
            </p>
          </GlassPanel>
        </div>
      </div>

    </div>
  );
};

export default ResumeBooster;
