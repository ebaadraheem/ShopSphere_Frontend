import React from 'react'
import { NavLink } from 'react-router-dom'
import UserContext from '../UserContext/UserContext'
import { useContext, useEffect, useState } from 'react'
import Contact from './Contact/Contact'
const Menu = () => {
    const user = useContext(UserContext);


    return (
        <div >
            <ul className="w-full roboto_font flex-wrap menu menu-vertical md:menu-horizontal justify-center md:gap-4">
                <li className='bg-base-200 rounded-md '><NavLink to="/" className='  md:w-32 md:justify-center'>Home</NavLink></li>
                <li className='bg-base-200 rounded-md '><NavLink to="/shirts" className='  md:w-32 md:justify-center'>Shirts</NavLink></li>
                <li className='bg-base-200 rounded-md '><NavLink to="/t-shirts" className='md:w-32 md:justify-center'>T-Shirts</NavLink></li>
                <li className='bg-base-200 rounded-md'><NavLink to="/pants" className=' md:w-32 md:justify-center'>Pants</NavLink></li>
                <li className='bg-base-200 rounded-md'><NavLink to="/trousers" className=' md:w-32 md:justify-center'>Trousers</NavLink></li>
                <li className='bg-base-200 rounded-md'><NavLink to="/fragrances" className=' md:w-32 md:justify-center'>Fragrances</NavLink></li>
                
                <li className='bg-base-200 rounded-md'><input className=' outline-none md:w-60 bg-base-200' type="search" name="search" id="search" onChange={(e) => user.setQuery(e.target.value)} placeholder='Search' /></li>
                <li className={`bg-base-200 rounded-md ${user.admin ? 'block' : 'hidden'}`}>
                    <NavLink to="/admin" className="md:w-32 md:justify-center">Admin</NavLink>
                </li>
                <li className={`bg-base-200 rounded-md ${user.admin ? 'hidden' : 'block'}`}>
                    <div onClick={() => document.getElementById('my_modal_7').showModal()} className="md:w-32 md:justify-center">Contact</div>
                </li>

            </ul>
            <dialog id="my_modal_7" className=" modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <Contact />
                    </div>
                </dialog>
        </div>
    )
}

export default Menu
