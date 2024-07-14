import React from 'react'
import axios from 'axios';
import {  useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
const Payment = () => {
    const navigate = useNavigate();
    async function SendOrder(data) {
        try {
            let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/orders/add/`, data);
            toast.success("Ordered Successfully")
            if (res.data.success) {
                localStorage.removeItem('sendingOrder');
               navigate('/');
            }

        } catch (error) {
            console.log("Error Entering order data: ", error);
        }

    }

    useEffect(() => {
        const orderData = localStorage.getItem('sendingOrder');
        if (orderData) {
            SendOrder(JSON.parse(orderData));
        }
    }, [])


    return (
        <div className='flexer min-h-[100vh]'>
           <svg className=' w-10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#0B0105" stroke="#0B0105" stroke-width="2" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#0B0105" stroke="#0B0105" stroke-width="2" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#0B0105" stroke="#0B0105" stroke-width="2" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
        </div>
    )
}

export default Payment
