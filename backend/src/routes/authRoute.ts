import express from 'express';
import { register,login } from '../controller/authController';
import { validateSchema,Shemas } from '../middleware/validation';

const router = express.Router();

router.route('/register').post(validateSchema(Shemas.user.create,'body'),register);
router.route('/login').post(validateSchema(Shemas.user.login,'body'),login);

export default router