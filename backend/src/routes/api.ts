import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { generate, saveProject, getSavedProjects, getProjectDetail, deleteProject } from '../controllers/projectController';
import { getOverview } from '../controllers/adminController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Auth Pathways
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/profile', authenticateToken, getProfile);

// Project Generator Engine Pathways
router.post('/projects/generate', authenticateToken, generate);
router.post('/projects/save', authenticateToken, saveProject);
router.get('/projects/saved', authenticateToken, getSavedProjects);
router.get('/projects/:id', authenticateToken, getProjectDetail);
router.delete('/projects/:id', authenticateToken, deleteProject);

// Analytics Pathways
router.get('/admin/overview', getOverview);

export default router;
