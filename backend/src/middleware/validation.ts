import Joi,{ObjectSchema} from "joi";

import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/types";

export function validateSchema(schema:ObjectSchema){
    return async(req:Request,res:Response,next:NextFunction)=> {
        try {
            await schema.validateAsync(req.body,{ abortEarly: false })
            next();
        } catch (error:any) {
          return  res.status(422).json({message:error.details[0].message})
        }
    }
}

export const Shemas={
    user:{
        create:Joi.object <IUser> ({
            role:Joi.string().valid('employee','admin','member').required(),
            name:Joi.string().required(),
            email:Joi.string().email().required(),
            password:Joi.string().required()
        }),
        login:Joi.object<{email:string,password:string}>({
            email:Joi.string().email().required(),
            password:Joi.string().required()
        })
    }
}