import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { useLocation,useNavigate } from 'react-router-dom'
import { RootState } from '../redux/store'
import { calculatePaging } from '../helper/frontUtil'

export const CatalogSearchNavigator:React.FC = () => {
    const pagingInformation = useSelector((state:RootState) => state.book.pagingInformation)
    const {search} = useLocation()
    const navigate = useNavigate()

    const navigatePrecious = () => {
        if(pagingInformation&&pagingInformation.currentPage!==1){
            if(search.includes('&page=')){
               const splitString=search.split('&page=')
               const newterms=splitString[0]+`&page=${pagingInformation?.currentPage-1}`
               navigate(`/catalog${newterms}`)
        }else{
        const newterms=search+`&page=${pagingInformation?.currentPage-1}`
            navigate(`/catalog${newterms}`)
        }
    }
    }

    const navigateNext = () => {
        if(pagingInformation&&pagingInformation.currentPage!==pagingInformation.totalPages){
            if(search.includes('&page=')){
               const splitString=search.split('&page=')
               const newterms=splitString[0]+`&page=${pagingInformation?.currentPage+1}`
               navigate(`/catalog${newterms}`)
            }else{
                const newterms=search+`&page=${pagingInformation?.currentPage+1}`
                navigate(`/catalog${newterms}`)
            }
    }
    }

   const navigatetoNumber=(e:React.MouseEvent<HTMLParagraphElement>)=>{
    if(search.includes('&page=')){
        const splitString=search.split('&page=')
        const newterms=splitString[0]+`&page=${e.currentTarget.id}`
        navigate(`/catalog${newterms}`)
     }else{
         const newterms=search+`&page=${e.currentTarget.id}`
         navigate(`/catalog${newterms}`)
     }

   }

  return (
    <div className='mt-8 flex justify-center items-center '>
        <p onClick={navigatePrecious} className='hover:underline hover:cursor-pointer mx-2'>Previous</p>
        <div className='flex items-center justify-center h-fit'>
            {
                pagingInformation&&calculatePaging(pagingInformation).map(num=>{
                    if(num ===`${pagingInformation.currentPage}`)return <p key={num}  className='flex items-center justify-center w-6 h-6 cursor-pointer mx-2 hover:bg-blue-600 hover:rounded-md bg-blue-600 rounded-md'>{num}</p>
                    return <p key={num} id={num} onClick={navigatetoNumber} className='flex items-center justify-center w-6 h-6 cursor-pointer mx-2 hover:bg-blue-600 hover:rounded-md rounded-md'>{num}</p>
                })
            }
        </div>
        <p onClick={navigateNext} className='hover:underline hover:cursor-pointer mx-2'>Next</p>
    </div>
  )
}
