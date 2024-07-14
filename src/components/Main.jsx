import React from 'react'
import Cards from './Cards'
import Slide from './Slide'
import { useContext, useEffect } from 'react'
import UserContext from '../UserContext/UserContext'
const Main = () => {

  const user = useContext(UserContext);
  
  useEffect(() => {

    user.setQuery("")

  }, [])
  
  const filtereditems = user.getFilteredItems(user.data)
  return (
    <div className='  flex justify-center '>


      <div className='  flex flex-col justify-center items-center w-[90vw] '>
        <Slide />
        <div className=' w-full'>

          <div className='to_view  pl-5 flex my-3 gap-2'>
            <svg className='w-5' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 160C203 160 160 203 160 256c0 52.95 43.05 96 96 96s96-43.05 96-96C352 203 308.1 160 256 160zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z" /></svg>
            <h2 >All Colllection</h2>

          </div>
          <div className={`${filtereditems.length == 0 ? 'flex' : 'hidden'} flexer h-20`}>
  
            
          <svg className=' w-10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#0B0105" stroke="#0B0105" stroke-width="2" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#0B0105" stroke="#0B0105" stroke-width="2" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#0B0105" stroke="#0B0105" stroke-width="2" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
    
    </div>
            <div className=' flexer max-sm:gap-1 gap-2 flex-wrap xl:ml-5 max-xl:px-5 max-sm:px-2'>          {
              filtereditems.map((cards) => (
                <Cards key={cards.id} cards={cards} />
              ))
            }
  
         
          </div>


        </div>
      </div>
    </div>
  )
}

export default Main
