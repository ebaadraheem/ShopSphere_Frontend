import React from 'react'
import Navbar from '../Navbar'
import Menu from '../Menu'
import Cards from '../Cards'
import Footer from '../Footer'
import { useState,useEffect,useContext } from 'react'
import UserContext from '../../UserContext/UserContext'
const Shirts = () => {
  
  const user = useContext(UserContext);
  const [shirts, setshirts] = useState([])
  useEffect(() => {
    const shirtItems = user.data.filter(card => card.category === "Shirt");
    setshirts(shirtItems);
}, [user.data]);

useEffect(() => {

  user.setQuery("")

}, [])

const filtereditems = user.getFilteredItems(shirts)
  return (
    <>
    <div>
        <Navbar/>
        <Menu/>
        <div className=' roboto_font min-h-[54vh] mt-5'>
        <div className={`${filtereditems.length ==0 ? 'flex' : 'hidden'} flexer h-[54vh]`}><h1 className='  textlg'>No items to show</h1></div>
        <div className='  md:pl-12 md:pr-5  flex gap-2 flex-wrap md:ml-5 max-md:px-5'>
        { 
  filtereditems.map((cards) => {
    
      return <Cards key={cards.id} cards={cards} />;
    
   
  })
}

    </div>
    </div>
    <Footer/>
    </div>
    </>
  )
}

export default Shirts
