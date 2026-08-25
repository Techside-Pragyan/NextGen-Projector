'use client';

import React, { useState } from 'react';
import GlassPanel from '../../components/ui/GlassPanel';
import { useSavedProjects, ProjectDetail } from '../../context/SavedProjectsContext';
import { 
  ArrowLeft, 
  Bookmark, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  Terminal, 
  Map, 
  FolderTree, 
  Database as DbIcon, 
  ExternalLink,
  Code as CodeIcon,
  Sparkles,
  Server,
  Layers,
  Award
} from 'lucide-react';

interface ProjectBlueprintViewerProps {
  project: ProjectDetail;
  onBack: () => void;
}

export const ProjectBlueprintViewer: React.FC<ProjectBlueprintViewerProps> = ({ project, onBack }) => {
  const { saveProject, unsaveProject, isSaved } = useSavedProjects();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const saved = isSaved(project._id);

  // SVG Node positions for static canvas drawing
  const nodePositions: Record<string, { x: number; y: number; color: string; bg: string }> = {
    "1": { x: 80, y: 110, color: 'text-indigo-400', bg: 'fill-indigo-950/40 stroke-indigo-500/40' },
    "2": { x: 260, y: 110, color: 'text-purple-400', bg: 'fill-purple-950/40 stroke-purple-500/40' },
    "3": { x: 440, y: 70, color: 'text-teal-400', bg: 'fill-teal-950/40 stroke-teal-500/40' },
    "4": { x: 440, y: 150, color: 'text-pink-400', bg: 'fill-pink-950/40 stroke-pink-500/40' },
    "5": { x: 80, y: 150, color: 'text-orange-400', bg: 'fill-orange-950/40 stroke-orange-500/40' }
  };

  const toggleTask = (task: string) => {
    if (completedTasks.includes(task)) {
      setCompletedTasks(completedTasks.filter(t => t !== task));
    } else {
      setCompletedTasks([...completedTasks, task]);
    }
  };

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 1500);
  };

  const handleDownloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([project.codeStarter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "starter_code.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Calculate Roadmap progress
  const allTasks = project.roadmap.flatMap(step => step.tasks);
  const progressPercent = allTasks.length > 0
    ? Math.round((completedTasks.length / allTasks.length) * 100)
    : 0;

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300 pb-20">
      
      {/* Navigation and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-2 bg-zinc-900 border border-zinc-800/80 px-4 py-2.5 rounded-xl cursor-pointer hover:border-zinc-700 transition-colors duration-200 self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Hub
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => saved ? unsaveProject(project._id) : saveProject(project)}
            className={`text-xs font-bold px-4 py-2.5 rounded-xl border transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              saved 
                ? 'bg-pink-600/10 border-pink-500/30 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.15)]'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            {saved ? 'Blueprint Saved' : 'Save Blueprint'}
          </button>
          
          <button
            onClick={() => handleCopy(project.readmeContent, 'all')}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.25)] transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
          >
            {copiedSection === 'all' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            Copy Markdown README
          </button>
        </div>
      </div>

      {/* Header Info */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <span className="text-[9px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono font-bold tracking-widest px-2.5 py-0.5 rounded uppercase">
            {project.domain}
          </span>
          <span className="text-[10px] text-zinc-500 font-mono">
            {project.difficulty} • {project.duration} Timeline
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-white leading-tight">
          {project.title}
        </h1>
        <p className="text-xs text-zinc-400 font-mono flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          RESUME IMPACT VALUE SCORE: <span className="text-amber-400 font-bold font-sans text-sm">{project.resumeImpact.score}%</span>
        </p>
      </div>

      {/* Core Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Detailed Description */}
          <GlassPanel className="flex flex-col gap-4">
            <h3 className="text-md font-bold text-zinc-200 tracking-wide uppercase border-b border-zinc-800 pb-2">Overview Description</h3>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-col gap-2 mt-2">
              <h5 className="text-xs font-bold text-zinc-300 font-mono tracking-wider uppercase">PROBLEM STATEMENT</h5>
              <div className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-xl text-xs text-zinc-400 leading-relaxed font-sans italic">
                "{project.problemStatement}"
              </div>
            </div>
          </GlassPanel>

          {/* Dynamic SVG Architecture Diagram */}
          <GlassPanel className="flex flex-col gap-4 h-[350px]">
            <div>
              <span className="text-[10px] text-indigo-400 font-mono font-bold tracking-widest uppercase">DYNAMIC SVG TOPOLOGY</span>
              <h3 className="text-sm font-bold text-zinc-200 mt-0.5">System Architecture Flow</h3>
            </div>
            
            <div className="flex-1 border border-zinc-900 bg-zinc-950/60 rounded-2xl relative overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full max-w-[500px]" viewBox="0 0 520 220">
                {/* Connectors lines */}
                {project.architecture.diagramData.connections?.map((conn, index) => {
                  const fromNode = nodePositions[conn.from] || nodePositions["1"];
                  const toNode = nodePositions[conn.to] || nodePositions["2"];
                  
                  return (
                    <g key={index}>
                      {/* Base connection line */}
                      <path
                        d={`M ${fromNode.x} ${fromNode.y} Q ${(fromNode.x+toNode.x)/2} ${(fromNode.y+toNode.y)/2 - 10} ${toNode.x} ${toNode.y}`}
                        fill="none"
                        stroke="rgba(99, 102, 241, 0.25)"
                        strokeWidth="1.5"
                      />
                      {/* Flowing animated dash tracker */}
                      <path
                        d={`M ${fromNode.x} ${fromNode.y} Q ${(fromNode.x+toNode.x)/2} ${(fromNode.y+toNode.y)/2 - 10} ${toNode.x} ${toNode.y}`}
                        fill="none"
                        stroke="#818cf8"
                        strokeWidth="1.5"
                        strokeDasharray="4, 12"
                        className="animate-[marquee_5s_linear_infinite]"
                      />
                    </g>
                  );
                })}

                {/* Nodes drawing */}
                {project.architecture.diagramData.nodes?.map((node, index) => {
                  const pos = nodePositions[node.id] || { x: 80 + index * 100, y: 110, color: 'text-zinc-400', bg: 'fill-zinc-900/60 stroke-zinc-800' };
                  
                  return (
                    <g key={index}>
                      <rect
                        x={pos.x - 55}
                        y={pos.y - 20}
                        width="110"
                        height="40"
                        rx="8"
                        className={`${pos.bg} stroke-[1.5] cursor-pointer hover:stroke-indigo-400 transition-all duration-300`}
                      />
                      <text
                        x={pos.x}
                        y={pos.y + 4}
                        textAnchor="middle"
                        fill="#d4d4d8"
                        fontSize="8"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {node.label.length > 20 ? `${node.label.slice(0, 16)}...` : node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            
            <p className="text-[11px] text-zinc-500 font-sans leading-relaxed">
              **Flow Topology:** {project.architecture.description}
            </p>
          </GlassPanel>

          {/* Interactive Roadmap progress tracker */}
          <GlassPanel className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-2">
              <h3 className="text-md font-bold text-zinc-200 tracking-wide uppercase flex items-center gap-2">
                <Map className="w-4.5 h-4.5 text-indigo-400" />
                Chronological Development Roadmap
              </h3>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-zinc-500">Progress:</span>
                <span className="text-indigo-400 font-bold font-sans text-sm">{progressPercent}%</span>
              </div>
            </div>

            {/* Custom progress bar */}
            <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
            </div>

            <div className="flex flex-col gap-5 mt-2">
              {project.roadmap.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start border-l border-zinc-800 pl-4 relative ml-2">
                  {/* Timeline dot */}
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-zinc-950 border-2 border-indigo-500" />
                  
                  <div className="flex-1 flex flex-col gap-2">
                    <span className="text-[9px] text-indigo-400 font-mono font-bold tracking-wider uppercase">
                      WEEK {step.week} • {step.topic}
                    </span>
                    
                    {/* Task checklist */}
                    <div className="flex flex-col gap-2">
                      {step.tasks.map((task, tid) => {
                        const isDone = completedTasks.includes(task);
                        return (
                          <div
                            key={tid}
                            onClick={() => toggleTask(task)}
                            className="flex items-start gap-2.5 cursor-pointer group"
                          >
                            <CheckCircle2 className={`w-4 h-4 mt-0.5 transition-colors duration-200 ${
                              isDone ? 'text-indigo-400' : 'text-zinc-600 group-hover:text-zinc-400'
                            }`} />
                            <span className={`text-xs font-sans leading-relaxed ${
                              isDone ? 'text-zinc-500 line-through' : 'text-zinc-300 group-hover:text-zinc-200'
                            }`}>
                              {task}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>

        </div>

        {/* Right 1 Column sidebar widgets */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Tech stack badge block */}
          <GlassPanel className="flex flex-col gap-3">
            <span className="text-[10px] text-indigo-400 font-mono font-bold tracking-widest uppercase">TECH STACK SUMMARY</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {project.techStack.map((tech, i) => (
                <span key={i} className="text-xs font-mono font-bold text-zinc-300 bg-zinc-950 border border-zinc-900 px-3 py-1.5 rounded-xl">
                  {tech}
                </span>
              ))}
            </div>
          </GlassPanel>

          {/* Database schema box */}
          <GlassPanel className="flex flex-col gap-3">
            <span className="text-[10px] text-teal-400 font-mono font-bold tracking-widest uppercase flex items-center gap-1.5">
              <DbIcon className="w-3.5 h-3.5" /> Database Models Schema
            </span>
            
            <div className="relative mt-1">
              <pre className="bg-zinc-950 border border-zinc-900 rounded-xl p-3.5 text-[10px] font-mono text-teal-300 overflow-x-auto select-all max-h-[220px]">
                <code>{project.databaseSchema}</code>
              </pre>
              <button
                onClick={() => handleCopy(project.databaseSchema, 'schema')}
                className="absolute right-2 top-2 p-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer transition-colors duration-200"
              >
                {copiedSection === 'schema' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </GlassPanel>

          {/* Folder structure tree */}
          <GlassPanel className="flex flex-col gap-3">
            <span className="text-[10px] text-pink-400 font-mono font-bold tracking-widest uppercase flex items-center gap-1.5">
              <FolderTree className="w-3.5 h-3.5" /> Folder Hierarchy Structure
            </span>
            
            <div className="relative mt-1">
              <pre className="bg-zinc-950 border border-zinc-900 rounded-xl p-3.5 text-[10px] font-mono text-pink-300 overflow-x-auto max-h-[220px]">
                <code>{project.folderStructure}</code>
              </pre>
              <button
                onClick={() => handleCopy(project.folderStructure, 'tree')}
                className="absolute right-2 top-2 p-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer transition-colors duration-200"
              >
                {copiedSection === 'tree' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </GlassPanel>

          {/* Code starter download */}
          <GlassPanel glowColor="indigo" className="flex flex-col gap-3">
            <span className="text-[10px] text-indigo-400 font-mono font-bold tracking-widest uppercase flex items-center gap-1.5">
              <CodeIcon className="w-3.5 h-3.5" /> Code Starter Snippets
            </span>
            <p className="text-[11px] text-zinc-500 font-sans leading-relaxed mt-0.5">
              Acquire sample express initialization routes and backend classes configured for this stack.
            </p>
            
            <div className="flex gap-2.5 mt-2">
              <button
                onClick={() => handleCopy(project.codeStarter, 'code')}
                className="flex-1 bg-zinc-950 border border-zinc-900 hover:border-zinc-800 text-zinc-300 text-xs font-bold py-2.5 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
              >
                {copiedSection === 'code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Code
              </button>
              <button
                onClick={handleDownloadCode}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2.5 rounded-xl border border-indigo-500/30 transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          </GlassPanel>

        </div>

      </div>

    </div>
  );
};

export default ProjectBlueprintViewer;
