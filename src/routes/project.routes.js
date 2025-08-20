import { Router } from 'express';
import { createProject, getProjects } from '../controllers/project.controller.js';
import { addTagToProject } from '../controllers/project.tags.controller.js';

const router = Router();

router.post('/projects', createProject);
router.get('/projects', getProjects);

router.post('/projects/:projectId/tags', addTagToProject);

export default router;