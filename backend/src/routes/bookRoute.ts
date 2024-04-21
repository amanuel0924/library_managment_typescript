import express from 'express';
import {getAllBooks,createBook,getBookById,updateBook,deleteBook} from '../controller/bookController';
import { protect } from './../controller/authController';
import { validateSchema,Shemas } from '../middleware/validation';

const router=express.Router();

router.route('/').get(getAllBooks).post(validateSchema(Shemas.book.create,'body'),protect,createBook).put(validateSchema(Shemas.book.updateBook,'body'),protect,updateBook)
router.route('/:barcode').delete(validateSchema(Shemas.book.deleteBook,'params'),protect,deleteBook)

export default router;
