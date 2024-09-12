import React, { useEffect, useState } from 'react'
import styles from'./Footer.module.css';

export default function Footer() {
    useEffect(()=>{},[]);
    let[count,setCount]=useState(0)
  return (
   <>
   

<footer className="bg-gray-900 text-white rounded-lg shadow dark:bg-gray-900 ">
  <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
     <i className='fa fa-cart-shopping text-4xl'></i>
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Fresh Market</span>
      </a>
      <ul className="flex flex-wrap gap-6 items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
        <li>
        <i className=' fa-brands fa-facebook-f text-2xl'></i>
        </li>
        <li>
        <i className=' fa-brands fa-instagram text-2xl'></i>
        </li>
        <li>
        <i className=' fa-brands fa-twitter text-2xl'></i>
        </li>
        <li>
        <i className=' fa-brands fa-tiktok text-2xl'></i>
        </li>
      </ul>
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Fresh Market™</a>. All Rights Reserved.</span>
  </div>
</footer>



   
   </>
  )
}
