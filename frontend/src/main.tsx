import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {createBrowserRouter,RouterProvider,createRoutesFromElements,Route} from 'react-router-dom'
import './index.css'
import Homepage from './pages/Homepage.tsx'
import Loginpage from './pages/Loginpage.tsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />}>
     <Route index={true} path="/" element={<Homepage />} />
     <Route path="/login" element={<Loginpage/>} />
  </Route>
))
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
