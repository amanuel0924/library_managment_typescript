import React, { useState } from "react"
import { FaBars, FaXmark,FaBookOpenReader } from "react-icons/fa6"
import { IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { RootState ,AppDispach} from "../redux/store"


const Hero = () => {
  const [menu, setMenu] = useState(true)
  const [keyword, setKeyword] = useState("")
  //const  navigate=useNavigate()
  const user = useSelector((state:RootState) => state.auth.user)
  
 




    const searchHandler = () => {
      console.log(keyword)
      setKeyword("")

    }
  const handleMenu = () => {
    setMenu(!menu)
  }

  return (
    <section className=" bg-gray-900">
      <div className=" container max-w-6xl mx-auto py-4 px-6 ">
        <nav className="flex items-center justify-between font-bold text-white">
          <Link to={'/'} className=" text-2xl flex space-x-2">
            <FaBookOpenReader size={32} />
            Lib
            </Link>
            <div className=" hidden h-10 font-OpenSans md:flex md:space-x-8 ">
            <div className="group">
              <Link to="/#">Home</Link>
              <div className=" mx-2 group-hover:border-b group-hover:border-blue-50"></div>
            </div>
            <div className="group">
              <Link to="/#">Catalog</Link>
              <div className=" mx-2 group-hover:border-b group-hover:border-blue-50"></div>
            </div>
           
            <div className="group">
              <Link to="/#">About</Link>
              <div className=" mx-2 group-hover:border-b group-hover:border-blue-50"></div>
            </div>
          </div>

            <div className="flex space-x-5">
            <div className="flex items-center space-x-4">
                <input
                type="text"
                placeholder="Search"
                className=" px-2 py-1 rounded-lg focus:outline-none placeholder:text-sm text-black text-sm"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                />
                <button onClick={searchHandler} className="bg-blue-400 px-2 py-1 rounded-lg">
                <IoSearch size={20} />
                </button>
            </div>
           {!user ?  <Link to={'/login'}>login</Link>:<Link to={`/profile/${user._id}`}>{user.name}</Link>}
            </div>


          <button
            onClick={handleMenu}
            id="hamMenu"
            className=" duration-200 z-40 block md:hidden focus:outline-none"
          >
            {menu ? <FaBars size={32} /> : <FaXmark size={32} />}
          </button>
        </nav>

        {!menu && (
          <div className="text-white text-lg  items-center backdrop-blur-md flex  flex-col  pt-32 space-y-6 w-full min-h-screen   z-30 absolute inset-0  transition-all duration-200 md:hidden ">
            <a
              href="/#"
              className="  duration-200 hover:scale-105 hover:underline"
            >
              NEW
            </a>
            <a
              href="/#"
              className=" duration-200 hover:scale-105 hover:underline"
            >
              DESIGNERS
            </a>
            <a
              href="/#"
              className=" duration-200 hover:scale-105 hover:underline"
            >
              CATAGORIES
            </a>
            <a
              href="/#"
              className=" duration-200 hover:scale-105 hover:underline"
            >
              RINGS
            </a>
            <a
              href="/#"
              className=" duration-200 hover:scale-105 hover:underline"
            >
              ABOUT
            </a>
          </div>
        )}
       
      </div>
    </section>
  )
}

export default Hero