import React, { useEffect, useState } from 'react'
import styles from'./BrandsDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';

export default function BrandsDetails() {
 let {brandId}=  useParams()
// console.log(brandId);

    useEffect(()=>{
      getBrandDetails()
    },[]);
    let[brandDetails,setBrandDetails]=useState()
    let[isLoading,setIsLoading]=useState(true)



    function getBrandDetails(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
      .then(({data})=> {
        setIsLoading(false)
        setBrandDetails(data.data)}
      )
      
     
      .catch(err=> console.log(err)
    )
   
    }
  return (
  <>
  {isLoading ? <div className='flex justify-center items-center'>
    <PulseLoader color='#a4d958' />
  </div> : <>
  <div>
      <div className="row gap-16 mt-6">
        <div className=" border border-2 border-gray-300 w-2/4 px-6 ">
        <img src={brandDetails.image} className=' w-full' alt={brandDetails.name} />
        </div>
        <div className="w-1/4">
        <h2 className='text-xl text-gray-600 '>Name :{brandDetails.name}</h2>
        <h2 className='text-xl text-gray-600 '>slug :{brandDetails.slug}</h2>
        <h2 className='text-xl text-gray-600 '>created At :{brandDetails.createdAt}</h2>
        <h2 className='text-xl text-gray-600 '>Updated At :{brandDetails.updatedAt}</h2>
        </div>
      </div>
     
    </div>
    


  
  </>  }
   

    </>
  )
}
