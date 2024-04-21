import { IBook } from "./types";
import mongoose,{Schema,Document} from "mongoose";

export interface IBookModel extends IBook,Document{}


const bookSchema:Schema = new Schema({
    barcode:{type:String,required:true,unique:true},
    title:{type:String,required:true},
    cover:{type:String,required:true},
    authors:{type:[String],required:true},
    subjects:{type:[String],required:true},
    publisher:{type:String,required:true},
    publicationDate:{type:Date,required:true},
    pages:{type:Number,required:true},
    genre:{type:String,required:true},
    description:{type:String,required:true},
    records:[],

});

export default mongoose.model<IBookModel>('Book',bookSchema);
