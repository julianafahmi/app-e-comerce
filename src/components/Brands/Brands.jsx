import React, { useEffect, useState } from 'react'
import styles from'./Brands.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';

export default function Brands() {
    useEffect(()=>{
      getBrands()
    },[]);
    let[brands,setBrands]=useState([])
    let[isloading,setIsLoading]=useState(true)

    function getBrands(){
      axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      .then(({data})=>{
        setIsLoading(false)
        setBrands(data.data)}
      )
      .catch(err => err.data)
   
      
    }
  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
               
            </Helmet>
    {isloading ? <div className='flex justify-center items-center'>
    <PulseLoader color='#a4d958' />
  </div> : <>
  <div className="row gap-2 my-4 mx-auto">
 
 {brands.map(brand => 
  <Link to={`/brandsDetails/${brand._id}`}>
   <div key={brand._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
   <a href="#">
     <img className="rounded-t-lg" src={brand.image} alt={brand.name} />
   </a>
   <div className="p-5">
     <a href="#">
       <h5 className="mb-2  tracking-tight text-gray-900 dark:text-white">{brand.name}</h5>
     </a>
   </div>
 </div>
  </Link>
  )}
 </div>
  </>}
    
 
   
    
   


    
    </>
  )
}
