import { Router } from 'express';
import { getHabits, getHabit, createHabit, updateHabit, deleteHabit, toggleHabit } from '../controllers/habitController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.route('/')
  .get(getHabits)
  .post(createHabit);

router.route('/:id')
  .get(getHabit)
  .put(updateHabit)
  .delete(deleteHabit);

router.put('/:id/toggle', toggleHabit);

export default router;
