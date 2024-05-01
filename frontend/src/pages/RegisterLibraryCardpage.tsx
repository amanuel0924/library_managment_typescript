import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispach, RootState } from '../redux/store'
import { Link } from 'react-router-dom'
import { getLibraryCard } from '../redux/slices/authSlice'

export const RegisterLibraryCardpage: React.FC = () => {
  const dispatch:AppDispach = useDispatch()

  const { user, libraryCard } = useSelector((state: RootState) => state.auth)

  const handleRegisterLibraryCard = () => {
    if (user) {
      dispatch(getLibraryCard(user._id.toString()))
    }
  }

  return (
    <div className='container mx-auto h-screen flex items-center justify-center'>
      {user ? (
        <div className='flex flex-col p-3 shadow-lg w-[500px] h-[400px] bg-slate-50 items-center justify-center'>
          <h1 className='m-1 font-bold text-3xl'>Register Library Card</h1>
          <p className='font-bold text-lg'>Welcome</p>
          {libraryCard ? (
            <h3>
              Library Card Number:
              <span className='text-blue-600 m-2 text-lg'>{libraryCard}</span>
            </h3>
          ) : (
            <button
              onClick={handleRegisterLibraryCard}
              className='bg-blue-600 rounded-xl px-3 py-1'
            >
              Register Library Card
            </button>
          )}
        </div>
      ) : (
        <div className='w-[500px] h-[400px] bg-slate-50 flex flex-col p-3 shadow-lg items-center justify-center'>
          <h1 className='m-1 font-bold text-lg'>
            Please login to register library card
          </h1>
          <Link className='bg-blue-600 rounded-xl px-3 py-1' to='/login'>
            Login here
          </Link>
        </div>
      )}
    </div>
  )
}
