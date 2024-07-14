import { React, useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import UserContext from '../../UserContext/UserContext';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { loadStripe } from '@stripe/stripe-js';
const Checkout = ({ SubTotal, Cart }) => {

    const user = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const HandleStripe = async () => {
        setLoading(true);
        try {
            // Load Stripe with your publishable key
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

            if (!stripe) {
                throw new Error('Stripe failed to load');
            }

            const body = {
                products: Cart,
            };
            // Make a request to your backend to create a checkout session
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/checkout_session/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
           
            
            const session = await response.json();

            //   Redirect the user to Stripe Checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });
       
            if (result.error) {
                toast.error(result.error.message);
                console.error("Stripe redirect error: ", result.error.message);
            }
        } catch (error) {
            console.error('Error in HandleStripe:', error);
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    };

    // Handle form submission
    const onSubmit = data => {
        const myuuid = uuidv4();
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        const currentDate = date + "/" + month + "/" + year;
        let arr = []
        user.Cart.forEach(item => {
            item.sizes.map(item1 => {
                let newObj = { ...item1 };
                let key = Object.keys(newObj).find(k => k !== 'quantity');
                if (newObj[key] === true) {
                    key = key.replace(/"/g, '');
                    let obj = { ["productname"]: item.name, ["size"]: key, ["quantity"]: item.total }
                    arr.push(obj)
                }

            })

        })
        const SendingOrder = { ...data, id: myuuid, total: SubTotal, date: currentDate, detail: arr };
    
        // Store the order data in local storage
        localStorage.setItem('sendingOrder', JSON.stringify(SendingOrder));
        HandleStripe()

    };

    return (
        <div>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                     <svg className=' w-10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#0B0105" stroke="#0B0105" stroke-width="2" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#0B0105" stroke="#0B0105" stroke-width="2" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#0B0105" stroke="#0B0105" stroke-width="2" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flexer flex-col gap-3 '>
                    <div className='flexer gap-2 max-md:flex-col  mt-6'>
                        <div className='flex flex-col gap-1'>
                            <h1 className=' font-bold roboto_font'>Full Name :</h1>
                            <label className="input input-bordered flex items-center gap-2">
                                <img className=' w-3' src="usercheckout.svg" alt="" />
                                <input  {...register("name", { required: true, minLength: 4, maxLength: 29 })} placeholder="Name" maxLength={30} />

                            </label>
                            {errors.name?.type === "required" && (
                                <p className=' text-red-500 text-xs' role="alert">Name is required</p>
                            )}
                            {errors.name?.type === "maxLength" && (
                                <p className=' text-red-500 text-xs' role="alert">Maximun limit reached</p>
                            )}
                            {errors.name?.type === "minLength" && (
                                <p className=' text-red-500 text-xs' role="alert">Minimun 4 words</p>
                            )}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h1 className=' font-bold roboto_font'>Email :</h1>
                            <label className="input input-bordered flex items-center gap-2">
                                <img className=' w-3' src="email.svg" alt="" />
                                <input type='email' {...register("email", { required: true, minLength: 5, maxLength: 39 })} placeholder="Email" maxLength={40} />
                            </label>
                            {errors.email?.type === "required" && (
                                <p className=' text-red-500 text-xs' role="alert">Email is required</p>
                            )}
                            {errors.email?.type === "maxLength" && (
                                <p className=' text-red-500 text-xs' role="alert">Maximun limit reached</p>
                            )}
                            {errors.email?.type === "minLength" && (
                                <p className=' text-red-500 text-xs' role="alert">Minimun 5 words</p>
                            )}
                        </div>
                    </div>

                    <div className='flexer gap-2 max-md:flex-col mt-2'>
                        <div className='flex flex-col gap-1'>
                            <h1 className=' font-bold roboto_font'>Address : :</h1>
                            <label className="input input-bordered flex items-center gap-2">
                                <img className=' w-3' src="address.svg" alt="" />
                                <input  {...register("address", { required: true, minLength: 10, maxLength: 89 })} placeholder='Address' maxLength={90} />
                            </label>
                            {errors.address?.type === "required" && (
                                <p className=' text-red-500 text-xs' role="alert">Address is required</p>
                            )}
                            {errors.address?.type === "maxLength" && (
                                <p className=' text-red-500 text-xs' role="alert">Maximun limit reached</p>
                            )}
                            {errors.address?.type === "minLength" && (
                                <p className=' text-red-500 text-xs' role="alert">Minimun of 10 words</p>
                            )}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h1 className=' font-bold roboto_font'>City :</h1>
                            <label className="input input-bordered flex items-center gap-2">
                                <img className='w-3' src="city.svg" alt="" />
                                <input  {...register("city", { required: true, maxLength: 34, minLength: 3 })} placeholder='City' maxLength={35} />
                            </label>
                            {errors.city?.type === "required" && (
                                <p className=' text-red-500 text-xs' role="alert">City is required</p>
                            )}
                            {errors.city?.type === "maxLength" && (
                                <p className=' text-red-500 text-xs' role="alert">Maximun limit reached</p>
                            )}
                            {errors.city?.type === "minLength" && (
                                <p className=' text-red-500 text-xs' role="alert">Minimun of 3 words</p>
                            )}
                        </div>
                    </div>
                    <div className='flex gap-2 max-md:flex-col mt-2'>

                        <div className='flex flex-col gap-1'>
                            <h1 className=' font-bold roboto_font'>Phone Number :</h1>
                            <label className="input input-bordered flex items-center gap-2">
                                <img className='w-3' src="phone.svg" alt="" />
                                <input  {...register("phone", { required: true, maxLength: 16, minLength: 9 })} placeholder='Phone-No' maxLength={17} />
                            </label>
                            {errors.phone?.type === "required" && (
                                <p className=' text-red-500 text-xs' role="alert">Phone Number is required</p>
                            )}
                            {errors.phone?.type === "maxLength" && (
                                <p className=' text-red-500 text-xs' role="alert">Maximun limit reached</p>
                            )}
                            {errors.phone?.type === "minLength" && (
                                <p className=' text-red-500 text-xs' role="alert">Minimun of 9 words</p>
                            )}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <h1 className=' font-bold roboto_font'>Total Amount</h1>
                            <label className="input input-bordered flex items-center gap-2">
                                <div className='grow w-52 roboto_font'>{SubTotal} pkr</div>
                            </label>
                        </div>
                    </div>
                    <div>

                        <button className="roboto_font btn btn-wide">
                            <input type="submit" value="Pay with Stripe" />
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default Checkout;
