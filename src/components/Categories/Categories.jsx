import React, { useEffect, useState } from 'react'
import styles from'./Categories.module.css';
import axios from 'axios';
import Slider from 'react-slick';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { data } from 'autoprefixer';

export default function Categories() {
  let[categories,setCategories]=useState([])

  var settings = {
    dots: false,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
  };
    useEffect(()=>{
      getCategories();
    },[]);
   

    function getCategories(){
      axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then(({data})=>setCategories(data.data))
      .catch(err=>console.log(err))
    }
  return (
 <>
<Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
               
            </Helmet>

 <div className=' mt-6 '>
 
 <Slider {...settings}>

  {categories.map(category=> <div className='' key={category._id}>
    <Link to={`/categoriesDetails/${category._id}`}>
    <img src={category.image} className='h-[200px] overflow-hidden' alt=''/>
    <h2>{category.name}</h2>
  
    </Link>
  </div>)}
 
 </Slider>
 
 </div>

 
 </>
  )
}
