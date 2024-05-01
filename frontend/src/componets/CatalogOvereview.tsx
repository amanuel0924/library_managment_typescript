import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { AppDispach,RootState } from '../redux/store' 
import {fetchAllBooks} from '../redux/slices/bookSlice'

import {generateRandomGeners, getRandomBookbyGenere} from './../helper/frontUtil'
import { CatalogOvereviewSection } from './CatalogOverveiwSection'



export const CatalogOvereview:React.FC = () => {
    const dispatch = useDispatch<AppDispach>()
    const bookState = useSelector((state:RootState)=>state.book)
    const {books,loading}=bookState
    
    
    const  [genres,setGenres]=useState<string[]>(()=>generateRandomGeners())

    useEffect(() => {
        dispatch(fetchAllBooks())
    }, [dispatch])
  return (
    <>{
       books.length>0 && !loading?(
        <div className=' w-full h-fit'>
            <h2 className=' text-3xl font-bold'>Wellcome to our Library, we currently have {books&&books.length} books.</h2>
            <h4 className='text-lg font-semibold'>browse our selected book bellow, or serch some books on the naviggation</h4>
            {
                    genres.map((genre)=>(
                        <CatalogOvereviewSection key={genre} books={getRandomBookbyGenere(books,genre)} lable={genre}/>
                    ))
            }
        </div>
       ) :"loading..."
    }</>
  )
}
