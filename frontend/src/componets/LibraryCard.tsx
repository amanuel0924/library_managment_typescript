import React from 'react'
import { useDispatch } from 'react-redux'
import LibCard from './../assets/librarycard.png'

import { AppDispach } from '../redux/store'
import { Link } from 'react-router-dom'

export const LibraryCard:React.FC= () => {
  return (
    <div className=' w-[98%] h-it rounded-md p-3 mt-4 bg-gray-50 shadow-lg flex flex-col justify-center items-center'>
        <h2 className='text-4xl font-bold p-1 '>Get Library Card</h2>
        <img src={LibCard} alt='Library Card' className=' w-1/2 mb-4' />
       <p>Get Library Card<Link to='#' className=' text-blue-600 hover:underline m-2'>here</Link></p>
    </div>
  )
}
