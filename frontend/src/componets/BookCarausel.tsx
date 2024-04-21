import React,{useState} from 'react'
import { book } from '../models/book'
import { BookCard } from './BookCard';

interface BookCarauselProps {
  books: book[]
}

export const BookCarausel:React.FC<BookCarauselProps> = ({books}) => {
    const [order,setOrder]=useState<book[]>(books);

    const moveLeft=()=>{
        const item=order[0]
        const reOrdered=order.slice(1,order.length)
        reOrdered.push(item)
        setOrder(reOrdered)
    }

    const moveRight=()=>{
        const item=order[order.length-1]
        const reOrdered=order.slice(0,order.length-1)
        reOrdered.unshift(item)
        setOrder(reOrdered)
    }
  return (
    <div className='w-full h-[425px]  flex justify-center items-center px-4 mx-auto  shadow-xlc rounded-xl flex-wrap overflow-hidden relative gap-y-5 '>

        <div className=' h-10 w-10 absolute top-1/2 left-0  flex justify-center items-center text-[1.5rem] hover:cursor-pointer hover:bg-gray-600 rounded-full ' onClick={moveLeft}>{"<"}</div>
        <div className='h-10 w-10  absolute top-1/2 right-0  flex justify-center items-center text-[1.5rem] hover:cursor-pointer hover:bg-gray-600 rounded-full ' onClick={moveRight}>{">"}</div>
        <div className='flex justify-evenly  items-center  w-full'>
            {
                order.map((book)=>(
                    <BookCard key={book.barcode} book={book} />
                       
                    
                ))
            }
        </div>
        
    </div>
  )
}
