import { Router } from 'express';
import { createTag, getTags } from '../controllers/tag.controller.js';

const router = Router();

router.post('/', createTag);
router.get('/', getTags);

export default router;