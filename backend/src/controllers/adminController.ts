import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Analytics from '../models/Analytics';
import User from '../models/User';
import Project from '../models/Project';

export const getOverview = async (req: Request, res: Response) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;

    if (!isDbConnected) {
      // Mock SaaS Analytics for demonstration when DB is offline
      return res.status(200).json({
        totalGenerations: 1248,
        activeUsersCount: 312,
        popularDomains: [
          { domain: 'AI/ML', count: 486 },
          { domain: 'Web Development', count: 382 },
          { domain: 'Cybersecurity', count: 184 },
          { domain: 'Blockchain', count: 120 },
          { domain: 'IoT', count: 76 }
        ],
        popularTechnologies: [
          { tech: 'Next.js', count: 620 },
          { tech: 'PyTorch', count: 420 },
          { tech: 'FastAPI', count: 310 },
          { tech: 'TypeScript', count: 540 },
          { tech: 'Rust', count: 180 }
        ],
        recentActivity: [
          { action: 'GENERATE', details: 'Generated: NeuroPulse AI (AI/ML)', timestamp: new Date(Date.now() - 4000) },
          { action: 'SIGNUP', details: 'New user: DevSpartan registered', timestamp: new Date(Date.now() - 15000) },
          { action: 'SAVE', details: 'Saved blueprint: SaaSify Core Platform', timestamp: new Date(Date.now() - 60000) },
          { action: 'GENERATE', details: 'Generated: AegisShield eBPF Guard (Cybersecurity)', timestamp: new Date(Date.now() - 120000) }
        ],
        dbStatus: 'Mock Mode (Offline)',
        lastUpdated: new Date()
      });
    }

    // Real DB Analytics
    let analytics = await Analytics.findOne();
    if (!analytics) {
      analytics = new Analytics({
        totalGenerations: await Project.countDocuments(),
        activeUsersCount: await User.countDocuments(),
        recentActivity: []
      });
      await analytics.save();
    }

    const totalUsers = await User.countDocuments();
    const totalProjects = await Project.countDocuments();

    res.status(200).json({
      totalGenerations: analytics.totalGenerations || totalProjects,
      activeUsersCount: totalUsers || analytics.activeUsersCount,
      popularDomains: analytics.popularDomains,
      popularTechnologies: analytics.popularTechnologies,
      recentActivity: analytics.recentActivity.slice(-10).reverse(),
      dbStatus: 'Connected',
      lastUpdated: analytics.lastUpdated
    });

  } catch (error: any) {
    res.status(500).json({ message: 'Failed to retrieve admin statistics.', error: error.message });
  }
};
