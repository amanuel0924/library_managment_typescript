import Book,{IBookModel} from '../models/bookModel';
import { Response,NextFunction } from "express";
import { IBook } from '../models/types';
import { CustomRequest } from "./authController";
import { IPagination } from '../models/types';

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

const searchBookQuery=async( req:CustomRequest,res:Response,next:NextFunction )=>{
    const {title='',barcode='',genre='',author='',page=1,limit=25}=req.query;
console.log(req.query)  
try {
    const books:IBookModel[]=await Book.find();
    const filteredBooks:IBookModel[]=[]
    books.forEach((book:IBookModel)=>{
        if(barcode){
            if(book.barcode.toLowerCase().includes(barcode.toString().toLowerCase())&&!filteredBooks.some(b=>b['barcode']===book.barcode)){
                filteredBooks.push(book)
            }     
        }

        if(title){
            if(book.title.toLowerCase().includes(title.toString().toLowerCase())&&!filteredBooks.some(b=>b['barcode']===book.barcode)){
                filteredBooks.push(book)
            }     
        }

        if(genre){
            if(book.genre.toLowerCase()===genre.toString().toLocaleLowerCase()&&!filteredBooks.some(b=>b['barcode']===book.barcode)){
                filteredBooks.push(book)
            }     
        }

        if(author){
            if(book.authors.some(a=>a.toLowerCase().includes(author.toString().toLowerCase()))&&!filteredBooks.some(b=>b['barcode']===book.barcode)){
                filteredBooks.push(book)
            }     
        }

    })
    const pbooks =paginateBooks(filteredBooks,Number(page),Number(limit))
    res.status(200).json({message:"success",page:pbooks});
    
} catch (error) {
    res.status(400);
    next(error)
}
}

export function paginateBooks(books:IBookModel[],page:number,limit:number):IPagination<IBookModel>{
  let paginateBook:IBookModel[]=[]

  const pages=Math.ceil(books.length/Number(limit));
  if(Number(page)===pages){
     const startPoint=(Number(page)-1)*Number(limit);
     paginateBook=books.slice(startPoint);
  }else{
    const startPoint=(Number(page)-1)*Number(limit);
    const endPoint=startPoint+Number(limit);
    paginateBook=books.slice(startPoint,endPoint);
  }

    return {
        totalCount:books.length,
        totalPages:pages,
        currentPage:Number(page),
        pageCount:paginateBook.length,
        limit:Number(limit),
        items:paginateBook
    }
}

export {getAllBooks,createBook,getBookById,updateBook,deleteBook,searchBookQuery}