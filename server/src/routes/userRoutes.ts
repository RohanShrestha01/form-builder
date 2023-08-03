import { Router } from 'express';
import { signUp } from '../controllers/authController';

const router = Router();

router.post('/signup', signUp);

export default router;
