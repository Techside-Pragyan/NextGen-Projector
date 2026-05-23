import { Response } from 'express';
import mongoose from 'mongoose';
import { AuthRequest } from '../middleware/auth';
import { generateProjectIdea } from '../services/aiService';
import Project from '../models/Project';
import Analytics from '../models/Analytics';

// Local storage fallback cache for saved mock projects when MongoDB is offline
let mockSavedProjects: any[] = [];

export const generate = async (req: AuthRequest, res: Response) => {
  try {
    const { domain, skills, interests, techStack, difficulty, duration, teamSize, hackathonMode } = req.body;

    if (!domain || !difficulty || !duration) {
      return res.status(400).json({ message: 'Domain, difficulty, and duration are required.' });
    }

    const normalizedSkills = Array.isArray(skills) ? skills : [];
    const normalizedInterests = Array.isArray(interests) ? interests : [];
    const normalizedStack = Array.isArray(techStack) ? techStack : [];

    // Trigger AI Generation
    const rawBlueprint = await generateProjectIdea({
      domain,
      skills: normalizedSkills,
      interests: normalizedInterests,
      techStack: normalizedStack,
      difficulty,
      duration,
      teamSize: Number(teamSize) || 1,
      hackathonMode: !!hackathonMode
    });

    const userId = req.user?.id !== 'guest_user' ? req.user?.id : null;
    const isDbConnected = mongoose.connection.readyState === 1;

    let savedProjectRecord = rawBlueprint;

    if (isDbConnected) {
      // Create Project Record in Mongo
      const project = new Project({
        ...rawBlueprint,
        userId: userId ? new mongoose.Types.ObjectId(userId) : null,
        isSaved: false
      });
      await project.save();
      savedProjectRecord = project.toObject();

      // Log Analytics
      try {
        let analyticsDoc = await Analytics.findOne();
        if (!analyticsDoc) {
          analyticsDoc = new Analytics({ totalGenerations: 0 });
        }
        analyticsDoc.totalGenerations += 1;
        
        // Push recent activity
        analyticsDoc.recentActivity.push({
          action: 'GENERATE',
          details: `Generated: ${rawBlueprint.title} (${domain})`,
          timestamp: new Date()
        });

        // Update popular domains
        const domainIndex = analyticsDoc.popularDomains.findIndex(d => d.domain.toLowerCase() === domain.toLowerCase());
        if (domainIndex > -1) {
          analyticsDoc.popularDomains[domainIndex].count += 1;
        } else {
          analyticsDoc.popularDomains.push({ domain, count: 1 });
        }

        // Update popular tech stacks
        normalizedStack.forEach(tech => {
          const techIndex = analyticsDoc.popularTechnologies.findIndex(t => t.tech.toLowerCase() === tech.toLowerCase());
          if (techIndex > -1) {
            analyticsDoc.popularTechnologies[techIndex].count += 1;
          } else {
            analyticsDoc.popularTechnologies.push({ tech, count: 1 });
          }
        });

        analyticsDoc.lastUpdated = new Date();
        await analyticsDoc.save();
      } catch (err) {
        console.warn('⚠️ Failed to update analytics document:', err);
      }
    } else {
      console.log('⚡ Generation completed offline. Bypassing MongoDB saving.');
    }

    res.status(200).json({
      project: savedProjectRecord,
      message: 'AI Blueprint generated successfully!'
    });

  } catch (error: any) {
    console.error('💥 Controller Generation error:', error);
    res.status(500).json({ message: 'Failed to generate project.', error: error.message });
  }
};

export const saveProject = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.body;
    if (!projectId) {
      return res.status(400).json({ message: 'Project ID is required.' });
    }

    const isDbConnected = mongoose.connection.readyState === 1;

    if (!isDbConnected) {
      // Offline mode saving simulation
      return res.status(200).json({ message: 'Project marked as saved locally.' });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    project.isSaved = true;
    if (req.user && req.user.id !== 'guest_user') {
      project.userId = new mongoose.Types.ObjectId(req.user.id);
    }
    await project.save();

    res.status(200).json({ project, message: 'Project saved successfully!' });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to save project.', error: error.message });
  }
};

export const getSavedProjects = async (req: AuthRequest, res: Response) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;

    if (!isDbConnected) {
      return res.status(200).json({ savedProjects: mockSavedProjects });
    }

    const userId = req.user?.id !== 'guest_user' ? req.user?.id : null;
    const query = userId 
      ? { userId: new mongoose.Types.ObjectId(userId), isSaved: true } 
      : { isSaved: true };

    const savedProjects = await Project.find(query).sort({ createdAt: -1 });
    res.status(200).json({ savedProjects });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to get saved projects.', error: error.message });
  }
};

export const getProjectDetail = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const isDbConnected = mongoose.connection.readyState === 1;

    if (!isDbConnected) {
      const mockProj = mockSavedProjects.find(p => p._id === id);
      if (mockProj) return res.status(200).json({ project: mockProj });
      return res.status(404).json({ message: 'Project not found (Offline Sandbox).' });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    res.status(200).json({ project });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to retrieve project details.', error: error.message });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const isDbConnected = mongoose.connection.readyState === 1;

    if (!isDbConnected) {
      mockSavedProjects = mockSavedProjects.filter(p => p._id !== id);
      return res.status(200).json({ message: 'Bookmark removed locally.' });
    }

    const project = await Project.findById(projectIdFix(id));
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    project.isSaved = false;
    await project.save();

    res.status(200).json({ message: 'Project removed from saved list.' });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to remove project.', error: error.message });
  }
};

const projectIdFix = (id: string) => {
  try {
    return new mongoose.Types.ObjectId(id);
  } catch {
    return id;
  }
};
