import { Request,Response,NextFunction } from "express";
import { IUser } from "../models/types";
import bcrypt from 'bcrypt'
import User,{IUserModel} from "../models/userModel";
import generateToken from "../utils/generateToken";
import jwt from 'jsonwebtoken'

interface CustomRequest extends Request {
    user: IUserModel | null;
}

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
       
        if(!user){
            res.status(400);
            throw new Error("Invalid email or password");
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(400);
            throw new Error("Invalid email or password");
        }
       if(user){
        generateToken(res,user._id)
        return res.status(200).json({message:"success",
        user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        }});
       }
    } catch (error:any) {
        res.status(400);
        next(error);
    }
}

const protect = async (req:CustomRequest, res:Response, next:NextFunction) => {
    let token:string
    token = req.cookies.jwt
    let secrete:string=process.env.JWT_SECRET||""
    if (token) {
      try {
        const decoded = jwt.verify(token, secrete)as {id:string}
        const user= await User.findById(decoded.id)
        req.user=user
        next()
      } catch (error) {
        res.status(401)
        throw new Error("Not authorized, token failed")
      }
    }
    if (!token) {
      res.status(401)
      throw new Error("you are not logged in")
    }
  }


