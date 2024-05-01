import { IlibraryCard } from "./types";
import mongoose,{Schema,Document} from "mongoose";

export interface IlibraryCardModel extends IlibraryCard,Document{}


const libraryCardSchema:Schema = new Schema({
    user:{type:Schema.Types.ObjectId,ref:'User',required:true,unique:true},
  
});

export default mongoose.model<IlibraryCardModel>('LibraryCard',libraryCardSchema);