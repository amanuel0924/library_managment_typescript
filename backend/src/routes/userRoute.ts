import express from 'express';
import { getAllUser,getUserById,updateUser,deleteUser } from '../controller/userControler';
import { validateSchema,Shemas } from '../middleware/validation';
import { protect } from './../controller/authController';

const router = express.Router();

router.route('/').get(protect,getAllUser).put(protect,updateUser);
router.route('/:id').get(protect,getUserById).delete(protect,deleteUser);

export default router
