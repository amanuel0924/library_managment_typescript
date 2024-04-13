import mongoose from "mongoose";

const DB_connection=async()=>{
   try {
    const dburl:string=String(process.env.MONGO_URL)
    await mongoose.connect(dburl)
    console.log('DB connected Succesfuly')
   } catch (error) {
    console.log('error:',error)
    process.exit(1)
   }
}
export default DB_connection