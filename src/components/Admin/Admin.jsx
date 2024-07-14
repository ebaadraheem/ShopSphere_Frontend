import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { useState, useEffect } from 'react'
import Orders from './Orders'
import CreatePosts from './CreatePosts'
import OrdersHistory from './OrdersHistory'
import Messages from './Messages'
import Menu from '../Menu'
import Products from './Products'
const Admin = () => {

    const [selectedItem, setSelectedItem] = useState('orders');

    return (
        <div>
            <Navbar />
            <Menu/>
            <div className='  px-2 min-h-[61vh] mt-5 roboto_font'>

                <div className='  gap-1 max-md:flex-col min-h-[61vh] flex'>
                    <div className=" font-bold rounded-sm md:flex-col w-[13%] max-md:w-full flex gap-1 md:min-h-[61vh]"><div onClick={()=>setSelectedItem("orders")} className=' max-md:text-sm rounded-sm bg-base-300 h-16 flex max-md:px-2 pl-5 pr-2 items-center cursor-pointer max-md:w-28 max-md:flexer  hover:bg-gray-300'><h1>My Orders</h1></div>
                        <div onClick={()=>setSelectedItem("manageposts") }className='pr-2 max-md:text-sm rounded-sm bg-base-300 flex pl-5 items-center max-md:px-2 h-16 cursor-pointer max-md:w-28 max-md:flexer hover:bg-gray-300'><h1>Create Posts</h1></div>
                        <div onClick={()=>setSelectedItem("products")} className='flex pl-5 max-md:px-2 pr-2 items-center max-md:text-sm rounded-sm bg-base-300 h-16 cursor-pointer max-md:w-28 max-md:flexer hover:bg-gray-300'><h1>Products</h1></div>
                        <div onClick={()=>setSelectedItem("orderhistory")} className='flex pl-5 max-md:px-2 pr-2 items-center max-md:text-sm rounded-sm bg-base-300 h-16 cursor-pointer max-md:w-28 max-md:flexer hover:bg-gray-300'><h1>Order History</h1></div>
                        <div onClick={()=>setSelectedItem("messages")} className='flex pl-5 max-md:px-2 pr-2 items-center max-md:text-sm rounded-sm bg-base-300 h-16 cursor-pointer max-md:w-28 max-md:flexer hover:bg-gray-300 break-all overflow-hidden'><h1>Messages</h1></div>
                        </div>
                    <div className="  min-h-[61vh] w-full md:w-[87%]">
                        {selectedItem==="orders"&&<Orders/>}
                        {selectedItem==="manageposts"&&<CreatePosts/>}
                        {selectedItem==="orderhistory"&&<OrdersHistory/>}
                        {selectedItem==="products"&&<Products/>}
                        {selectedItem==="messages"&&<Messages/>}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Admin
