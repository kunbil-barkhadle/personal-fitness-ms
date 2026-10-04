import { Router } from 'express';
import { getDailyLog, updateDailyLog, getDailyLogs, addMeal, deleteMeal } from '../controllers/dailyLogController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.get('/', getDailyLogs);

router.route('/:date')
  .get(getDailyLog)
  .put(updateDailyLog);

router.post('/:date/meals', addMeal);
router.delete('/:date/meals/:mealId', deleteMeal);

export default router;
