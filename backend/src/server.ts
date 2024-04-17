import express,{Express,Response,Request} from 'express'
import cookieParser from 'cookie-parser';
import DB_connection from './config/DB_connection';
import dotenv from 'dotenv'
import  authRouter from './routes/authRoute';
import userRouter from './routes/userRoute';
import { errorHandler, notFound } from './middleware/errorMidleware';
import cors from 'cors'
dotenv.config();

DB_connection()
const PORT:number=  Number(process.env.PORT)||9000

const app:Express= express();

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser());

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)


app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log('server is runing on port',PORT)
})





