import React from 'react'
import { MdEmojiEvents } from "react-icons/md";

export const UpcomingEvents:React.FC = () => {
  return (
    <div className=' h-fit w-[98%]  rounded-md shadow-lg mt-4 bg-gray-50'>
        <div className='flex space-x-2'>
            <MdEmojiEvents size={32} className=' text-orange-400' />
            <h1 className='text-4xl font-bold p-1 '>Upcoming Events</h1>
            <MdEmojiEvents size={32}  className=' text-orange-400'/>
            
        </div>
       <h1 className='text-4xl font-bold p-1 '>this summer</h1>
        <h4 className='text-2xl font-bold p-1'>Join us for a thuesday 10:00 am noon </h4>
        <ul className='list-disc px-10'>
            <li>Story time for kids</li>
            <li>Book club for teens</li>
            <li>Author meet and greet</li>
        </ul>
        
        <h4 className='text-2xl font-bold p-1'>Join us for a wensday 10:00 am noon </h4>
        <ul className='list-disc px-10'>
           
            <li>Book club for teens</li>
            <li>Atr class 101</li>
            <li>Book signing</li>
        </ul>

        <h4 className='text-2xl font-bold p-1'>Join us for a friday 10:00 am noon </h4>
        <ul className='list-disc px-10'>
            <li>Book club for adults</li>
            <li>web development tutorial Mern stack</li>
           
        </ul>
    </div>
  )
}
