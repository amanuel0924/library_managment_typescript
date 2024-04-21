import React from 'react'
import { Book } from './Book'

export const BookoftheWeek:React.FC = () => {
  return (
    <div className=' h-fit mt-5 w-[98%] p-3 bg-gray-50  rounded-md shadow-lg'>
        <h1 className='text-4xl font-bold p-1 '>Book of the Week</h1>
        <Book book={{
            _id: '1',
            title: 'The Great Gatsby',
            cover: 'https://images.pexels.com/photos/2257704/pexels-photo-2257704.jpeg?auto=compress&cs=tinysrgb&w=600',
            barcode: '123456789',
            authors: ['F. Scott Fitzgerald', 'Another Author'],
            description: 'The Great Gatsby is a novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922.',
            pages: 310,
            subjects: ['Fiction', 'Classics'],
            publicationDate: new Date('1925-04-10'),
            publisher: 'Scribner',
            genre: 'Novel',
            records: [],
        }} />

    </div>
  )
}
