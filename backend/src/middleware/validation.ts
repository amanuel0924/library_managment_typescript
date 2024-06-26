import Joi,{ObjectSchema} from "joi";

import { Request, Response, NextFunction, query } from "express";
import { IUser } from "../models/types";
import { IUserModel } from "../models/userModel";
import { IBook } from "../models/types";
import { IBookModel } from "../models/bookModel";
import { IloanRecord } from "../models/types";
import { IloanRecordModel } from "../models/loanRecooredModel";




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
            console.log(error)  
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
            password:Joi.string().required(),
            
        }).unknown(),

        id:Joi.object<{id:string}>({
            id:Joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
        }),
    },

        book:{
            create:Joi.object<IBook>({
                barcode:Joi.string().required(),
                title:Joi.string().required(),
                cover:Joi.string().required(),
                authors:Joi.array().items(Joi.string()).required(),
                subjects:Joi.array().items(Joi.string()).required(),
                publisher:Joi.string().required(),
                publicationDate:Joi.date().required(),
                pages:Joi.number().required(),
                genre:Joi.string().required(),
                description:Joi.string().required()
            }).unknown(),
    
            updateBook:Joi.object<IBookModel>({
                _id:Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
                barcode:Joi.string().required(),
                title:Joi.string().required(),
                cover:Joi.string().required(),
                authors:Joi.array().items(Joi.string()).required(),
                subjects:Joi.array().items(Joi.string()).required(),
                publisher:Joi.string().required(),
                publicationDate:Joi.date().required(),
                pages:Joi.number().required(),
                genre:Joi.string().required(),
                description:Joi.string().required()
            }).unknown(),
            deleteBook:Joi.object<{barcode:string}>({
                barcode:Joi.string().required()
            }),
        },
        libraryCard:{
            create:Joi.object<{user:string}>({
                user:Joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
            }),
            id:Joi.object<{id:string}>({
                id:Joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
            })
        },
        loan:{
            create:Joi.object<IloanRecord>({
                status:Joi.string().valid('LOANED','AVAILABLE').required(),
                item:Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
                borrower:Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
                dueDate:Joi.date().required(),
                loanedDate:Joi.date().required(),
                returnedDate:Joi.date(),
                employeeOut:Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
                employeeIn:Joi.string().regex(/^[0-9a-fA-F]{24}$/)
            }),
            update:Joi.object<IloanRecordModel>({
                _id:Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
                status:Joi.string().valid('LOANED','AVAILABLE').required(),
                item:Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
                borrower:Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
                dueDate:Joi.date().required(),
                loanedDate:Joi.date().required(),
                returnedDate:Joi.date(),
                employeeOut:Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
                employeeIn:Joi.string().regex(/^[0-9a-fA-F]{24}$/)
            }),
           query:Joi.object<{property:string,value:string}>({
                property:Joi.string().valid('status','item','borrower','dueDate','loanedDate','returnedDate','employeeOut','employeeIn').required(),
                value:Joi.alternatives(Joi.string(),Joi.date()).required()
              })
        }

    
}