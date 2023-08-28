import { Router } from 'express';
import { login, signUp } from '../controllers/authController';
import refreshTokenHandler from '../controllers/refreshTokenController';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);

router.get('/refresh', refreshTokenHandler);

export default router;
