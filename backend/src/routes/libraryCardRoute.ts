import express from 'express';
import { createLibraryCard,getLibraryCardById } from '../controller/libraryCardController';
import { protect } from './../controller/authController';
import { validateSchema,Shemas } from '../middleware/validation';

const router=express.Router();

router.route('/').post(validateSchema(Shemas.libraryCard.create,'body'),protect,createLibraryCard)
router.route('/:id').get(validateSchema(Shemas.libraryCard.id,'params'),protect,getLibraryCardById)

export default router;