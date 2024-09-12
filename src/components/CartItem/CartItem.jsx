import React, { useEffect, useState } from 'react'
import styles from'./CartItem.module.css';

export default function CartItem({updateProduct,removeItem , ele,showActions}) {
  if(showActions ==undefined){
    showActions=true;
  }
    useEffect(()=>{},[]);
    let[count,setCount]=useState(0)
  return (
    <>
    <tr key={ele._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={ele.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
         {ele.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            {showActions? <>
              <button onClick={()=> updateProduct(ele.product.id , ele.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <span>{ele.count}</span>

            </div>
            <button onClick={()=> updateProduct(ele.product.id , ele.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
            </> : <span>{ele.count}</span>}
           
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
         {ele.price} EGP
        </td>

        {showActions? <td className="px-6 py-4">
          <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={()=> removeItem(ele.product._id)}>Remove</button>
        </td> : null}
       
      </tr>
    
    </>
  )
}
