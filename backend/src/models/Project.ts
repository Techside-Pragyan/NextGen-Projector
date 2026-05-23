import { Schema, model } from 'mongoose';

const RoadmapStepSchema = new Schema({
  week: { type: Number, required: true },
  topic: { type: String, required: true },
  tasks: { type: [String], default: [] },
  resources: { type: [String], default: [] }
});

const ProjectSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  title: { type: String, required: true },
  domain: { type: String, required: true },
  difficulty: { type: String, required: true },
  duration: { type: String, required: true },
  teamSize: { type: Number, default: 1 },
  problemStatement: { type: String, required: true },
  description: { type: String, required: true },
  techStack: { type: [String], default: [] },
  features: { type: [String], default: [] },
  databaseSchema: { type: String, default: '' },
  folderStructure: { type: String, default: '' },
  architecture: {
    diagramData: { type: Schema.Types.Mixed, default: {} },
    description: { type: String, default: '' }
  },
  roadmap: [RoadmapStepSchema],
  resumeImpact: {
    score: { type: Number, default: 75 },
    skillsGained: { type: [String], default: [] },
    bulletPoints: { type: [String], default: [] }
  },
  readmeContent: { type: String, default: '' },
  codeStarter: { type: String, default: '' },
  isSaved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Project = model('Project', ProjectSchema);
export default Project;
