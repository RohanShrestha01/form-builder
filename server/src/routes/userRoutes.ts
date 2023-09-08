import { Router } from 'express';
import {
  changePassword,
  deleteAccount,
  getProfile,
  updateProfile,
  uploadUserPhoto,
} from '../controllers/userController';

const router = Router();

router.patch('/change-password', changePassword);
router.patch('/profile', uploadUserPhoto, updateProfile);
router.get('/profile', getProfile);
router.delete('/delete-account', deleteAccount);

export default router;
