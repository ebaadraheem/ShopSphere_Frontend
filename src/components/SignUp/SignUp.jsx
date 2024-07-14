import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Firbase/firbase';
import { useRef } from 'react';
const SignUp = () => {
  const [data, setdata] = useState("")
  const invalidshow = useRef()
  const navigate = useNavigate();
  const spinner = useRef()

  const HandleChange=(e)=>{
      let name=e.target.name
      let value=e.target.value
      setdata(prevData => ({
          ...prevData,
          [name]: value
        }));
      
    }
    const isEmail = (input) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(input);
  };
  const HandleSubmit=()=>{
    if (!data.email||!data.username||!data.password||!data.confirmpass) {
     invalidshow.current.innerHTML= "All fields required"
     return 
   }
   else if(!isEmail(data.email)){

     invalidshow.current.innerHTML= "Invalid e-mail"
   }
    else if (data.password!==data.confirmpass) {
      invalidshow.current.innerHTML= "Password not matched"
      return 
    }
    else if(data.username.length<4||data.username.length>10){
      invalidshow.current.innerHTML= "Username should be between 4 and 10 characters"
      return
    }
    else if (data.password.length<6||data.password.length>14) {
      
      invalidshow.current.innerHTML= "Password should be between 6 and 14 characters"
      return
    }
    
    spinner.current.classList.add('loading', 'loading-spinner');
    createUserWithEmailAndPassword(auth,data.email,data.password).then(res=>{
      updateProfile(auth.currentUser, {
        displayName: data.username
    })
      
       
        spinner.current.classList.remove('loading', 'loading-spinner');
      navigate("/")
       
    }) .catch(err => {
        console.error("Error signing up:", err.code, "-", err.message);
        
        spinner.current.classList.remove('loading', 'loading-spinner');
        if (err.code === 'auth/email-already-in-use') {
          invalidshow.current.innerHTML="Already have user with same e-mail"
      }
        
    });
  }
  return (
    <div className=' bg-base-100 h-[100vh] flexer '>
      <div className=' bg-base-300 p-12 rounded-lg flexer flex-col gap-4'>
      <div><img className='w-32' src="user.svg" alt="" /></div>
      <h1 className=' font-bold text-lg'>Sign Up</h1>
      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
        <input type="text" className="grow" name='username' value={data.username} onChange={HandleChange} placeholder="Username" />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
        <input type="email" className="grow" name='email' placeholder="Email" onChange={HandleChange} value={data.email} />
      </label>
      
      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
        <input type="password" className="grow" name='password' placeholder='Password' onChange={HandleChange} value={data.password} />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
        <input type="password" className="grow" placeholder='Confirm Password' name='confirmpass' onChange={HandleChange} value={data.confirmpass} />
      </label>
        <h4 ref={invalidshow} className={`w-56 text-red-700 text-xs`}></h4>
      <button onClick={HandleSubmit} className="flexer btn btn-wide "><span ref={spinner}></span>Sign Up</button>
    </div>
    </div>
  )
}

export default SignUp
