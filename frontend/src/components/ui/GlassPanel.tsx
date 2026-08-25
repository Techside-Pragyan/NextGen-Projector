'use client';

import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'indigo' | 'pink' | 'none';
  onClick?: () => void;
  hoverGlow?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  glowColor = 'none',
  onClick,
  hoverGlow = false,
}) => {
  const baseStyle = "glass-panel rounded-2xl p-6 transition-all duration-300 relative overflow-hidden";
  
  const glowStyles = {
    none: '',
    indigo: 'glow-indigo border-indigo-500/20',
    pink: 'glow-pink border-pink-500/20',
  };

  const hoverStyle = hoverGlow 
    ? "hover:border-indigo-400/40 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] cursor-pointer"
    : "";

  return (
    <div
      onClick={onClick}
      className={`${baseStyle} ${glowStyles[glowColor]} ${hoverStyle} ${className}`}
    >
      {/* Visual cybernetic corner accent */}
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-indigo-500/30 rounded-tr-md pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-indigo-500/30 rounded-bl-md pointer-events-none" />
      
      {children}
    </div>
  );
};

export default GlassPanel;
