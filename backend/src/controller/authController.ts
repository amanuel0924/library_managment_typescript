import { Request,Response,NextFunction } from "express";
import { IUser } from "../models/types";
import bcrypt from 'bcrypt'
import User,{IUserModel} from "../models/userModel";


export const register=async (req:Request,res:Response,next: NextFunction)=>{
   const user:IUser=req.body;
   
 try {
   
     const hashedPassword=await bcrypt.hash(user.password,10);
        const newUser:IUserModel=await User.create({...user,password:hashedPassword});
        
        return res.status(201).json({message:"success",
        user:{
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            role:newUser.role
        }});
        
    
 } catch (error:any) {
         res.status(400);
         next(error);
 }

}

export const login=async (req:Request,res:Response,next: NextFunction)=>{
    const {email,password}=req.body;
    try {
        const user:IUserModel|null=await User.findOne({email});
        console.log(user)
        if(!user){
            res.status(400);
            throw new Error("Invalid email or password");
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(400);
            throw new Error("Invalid email or password");
        }
        return res.status(200).json({message:"success",
        user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        }});
    } catch (error:any) {
        res.status(400);
        next(error);
    }
}



