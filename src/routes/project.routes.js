import { Router } from 'express';
import { createProject, getProjects } from '../controllers/project.controller.js';

const router = Router();

router.post('/', createProject);
router.get('/', getProjects);

export default router;