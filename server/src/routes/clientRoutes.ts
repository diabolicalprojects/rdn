import express from 'express';
import { 
  createClient, 
  getClients, 
  getClientById, 
  updateClient, 
  deleteClient 
} from '../controllers/clientController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', roleMiddleware(['PM']), createClient);
router.get('/', getClients);
router.get('/:id', getClientById);
router.patch('/:id', roleMiddleware(['PM']), updateClient);
router.delete('/:id', roleMiddleware(['PM']), deleteClient);

export default router;
