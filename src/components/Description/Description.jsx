import React, { useEffect, useContext, useState, useRef } from 'react'
import UserContext from '../../UserContext/UserContext';
import Navbar from '../Navbar';
import Menu from '../Menu';
import Footer from '../Footer';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import toast from 'react-hot-toast';
const Description = () => {
    const user = useContext(UserContext);
    const [Quantity, setQuantity] = useState(1);
    const [ID, setID] = useState(null)
    const [sizechange, setsizechange] = useState("")
    const [detailofid, setdetailofid] = useState({})
    const [selectedSize, setSelectedSize] = useState();
    const [isFavourite, setisFavourite] = useState(false)
    const butt = useRef()
    const butt1 = useRef()

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem("description_card-id"))
        setID(data)


    }, [])


    useEffect(() => {
        user.data.forEach((item) => {

            if (item.id === ID) {
                setdetailofid(item)
                setSelectedSize(item.sizes)
                const firstSizeKey = item.sizes.length > 0 ? Object.keys(item.sizes[0])[0] : null;
                if (firstSizeKey) {
                    setsizechange(firstSizeKey);
                }
            }
        })
    }, [ID]);

    useEffect(() => {

        setisFavourite(user.favourite.find(it => it.id === detailofid.id));

    }, [user.favourite, detailofid.id]);


    useEffect(() => {
        if (!sizechange || !detailofid || !detailofid.sizes) return;

        let quan = 0;

        detailofid.sizes.filter(obj => obj.hasOwnProperty(sizechange)).forEach(filteredObj => {
            quan = filteredObj["quantity"];
        });

        if (Quantity === 0) {
            setQuantity(1);
        } if (Quantity >= quan) {
            setQuantity(quan);
        }
    }, [Quantity, sizechange, detailofid]);

    const CartAddition = () => {
        const myuuid = uuidv4(); // Generate a new UUID each time the function is called
        const updatedSelectedSize = selectedSize.map(obj => {
            let newObj = { ...obj }; // Make a shallow copy of the object to avoid mutation
            let key = Object.keys(newObj).find(k => k !== 'quantity');
            if (key === sizechange) {
                newObj[key] = true;
            } else {
                newObj[key] = false; // Set other sizes to false
            }
            return newObj;
        });

        const updatedSendingData = {
            ...detailofid,
            sizes: updatedSelectedSize,
            total: Quantity,
            id: myuuid, // Ensure id is updated
        };

        user.setCart([...user.Cart, updatedSendingData]);

        // Reset the quantity and disable buttons
        setQuantity(0);
        butt.current.innerHTML = "Added";
        butt.current.disabled = true;
        butt1.current.style.display = "none";
        toast.success("Added to Cart")
        setSelectedSize('');
        setsizechange('');

    };


    const handleSizeChange = (e) => {
        const newSize = e.target.value;
        setsizechange(newSize);
    }
    async function SendFav(dataid) {
        try {
          const dt={id:user.userId,favdata:dataid}
          let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/favorites/add/`, dt);
    
      } catch (error) {
          console.log("Error Entering data: ", error);
      }
        
      }
    async function RemoveFav(dataid) {
        try {
          const dt={id:user.userId,favdata:dataid}
          let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/favorites/remove/`, dt);
    
      } catch (error) {
          console.log("Error removing data: ", error);
      }
        
      }

    const handleHeartButton = (id, e) => {
        e.stopPropagation();
        e.preventDefault();
    
        const element = document.querySelector(`.heart-${id}`);
        if (element) {
          const isFavourite = user.favourite.find(it => it.id === id);
    
          if (isFavourite) {
            element.src = "unfilled_heart.svg";
            if (user.userId) {
                
                RemoveFav(id);
            }
            toast.error("Removed from favourites")
            user.setfavourite(prev => prev.filter(item => item.id !== id));
        } else {
            element.src = "filled_heart.svg";
            const newFavourite = user.data.find(item => item.id === id);
            user.setfavourite(prev => [...prev, newFavourite]);
            if (user.userId) {
                
                SendFav(id);
            }
            toast.success("Added to favourites")
          }
        }
      };


    return (
        <>
            <div >
                <Navbar />
                <Menu />
                <div className='roboto_font flex lg:mx-12 max-lg:flex-col '>
                    <div >
                        <div className=' m-2 w-[97vw]  overflow-hidden rounded-md bg-base-200 lg:h-[70vh] h-[50vh] lg:w-[37vw] flexer'>
                            <div className=" flexer  max-md:max-h-[300px] ">
                                <img className=' w-[320px] max-lg:w-[200px]' src={detailofid.img} alt="" />
                            </div>

                        </div>
                    </div>
                    <div className='max-lg:flexer m-2   max-lg:w-[97vw] w-[48vw]'>
                        <div className=' max-lg:w-[93vw] flex flex-col gap-3 '>
                            <div className='  text-2xl font-bold '>

                                <h1 >{detailofid.name}</h1>
                            </div>
                            <div className='flex items-center  text-xl'>
                                <h1>Price : </h1><span>{detailofid.price} pkr</span>
                            </div>
                            <div className=''>
                                <div className='text-xl  mb-2 font-bold'>
                                    Description
                                </div>
                                <p className=' overflow-auto min-h-40 max-h-80 text-lg '>{detailofid.detail}</p>
                            </div>

                            <div>
                                <div className='text-xl mb-3 font-bold'>Select a size</div>
                                <div className='flex flex-col gap-2 '>
                                    <div className='flex gap-2 '>
                                        {
                                            detailofid && detailofid.sizes && (detailofid.sizes).map((size, index) => {
                                                const sizeKeys = Object.keys(size).filter(key => key !== 'quantity');

                                                const isChecked = index === 0;
                                                return (
                                                    <div className='flex flex-col ' key={index}>
                                                        <div className='  flexer gap-2'>
                                                            <input
                                                                type="radio"
                                                                id={`radio-${index + 1}`}
                                                                name="radio-1"
                                                                className="radio"
                                                                value={sizeKeys}
                                                                defaultChecked={isChecked}
                                                                onClick={handleSizeChange}
                                                            />
                                                            <label className='cursor-pointer' htmlFor={`radio-${index + 1}`}>{sizeKeys}</label>
                                                        </div>




                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className=' text-sm'>

                                        {
                                            sizechange &&
                                            detailofid.sizes.filter(obj => obj.hasOwnProperty(sizechange)).map((filteredObj, index) => {

                                                const quan = filteredObj["quantity"]
                                                quan<=0?butt.current.disabled=true:butt.current.disabled=false
                                                if (quan===0) {
                                                    return (
                                                        <div key={index}>
                                                            <h1 className=' text-red-500'>Out of stock</h1>
                                                        </div>
                                                    );
                                                }
                                                else{
                                                    return (
                                                        <div key={index}>
                                                            <h1 className=' text-red-500'>Remaining quantity is {quan}</h1>
                                                        </div>
                                                    );

                                                }
                                            })
                                        }


                                    </div>
                                </div>
                            </div>

                            <div className='  flex justify-between max-sm:justify-evenly flex-wrap items-center mt-2'>
                                <div ref={butt1} className='flex '>
                                    <button onClick={() => setQuantity(Quantity - 1)} className='rounded-full btn w-12'>-1</button>
                                    <h1 className=' w-10 flexer'>{Quantity}</h1>
                                    <button r onClick={() => setQuantity(Quantity + 1)} className=' rounded-full btn w-12'>+1</button>
                                </div>

                                <div className='  max-sm:text-xs flexer gap-2 mx-6 h-16  '>
                                <button onClick={(e) => handleHeartButton(detailofid.id, e)} className=" flex justify-center items-center btn  btn-ghost btn-circle">
                           
                                    <img className={`heart-${detailofid.id}  w-5`} src={isFavourite ? "filled_heart.svg" : "unfilled_heart.svg"} alt="" />

                                </button>
                                    <button ref={butt} onClick={CartAddition} className="roboto_font btn max-md:w-[170px] w-[200px] mr-2">Add to Cart</button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <Footer />

            </div>
        </>
    )
}

export default Description
