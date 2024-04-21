import React from 'react'

export const LibraryHoures:React.FC = () => {
  return (
    <div className=' p-3 w-full h-fit bg-gray-50 rounded-md shadow-lg mt-4'>
        <h3 className='text-lg font-semibold'>Library Hours</h3>
        <table className=' w-full '>
            <tbody className='text-small'>
            <tr className=' border-b'>
                <td>Monday</td>
                <td>10:00 am - 5:00 pm</td>
            </tr>
            <tr className=' border-b'>
                <td>Tuesday</td>
                <td>10:00 am - 5:00 pm</td>
            </tr>
            <tr className=' border-b'>
                <td>Wednesday</td>
                <td>10:00 am - 5:00 pm</td>
            </tr>
            <tr className=' border-b'>
                <td>Thursday</td>
                <td>10:00 am - 5:00 pm</td>
            </tr>
            <tr className=' border-b'>
                <td>Friday</td>
                <td>10:00 am - 5:00 pm</td>
            </tr>
            <tr className=' border-b'>
                <td>Saturday</td>
                <td>10:00 am - 5:00 pm</td>
            </tr>
            <tr>
                <td>Sunday</td>
                <td>Closed</td>
            </tr>
            </tbody>
        </table>
    </div>
  )
}
