import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { AppDispach,RootState } from '../redux/store'
import { useLocation } from 'react-router-dom'
import {queryBooks} from '../redux/slices/bookSlice'
import { useEffect } from 'react'
import { BookCard } from './BookCard'
import { CatalogSearchNavigator } from './CatalogSearchNavigator'

export const CatalogSearch:React.FC = () => {
    const location = useLocation()
    const dispatch:AppDispach = useDispatch()
    const bookState = useSelector((state:RootState) => state.book)



    useEffect(() => {
        dispatch(queryBooks(location.search))
        
    },[location.search,dispatch])
    console.log(bookState)

  return (
    <div className='w-full h-fit flex flex-col justify-center items-center  p-4'>
      <div className='w-[98.75%] flex h-fit mb-4  flex-col justify-center items-center '>

      </div>
      {
        !bookState.loading ? <>
        <h2 className='text-3xl font-semibold'>displaying{bookState.pagingInformation?.pageCount} books out of {bookState.pagingInformation?.totalCount}</h2>
        <div className='w-full h-fit flex flex-wrap justify-center items-center gap-y-4 '>
          {
            bookState.books.map(book => <BookCard key={book.barcode} book={book}/>)
          }
        </div>
        <div className='flex items-center justify-center w-full h-fit'>
          <CatalogSearchNavigator/>
        </div>
        </>:<></>
      }
    </div>
  )
}
