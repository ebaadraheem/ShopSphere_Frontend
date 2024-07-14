import { useState, useEffect } from 'react'
import React from 'react'
import Home from './components/Home'
import { auth } from './Firbase/firbase'
import Description from './components/Description/Description'
import ShoppingCart from './components/Cart/ShoppingCart'
import Admin from './components/Admin/Admin'
import Favourites from './components/Favourites/Favourites'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Shirts from './components/Shirts/Shirts'
import T_Shirts from './components/T-Shirts/T_Shirts'
import Pants from './components/Pants/Pants'
import Trousers from './components/Trousers/Trousers'
import Fragrances from './components/Fragrances/Fragrances'
import UserContext from './UserContext/UserContext'
import SignUp from './components/SignUp/SignUp'
import Payment from './components/SuccessfulPayment/Payment'
function App() {

  const [data, setdata] = useState([])
  const [Query, setQuery] = useState("")
  const [favourite, setfavourite] = useState([])
  const [Cart, setCart] = useState([])
  const [admin, setadmin] = useState(false)
  const [isuser, setisuser] = useState(false)
  const [userId,setuserId]=useState('')
  async function fetchData() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/data/all`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const list = await response.json();
      setdata(list);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  
  async function FetchFav(userID) {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/favorites/all/${userID}`);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const list = await response.json();
        

       const filteredData = data.filter(item => list.includes(item.id));
     
      setfavourite(filteredData)
    } catch (error) {
        console.error("Error fetching data:", error);
        
    }
}
useEffect(() => {
  fetchData();
}, []);


useEffect(() => {
  if (userId) {
    FetchFav(userId);
  }
}, [userId, data]);

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(user => {
    if (user) {
      setuserId(user.uid);
      setisuser(true);
      if (user.uid === import.meta.env.VITE_ADMIN_ID) {
        setadmin(true);
      } else {
        setadmin(false);
      }
    } else {
      setisuser(false);
      setadmin(false);
    }
  });
  return () => unsubscribe();
}, []);

  const getFilteredItems = (data) => {
    if (!Query) {
      return data;

    }
    return data.filter((item) =>
      item.name.toLowerCase().includes(Query.toLowerCase())
    );
  };

  return (
    <>
      <UserContext.Provider value={{ Query, setQuery, data, setdata, favourite, setfavourite, Cart, setCart, getFilteredItems, admin, setadmin,userId,setuserId}}>
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shirts" element={<Shirts />} />
      <Route path="/t-shirts" element={<T_Shirts />} />
      <Route path="/pants" element={<Pants />} />
      <Route path="/trousers" element={<Trousers />} />
      <Route path="/fragrances" element={<Fragrances />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/description" element={<Description />} />
      <Route path="/signup" element={<SignUp />} />
      {isuser && (
        <>
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
        </>
      )}
      {admin && <Route path="/admin" element={<Admin />} />}
    </Routes>
  </Router>
</UserContext.Provider>
    </>
  )
}

export default App
