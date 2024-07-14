import React from 'react'
import Navbar from './Navbar'
import Menu from './Menu'
import Main from './Main'
import Footer from './Footer' 
const Home = () => {
  return (
    <>
    <div  className='roboto_font'>
     <Navbar/>
     <Menu/>
     <Main/>
    <Footer/>
    </div>
     </>
  )
}

export default Home
