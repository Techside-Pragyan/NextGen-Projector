'use client';

import React, { useState } from 'react';
import { AuthProvider } from '../../context/AuthContext';
import { SavedProjectsProvider, ProjectDetail } from '../../context/SavedProjectsContext';
import Navbar from '../../components/dashboard/Navbar';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardHome from './DashboardHome';
import AIProjectGenerator from './AIProjectGenerator';
import SavedBlueprints from './SavedBlueprints';
import ResumeBooster from './ResumeBooster';
import HackathonMode from './HackathonMode';
import AdminPanel from './AdminPanel';
import ProjectBlueprintViewer from './ProjectBlueprintViewer';
import MentorChatbot from '../../components/ai-chat/MentorChatbot';
import AuthModal from './AuthModal';
import FloatingParticles from '../../components/animations/FloatingParticles';

function DashboardContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Switch display views seamlessly
  const handleSelectProject = (project: ProjectDetail) => {
    setSelectedProject(project);
  };

  const handleGenerationComplete = (project: ProjectDetail) => {
    setSelectedProject(project);
  };

  const renderActiveTab = () => {
    if (selectedProject) {
      return (
        <ProjectBlueprintViewer 
          project={selectedProject} 
          onBack={() => setSelectedProject(null)} 
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardHome 
            onSelectProject={handleSelectProject} 
            onGenerateTab={() => setActiveTab('generate')}
          />
        );
      case 'generate':
        return (
          <AIProjectGenerator 
            onGenerationComplete={handleGenerationComplete} 
          />
        );
      case 'saved':
        return (
          <SavedBlueprints 
            onSelectProject={handleSelectProject}
            onGenerateTab={() => setActiveTab('generate')}
          />
        );
      case 'resume':
        return <ResumeBooster />;
      case 'hackathon':
        return (
          <HackathonMode 
            onGenerationComplete={handleGenerationComplete}
          />
        );
      case 'admin':
        return <AdminPanel />;
      default:
        return (
          <DashboardHome 
            onSelectProject={handleSelectProject} 
            onGenerateTab={() => setActiveTab('generate')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-[#f5f5f7] relative grid-bg overflow-x-hidden flex flex-col justify-between">
      {/* Background graphics */}
      <FloatingParticles />
      
      <div className="flex-1 flex flex-col z-10">
        <Navbar onOpenAuthModal={() => setIsAuthOpen(true)} />
        
        <div className="flex-1 flex flex-col md:flex-row">
          <Sidebar 
            activeTab={selectedProject ? '' : activeTab} 
            setActiveTab={(tab) => {
              setSelectedProject(null); // Clear active blueprint inspection on navigation
              setActiveTab(tab);
            }} 
          />
          
          <main className="flex-1 p-6 md:p-8 max-w-5xl overflow-x-hidden">
            {renderActiveTab()}
          </main>
        </div>
      </div>

      {/* Floating Chatbot widget */}
      <MentorChatbot 
        currentProjectTitle={selectedProject ? selectedProject.title : "General Coding"} 
        currentTechStack={selectedProject ? selectedProject.techStack : undefined}
      />

      {/* Authentication modals */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthProvider>
      <SavedProjectsProvider>
        <DashboardContent />
      </SavedProjectsProvider>
    </AuthProvider>
  );
}
