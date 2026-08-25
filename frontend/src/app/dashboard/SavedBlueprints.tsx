'use client';

import React from 'react';
import { useSavedProjects, ProjectDetail } from '../../context/SavedProjectsContext';
import GlassPanel from '../../components/ui/GlassPanel';
import { Bookmark, Trash2, ArrowRight, Wand2, Compass } from 'lucide-react';

interface SavedBlueprintsProps {
  onSelectProject: (project: ProjectDetail) => void;
  onGenerateTab: () => void;
}

export const SavedBlueprints: React.FC<SavedBlueprintsProps> = ({ onSelectProject, onGenerateTab }) => {
  const { savedProjects, unsaveProject, loading } = useSavedProjects();

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-pink-400" />
          <h2 className="text-3xl font-extrabold tracking-wide text-white">SAVED BLUEPRINTS</h2>
        </div>
        <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
          Access your cached repository blueprints, database models, and developmental roadmaps.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <span className="w-6 h-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
        </div>
      ) : savedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedProjects.map(proj => (
            <GlassPanel
              key={proj._id}
              className="flex flex-col justify-between gap-4 h-56 relative group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] bg-pink-500/10 border border-pink-500/20 text-pink-400 font-mono font-bold tracking-wider px-2 py-0.5 rounded uppercase">
                    {proj.domain}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {proj.difficulty} • {proj.duration}
                  </span>
                </div>

                <h4 className="text-md font-bold text-zinc-200 mt-2.5 leading-snug group-hover:text-pink-300 transition-colors duration-300">
                  {proj.title}
                </h4>
                
                <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed font-sans">
                  {proj.description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-800/80 pt-3">
                <button
                  onClick={() => unsaveProject(proj._id)}
                  title="Remove Bookmark"
                  className="bg-zinc-950 hover:bg-red-950/20 border border-zinc-900 hover:border-red-500/30 p-2 rounded-xl text-zinc-500 hover:text-red-400 transition-all duration-300 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectProject(proj)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold px-3.5 py-2 rounded-xl border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)] hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all duration-300 flex items-center gap-1 cursor-pointer"
                >
                  Inspect Blueprint
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </GlassPanel>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-panel border-dashed border-zinc-800 rounded-2xl max-w-xl">
          <Bookmark className="w-10 h-10 text-zinc-600 mx-auto animate-pulse" />
          <h3 className="text-md font-bold text-zinc-300 mt-4 font-mono uppercase tracking-wider">No Bookmarks Indexed</h3>
          <p className="text-xs text-zinc-500 mt-2 max-w-sm mx-auto font-sans leading-relaxed">
            You haven't bookmarked any generated project blueprints yet. Start exploring or launch the generator to build your first template.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={onGenerateTab}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-indigo-500/30 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Wand2 className="w-3.5 h-3.5" />
              Launch Generator
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default SavedBlueprints;
