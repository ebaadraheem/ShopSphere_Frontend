import { Link } from 'react-router-dom';
import { useContext,useEffect,useState } from 'react';
import UserContext from '../../UserContext/UserContext';
import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Menu from '../Menu'
import Cards from '../Cards'
const Favourites = () => {
    const user = useContext(UserContext);

    useEffect(() => {

        user.setQuery("")
    
      }, [])
      
      const filtereditems = user.getFilteredItems(user.favourite)
    return (
        <>
            <Navbar />
            <Menu/>
            <div className=' min-h-[57vh]'>
            <div className='md:ml-12 '>
                    <div className='  pl-6 h-16 flex items-end pb-3'>

                        <h1 className=' text-lg md:text-xl roboto_font'>Favourites</h1>
                    </div>
                    <div className=' px-6 flexer mb-5'>

                            <hr className=' w-[100%]' />
                        </div>
                        <div className={`  ${filtereditems.length == 0 ? 'flex' : 'hidden'} flex flex-col justify-center items-center h-[45vh]`}><h1 className='  textlg'>No items to show</h1>
                            <Link to="/" ><div className={`${user.favourite.length == 0 ? 'flex' : 'hidden'} max-sm:text-xs flexer gap-2 mx-6 h-16  `}>
                                <button  className="roboto_font btn max-md:w-[170px] w-[200px]">Back to Homepage</button>
                            </div>
                            </Link>
                            </div>
                            </div>
                
                <div className='roboto_font  md:pl-12 md:pr-5  flex gap-2 flex-wrap md:ml-5 max-md:px-5'>
    { 
    
    filtereditems.map((cards)=>(
        <Cards cards={cards}/>
      ))
    }
    </div>
            </div>
            <Footer />
        </>
    )
}

export default Favourites
