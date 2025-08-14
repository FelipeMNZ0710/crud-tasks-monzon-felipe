import { Router } from 'express';
import { createProfile, getProfiles } from '../controllers/userProfile.controller.js';

const router = Router();

router.post('/', createProfile);
router.get('/', getProfiles);

export default router;