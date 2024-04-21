import Book,{IBookModel} from '../models/bookModel';
import { Response,NextFunction } from "express";
import { IBook } from '../models/types';
import { CustomRequest } from "./authController";
import { create } from 'domain';

const getAllBooks=async( req:CustomRequest,res:Response,next:NextFunction )=>{
    try {
        const books:IBookModel[]=await Book.find({});
        res.status(200).json({message:"success",books});
    } catch (error:any) {
        res.status(400);
        next(error)
    }
}

const createBook=async( req:CustomRequest,res:Response,next:NextFunction )=>{
    const book:IBook=req.body;
    try {
        const newBook:IBookModel=await Book.create(book);
        res.status(201).json({message:"success",book:newBook});
    } catch (error:any) {
        res.status(400);
        next(error)
    }
}

const getBookById=async( req:CustomRequest,res:Response,next:NextFunction )=>{
    const id=req.params.id;
    try {
        const book:IBookModel|null=await Book.findById(id);
        if(book){
            res.status(200).json({message:"success",book});
        }
    }
    catch (error:any) {
        res.status(400);
        next(error)
    }
}

const updateBook=async( req:CustomRequest,res:Response,next:NextFunction )=>{
    const book:IBook=req.body;
    try {
        const updatedBook:IBookModel|null=await Book.findOneAndUpdate({barcode:book.barcode},book,{new:true});
        if(updatedBook){
            res.status(200).json({message:"success",book:updatedBook});
        }
    } catch (error:any) {
        res.status(400);
        next(error)
    }
}

const deleteBook=async( req:CustomRequest,res:Response,next:NextFunction )=>{
    const {barcode:string}=req.params;
    try {
        const deletedBook:IBookModel|null=await Book.findOneAndDelete({barcode:string});
        if(deletedBook){
            res.status(200).json({message:"delete success"});
        }
    } catch (error:any) {
        res.status(400);
        next(error)
    }
}

export {getAllBooks,createBook,getBookById,updateBook,deleteBook}