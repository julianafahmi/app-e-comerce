import React, { useEffect, useState } from 'react'
import styles from'./LayOut.module.css';
import NavBar from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function LayOut() {
    useEffect(()=>{},[]);
    let[count,setCount]=useState(0)
  return (
   <>
   <NavBar/>
   <div className="container   py-24 mb-48 max-w-7xl max-h-full  mx-auto">
   <Outlet></Outlet>
   </div>
   {/* <Footer/> */}
   </>
  )
}
