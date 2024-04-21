import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { RootState } from "../redux/store"
import React from "react";
import { book } from "../models/book";
import { BookCarausel } from "./BookCarausel";

interface CatalogOvereviewProps {
    books: book[]
    lable: string
}



export const CatalogOvereviewSection: React.FC<CatalogOvereviewProps> = ({ books, lable }) => {
    const bookState = useSelector((state: RootState) => state.book)
    const navigate = useNavigate()

    const handleViewMore = () => {
        navigate(`/catalog?genre=${lable}&subject=${lable}`)
    }

    return (
        <div className=" w-full h-[500px]  ">
            <div className="flex h-[10%] px-3 justify-between items-end">
                <h4 className="text-2xl font-bold">{lable}</h4>
                <p onClick={handleViewMore} className="hover:underline hover:cursor-pointer">View more...</p>
            </div>
            {
                bookState.books.length > 0 && !bookState.loading && <BookCarausel books={books} />
            }
        </div>
       
    )
}