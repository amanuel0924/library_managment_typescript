import { IloanRecord } from "./types";
import mongoose,{Schema,Document} from "mongoose";

export interface IloanRecordModel extends IloanRecord,Document{}

export const loanRecordSchema:Schema = new Schema({
    status:{type:String,required:true},
    item:{type:Schema.Types.ObjectId,ref:'Book',required:true},
    borrower:{type:Schema.Types.ObjectId,required:true},
    dueDate:{type:Date,required:true},
    loanedDate:{type:Date,required:true},
    returnedDate:{type:Date},
    employeeOut:{type:Schema.Types.ObjectId,required:true},
    employeeIn:{type:Schema.Types.ObjectId},
}, {timestamps: true});

export default mongoose.model<IloanRecordModel>('LoanRecord',loanRecordSchema);