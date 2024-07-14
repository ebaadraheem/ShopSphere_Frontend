import React from 'react'
import UserContext from '../UserContext/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Logn_In from './Logn In/Logn_In'
import { auth } from '../Firbase/firbase'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
const Navbar = () => {
    const users = useContext(UserContext);
    const [DisplayData, setDisplayData] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                if (user.photoURL === null) {
                    user.photoURL = "defaultuserpic.svg"
                }

                setDisplayData({ displayName: user.displayName, photo: user.photoURL, email: user.email })

            }
            else {
                setDisplayData(null)
            }
        })

    }, [])


    const HandleSignOut = () => {
        auth.signOut().then(() => {
            navigate("/")
        }).catch(() => {
            console.error("Error while signing out")
        })
        toast.success("Logout successfully")

    }


    const user = useContext(UserContext);
    return (
        <>
            <div className="roboto_font navbar bg-base-100 ">
                <div className="navbar-start">
                    <div className="dropdown ">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </div>
                        <ul tabIndex={0} className="roboto_font menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                            <li><a href={"https://portfolio-website-rust-psi-53.vercel.app"}>Portfolio</a></li>

                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <a className=" font-bold text-xl">ShopSphere</a>
                </div>
                <div className="navbar-end">
                    <div>
                        <button onClick={!DisplayData ? (() => document.getElementById('my_modal_3').showModal()) : (() => navigate("/favourites"))} className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg className='w-5' height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M13.1026543,2.69607267 C14.1723908,2.17246378 15.1055573,1.99999846 16.5532309,2.0000161 C20.2579495,2.01535832 23,5.13984465 23,9.11987614 C23,12.1577519 21.3061684,15.0922806 18.1511601,17.9298912 C16.4951061,19.4193443 14.3806781,20.8933233 12.866397,21.6774721 L12,22.1261233 L11.133603,21.6774721 C9.6193219,20.8933233 7.50489394,19.4193443 5.84883985,17.9298912 C2.69383159,15.0922806 1,12.1577519 1,9.11987614 C1,5.09726693 3.71643647,2 7.45454545,2 C8.85027925,2 9.83131847,2.18877527 10.9218108,2.72813403 C11.3014787,2.91591822 11.658192,3.13866136 11.9899709,3.39576047 C12.3350403,3.12339226 12.7066025,2.88992996 13.1026543,2.69607267 Z M16.8137247,16.4428585 C19.5861779,13.9493174 21,11.4998994 21,9.11987614 C21,6.18896383 19.0882067,4.01053125 16.5490834,4.00000753 C15.3870057,4.00000023 14.7458716,4.11849292 13.9819236,4.49242603 C13.5120101,4.72243676 13.095105,5.0329512 12.7314502,5.42754949 L12.0023377,6.21870239 L11.2665312,5.43377128 C10.9108757,5.05437109 10.5000057,4.75076878 10.0351348,4.52084307 C9.24812694,4.13158808 8.56428173,4 7.45454545,4 C4.88364127,4 3,6.14771812 3,9.11987614 C3,11.4998994 4.41382212,13.9493174 7.18627532,16.4428585 C8.69781928,17.8023393 10.6410383,19.1609346 12,19.8736982 C13.3589617,19.1609346 15.3021807,17.8023393 16.8137247,16.4428585 Z" fillRule="evenodd" /></svg>
                                <span className={` ${user.favourite.length == 0 ? 'hidden' : 'block'} badge badge-xs badge-primary indicator-item`}></span>
                            </div>
                        </button>
                    </div>
                    <div>
                        <button onClick={!DisplayData ? (() => document.getElementById('my_modal_3').showModal()) : (() => navigate("/shoppingcart"))} className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg className='w-6' viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256" /><path d="M184,184H69.8L41.9,30.6A8,8,0,0,0,34.1,24H16" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><circle cx="80" cy="204" fill="none" r="20" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><circle cx="184" cy="204" fill="none" r="20" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M62.5,144H188.1a15.9,15.9,0,0,0,15.7-13.1L216,64H48" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
                                <span className={` ${user.Cart.length == 0 ? 'hidden' : 'block'} badge badge-xs badge-primary indicator-item`}></span>
                            </div>
                        </button>
                    </div>

                    <div className={`dropdown`}>
                        <div onClick={!DisplayData ? (() => document.getElementById('my_modal_3').showModal()) : undefined} tabIndex={1} role="button" className={`btn btn-ghost btn-circle `}>

                            {DisplayData ? <img className=' w-9 rounded-full' src={DisplayData.photo} alt="" />
                                : <svg className='w-5' data-name="Layer 1" id="Layer_1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title /><path d="M24,21A10,10,0,1,1,34,11,10,10,0,0,1,24,21ZM24,5a6,6,0,1,0,6,6A6,6,0,0,0,24,5Z" /><path d="M42,47H6a2,2,0,0,1-2-2V39A16,16,0,0,1,20,23h8A16,16,0,0,1,44,39v6A2,2,0,0,1,42,47ZM8,43H40V39A12,12,0,0,0,28,27H20A12,12,0,0,0,8,39Z" /></svg>
                            }
                        </div>
                        <ul tabIndex={1} className={` translate-x-[-80%] roboto_font menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${DisplayData ? "flex" : "hidden"}`}>
                            <li className=' pl-3'>Username : {DisplayData && DisplayData.displayName}</li>
                            <li onClick={HandleSignOut}><a>Logn Out</a></li>

                        </ul>
                    </div>

                </div>
                <dialog id="my_modal_3" className=" modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <Logn_In />
                    </div>
                </dialog>
            </div>
        </>
    )
}

export default Navbar
