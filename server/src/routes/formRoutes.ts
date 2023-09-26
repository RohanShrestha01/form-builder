import { Router } from 'express';
import { createForm, getAllForms } from '../controllers/formController';

const router = Router();

router.route('/').get(getAllForms).post(createForm);

export default router;
