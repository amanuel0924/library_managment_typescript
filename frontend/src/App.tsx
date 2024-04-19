import { Outlet } from "react-router-dom"
import Header from "./componets/Header"
import Footer from "./componets/Footer"

function App() {
  return (
    <>
     <Header/>
      <main className=" h-screen">
      <Outlet />
      </main>
      <Footer/>
    </>
  )
}

export default App
