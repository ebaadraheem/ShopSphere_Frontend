import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
const Products = () => {

const [Products, setProducts] = useState([])

    async function fetchData() {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/data/all`);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const list = await response.json();
          setProducts(list);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      useEffect(() => {
        fetchData();
      }, []);
      const handleDeleteImg = async (img) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/images/delete/${img.split('/').pop()}`);
         
        } catch (error) {
            console.error('Error deleting the image:', error);
        }
    };
      
    async function HandleCross(data) {
        try {
            const dt={id:data.id}
            let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/data/remove/`, dt);
            handleDeleteImg(data.img)
            setProducts(prevData => prevData.filter(item => item.id !== data.id));
            toast.success("Product deleted")
    
      
        } catch (error) {
            console.log("Error removing data: ", error);
        }
          
    }



  return (
    <div className='  bg-base-200 rounded-sm min-h-[61vh] md:px-1'>
    <h1 className='xl:pl-5 text-3xl font-bold py-2'>Products</h1>
    <div className=' flex flex-col gap-2'>
        <div className='max-md:text-xs font-bold flex md:gap-2  '>
            <h1 className=' max-sm:px-1 w-[20%] max-lg:max-w-56 flexer  '>Picture</h1>
            <h1 className=' max-sm:px-1 w-[10%] max-lg:max-w-40 flexer '>Name</h1>
            <h1 className=' max-sm:px-1 w-[30%] max-lg:max-w-80  flexer '>Description</h1>
            <h1 className=' max-sm:px-1 max-sm:mr-1 w-[10%] max-lg:max-w-28 flexer '>Quantity</h1>
            <h1 className=' max-sm:px-1 w-[10%] max-lg:max-w-28 flexer'>Price</h1>
            <h1 className=' max-sm:px-1 max-sm:ml-1 w-[10%] max-lg:max-w-32 flexer  '>Category</h1>

            <div className='max-sm:hidden w-[10%] max-sm:px-1 max-lg:max-w-24 flexer order-5'>
                <h1 className=' ' >Tap to delete</h1>
            </div>
        </div>
        {/* Products*/}
        <div className={`  ${Products.length == 0 ? 'flex' : 'hidden'} flexer  h-[45vh]`}>
            <div className=' font-bold'>
                No Products to show
            </div>
        </div>

        {
            Products.map(item=>
                (
        <div key={item.id} className=' max-lg:text-xs max-md:text-[0.6rem] flex md:gap-2 bg-base-300 rounded-md flexer'>
            <h1 className=' max-sm:px-1 w-[10%] max-sm:break-all max-lg:max-w-32 flexer order-5'>{item.category}</h1>
            <div className='max-sm:px-1  gap-1 w-[10%] max-md:flex-col max-lg:max-w-28 max-sm:break-all flexer order-3'>
            {
                    item.sizes.map((obj,index)=>{
                        let newObj = { ...obj };
                        let key = Object.keys(newObj).find(k => k !== 'quantity');
                    return(
                        <div key={index}  className='   flex flex-col '>
                            <h1  >{key} ({newObj["quantity"]})</h1>

                        </div> )
})
                }
            </div>
            <h1 className='max-sm:px-1 w-[10%] max-lg:max-w-40 flexer order-1 mr-1'>{item.name}</h1>
            <div className='max-sm:px-1  w-[30%] max-lg:max-w-80 flexer flex-col order-2'>
                        <h1 >{item.detail}</h1>                   
            </div>
            <div className='max-sm:px-1  w-[10%] max-lg:max-w-28 flexer md:gap-1 max-lg:flex-col order-4'><h2 className=' max-md:break-all'>{item.price}</h2> <div> pkr</div></div>
            <div className='  max-sm:px-1 w-[20%] max-lg:max-w-56 flexer h-28 overflow-hidden'><img className='   w-24' src={item.img} alt="" /></div>
            <div className=' w-[10%] max-lg:max-w-24 flexer gap-[2px] max-lg:flex-col order-6'>
                <button onClick={()=>HandleCross(item)} className="btn max-sm:btn-xs btn-sm">	&#10060; </button>
                
            </div>
        </div>


            )

            )
        }
    </div>
</div>
  )
}

export default Products
