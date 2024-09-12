import React, { useEffect, useState } from 'react'
import styles from'./CatergoriesDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';

export default function CatergoriesDetails() {
    useEffect(()=>{
      getCategoriesDetails()
    },[]);
    let[categoryDetails,setCategoryDetails]=useState()
    let[isLoading,setIsLoading]=useState(true)
    let {categoryId}= useParams()
    


    function getCategoriesDetails(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`)
      .then(({data})=>{
        setIsLoading(false)
        setCategoryDetails(data.data)
        
      } )
      .catch(({err})=>console.log(err) )
    }
    
  return (
    <>
    {isLoading ? <div className='flex justify-center items-center'>
    <PulseLoader color='#a4d958' />
  </div> : <>
  <div>
      <div className="row gap-16 mt-6">
        <div className=" border border-2 border-gray-300 w-2/4 px-6 ">
        <img src={categoryDetails.image} className=' w-full' alt={categoryDetails.name} />
        </div>
        <div className="w-1/4 ">
        <h2 className='text-xl text-gray-600 '>Name :{categoryDetails.name}</h2>
        <h2 className='text-xl text-gray-600 '>slug :{categoryDetails.slug}</h2>
        <h2 className='text-xl text-gray-600 '>created At :{categoryDetails.createdAt}</h2>
        <h2 className='text-xl text-gray-600 '>Updated At :{categoryDetails.updatedAt}</h2>
        </div>
      </div>
     
    </div>
  
  </>  }

    </>
  )
}
