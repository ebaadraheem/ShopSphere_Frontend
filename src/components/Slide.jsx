import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Slide = () => {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function ScrollButton() {
    const element = document.querySelector(".to_view");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

  };

  return (
    <>
      <div className='roboto_font  flex justify-center  md:my-10'>
        <Slider {...settings} className='  w-[90vw] max-md:h-[48vh]'>
          <div className='  max-md:h-[70vh]  h-[54vh] md:px-3'>
            <div className='  rounded-lg bg-base-200 flex flex-wrap  max-md:h-[46vh]  '>
              {/* first */}
              <div className='flex  justify-center items-center w-[50%] max-md:w-full max-md:max-h-[25vh] h-[54vh]'>
                <div className='flex flex-col w-[80%]'>

                  <h3 className='pl-2 pt-3 text-xs'>Premium searched online brand </h3>
                  <h1 className='pl-2 max-sm:text-lg text-2xl font-bold'>Summer Collection 2024</h1>
                  <h3 className='pl-2 max-sm:text-sm '>Discover timeless style and unbeatable comfort with our curated collection of men's fashion </h3>
                  <ul className='  menu '>
                    <li className='max-sm:text-sm font-bold rounded-md '><a onClick={ScrollButton} className=' w-32 max-sm:w-[92px] justify-center bg-base-300 roboto_font '>Buy Now</a></li>

                  </ul>
                </div>
              </div>
              {/* second */}
              <div className='  flex justify-center items-center w-[50%] max-md:w-full max-md:max-h-[20vh]  h-[54vh]'>
                <div className='max-md:pb-4 ' >
                  <img className=' max-md:w-[115px] w-[20vw] max-w-[350px]' src="men_display.png" alt="" />
                </div>
              </div>

            </div>

          </div>
          {/* Second Slide */}
          <div className=' max-md:h-[50vh] h-[54vh] px-3'>
            <div className=' rounded-lg bg-base-200 flex flex-wrap justify-between max-md:h-[46vh] '>
              {/* first */}
              <div className='  flexer w-[50%] max-md:w-full max-md:max-h-[25vh] h-[54vh] '>
                <div className='  flex justify-center  flex-col w-[80%] h-[75%]  max-sm:h-[90%]'>

                  <h1 className='max-sm:text-lg  text-2xl font-bold'>About Developer</h1>
                  <h3 className='max-sm:text-xs '>Hi, I'm <b>Ebaad Raheem</b>, a dedicated MERN stack developer <p className='inline max-lg:hidden'>with a knack for building dynamic web applications
                  </p> . I've built this online store for men's clothing and it's easy to use<p className='inline max-lg:hidden'>, letting customers easily find and buy stylish clothes
                    </p>. I used MongoDB to manage the product data, Express.js for handling the website's backend, React for the website's look and feel, and Node.js to run the website. <p className='inline max-xl:hidden'>
                      I've used Authentication in it as well. The website works well on all devices, so you can shop anytime, anywhere. Check out my collection of men's fashion and enjoy a smooth shopping experience.
                    </p><p className='inline xl:hidden'> I hope you like it</p> </h3>

                </div>
              </div>
              {/* second */}
              <div className='   flexer w-[50%] max-md:w-full max-md:max-h-[20vh] max-sm:max-h-[15vh] h-[54vh]'>
                <div  >
                  <img className=' max-md:w-32 w-[25vw] max-w-[350px]' src="About pic.png" alt="" />
                </div>
              </div>

            </div>


          </div>
          {/* Third slide */}

          <div className=' max-md:h-[50vh] h-[54vh] px-3'>
            <div className='  max-lg:text-xs rounded-lg bg-base-200 flex flex-wrap justify-between max-md:h-[46vh] '>
              {/* first */}
              <div className='  max-md:flex max-md:items-end max-md:justify-center  md:flexer w-[50%] max-md:w-full max-md:max-h-[25vh] h-[54vh] '>
                <div className='  max-md:space-y-0 justify-end  flex  md:justify-center  flex-col w-[80%] h-[75%]  max-sm:h-[90%]'>

                  <h1 className='max-sm:text-lg  text-2xl font-bold'>Features about this website</h1>  <h2><b>Secure Authentication: </b> We use Firebase for secure login and signup.</h2>
                  <h2><b>Personalized Favorites:</b> Save your favorite items for easy access later.</h2>
                  <h2 className=' max-sm:hidden'><b>Convenient Cart: </b> Add items to your cart and manage them effortlessly.</h2>
                  <h2><b>Easy Ordering: </b> Place orders quickly in just filling of one form
                  </h2>
                  <h2 className='max-md:hidden'><b>Fast Loading:</b> Enjoy a fast and efficient browsing experience.</h2>

                  <h2><b>Order Management: </b> Admins can easily view and respond to customer orders.</h2>



                </div>
              </div>
              {/* second */}
              <div className='   md:flexer max-md:flex max-md:justify-center w-[50%] max-md:w-full max-md:max-h-[21vh] h-[54vh] '>
                <div className='  max-md:space-y-0  flex md:justify-center  flex-col w-[80%] h-[75%]  max-sm:h-[90%]'>

                  <h2 className=' max-md:hidden'><b>User-Friendly:</b> Designed for a smooth and enjoyable shopping experience.</h2>
                  <h2><b>Exclusive Access:</b> Admin panel visibility is restricted to the site owner.</h2>
                  <h2 className=' max-md:hidden'><b>Effortless Navigation:</b> Find products and manage your account with ease.</h2>
                  <h2><b>Responsive Design:</b> Enjoy a seamless shopping experience on any device.</h2>
                  <h2><b>Admin Panel: </b> Our exclusive admin panel allows for seamless product uploads.</h2>
                  <h2><b>Customer Communication:</b> Use our contact form to reach out to us</h2>


                </div>
              </div>

            </div>


          </div>
        </Slider>
      </div>

    </>
  )

}

export default Slide
