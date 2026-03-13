import express from 'express';
import { getLogs } from '../controllers/logController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getLogs);

export default router;
