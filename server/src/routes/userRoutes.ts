import { signUp } from 'controllers/authController';
import { Router } from 'express';

const router = Router();

router.post('/signup', signUp);

export default router;
