import React, { useEffect,useState } from 'react'
import { fetchUser,logout,updateUser } from '../redux/slices/authSlice'
import { AppDispach,RootState } from '../redux/store'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate,useParams } from 'react-router-dom'




export const Profilepage = ():JSX.Element => {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  

    const user=useSelector((state:RootState)=>state.auth.user)
    const profileUser=useSelector((state:RootState)=>state.auth.profileUser)
    
    const dispatch:AppDispach=useDispatch()
    const navigate=useNavigate()
    const {id}=useParams()

 console.log('user',user)
  console.log('profileUser',profileUser)
  console.log('current',name,email)
    useEffect(()=>{
  if(user?._id===id||user?.role==='employee'){
    dispatch(fetchUser(id))
  }
  else{
    navigate('/')
  }
    },[dispatch,user,id,navigate])

    useEffect(()=>{
     if(profileUser){
        setName(profileUser.name)
        setEmail(profileUser.email)
      }
    },[profileUser,user])

    const handleUpdate=(e:React.MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault()
    
       if(profileUser){
        dispatch(updateUser({...profileUser,name,email}))
       }
      

    }

    const handleLogout=()=>{
      dispatch(logout())
    }

  return (
    <div className=' container mx-auto mt-10 '>
      <div className=' w-full flex h-screen'>
        <form  className=' mr-5 p-5 border-r-4 border-gray-400' >
          <p className='text-xl font-bold mb-5'>Profile</p>
           <div className='flex justify-between mt-2 '>
            <label className=' font-bold'>Name</label>
            <input type='text' value={name} onChange={(e)=>setName(e.target.value)} className='border-b-2' disabled={user?._id!==profileUser?._id} />
           </div>
            <div className='flex justify-between mt-2'>
              <label className=' font-bold'>Email</label>
              <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='border-b-2' disabled={user?._id!==profileUser?._id} />
            </div>

           
           <div className='flex justify-between mt-5 '>
          {
           user?._id===profileUser?._id && <button onClick={handleUpdate}  className=' border-2 px-3 py-2 bg-blue-500 text-white rounded-lg' >Update</button>
          }
          { user?._id===profileUser?._id &&  <button onClick={handleLogout} className=' border-2 px-3 py-2 bg-blue-500 text-white rounded-lg'>Logout</button>}
           </div>
        </form>
        <div className='w-fill'>
          <h1>hellow</h1>
        </div>
      </div>


    </div>
  )
}
