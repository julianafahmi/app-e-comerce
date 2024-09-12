import React, { useEffect, useState } from 'react'
import styles from'./ProductItem.module.css';
import { Link } from 'react-router-dom';

export default function ProductItem({product,addCart,loading,currentIds,addToWishList,isFilled,currentWishListIds}) {
    useEffect(()=>{},[]);
    // let[currentId,setCurrentId]=useState(null)
    const[items,setItems]=useState([])

    function changeState(id){
      setItems([])

      setTimeout(() => {
        items[id]=true
        setItems(items);
      }, 0);
     
    }


  return (
    <div key={product.id} className="w-1/6 p-2 mb-2" >
    <div className="product p-3 hover:rounded-md overflow-hidden ">
    <Link to={`/productDetails/${product.id}/${product.category._id}`}>
    <img src={product.imageCover} className='w-full' alt="" />
    <span className='text-green-500'>{product.category?.name}</span>
   
    <h2 className='mb-2 font-bold'>{product.title.split(" ").splice(0,2).join(" ")}</h2>
    <div className="flex justify-between">
      <span>{product.price} EGP</span>
      <span>{product.ratingsAverage} <i className='fa fa-star text-yellow-200'></i> </span>
    </div>
    </Link>
   
   <button onClick={()=> addToWishList(product.id)}>
    {isFilled && currentWishListIds [product.id]  ? <i className='fa fa-heart text-red-600'></i> :
    <i className='fa-regular fa-heart text-red-600'></i>
    }
   </button>
    <button className='btn'onClick={()=>{addCart(product.id) }}>

       {loading && currentIds[product.id]? <i className='fa fa-spinner fa-spin'></i> : <span>Add to cart</span>}  </button>
    </div>

  </div> 
  )
}
