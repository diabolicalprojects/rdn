import express from 'express';
import { getUsers, getUserById } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getUsers);
router.get('/:id', getUserById);

export default router;
