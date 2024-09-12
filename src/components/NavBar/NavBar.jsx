import React, { useContext, useEffect, useState } from 'react'
import styles from'./NavBar.module.css';
import logo from '../../assets/images/fresh.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Home from '../Home/Home';
import { CounterContext } from '../../Context/CounterContext';
import { UesrTokenContext } from '../../Context/UserTokenContext';
import { CartContext } from '../../Context/CartContext';

export default function NavBar() {
    useEffect(()=>{},[]);
    let[count,setCount]=useState(0)
    let {cartItemsNo}=useContext(CartContext)
    let {token,setToken} = useContext(UesrTokenContext)
    console.log(token,"hello from nav component");
    let navigate=useNavigate()

    function logOut(){
      setToken(null)
      localStorage.removeItem("token")
      navigate('/login')

    }
    
  return (
   <nav  className='bg-slate-300 p-2 lg:fixed top-0 left-0 right-0 z-50'>
   <div className="container justify-between items-center mx-auto flex flex-col lg:flex-row ">
    <div className="flex flex-col text-center items-center lg:flex-row">
      <img width={80} className='mr-6 mb-4 lg:mb-0' src={logo} alt="" />
      {token ?  <ul className=' flex flex-col lg:flex-row gap-2 text-2xl'>
        <li>
          <NavLink to='home'>Home</NavLink>
        </li>
        <li>
          <NavLink to='cart'>Cart</NavLink>
        </li>
        <li>
          <NavLink to='brands'>Brands</NavLink>
        </li>
        <li>
          <NavLink to='categories'>Categories  </NavLink>
        </li>
      </ul> : null}
     
    </div>
    <ul className="flex flex-col items-center gap-2 lg:flex-row">
    
<li>
  <i className='fa-brands mx-1 fa-facebook'></i>
  <i className='fa-brands mx-1 fa-instagram'></i>
  <i className='fa-brands mx-1 fa-twitter'></i>
  <i className='fa-brands mx-1 fa-tiktok'></i>
</li>

{token ?<>
<Link to={'/cart'}>
<li className='mx-2 py-5 relative'>
<div className="bg-red-200 text-center rounded-md right-1  absolute top-0">{cartItemsNo}</div>
  <i className=' fa fa-cart-shopping text-green-600 text-xl '></i>
  
</li>
</Link>
<Link to={'/wishlist'}> 
<li>
<i className=' fa fa-heart text-red-600 p-2 text-2xl'></i>
</li>
</Link>

  <li>
        <button to='login' onClick={logOut} >signout</button>
        </li>
</> : <>
        <li>
        <NavLink to='/'>Register</NavLink>
        </li>
        <li>
        <NavLink to='login'>Login</NavLink>
        </li>
        </> }

       
        
     
    </ul>
   </div>
   
   </nav>
  )
}
