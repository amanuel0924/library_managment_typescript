import Joi,{ObjectSchema} from "joi";

import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/types";
import { IUserModel } from "../models/userModel";

export function validateSchema(schema:ObjectSchema,property:string){
    return async(req:Request,res:Response,next:NextFunction)=> {
        try {
           switch( property)
              {
                case 'params':
                     await schema.validateAsync(req.params);
                     break;
                case 'query':
                     await schema.validateAsync(req.query);
                     break;
                default:
                        await schema.validateAsync(req.body);
                    }
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
        }),

        update:Joi.object<IUserModel>({
            _id:Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
            role:Joi.string().valid('employee','admin','member').required(),
            name:Joi.string().required(),
            email:Joi.string().email().required(),
            password:Joi.string().required()
        }),

        id:Joi.object<{id:string}>({
            id:Joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
        })



    }
}