import { Router } from 'express';
import { getProfile, updateProfile, updatePassword, updatePreferences, deleteAccount } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.route('/profile')
  .get(getProfile)
  .put(updateProfile);

router.put('/password', updatePassword);
router.put('/preferences', updatePreferences);
router.delete('/account', deleteAccount);

export default router;
