import React from 'react'

export const ContactUs:React.FC = () => {
  return (
    <div className='flex flex-col w-full bg-gray-50 shadow-lg rounded-md mt-2'>
        <h1 className='text-2xl font-bold p-2'>Contact Us</h1>
        <div className='flex flex-col border-b p-2'>
           <h2 className='text-lg font-bold'>Address</h2>
              <p>1234 Main Street</p>
                <p>City, State 12345</p>

        </div>
        <div className='flex flex-col border-b p-2'>
            <h2 className='text-lg font-bold'>Phone</h2>
            <p>123-456-7890</p>
        </div>
        <div className='flex flex-col border-b p-2'>
            <h2 className='text-lg font-bold'>Email</h2>
            <p>123@rmail.vom</p>
        </div>

    </div>
  )
}
