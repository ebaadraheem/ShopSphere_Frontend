import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
const Orders = () => {
const [OrderData, setOrderData] = useState([])
    async function FetchOrderData() {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/orders/all`);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const list = await response.json();
          setOrderData(list);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      useEffect(() => {
        FetchOrderData();
      }, []);

 

async function HandleCross(dataid) {
    try {
        const dt={id:dataid}
        let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/orders/remove/`, dt);
        setOrderData(prevData => prevData.filter(item => item.id !== dataid));
        toast.error("Order declined")
  
    } catch (error) {
        console.log("Error removing data: ", error);
    }
      
}

async function HandleTick(data) {
    try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/history/add/`, data);
        
        const updatePromises = data.detail.map(async obj => {
            let newObj = { ...obj };
            const updatedata = {
                name: newObj.productname,
                size: newObj.size,
                quantity: newObj.quantity
            };
            return axios.post(`${import.meta.env.VITE_BACKEND_URL}/data/update/`, updatedata);
        });
        
        await Promise.all(updatePromises);
        const dt={id:data.id}
         await axios.post(`${import.meta.env.VITE_BACKEND_URL}/orders/remove/`, dt);
        setOrderData(prevData => prevData.filter(item => item.id !== data.id));
        
        toast.success("Order delivered")
     
    } catch (error) {
        console.log("Error Entering order data: ", error);
    }
      
      
}

    return (
        <div className='  bg-base-200 rounded-sm min-h-[61vh] md:px-1'>
            <h1 className='xl:pl-5 text-3xl font-bold py-2'>Orders</h1>
            <div className=' flex flex-col gap-2'>
                <div className='max-md:text-sm font-bold flex md:gap-2 '>
                    <h1 className=' max-sm:px-1 w-[10%] max-lg:max-w-32 flexer order-4'>Phone #</h1>
                    <h1 className=' max-sm:px-1 w-[10%] max-lg:max-w-28 flexer'>Date</h1>
                    <h1 className=' max-sm:px-1 w-[10%] max-lg:max-w-40 flexer'>Name</h1>
                    <h1 className=' max-sm:px-1 w-[30%] max-lg:max-w-80 flexer'>Order Detail</h1>
                    <h1 className=' max-sm:px-1 w-[10%] max-lg:max-w-28 flexer'>Total</h1>
                    <h1 className=' max-sm:px-1 w-[20%] max-lg:max-w-56 flexer'>Ship To</h1>

                    <div className=' w-[10%] max-sm:px-1 max-lg:max-w-24 flexer order-5'>
                        <h1 className=' hidden ' >Tap to Check</h1>
                    </div>
                </div>
                {/* Order */}
                <div className={`  ${OrderData.length == 0 ? 'flex' : 'hidden'} flexer  h-[45vh]`}>
                    <div className=' font-bold'>
                        No Orders to show
                    </div>
                </div>
                {
                    OrderData.map(item=>
                        (
                <div key={item.id} className='max-md:text-[0.6rem] flex md:gap-2 bg-base-300 rounded-md'>
                    <h1 className=' max-sm:px-1 w-[10%] max-sm:break-all max-lg:max-w-32 flexer order-4'>{item.phone}</h1>
                    <h1 className='max-sm:px-1 w-[10%] max-lg:max-w-28 max-sm:break-all flexer'>{item.date}</h1>
                    <h1 className='max-sm:px-1 w-[10%] max-lg:max-w-40 flexer'>{item.name}</h1>
                    <div className='max-sm:px-1  w-[30%] max-lg:max-w-80 flexer flex-col'>

                        {
                            item.detail.map((item1,index)=>(
                                <h1 className=' text-center' key={index}>{item1.productname}({item1.size}) {item1.quantity}</h1>
                            ))
                        }
                    </div>
                    <h1 className='max-sm:px-1  w-[10%] max-lg:max-w-28 flexer md:gap-1 max-lg:flex-col'><h2 className=' max-md:break-all'>{item.total}</h2> <div> pkr</div></h1>
                    <h1 className='max-sm:px-1 w-[20%] max-lg:max-w-56 flexer'>{item.address}</h1>
                    <div className=' w-[10%] max-lg:max-w-24 flexer gap-[2px] max-lg:flex-col order-5'>
                        <button onClick={()=>HandleCross(item.id)} className="btn max-sm:btn-xs btn-sm">	&#10060; </button>
                        <button onClick={()=>HandleTick(item)} className="btn max-sm:btn-xs btn-sm">	&#9989;</button>
                    </div>
                </div>


                    )

                    )
                }
            </div>
        </div>
    )
}

export default Orders
