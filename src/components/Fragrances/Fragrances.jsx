import React from 'react'
import Navbar from '../Navbar'
import Menu from '../Menu'
import Cards from '../Cards'
import Footer from '../Footer'
import UserContext from '../../UserContext/UserContext'
import { useState,useEffect,useContext } from 'react'
const Fragrances = () => {
  const user = useContext(UserContext);
  useEffect(() => {

    user.setQuery("")

  }, [])
  
  const [fragrances, setfragrances] = useState([])
  
  useEffect(() => {
    const fragranceItems = user.data.filter(card => card.category === "Fragrance");
    setfragrances(fragranceItems);
  }, [user.data]);

  const filtereditems = user.getFilteredItems(fragrances)
  return (
    <>
    <div>
        <Navbar/>
        <Menu/>
        <div className=' min-h-[54vh] mt-5 roboto_font'>
        <div className={`${filtereditems.length ==0 ? 'flex' : 'hidden'} flexer h-[54vh]`}><h1 className='  textlg'>No items to show</h1></div>
        <div className=' md:pl-12 md:pr-5  flex gap-2 flex-wrap md:ml-5 max-md:px-5'>
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

export default Fragrances
