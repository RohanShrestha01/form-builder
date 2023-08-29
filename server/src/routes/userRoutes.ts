import { Router } from 'express';
import { changePassword, updateProfile } from '../controllers/userController';

const router = Router();

router.patch('/change-password', changePassword);
router.patch('/profile', updateProfile);

export default router;
