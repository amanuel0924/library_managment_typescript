import LoanRecord, { IloanRecordModel } from './../models/loanRecooredModel'
import { Response, NextFunction } from "express";
import { IloanRecord } from '../models/types';
import { CustomRequest } from "./authController";
import Book, { IBookModel } from '../models/bookModel';


const generateLoanRecord = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const loanRecord: IloanRecord = req.body;
    try {
        const newLoanRecord: IloanRecordModel = await LoanRecord.create(loanRecord);
        const book: IBookModel | null = await Book.findById(loanRecord.item);
        if (book) {
            let records = book.records;
        if (records) {
            records = [...records, newLoanRecord];
        }
           book.records = records;
        await Book.findOneAndUpdate({ barcode: book.barcode }, book);
        }
        res.status(201).json({ message: "success", loanRecord: newLoanRecord });

    } catch (error: any) {
        res.status(400);
        next(error)

    }
}

const updateLoanRecord = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const loanRecord = req.body;
    try {
        const updatedLoanRecord: IloanRecordModel | null = await LoanRecord.findOneAndUpdate({ _id: loanRecord?._id }, loanRecord, { new: true });
        if (updatedLoanRecord) {
            let book = await Book.findById(loanRecord.item)
           if(book){
            let records = book.records;
            if (records) {
               records[0] = updatedLoanRecord;
              book.records = records;
              await Book.findOneAndUpdate({ barcode: book.barcode }, book);
            }
            
           }

            res.status(200).json({ message: "success", loanRecord: updatedLoanRecord });

        }
    } catch (error: any) {
        res.status(400);
        next(error)
    }

}

const findallLoanRecords = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const loanRecords: IloanRecordModel[] = await LoanRecord.find();
        res.status(200).json({ message: "success", loanRecords });
    } catch (error: any) {
        res.status(400);
        next(error)
    }
}

const getRecoredbyProperty = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const query = req.body;
    console.log(query)
    try {
        const loanRecords: IloanRecordModel[] = await LoanRecord.find({[query.property]:query.value}).populate('item').sort('-loanedDate')
        res.status(200).json({ message: "success", loanRecords });
    } catch (error: any) {
        res.status(400);
        next(error)
    }
}

export { generateLoanRecord, updateLoanRecord, findallLoanRecords, getRecoredbyProperty }

