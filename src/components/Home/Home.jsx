import React, { useContext, useEffect, useState } from 'react'
import styles from'./Home.module.css';
import { CounterContext } from '../../Context/CounterContext';
import axios from 'axios';
import RecentProducts from '../RecentProducts/RecentProducts';
import Categories from '../Categories/Categories';
import { Helmet } from 'react-helmet';
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {

  let [products,setProducts]=useState([])
    useEffect(()=>{
      getProducts()
    },[]);

    function getProducts(){
      axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then(res=>{ console.log(res.data)
        setProducts(res.data.data)
      })
      .catch(err=> console.log(err))
      
    }
    let[count,setCount]=useState(0)
   let x= useContext(CounterContext);
   console.log(x);
   
  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
               
            </Helmet>
            <MainSlider/>
    <Categories/>
    <div className='row'>

    <RecentProducts/>
    
    </div>
  
    
    </>
  )
}
