import { Schema, model } from 'mongoose';

const AnalyticsSchema = new Schema({
  totalGenerations: { type: Number, default: 0 },
  activeUsersCount: { type: Number, default: 0 },
  popularDomains: [
    {
      domain: { type: String, required: true },
      count: { type: Number, default: 0 }
    }
  ],
  popularTechnologies: [
    {
      tech: { type: String, required: true },
      count: { type: Number, default: 0 }
    }
  ],
  recentActivity: [
    {
      action: { type: String, required: true },
      details: { type: String, default: '' },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  lastUpdated: { type: Date, default: Date.now }
});

export const Analytics = model('Analytics', AnalyticsSchema);
export default Analytics;
