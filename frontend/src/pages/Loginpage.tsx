import React, { useRef,useEffect } from "react"
import { useNavigate} from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { AppDispach,RootState } from "../redux/store"
import {login} from './../redux/slices/authSlice'
import { Link } from "react-router-dom"


export default function Loginpage(): JSX.Element {
    
    const emailref=useRef<HTMLInputElement>(null)
    const passwordref=useRef<HTMLInputElement>(null)
    const auth=useSelector((state:RootState)=>state.auth)
    const dispatch=useDispatch<AppDispach>()
    const navigate=useNavigate()
  const handleloggin=async (e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
   if(emailref&&emailref.current&&passwordref&&passwordref.current){
    dispatch(login({email:emailref.current.value,password:passwordref.current.value}))
   }
   
   
   }

  useEffect(() => {
    if(auth.user){
      navigate('/')
    }
   },[auth, navigate])


  return (
    <div className="relative mx-auto w-full max-w-md mt-28 bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10 ">
    <div className="w-full">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-900">Sign in</h1>
        <p className="mt-2 text-gray-500">Sign in below to access your account</p>
      </div>
      <div className="mt-5">
        <form  id="signInForm">
          <div className="relative mt-6">
            <input
              type="email"
              name="email"
              ref={emailref}
              id="email"
              placeholder="Email Address"
              className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
             
              autoComplete="NA"
            />
            <label
              htmlFor="email"
              className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
            >
              Email Address
            </label>
          </div>
          <div className="relative mt-6">
            <input
              type="password"
              name="password"
              ref={passwordref}
              id="password"
              placeholder="Password"
              className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
              
            />
            <label
              htmlFor="password"
              className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
            >
              Password
            </label>
          </div>
          <div className="my-6">
            <button onClick={handleloggin} className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">
              Sign in
            </button>
          </div>
          {auth.isError&&<span className="text-center my-2 text-red-500">invalid password or email!!</span>}
          <p className="text-center text-sm text-gray-500">
            Don&#x27;t have an account yet?
            <Link to="/register" className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">
              Register
            </Link>.
          </p>
        </form>
      </div>
    </div>
  </div>
  )
}
