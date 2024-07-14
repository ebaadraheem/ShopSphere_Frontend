import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import UserContext from '../../UserContext/UserContext'
import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import Menu from '../Menu'
import Checkout from '../Checkout/Checkout'
const ShoppingCart = () => {
    const user = useContext(UserContext);
    const [SubTotal, setSubTotal] = useState(0)
    useEffect(() => {
        setSubTotal(0)
        user.Cart.forEach(item => {
            setSubTotal(prevSubTotal => prevSubTotal + (item.total * item.price));
        }
        )

    }, [user.Cart])


    const HandleCross = (id) => {
        const updatedCart = user.Cart.map(item => {
            if (item.id === id) {
                item.Incart = false
            }

        });

        user.setCart(updatedCart);
        const arr = user.Cart.filter(cartItem => cartItem.id !== id)

        user.setCart(arr)
        toast.error("Removed from Cart")

    }

    const QuantityGetter = (cardsize) => {
        const found = cardsize.find(obj => {
            let key = Object.keys(obj).find(k => k !== 'quantity');
            return obj[key] === true;
        });

        return found ? found["quantity"] : null;
    };



    const updateTotal = (e, id, cardsize) => {

        let min = 1;
        let max = QuantityGetter(cardsize)

        let val = parseInt(e.target.value)
        if (isNaN(val)) {
            val = 0;
        }
        else {
            if (val < min) {
                val = min;
            } else if (val > max) {
                val = max;
            }
        }

        const updatedCart = user.Cart.map(item => {
            if (item.id === id) {
                return { ...item, total: val }; // Create a new object with updated total
            }
            return item; // Return the original item if the id doesn't match
        });

        user.setCart(updatedCart)
    };
    const handleSizeChange = (e, id, sizesofcard) => {
        const Size = e.target.value;

        const updatedSelectedSize = sizesofcard.map(obj => {
            let newObj = { ...obj }; // Make a shallow copy of the object to avoid mutation
            let key = Object.keys(newObj).find(k => k !== 'quantity');
            if (key === Size) {
                newObj[key] = true;
            } else {
                newObj[key] = false; // Set other sizes to false
            }
            return newObj;
        });
        // Update the Cart with the new sizes
        user.setCart(
            user.Cart.map(element => {
                if (element.id === id) {
                    return { ...element, sizes: updatedSelectedSize }; // Return a new object with updated sizes
                }
                return element; // Return the element unchanged if the id doesn't match
            })
        );

    };


    return (
        <>
            <Navbar />
            <Menu />
            <div className='roboto_font max-w-full min-h-[64vh] flex flex-wrap '>
                <div className={`${user.Cart.length == 0 ? 'w-[99vw]' : ' w-[63vw] '} max-xl:w-full md:ml-12 `}>
                    <div className='  pl-6 h-16 flex items-end pb-3'>

                        <h1 className=' text-lg md:text-xl roboto_font '>Shopping Cart</h1>
                    </div>
                    <div>
                        <div className='flexer'>

                            <hr className='w-[95%]' />
                        </div>
                        <div className={`  ${user.Cart.length == 0 ? 'flex' : 'hidden'} flex flex-col justify-center items-center h-[55vh]`}><h1 className='  textlg'>No items to show</h1>
                            <Link to="/"><div className=' max-sm:text-xs flexer gap-2 mx-6 h-16  '>
                                <button className="roboto_font btn max-md:w-[170px] w-[200px]">Back to Homepage</button>
                            </div>
                            </Link>
                        </div>
                        <div className={` ${user.Cart.length == 0 ? 'hidden' : ''} max-md:gap-1 max-sm:text-xs  flex md:pl-6 gap-2 mx-6 h-16 `}>

                            <div className=' min-w-[100px] max-md:w-[23.5vw] w-[23.4vw] max-lg:w-[21vw] xl:w-[21vw] '></div>

                            <div className=' max-md:w-[18vw] max-xl:w-[15vw]  w-[11vw] min-w-25  flex justify-center '>
                                <div className='   max-sm:pr-4 flexer lg:pl-2 lg:justify-start  w-[10vw] min-w-16'>
                                    <h1 >Product</h1>
                                </div>
                            </div>
                            <div className='  max-md:w-[18vw] max-xl:w-[15vw] min-w-10 flexer w-[8vw]  '>
                                <div className='max-sm:pr-2 flex '>
                                    <h1 className=' mr-1'>Price</h1>
                                </div>
                            </div>
                            <div className=' max-md:w-[18vw] max-xl:w-[15vw] min-w-12 flexer w-[8vw] '>
                                <div className='flex '>
                                    <h1 className=' mr-1'>Quantity</h1>
                                </div>
                            </div>
                            <div className=' max-md:w-[18vw] max-xl:w-[15vw] min-w-12 flexer w-[8vw] '>
                                <div className='flex '>
                                    <h1 className=' mr-1'>Subtotal</h1>
                                </div>
                            </div>
                        </div>
                        <div className={`${user.Cart.length == 0 ? 'hidden' : ''} flexer`}>

                            <hr className=' w-[95%]' />
                        </div>
                    </div>
                    <div className='roboto_font  max-h-[46vh] overflow-auto  '>

                        {
                            user.Cart.map((cards) => (
                                <div key={cards.id}>

                                    <div  className='mx-6 justify-center min-h-28 max-xl:text-xs flex max-md:gap-1 gap-2 h-40 my-3'>
                                        <div className='  xl:w-20  flex items-center'>
                                            <div onClick={() => HandleCross(cards.id)} ><svg className=' max-sm:w-3 w-5 cursor-pointer' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title /><g data-name="1" id="_1"><path d="M257,461.46c-114,0-206.73-92.74-206.73-206.73S143,48,257,48s206.73,92.74,206.73,206.73S371,461.46,257,461.46ZM257,78C159.55,78,80.27,157.28,80.27,254.73S159.55,431.46,257,431.46s176.73-79.28,176.73-176.73S354.45,78,257,78Z" /><path d="M342.92,358a15,15,0,0,1-10.61-4.39L160.47,181.76a15,15,0,1,1,21.21-21.21L353.53,332.4A15,15,0,0,1,342.92,358Z" /><path d="M171.07,358a15,15,0,0,1-10.6-25.6L332.31,160.55a15,15,0,0,1,21.22,21.21L181.68,353.61A15,15,0,0,1,171.07,358Z" /></g></svg></div>
                                        </div>
                                        <div className='  min-w-20 w-[20vw] xl:w-[16vw] flex justify-center '>
                                            <div className=' overflow-hidden bg-base-200 rounded-sm flexer md:w-36 '>
                                                <img className='  w-36 max-md:max-w-20 ' src={cards.img} alt="" />

                                            </div>
                                        </div>
                                        <div className=' max-md:w-[18vw] max-xl:w-[15vw]  w-[11vw] min-w-25  flex justify-center'>
                                            <div className=' max-sm:px-2 flex-col flex justify-center items-start w-[10vw] min-w-20'>
                                                <h1 className=' '>{cards.name}</h1>
                                                <div ><select onChange={(e) => handleSizeChange(e, cards.id, cards.sizes)} className="border-none select select-bordered max-sm:w-[55px] max-sm:text-[0.5rem] select-xs w-full max-w-xs">
                                                    {cards.sizes.map((obj, index) => {
                                                        let key = Object.keys(obj).find(key => key !== 'quantity');
                                                        let selected = obj[key];
                                                        return (
                                                            <option className='max-lg:text-xs' key={index} selected={selected}>
                                                                {key}
                                                            </option>
                                                        );
                                                    })}
                                                </select></div>
                                                {
                                                    cards.sizes && cards.sizes.map((obj, index) => {
                                                        let newObj = { ...obj };
                                                        let key = Object.keys(newObj).find(k => k !== 'quantity');
                                                        if (newObj[key] === true) {
                                                            const quan = newObj["quantity"]
                                                            
                                                            return (

                                                                <div key={index}><h1 className=' text-xs max-md:text-[0.5rem] text-red-500'>Remaining quantity is {quan}</h1></div>
                                                            )

                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className=' max-md:w-[18vw] max-xl:w-[15vw] min-w-12 flexer w-[8vw]  '>
                                            <div className='flex '>

                                                <h1 className='flexer  mr-1'>{cards.price} pkr</h1>
                                            </div>
                                        </div>
                                        <div className=' max-md:w-[18vw] max-xl:w-[15vw] min-w-12 flexer w-[8vw] '>
                                            <div className='flexer '>

                                                <input className='border rounded-md max-sm:w-7 w-10 outline-none mr-1'
                                                    type="number"
                                                    value={cards.total > QuantityGetter(cards.sizes) ? QuantityGetter(cards.sizes) : cards.total}
                                                    onChange={(e) => updateTotal(e, cards.id, cards.sizes)}

                                                />
                                            </div>
                                        </div>
                                        <div className=' max-md:w-[18vw] max-xl:w-[15vw] min-w-12 flexer w-[8vw] '>
                                            <div className='flex '>
                                                <h1 className='  mr-1'>{cards.total ? (cards.price * cards.total) : 0} pkr</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flexer'>

                                        <hr className=' w-[95%]' />
                                    </div>
                                </div>
                            ))
                        }

                        <div className={`${user.Cart.length == 0 ? 'hidden' : ''} flexer`}>

                            <hr className=' w-[95%]' />
                        </div>
                    </div>
                </div>
                <div className={`roboto_font ${user.Cart.length == 0 ? 'hidden' : ''} max-xl:w-full  min-w-96 w-[32vw] max-h-[65vh] md:px-11 xl:px-0 `}>
                    <div className=' pl-6 h-16 flex items-end pb-3 '>

                        <h1 className=' text-lg md:text-xl roboto_font'>Cart Totals</h1>
                    </div>
                    <div className='flexer'>

                        <hr className=' w-[95%]' />
                    </div>
                    <div className=' mx-6 max-md:h-24 max-sm:text-xs flex justify-center flex-col max-md:gap-1 gap-2 h-32 my-3'>
                        <div className=' flexer justify-between h-10  text-sm max-sm:text-[0.6rem]'>

                            <h1>Shipping Cost</h1>
                            <h1>TBD</h1>

                        </div >

                        <div className=' flexer justify-between h-10  text-sm max-sm:text-[0.6rem]'>

                            <h1>Tax</h1>
                            <h1>TBD</h1>

                        </div >
                    </div>
                    <div className='flexer'>

                        <hr className=' w-[95%]' />
                    </div>
                    <div className=' max-md:gap-1  max-sm:text-xs flex  justify-between gap-2 mx-6 h-16  '>
                        <div className='   flexer'>Estimated Total</div>
                        <div className=' flexer '>
                            <h1>{SubTotal} pkr</h1>
                        </div>
                    </div>
                    <div className='flexer'>

                        <hr className=' w-[95%]' />
                    </div>

                    <div className=' max-sm:text-xs flexer gap-2 mx-6 h-16  '>

                        <button className="btn roboto_font" onClick={() => document.getElementById('my_modal_5').showModal()}>Proceed to checkout</button>
                        <dialog id="my_modal_5" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
 
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <Checkout SubTotal={SubTotal} Cart={user.Cart} />
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default ShoppingCart
