import React from 'react'
import Navbar from '../Navbar'
import Menu from '../Menu'
import Cards from '../Cards'
import Footer from '../Footer'
import { useState,useEffect,useContext } from 'react'
import UserContext from '../../UserContext/UserContext'
const Trousers = () => {
  
  const user = useContext(UserContext);
  const [trousers, settrousers] = useState([])
  useEffect(() => {
    const trousersItems = user.data.filter(card => card.category === "Trouser");
    settrousers(trousersItems);
}, [user.data]);
useEffect(() => {

  user.setQuery("")

}, [])

const filtereditems = user.getFilteredItems(trousers)
  return (
    <>
    <div>
        <Navbar/>
        <Menu/>
        <div className='min-h-[54vh] mt-5 roboto_font'>
        <div className={`${filtereditems.length ==0 ? 'flex' : 'hidden'} flexer h-[54vh]`}><h1 className='  textlg'>No items to show</h1></div>
        <div className='md:pl-12 md:pr-5  flex gap-2 flex-wrap md:ml-5 max-md:px-5'>
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

export default Trousers
