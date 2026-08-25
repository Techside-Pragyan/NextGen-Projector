'use client';

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, LogIn, LogOut, Terminal, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  onOpenAuthModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuthModal }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="glass-panel border-x-0 border-t-0 rounded-none sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600/10 p-2.5 rounded-xl border border-indigo-500/30 flex items-center justify-center">
          <Terminal className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <span className="font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-lg">
            AI PROJECT IDEA GENERATOR
          </span>
          <div className="text-[10px] text-indigo-400/80 font-mono tracking-widest uppercase">
            NextGen Career Navigator
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user && !user.isGuest ? (
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <div className="text-xs font-semibold text-indigo-300">{user.username}</div>
              <div className="text-[10px] text-zinc-400 font-mono">{user.email}</div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-300">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={logout}
              title="Logout Session"
              className="bg-zinc-900/80 hover:bg-red-950/40 border border-zinc-800 hover:border-red-500/40 p-2 rounded-xl text-zinc-400 hover:text-red-400 transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-[10px] text-zinc-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              GUEST SANDBOX
            </div>
            <button
              onClick={onOpenAuthModal}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              Authenticate
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
