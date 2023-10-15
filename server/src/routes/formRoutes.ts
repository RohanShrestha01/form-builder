import { Router } from 'express';
import {
  createForm,
  deleteForm,
  deleteForms,
  getAllForms,
  getForm,
  updateForm,
} from '../controllers/formController';
import verifyJWT from '../middleware/verifyJWT';

const router = Router();

router.route('/').get(verifyJWT, getAllForms).post(verifyJWT, createForm);
router.patch('/bulk-delete', verifyJWT, deleteForms);
router
  .route('/:id')
  .get(getForm)
  .patch(verifyJWT, updateForm)
  .delete(verifyJWT, deleteForm);

export default router;
