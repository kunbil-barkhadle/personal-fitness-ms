import { Router } from 'express';
import { getGoals, getGoal, createGoal, updateGoal, deleteGoal, updateProgress } from '../controllers/goalController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.route('/')
  .get(getGoals)
  .post(createGoal);

router.route('/:id')
  .get(getGoal)
  .put(updateGoal)
  .delete(deleteGoal);

router.put('/:id/progress', updateProgress);

export default router;
