import React from 'react'
import { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext/UserContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

import toast from 'react-hot-toast';
const Cards = ({ cards }) => {
    const user = useContext(UserContext);

    const HandleCardClick = (id) => {

        sessionStorage.setItem("description_card-id", JSON.stringify(id))


    }

    useEffect(() => {
        user.favourite.forEach(it=>{
                
                const element = document.querySelector(`.heart-${it.id}`);
                if (element) {
                    element.src = "filled_heart.svg";
                    
                }
            
        })
    }, [user.favourite])
    

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


        <div key={cards.id}>
            <Link className=' rounded-xl roboto_font bg-base-200  transition-all' to="/description">
                <div   onClick={()=>HandleCardClick(cards.id)} className={`bg-base-200 hover:bg-base-300 cursor-pointer card-${cards.id} card max-md:w-[142px]  max-md:h-[212px] w-60   `}>
                    <div className="p-0 card-body ">
                        <div className='mt-5 px-1.5 flex justify-between '>
                            <div className='flex flex-col max-md:text-xs'>
                                <div className=' max-md:h-8 h-12 overflow-hidden '>{cards.name}</div>
                                <div className='overflow-hidden  h-6 font-bold'>{cards.price} pkr</div>
                            </div>
                            <div className='flex'>
                                <button onClick={(e) => handleHeartButton(cards.id, e)} className=" flex justify-center items-center  btn  btn-ghost btn-circle">
                                    <img className={`heart-${cards.id}  w-5`} src={cards.favourite ? "filled_heart.svg" : "unfilled_heart.svg"} alt="" />

                                </button>
                  
                            </div>
                        </div>
                    </div>

                    <figure className=' h-52'><img className=' w-40' src={cards.img} alt="" /></figure>
                </div>
            </Link>
        </div>
    )
}

export default Cards
