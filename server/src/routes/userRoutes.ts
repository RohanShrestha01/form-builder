import { Router } from 'express';
import {
  changePassword,
  deleteAccount,
  updateProfile,
} from '../controllers/userController';

const router = Router();

router.patch('/change-password', changePassword);
router.patch('/profile', updateProfile);
router.delete('/delete-account', deleteAccount);

export default router;
