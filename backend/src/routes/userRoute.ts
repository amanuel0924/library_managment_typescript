import express from 'express';
import { getAllUser,getUserById,updateUser,deleteUser } from '../controller/userControler';
import { validateSchema,Shemas } from '../middleware/validation';
import { protect } from './../controller/authController';

const router = express.Router();

router.route('/').get(protect,getAllUser).put(validateSchema(Shemas.user.update,'body'),protect,updateUser);
router.route('/:id').get(validateSchema(Shemas.user.id,'params'),protect,getUserById).delete(validateSchema(Shemas.user.id,'params'),protect,deleteUser);

export default router
