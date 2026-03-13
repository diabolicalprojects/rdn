import express from 'express';
import { 
  createProject, 
  getProjects, 
  getProjectById, 
  updateProject, 
  deleteProject,
  updateProjectStatus
} from '../controllers/projectController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', roleMiddleware(['PM']), createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.patch('/:id', updateProject);
router.patch('/:id/status', updateProjectStatus);
router.delete('/:id', roleMiddleware(['PM']), deleteProject);

export default router;
