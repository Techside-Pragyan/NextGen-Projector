'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface ProjectDetail {
  _id: string;
  title: string;
  domain: string;
  difficulty: string;
  duration: string;
  teamSize: number;
  problemStatement: string;
  description: string;
  techStack: string[];
  features: string[];
  databaseSchema: string;
  folderStructure: string;
  architecture: {
    diagramData: {
      nodes: Array<{ id: string; label: string; type: string }>;
      connections: Array<{ from: string; to: string; label: string }>;
    };
    description: string;
  };
  roadmap: Array<{
    week: number;
    topic: string;
    tasks: string[];
    resources: string[];
  }>;
  resumeImpact: {
    score: number;
    skillsGained: string[];
    bulletPoints: string[];
  };
  readmeContent: string;
  codeStarter: string;
  isSaved?: boolean;
  createdAt?: string;
}

interface SavedProjectsContextType {
  savedProjects: ProjectDetail[];
  loading: boolean;
  saveProject: (project: ProjectDetail) => Promise<void>;
  unsaveProject: (projectId: string) => Promise<void>;
  isSaved: (projectId: string) => boolean;
}

const SavedProjectsContext = createContext<SavedProjectsContextType | undefined>(undefined);

export const SavedProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedProjects, setSavedProjects] = useState<ProjectDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        // Attempt API fetch
        const res = await fetch(`${API_URL}/projects/saved`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setSavedProjects(data.savedProjects || []);
        } else {
          throw new Error('API fetch failed');
        }
      } catch (err) {
        // Load from local storage on network failure
        console.log('⚡ Offline: Fetching bookmarks from Local Storage.');
        const localSaved = localStorage.getItem('nextgen_saved_local');
        if (localSaved) {
          try {
            setSavedProjects(JSON.parse(localSaved));
          } catch {
            setSavedProjects([]);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchSaved();
    } else {
      setLoading(false);
    }
  }, [token, API_URL]);

  const saveProject = async (project: ProjectDetail) => {
    const updatedProject = { ...project, isSaved: true };
    
    // Optimistic UI state update
    const newSaved = [updatedProject, ...savedProjects.filter(p => p._id !== project._id)];
    setSavedProjects(newSaved);
    localStorage.setItem('nextgen_saved_local', JSON.stringify(newSaved));

    try {
      await fetch(`${API_URL}/projects/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ projectId: project._id })
      });
    } catch (err) {
      console.warn('⚠️ Network bookmark sync failed. Storing locally instead.');
    }
  };

  const unsaveProject = async (projectId: string) => {
    // Optimistic UI state update
    const newSaved = savedProjects.filter(p => p._id !== projectId);
    setSavedProjects(newSaved);
    localStorage.setItem('nextgen_saved_local', JSON.stringify(newSaved));

    try {
      await fetch(`${API_URL}/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (err) {
      console.warn('⚠️ Network bookmark delete failed. Removing locally instead.');
    }
  };

  const isSaved = (projectId: string) => {
    return savedProjects.some(p => p._id === projectId);
  };

  return (
    <SavedProjectsContext.Provider value={{ savedProjects, loading, saveProject, unsaveProject, isSaved }}>
      {children}
    </SavedProjectsContext.Provider>
  );
};

export const useSavedProjects = () => {
  const context = useContext(SavedProjectsContext);
  if (!context) {
    throw new Error('useSavedProjects must be used within a SavedProjectsProvider');
  }
  return context;
};
