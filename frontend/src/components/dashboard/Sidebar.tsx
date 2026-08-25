'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  Wand2, 
  Bookmark, 
  Award, 
  Flame, 
  Database, 
  Settings,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Main Dashboard', icon: LayoutDashboard, color: 'text-indigo-400' },
    { id: 'generate', label: 'AI Generator', icon: Wand2, color: 'text-purple-400' },
    { id: 'saved', label: 'Saved Blueprints', icon: Bookmark, color: 'text-pink-400' },
    { id: 'resume', label: 'Resume Booster', icon: Award, color: 'text-amber-400' },
    { id: 'hackathon', label: 'Hackathon Mode', icon: Flame, color: 'text-orange-400 animate-pulse' },
    { id: 'admin', label: 'Admin Analytics', icon: Database, color: 'text-teal-400' },
  ];

  return (
    <aside className="glass-panel w-full md:w-64 border-y-0 border-l-0 rounded-none flex flex-col justify-between py-6 min-h-[calc(100vh-73px)]">
      <div className="flex flex-col gap-2 px-3">
        <div className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-4 px-3">
          Navigator Control
        </div>
        
        {menuItems.map(item => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 group cursor-pointer ${
                isActive 
                  ? 'bg-indigo-600/10 text-indigo-300 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.id === 'hackathon' && (
                <span className="text-[9px] bg-orange-500/20 border border-orange-500/30 text-orange-400 px-1.5 py-0.5 rounded font-bold font-mono">
                  HOT
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="px-6">
        <div className="glass-panel bg-gradient-to-br from-indigo-950/20 to-purple-950/20 border-indigo-500/10 p-4 rounded-xl flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-[10px] font-bold text-zinc-300 font-mono">NEURAL PIPELINE</span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
            AI updates its trending matrix hourly based on public github commits.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
