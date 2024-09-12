import React, { useContext, useEffect, useState } from 'react'
import styles from'./Order.module.css';
import { CartContext } from '../../Context/CartContext';
import { UesrTokenContext } from '../../Context/UserTokenContext';
import { Accordion } from "flowbite-react";
import CartItem from '../CartItem/CartItem';
import { Helmet } from 'react-helmet';
export default function Order() {
    useEffect(()=>{},[]);
    let[orders,setOrders]=useState([])
    let {userId}=useContext(UesrTokenContext)
    let{getOrders}=useContext(CartContext)
    
    useEffect(()=>{
      if(userId) getAllOrders()
    },[userId])


   async function getAllOrders(){
let res=await getOrders(userId);
setOrders(res)

    }
 
  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Order</title>
               
            </Helmet>
   
    <Accordion className=' my-6'>
      {orders.map(order=> <Accordion.Panel>
        <Accordion.Title className={order.isPaid?' text-green-600':'bg-red-300'}>{order.paymentMethodType} {order.isDelivered.toString()}</Accordion.Title>
        <Accordion.Content>
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
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
       
      </tr>
    </thead>
    <tbody>
      {order?.cartItems.map(ele => <CartItem ele={ele} showActions={false}/>)}
      
    </tbody>
  </table>

        </Accordion.Content>
      </Accordion.Panel>
    )}
      
    
    </Accordion>

    </>
  )
}
