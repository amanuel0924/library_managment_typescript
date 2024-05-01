import { useLocation } from "react-router-dom";
import { CatalogOvereview } from "../componets/CatalogOvereview";

import React from 'react'
import { CatalogSearch } from "../componets/CatalogSearch";

export const Catalogpage:React.FC = () => {
    const location=useLocation()
  return (
    <div className="container mx-auto">
        <div className=" p-5">
            {
                location.search===""?<CatalogOvereview/>:<CatalogSearch/>

            }
        </div>
    </div>
  )
}
