import express from 'express';
import { generateLoanRecord, updateLoanRecord, findallLoanRecords, getRecoredbyProperty } from '../controller/LoanRecoredController';
import { protect } from '../controller/authController';
import { Shemas,validateSchema} from './../middleware/validation'
const router = express.Router();
router.route('/').post(validateSchema(Shemas.loan.create,'body'),protect, generateLoanRecord).get(protect, findallLoanRecords).put(validateSchema(Shemas.loan.update,'body'),protect, updateLoanRecord);
router.route('/query').get(validateSchema(Shemas.loan.query,'body'),protect, getRecoredbyProperty);

export default router;