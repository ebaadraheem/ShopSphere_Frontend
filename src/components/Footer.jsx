import React from 'react'

const Footer = () => {
    return (
        < >
        <div className='roboto_font  flex flex-col justify-center items-center mt-8 '>
            <hr className=' w-[80vw]' />
            <footer className="  justify-between footer py-10 px-20 max-md:justify-center">
                <aside className=' '>
                    <p>&copy; 2024 || All Rights Reserved</p>
                    <p>Created by Ebaad Raheem<br /> A MERN Stack Developer</p>
                </aside>
                <nav className='roboto_font  flex flex-col items-center'>
                    <h6 className="footer-title">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                        
                        <a href='https://www.instagram.com/ebaadraheem19?igsh=MWJxYmZiZWZ2NGs5MQ==' className="btn btn-ghost btn-circle order-2">
                            <div className="indicator">
                          <svg className=' w-8 fill-current' viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><circle cx="128" cy="128" r="32"/><path d="M172,28H84A56,56,0,0,0,28,84v88a56,56,0,0,0,56,56h88a56,56,0,0,0,56-56V84A56,56,0,0,0,172,28ZM128,176a48,48,0,1,1,48-48A48,48,0,0,1,128,176Zm52-88a12,12,0,1,1,12-12A12,12,0,0,1,180,88Z"/></svg>

                            </div>
                        </a>
                        <a href='https://x.com/ebaadraheem19?s=09' className="btn btn-ghost btn-circle order-3">
                            <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>

                            </div>
                        </a>
                        <a href='https://www.facebook.com/ebaad.raheem?mibextid=ZbWKwL' className="btn btn-ghost btn-circle order-1">
                            <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>

                            </div>
                        </a>
                    
                    </div>
                </nav>
            </footer>
        </div>
        </>
    )
}

export default Footer
