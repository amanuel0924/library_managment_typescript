import {Response} from 'express'
import jwt from 'jsonwebtoken'


const generateToken = (res:Response, id:string) => {
  const secrete:string=process.env.JWT_SECRET||"unkown"
  const token = jwt.sign({ id },secrete , {
    expiresIn: "30d",
  })
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "strict",
  })
}

export default generateToken