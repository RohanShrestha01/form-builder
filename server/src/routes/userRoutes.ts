import { Router } from 'express';
import { changePassword } from '../controllers/userController';

const router = Router();

router.patch('/change-password', changePassword);

export default router;
