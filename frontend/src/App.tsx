import { Outlet } from "react-router-dom"
import Header from "./componets/Header"
import Footer from "./componets/Footer"

function App() {
  return (
    <>
     <Header/>
      <Outlet />
      <Footer/>
    </>
  )
}

export default App
