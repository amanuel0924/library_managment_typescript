import { Request,Response,NextFunction } from "express";
import { IUser } from "../models/types";
import User,{IUserModel} from "../models/userModel";
import { CustomRequest } from "./authController";


const getAllUser=async( req:CustomRequest,res:Response,next:NextFunction )=>{
    try {
        const users:IUserModel[]=await User.find({});
        res.status(200).json({message:"success",users});
    } catch (error:any) {
        res.status(400);
        next(error)
    }
}

const getUserById=async( req:CustomRequest,res:Response,next:NextFunction )=>{
    const id=req.params.id;
    try {
        const user:IUserModel|null=await User.findById(id);
        if(user){
            res.status(200).json({message:"success",user});
        }
    } catch (error:any) {
        res.status(400);
        next(error)
    }
}

const updateUser=async( req:CustomRequest,res:Response,next:NextFunction )=>{
    const id:string=req?.user?._id;
    const user:IUser=req.body;
    console.log(user)   
    try {
        const updatedUser:IUserModel|null=await User.findByIdAndUpdate(id,user,{new:true});
        if(updatedUser){
            res.status(200).json({message:"success",user:updatedUser});
        }
    } catch (error:any) {
        
        res.status(400);
        next(error)
    }
}

const deleteUser=async( req:CustomRequest,res:Response,next:NextFunction )=>{
    const id:string=req.params.id;
    try {
        const deletedUser:IUserModel|null=await User.findByIdAndDelete(id);
        if(deletedUser){
            res.status(200).json({message:"delete success"});
        }
    } catch (error:any) {
        res.status(400);
        next(error)
    }
}

export {getUserById,updateUser,deleteUser,getAllUser}