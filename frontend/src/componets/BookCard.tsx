import { useNavigate } from "react-router-dom";
import { book } from "../models/book";

import React from 'react'

interface BookProps {
  book: book
}

export const BookCard:React.FC<BookProps> = ({book}) => {
  const navigate=useNavigate()
  console.log('on book card',book)
  return (
    <div className=' min-w-[280px] h-[400px] mx-3 justify-center items-center shadow-md cursor-pointer p-2 rounded-lg flex flex-col' onClick={()=>navigate(`/book/${book.barcode}`)}>
    
            <img src={book.cover} alt={book.title} className=' h-[45%] ' />
   
        <div className="h-1/2 m-0 w-full">
                <h2 className='text-xl font-bold w-full overflow-hidden text-ellipsis whitespace-nowrap'>{book.title}</h2>
                <h3 className='text-lg font-bold w-full overflow-hidden text-ellipsis whitespace-nowrap '>{book.authors.join(",")}</h3>
                <p className="w-full max-h-[70%] text-[13px] overflow-hidden line-clamp-6 flex">{book.description}</p>
            </div>
    </div>
  )
}