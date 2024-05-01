import LibraryCard,{IlibraryCardModel} from '../models/libraryCardModel';
import { Response,NextFunction } from "express";
import { IlibraryCard } from '../models/types';
import { CustomRequest } from "./authController";

const createLibraryCard=async( req:CustomRequest,res:Response,next:NextFunction )=>{
    const libraryCard:IlibraryCard=req.body;
    try {
        const newLibraryCard:IlibraryCardModel=await LibraryCard.create(libraryCard);
        
        res.status(201).json({message:"success",libraryCard:newLibraryCard._id});
    } catch (error:any) {
        res.status(400);
        next(error)
    }
}

const getLibraryCardById=async( req:CustomRequest,res:Response,next:NextFunction )=>{
    const id=req.params.id;
    try {
        const libraryCard:IlibraryCardModel|null=await LibraryCard.findById(id).populate('user');
        if(libraryCard){
            res.status(200).json({message:"success",libraryCard});
        }
    }
    catch (error:any) {
        res.status(400);
        next(error)
    }
}

export {createLibraryCard,getLibraryCardById}