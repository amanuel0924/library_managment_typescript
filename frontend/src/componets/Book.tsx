import React from 'react'
import { book } from '../models/book'

interface BookProps {
  book: book
}

export const Book:React.FC<BookProps> = ({book}) => {
  return (
    <div className='w-full h-fit rounded-md p-3'>
        <div className='flex justify-evenly  space-x-3'>
            <img src={book.cover} alt={book.title} className='w-80 shadow-md rounded-sm' />
            <div>
                <h2 className='text-2xl font-bold'>{book.title}</h2>
                <h3 className='text-lg italic '>{book.authors.join(",")}</h3>
                <p>{book.description}</p>
            </div>
        </div>
    </div>
  )
}
