'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Terminal } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: Date;
}

interface MentorChatbotProps {
  currentProjectTitle?: string;
  currentTechStack?: string[];
}

export const MentorChatbot: React.FC<MentorChatbotProps> = ({ 
  currentProjectTitle = "General Coding", 
  currentTechStack = ["Next.js", "Express", "MongoDB"] 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `👋 Greetings! I am your Cybernetic AI Mentor. I am ready to advise you on "${currentProjectTitle}". Ask me how to structure your database, configure environment variables, or optimize your code!`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle changing project inputs dynamically
  useEffect(() => {
    if (currentProjectTitle !== "General Coding") {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'ai',
          text: `⚙️ Context Switched: Ready to brainstorm for your new blueprint: *${currentProjectTitle}*. What would you like to build first?`,
          timestamp: new Date()
        }
      ]);
    }
  }, [currentProjectTitle]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Trigger AI response synthesis
    setTimeout(() => {
      let aiResponseText = '';
      const textLower = input.toLowerCase();

      if (textLower.includes('db') || textLower.includes('database') || textLower.includes('schema')) {
        aiResponseText = `📊 For **${currentProjectTitle}**, I highly suggest utilizing **MongoDB** or **PostgreSQL** configured with an isolated pooled layer. For maximum performance under load, map indices on active fields and utilize an in-memory Redis cache for read-heavy operations. Let me know if you would like me to draft a sample schema!`;
      } else if (textLower.includes('deploy') || textLower.includes('host') || textLower.includes('vercel')) {
        aiResponseText = `🚀 Excellent deployment target!
- **Frontend**: Host your Next.js client on Vercel (bind env credentials in settings).
- **Backend**: Host your Node.js API on Render. Set your server connection limits to handle WebSocket channels dynamically.
- **Database**: spin up MongoDB Atlas (M0 free tier works perfectly to start!).`;
      } else if (textLower.includes('folder') || textLower.includes('structure') || textLower.includes('code')) {
        aiResponseText = `📂 I advise modular decoupling! Separate your server controller directories from your routing middleware channels. Inside your Next.js client, follow standard App Router logic: keep ui components decoupled inside \`/components/ui\` and hooks under \`/hooks\`.`;
      } else {
        aiResponseText = `💡 That's a vital consideration for **${currentProjectTitle}**! To implement this successfully, integrate the API controllers utilizing Axios, wrap your request blocks inside robust try/catch blocks, and map state changes immediately to trigger the glassmorphic rendering. What specifics of the tech stack (${currentTechStack.slice(0, 3).join(', ')}) should we refine next?`;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-tr from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full p-4 shadow-[0_0_30px_rgba(99,102,241,0.5)] border border-indigo-400/30 transition-all duration-300 transform hover:scale-110 flex items-center justify-center cursor-pointer animate-bounce"
          style={{ animationDuration: '3s' }}
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Floating Chat Panel */}
      {isOpen && (
        <div className="glass-panel border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.2)] w-80 md:w-96 h-[500px] flex flex-col justify-between overflow-hidden rounded-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Chat Header */}
          <div className="bg-indigo-950/20 border-b border-zinc-800/80 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-indigo-400" />
              <div>
                <div className="text-xs font-bold text-indigo-300 flex items-center gap-1">
                  AI Mentor Chatbot
                  <Sparkles className="w-3 h-3 text-pink-400 animate-pulse" />
                </div>
                <div className="text-[9px] text-zinc-400 font-mono tracking-wider">
                  ACTIVE FEED: {currentProjectTitle.length > 22 ? `${currentProjectTitle.slice(0, 22)}...` : currentProjectTitle}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-900 transition-colors duration-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5 bg-zinc-950/40">
            {messages.map(msg => {
              const isAI = msg.sender === 'ai';
              return (
                <div key={msg.id} className={`flex gap-2.5 max-w-[85%] ${isAI ? 'self-start' : 'self-end flex-row-reverse'}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 border ${
                    isAI ? 'bg-indigo-950/20 border-indigo-500/30 text-indigo-300' : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}>
                    {isAI ? <Terminal className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>
                  <div className={`rounded-xl p-3 text-xs leading-relaxed ${
                    isAI 
                      ? 'bg-zinc-900/90 border border-zinc-800 text-zinc-200 shadow-md' 
                      : 'bg-indigo-600 text-white shadow-md'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-zinc-950/60 border-t border-zinc-800/80 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask me: 'How do I deploy this?' or 'database setup'..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-indigo-500/50 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 outline-none transition-all duration-300"
            />
            <button
              onClick={handleSend}
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl p-2.5 transition-all duration-300 shadow-md hover:shadow-indigo-500/20 flex items-center justify-center cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorChatbot;
