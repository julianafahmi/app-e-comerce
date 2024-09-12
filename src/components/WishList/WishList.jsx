import React, { useContext, useEffect, useState } from 'react'
import styles from'./WishList.module.css';
import { WishListContext } from '../../Context/WishListContext';
import { Card } from 'flowbite-react';
import { PulseLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';

export default function WishList() {
    useEffect(()=>{
      getWishListInfo()
    },[]);
    let[wishListInfo,setWishListInfo]=useState([])
    let[isLoading,setIsLoading]=useState(true)

    let {getWishList,removeProductFromWishList}=useContext(WishListContext)

async function getWishListInfo(){
  
let res = await getWishList()
console.log(res);
setWishListInfo(res)
setIsLoading(false)

}

async function removeItem(productId){
  let  res =  await removeProductFromWishList(productId)
  console.log(res);
  getWishListInfo()

  }

  return (
   <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>WishList</title>
               
            </Helmet>
   {isLoading ? <>
   <div className=' flex justify-center w-full items-center'>
   <PulseLoader color='#a4d958' />
   </div>
   </> : <>
   <h1 className=' text-3xl text-center text-green-600 font-bold'>Whish List</h1>




<div className="w-[70%] mx-auto relative overflow-x-auto shadow-md sm:rounded-lg">
<h2 className=' text-xl text-gray-600 my-5 p-3'>Number of Items : {wishListInfo.count}</h2>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          rate
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {wishListInfo.data.map(ele =><tr key={ele._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-5">
          <img src={ele.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={ele.description} />
        </td>
        <td className="px-3 py-6 font-semibold text-gray-900 dark:text-white">
          {ele.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <span className=' text-xl text-bold text-green-600 '>{ele.ratingsAverage}</span>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
         {ele.price} EGP
        </td>
        <td className="px-6 py-4">
          <button onClick={()=>removeItem(ele._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
        </td>
      </tr>)}
      

    </tbody>
  </table>
</div>


    
   
   </>}


   
   </>
  )
}
