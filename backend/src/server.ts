import express,{Express,Response,Request} from 'express'
import DB_connection from './config/DB_connection';
import dotenv from 'dotenv'
import  authRouter from './routes/authRoute';
import { errorHandler, notFound } from './middleware/errorMidleware';
import cors from 'cors'
dotenv.config();

DB_connection()
const PORT:number=  Number(process.env.PORT)||9000

const app:Express= express();

app.use(express.json())
app.use(cors())

app.use('/api/auth',authRouter)


app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log('server is runing on port',PORT)
})





