import { Router } from 'express';
import { getHabitLogs, logHabit, getHabitHistory } from '../controllers/habitLogController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.route('/:habitId')
  .get(getHabitLogs)
  .post(logHabit);

router.get('/:habitId/history', getHabitHistory);

export default router;
