import { Router } from 'express'; import { protect, authorize } from '../middleware/auth.js'; import { dashboard } from '../controllers/adminController.js';
const router = Router(); router.use(protect, authorize('admin')); router.get('/dashboard', dashboard); export default router;
