import { Router } from 'express';
import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  signUp,
} from '../controllers/authController';
import refreshTokenHandler from '../controllers/refreshTokenController';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);
router.get('/refresh', refreshTokenHandler);

export default router;
