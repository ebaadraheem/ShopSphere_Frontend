import { React, useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  const getCurrentTimeIn12HourFormat = () => {
    const today = new Date();
    let hours = today.getHours();
    const minutes = today.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  
    const time = hours + ':' + minutesStr + ' ' + ampm;
    return time;
  };

  async function SendMessage(data) {
    try {
      let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/contact/add/`, data);
   
  } catch (error) {
      console.log("Error Entering contact data: ", error);
  }
    
  }

  // Handle form submission
  const onSubmit = data => {
    const myuuid = uuidv4(); 
    const today = new Date();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    const date = today. getDate();
    
    const currentDate = date + "/" + month + "/" + year;
    const currentTime=getCurrentTimeIn12HourFormat()
    const messageDetail = {
      ...data,
      id: myuuid,
      time: currentTime,
      date: currentDate
  };

  SendMessage(messageDetail)
    document.getElementById('my_modal_7').close()
    reset()
    toast.success("Message sent successfully.The developer will contact you soon!")

  }

  return (
    <div>
      <div className='roboto_font '>
        <form onSubmit={handleSubmit(onSubmit)}>


          <div className='flexer flex-col md:gap-1  '>
            <div ><svg className=' max-md:h-[120px] max-md:w-[120px] h-36 w-36' fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M5.25366 13.9997L16.2419 14.0009C16.3459 14.1725 16.4732 14.3318 16.6227 14.4737L17.3413 15.1558C17.2557 15.4884 17.1162 15.8219 16.9207 16.1583C16.723 16.4982 16.4946 16.7953 16.2343 17.0518L15.44 16.787C14.5057 16.4754 13.4912 16.8324 12.9326 17.653L12.2111 18.713C11.5824 19.6368 11.6943 20.8988 12.4808 21.6884L12.7083 21.9164C12.1668 21.9728 11.5973 22.0008 11.0001 22.0008C8.11062 22.0008 5.87181 21.3442 4.30894 20.0006C3.48032 19.2882 3.00366 18.2498 3.00366 17.157V16.2497C3.00366 15.0071 4.01102 13.9997 5.25366 13.9997ZM17.0106 12.2448L17.5139 11.0579C17.75 10.5013 18.3154 10.1985 18.8699 10.314L18.9884 10.3452L19.6187 10.5466C20.2436 10.7463 20.7222 11.2817 20.8768 11.9539C21.2441 13.5516 20.8034 15.4967 19.5548 17.7893C18.3079 20.0786 16.9414 21.4551 15.455 21.9187C14.8779 22.0987 14.258 21.9679 13.7916 21.5764L13.6684 21.4632L13.1897 20.9826C12.7749 20.5662 12.6894 19.9073 12.9676 19.3919L13.0382 19.2757L13.7597 18.2157C14.0436 17.7986 14.5292 17.6013 14.9971 17.701L15.1241 17.7356L16.456 18.1798C16.9876 17.7775 17.4307 17.2712 17.7856 16.6609C18.0897 16.1378 18.2887 15.6076 18.3824 15.0703L18.4205 14.801L17.3115 13.7484C16.9462 13.4017 16.8135 12.8617 16.9628 12.3758L17.0106 12.2448L17.5139 11.0579L17.0106 12.2448ZM11.0001 2.00439C13.7615 2.00439 16.0001 4.24297 16.0001 7.00439C16.0001 9.76582 13.7615 12.0044 11.0001 12.0044C8.2387 12.0044 6.00012 9.76582 6.00012 7.00439C6.00012 4.24297 8.2387 2.00439 11.0001 2.00439Z" fill="#212121"/></svg></div>
            <div className='flexer gap-2 max-md:flex-col '>
              <div className='flex flex-col gap-1'>
                <h1 className=' font-bold roboto_font'>Full Name :</h1>
                <label className="input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
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
            <label >
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold'>What can I help you with?</h1>
                <textarea
                  className='resize-none max-md:w-60 border-2 w-[490px] max-md:h-36 h-44 rounded-md outline-none'
                  {...register("contact_message", { required: true, minLength: 10, maxLength: 300 })}
                ></textarea>

              </div>
            </label>
            {errors.contact_message?.type === "maxLength" && (
              <p className=' text-red-500 text-xs' role="alert">Maximun limit reached</p>
            )}
            {errors.contact_message?.type === "minLength" && (
              <p className=' text-red-500 text-xs' role="alert">Please write a formal message</p>
            )}
            <div className='flexer'>
              <button className=" mt-3 roboto_font btn btn-wide">
                <input type="submit" value="Submit" />
              </button>
            </div>
            <div className="mt-2 max-md:mt-1">
              <div className='flexer'>

              <h1 className="text-md font-medium">Or you can contact at:</h1>
              </div>
              <div className=' flexer gap-1'>
              <svg className=' w-4' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 352c-16.53 0-33.06-5.422-47.16-16.41L0 173.2V400C0 426.5 21.49 448 48 448h416c26.51 0 48-21.49 48-48V173.2l-208.8 162.5C289.1 346.6 272.5 352 256 352zM16.29 145.3l212.2 165.1c16.19 12.6 38.87 12.6 55.06 0l212.2-165.1C505.1 137.3 512 125 512 112C512 85.49 490.5 64 464 64h-416C21.49 64 0 85.49 0 112C0 125 6.01 137.3 16.29 145.3z"/></svg>
              <h1 className="text-md text-blue-600">ebaadraheem20@gmail.com</h1>
              </div>
              <div className=' flex items-center gap-1'>
              <svg className=' w-4' height="100%"  version="1.1" viewBox="0 0 512 512" width="100%" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M256,0c141.29,0 256,114.71 256,256c0,141.29 -114.71,256 -256,256c-141.29,0 -256,-114.71 -256,-256c0,-141.29 114.71,-256 256,-256Zm121.527,134.844c-30.646,-30.672 -71.401,-47.571 -114.822,-47.588c-89.468,0 -162.284,72.788 -162.319,162.256c-0.012,28.599 7.462,56.516 21.666,81.122l-23.028,84.086l86.048,-22.564c23.708,12.927 50.401,19.739 77.568,19.751l0.067,0c89.459,0 162.281,-72.797 162.317,-162.266c0.017,-43.358 -16.851,-84.127 -47.497,-114.797Zm-114.821,249.657l-0.054,0c-24.209,-0.01 -47.953,-6.511 -68.667,-18.799l-4.927,-2.924l-51.061,13.391l13.629,-49.769l-3.208,-5.102c-13.505,-21.473 -20.637,-46.293 -20.627,-71.776c0.03,-74.362 60.552,-134.861 134.969,-134.861c36.035,0.014 69.908,14.062 95.38,39.554c25.472,25.493 39.492,59.379 39.478,95.416c-0.03,74.367 -60.551,134.869 -134.912,134.87Zm74.003,-101.01c-4.056,-2.029 -23.996,-11.838 -27.715,-13.191c-3.717,-1.353 -6.42,-2.03 -9.124,2.029c-2.704,4.059 -10.477,13.192 -12.843,15.898c-2.365,2.705 -4.731,3.045 -8.787,1.014c-4.056,-2.028 -17.124,-6.31 -32.615,-20.124c-12.057,-10.75 -20.197,-24.029 -22.563,-28.087c-2.365,-4.059 -0.252,-6.253 1.779,-8.275c1.824,-1.816 4.055,-4.735 6.083,-7.103c2.028,-2.368 2.704,-4.059 4.056,-6.764c1.352,-2.707 0.676,-5.074 -0.338,-7.104c-1.014,-2.029 -9.125,-21.986 -12.505,-30.104c-3.291,-7.906 -6.635,-6.836 -9.125,-6.96c-2.363,-0.118 -5.069,-0.143 -7.773,-0.143c-2.704,0 -7.097,1.015 -10.816,5.074c-3.717,4.059 -14.194,13.868 -14.194,33.824c0,19.957 14.533,39.236 16.561,41.943c2.028,2.706 28.599,43.659 69.284,61.221c9.676,4.177 17.231,6.672 23.121,8.541c9.716,3.085 18.557,2.65 25.546,1.606c7.792,-1.164 23.996,-9.809 27.375,-19.279c3.379,-9.471 3.379,-17.589 2.366,-19.28c-1.014,-1.691 -3.718,-2.706 -7.773,-4.736Z"/></svg>
              <h1 className="text-md text-blue-600">+92 326 5545081</h1>
              </div>
        
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact
