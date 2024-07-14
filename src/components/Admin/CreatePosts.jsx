import React from 'react'
import { useState, useEffect,useRef } from 'react';
import axios from "axios"

import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
const CreatePosts = () => {
    
    const [dataforpost, setdataforpost] = useState({})
    const [SizeQuantity, setSizeQuantity] = useState([])
    const [Size, setSize] = useState("")
    const [imageUrl, setImageUrl] = useState('');
    const [Quantity, setQuantity] = useState(0)
    const [file, setFile] = useState(null);
    const formRef = useRef()
    const SQ = useRef()
    const message = useRef()

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleValue = (e) => {
        setdataforpost((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };
    const handleNumValue = (e) => {
        setdataforpost((prevData) => ({
            ...prevData,
            [e.target.name]: parseInt(e.target.value)
        }));
    };


    const handleSize = (e) => {
        setSize(e.target.value);

    };
    const handleQuantity = (e) => {
        setQuantity(parseInt(e.target.value));

    };
    const handleSizeQuantity = (e) => {
        if (!Quantity||!Size) {
            return SQ.current.innerHTML="Both fields required"
        }

        setSizeQuantity((prevData) => ([
            ...prevData, {
                [Size]: false,
                ['quantity']: Quantity
            }]));
            SQ.current.innerHTML=""
        setSize('')
        setQuantity(0)
    };

    const HandleDeleteSQ = (index) => {
        setSizeQuantity((prevData) => prevData.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/images/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setImageUrl(response.data.url);
        } catch (error) {
            console.error('Error uploading the image:', error);
        }
    };
    

    const postData = async (data) => {
        try {
            let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/data/add/`, data);
        
        } catch (error) {
            console.log("Error posting data: ", error);
        }
    };
    const handlePost = async () => {
        if (file && !imageUrl) {
            await handleUpload();
            message.current.classList.add('text-red-500');
            return message.current.innerHTML = "Please click again";
        }
    
        
        if (!dataforpost.name || !dataforpost.detail || !dataforpost.category || !dataforpost.price || SizeQuantity.length === 0  ) {
            message.current.classList.add('text-red-500');
            return message.current.innerHTML = "All fields required";
        }

        const updatedData = {
            ...dataforpost,
            img: imageUrl,
            sizes: SizeQuantity,
            Incart: false,
            favourite: false,
            total: 1,
            id: uuidv4() 
        };

        setdataforpost(updatedData);  

        await postData(updatedData);  
        setdataforpost({
            name: '',
            detail: '',
            category: '',
            price: 0
        });
        setSizeQuantity([]);
        setImageUrl('');
        setFile(null);
        
        formRef.current.reset();
        toast.success("Posted successfully!"); 
        message.current.classList.remove('text-red-500');
        message.current.innerHTML = "Posted successfully!";
    };

    return (
        <div>
            <form ref={formRef}>
            <div className=' bg-base-200 rounded-sm min-h-[61vh] md:px-1'>
                <div><h1 className='xl:pl-5 text-3xl font-bold py-2'>Manage Posts</h1></div>
                <div className='flex max-md:flex-wrap max-sm:text-xs  max-lg:text-sm'>
                    <div className='flex gap-1 md:gap-2 max-md:flexer max-md:w-full w-[68%] '>
                        <div className='  pl-3 min-h-[50vh] flex flex-col gap-3 max-md:w-[48vw]' >
                            <div className='flex flex-col gap-2'>
                                <h1 className='font-bold'>Name of the product :</h1>
                                <input type="text" name='name' onChange={handleValue} className="input input-bordered w-full max-w-xs" />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1 className='font-bold'>Detail :</h1>
                                <textarea className=' min-h-[33vh] rounded-md min-w-[25vw] outline-none' name="detail" onChange={handleValue}></textarea>

                            </div>
                        </div>
                        <div className='flex justify-center flex-col gap-2  max-lg:min-w-40 max-md:h-full max-md:w-[48vw]  w-[30vw]'>
                            <div className='flexer max-xl:gap-2 gap-10'>
                                <div className='flex flex-col gap-2'>
                                    <h1 className='font-bold'>Price :</h1>
                                    <input name='price' onChange={handleNumValue} type="number" className="input input-bordered w-full max-w-40" />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h1 className='font-bold'> Category :</h1>
                                    <select name='category' onChange={handleValue} className="select select-bordered w-full max-w-xs max-md:text-xs">
                                        <option disabled defaultChecked selected>Select the Category</option>
                                        <option>Shirt</option>
                                        <option>T_Shirt</option>
                                        <option>Pant</option>
                                        <option>Trouser</option>
                                        <option>Fragrance</option>
                                    </select>
                                </div>
                            </div>
                            <div className='  max-md:h-60 h-72 flex '>
                                <div className='  flexer w-full gap-2'>
                                    <div className=' flex flex-col gap-1'>
                                        <div className='  flex-wrap gap-2  flexer'>
                                            <div className='flex  gap-2 max-md:gap-1'>
                                                <div className='  flex-wrap flexer gap-2'>
                                                    <h1 className=' font-bold'>Size :</h1>
                                                    <input value={Size} onChange={handleSize} type="text" className="input input-bordered w-full min-w-24 max-w-36" name="size" />
                                                </div>
                                                <div className='flexer gap-2  flex-wrap'>
                                                    <h1 className='font-bold'>Quantity :</h1>
                                                    <input value={Quantity} onChange={handleQuantity} type="number" className="input input-bordered w-full  max-w-24 min-w-10" name="quantity" />
                                                </div>
                                            </div>
                                            <div ><button type="button" onClick={handleSizeQuantity} className="btn max-sm:btn-xs btn-sm">Add</button>
                                            </div>
                                            <div>
                                                <h1 className=' text-red-500 text-xs' ref={SQ}></h1>

                                            </div>
                                        </div>
                                        {SizeQuantity.map((item, index) => {
                                            const sizeKey = Object.keys(item).find(key => key !== 'quantity');
                                            return (<div key={index} className=' px-2 flex justify-between bg-base-300 rounded-md'>
                                                <div className='flex gap-2'><h1>
                                                    Size : {sizeKey}</h1>
                                                    <h1>
                                                        Quantity : {item.quantity}</h1></div>
                                                <button className='btn btn-xs' onClick={()=>HandleDeleteSQ(index)}>Delete</button>
                                            </div>

                                            )
                                        }
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' flexer w-[29vw] gap-3 flex-col  max-md:h-72 max-md:w-full min-w-52 '>

                        <div className='flexer max-xl:w-40 '><input type="file" onChange={handleFileChange} /></div>
                        <div className='flexer'><button type="button" className='btn max-md:btn-sm' onClick={handlePost}> Post</button></div>
                        <div><h1 ref={message} className=' text-sm'></h1></div>
                    </div>
                </div>
            </div>
            </form>
        </div>
    )
}

export default CreatePosts
