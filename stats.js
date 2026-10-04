import { Router } from 'express';
import { getDashboardStats, getWeeklyStats, getMonthlyStats, getStreaks } from '../controllers/statsController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.get('/dashboard', getDashboardStats);
router.get('/weekly', getWeeklyStats);
router.get('/monthly', getMonthlyStats);
router.get('/streaks', getStreaks);

export default router;
