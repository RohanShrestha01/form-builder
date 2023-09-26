import { Router } from 'express';
import {
  createForm,
  deleteForm,
  getAllForms,
  getForm,
  updateForm,
} from '../controllers/formController';

const router = Router();

router.route('/').get(getAllForms).post(createForm);
router.route('/:id').get(getForm).patch(updateForm).delete(deleteForm);

export default router;
