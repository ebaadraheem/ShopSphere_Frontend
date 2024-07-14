import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
const Messages = () => {


    const [MessagesData, setMessagesData] = useState([])
    async function FetchMessageData() {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/contact/all`);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const list = await response.json();
          setMessagesData(list);
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      }

      useEffect(() => {
        FetchMessageData();
      }, []);





    async function HandleCross(dataid) {
        try {
            const dt={id:dataid}
            let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/contact/remove/`, dt);
            setMessagesData(prevData => prevData.filter(item => item.id !== dataid));
            toast.success("Message Deleted")
    
      
        } catch (error) {
            console.log("Error removing data: ", error);
        }
          
    }




    return (
        <div className='  bg-base-200 rounded-sm min-h-[61vh] md:px-1'>
            <h1 className='xl:pl-5 text-3xl font-bold py-2'>Messages</h1>
            <div className=' flex flex-col gap-2'>
                <div className='max-md:text-sm font-bold flex gap-2 '>
                    <h1 className=' max-sm:px-1 w-[10%] max-lg:max-w-40 flexer'>Date</h1>
                    <h1 className=' max-sm:px-1 w-[10%] max-lg:max-w-52 flexer order-3'>Name</h1>
                    <h1 className=' max-sm:px-1 w-[30%] max-lg:max-w-80 flexer order-5'>Message</h1>
                    <h1 className=' max-sm:px-1 w-[10%] max-lg:max-w-40 flexer '>Time</h1>
                    <h1 className=' max-sm:px-1 w-[25%] max-lg:max-w-56 flexer order-4'>Email</h1>

                    <div className=' w-[10%] max-sm:px-1 max-lg:max-w-24 flexer order-5'>
                        <h1 className=' max-sm:hidden' >Tap to delete</h1>
                    </div>
                </div>
                {/* Order Hisotry*/}
                <div className={`  ${MessagesData.length == 0 ? 'flex' : 'hidden'} flexer  h-[45vh]`}>
                    <div className=' font-bold'>
                        No Messages to show
                    </div>
                </div>

                {
                    MessagesData.map(item=>
                        (
                <div key={item.id}  className='max-md:text-[0.6rem] flex gap-2 bg-base-300 rounded-md'>
                 
                    <h1 className='max-sm:px-1 w-[10%] max-lg:max-w-40 break-all flexer'>{item.date}</h1>
                    <h1 className='max-sm:px-1 w-[10%] max-lg:max-w-52 flexer order-3'>{item.name}</h1>
                    <div className='max-sm:px-1  w-[30%] max-lg:max-w-80 flexer flex-col order-5'>

                                <h1 >{item.contact_message}</h1>
                    </div>
                    <h1 className='max-sm:px-1  w-[10%] max-lg:max-w-40 flexer md:gap-1 max-lg:flex-col'><h2 className=' max-md:break-all'>{item.time}</h2> </h1>
                    <div className='max-sm:px-1 w-[25%] lg:min-w-56 max-lg:max-w-60  flexer order-4 '> <h1 className=' break-all' >{item.email}</h1></div>
                    <div className=' w-[10%] max-lg:max-w-28 flexer gap-[2px] max-lg:flex-col order-5'>
                        <button onClick={()=>HandleCross(item.id)}  className="btn max-sm:btn-xs btn-sm">	&#10060; </button>
                        
                    </div>
                </div>


                    )

                    )
                }
            </div>
        </div>
    )
}

export default Messages
