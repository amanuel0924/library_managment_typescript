
import mongoose,{ Schema,Document} from "mongoose";
import { IUser } from "./types";

export interface IUserModel extends Document,IUser{}

const userSchema= new Schema ({
    role:{
        type:String,
        enum:['employee','admin','member'],
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },


},{
    timestamps:true,
    versionKey:'version'

})


const User= mongoose.model<IUserModel>('User',userSchema);

export default User