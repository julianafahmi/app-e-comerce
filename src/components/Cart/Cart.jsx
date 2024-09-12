import React, { useContext, useEffect, useState } from 'react'
import styles from'./Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import { PulseLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import { Helmet } from 'react-helmet';

export default function Cart() {
  let{getCart}=useContext(CartContext)
  let{clearCart,setCartItemsNo,removeProduct,updateProductCount,setCartId,cartId}=useContext(CartContext)
    useEffect(()=>{
      getCartInfo()
    },[]);
    let[cartInfo,setCatInfo]=useState(null)
    let[isLoading,setIsLoading]=useState(true)
    let[noCartInfo,setNoCartInfo]=useState('')
    let navigate=useNavigate()

   async function getCartInfo(){
    let res= await getCart()
    
    console.log(res);

    if(res.data){
     
      setCartId(res.data._id)
      setCatInfo(res)
      setCartItemsNo(res.numOfCartItems)
     
    }else{
setNoCartInfo("No Cart Item Found , Please Start To Shopping")      
    }
    setIsLoading(false)
    
   
    }

   async function removeItem(id){
    let res=  await removeProduct(id)
    console.log(res);
    setCatInfo(res);
    setCartItemsNo(res.numOfCartItems);
    }

   async function updateProduct(id,count){
   let res = await  updateProductCount(id,count)
   console.log(res);
   setCatInfo(res);
   setCartItemsNo(res.numOfCartItems);
    }
    async function clearAllCart(){
      let res = await  clearCart()
      console.log(res);
      if(res.message=="success"){
        setNoCartInfo("No Item To Show")
      }
      
       }
function goToCheckOut(){
navigate(`/checkout/${cartId}`)
}


  return (
  <>
<Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
               
            </Helmet>
  {isLoading ? <div className='flex justify-center items-center'>
    <PulseLoader color='#a4d958' />
  </div> :
  <>
  {noCartInfo ? noCartInfo :<>

  {cartInfo.data?.products.length ?<>
    <div className="w-[70%] mx-auto my-10 relative overflow-x-auto shadow-md sm:rounded-lg">
  <h1 className=' text-4xl text-green-500 font-bold text-center mt-5'>Shipping Cart</h1>

  <div className="flex justify-between px-7 my-6">
    <h2 className=' text-gray-600 text-2xl'>Total Cart Items: {cartInfo.numOfCartItems}</h2>
    <h2 className=' text-green-600 text-2xl'>Total Price:{cartInfo.data.totalCartPrice}</h2>
  </div>
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
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {cartInfo.data.products.filter(ele=>ele.count !=0).map(ele => <CartItem ele={ele} updateProduct={updateProduct} removeItem={removeItem}/>)}
      
    </tbody>
  </table>
 
 </div>
  
  </> : 'No Product In The Cart , Please Start Shopping' }
 
 </>}
  {noCartInfo? null : isLoading ? null : cartInfo.data?.products.length ?  <div className="flex justify-around my-5  w-[70%] mx-auto">
  <button className='bg-red-500 p-3 rounded-lg text-white' onClick={clearAllCart}>Clear Cart</button>
  <button className='bg-green-500 p-3 rounded-lg text-white' onClick={goToCheckOut}>Continue to CheckOut</button>
</div> : null
  

  }
  </>
 
  }
 

 



  </>
  )
}
