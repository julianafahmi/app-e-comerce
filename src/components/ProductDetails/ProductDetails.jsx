import React, { useContext, useEffect, useState } from 'react'
import styles from'./ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import ProductItem from '../ProductItem/ProductItem';
import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { WishListContext } from '../../Context/WishListContext';


export default function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let {id,categoryId} =useParams();
  console.log(categoryId);
 
  let {addProductToCart,cartItemsNo,setCartItemsNo}=useContext(CartContext)
  let{addProductToWishList , }=useContext(WishListContext)
  
  
  let[isLoading,setIsLoading]=useState(true)
  let[productDetails,setProductDetails]=useState()
  let[relatedProduct,setRelatedProduct]=useState([])
  
  



    useEffect(()=>{
      getProductDetails();
      getRelatedProduct();
    },[]);
    useEffect(()=>{
      getProductDetails();
    
    },[id]);


    function getProductDetails(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({data})=>{
        setIsLoading(false);
        setProductDetails(data.data)
      if(relatedProduct.length){
        getFilteredData(relatedProduct)

      }
      }
      )
      .catch(({err})=>console.log(err))
    }
    
    function getRelatedProduct(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({data})=>{
        getFilteredData(data.data)
    
      })
      .catch(({err})=>console.log(err))
    }
function getFilteredData(data){
  let res=(data.filter(ele => ele.category._id == categoryId && ele.id!=id));
    setRelatedProduct(res)
}
 async function addToWishList(id){
  //console.log("hiiiiiiii favorite" , id);
  let res= await addProductToWishList(id)
 // console.log(res);
  if(res.status=="success"){
   // console.log("added successfuly");
    toast.success(res.message , {
      position: 'bottom-right'
    })
    
    
  }else{
    toast.error("error");
    
  }
  
}

async function addToCartItem(id){
 let data= await addProductToCart(id)
 console.log("x=>",data);
 if(data.data.status=="success"){
  let newCartItemsNo= cartItemsNo + 1;
      setCartItemsNo(newCartItemsNo)
  toast.success(data.data.message,{
    position: 'bottom-right',
  })
 }else{
  toast.error(data.response.data.message,{
    position: 'bottom-right',
  })
 }
 
 
}
    
    
  return (
    <>
<Helmet>
                <meta charSet="utf-8" />
                <title>Product Details</title>
               
            </Helmet>
    <div className=' overflow-hidden'>
     <div className="row items-center mt-5">
      {isLoading? <div className="flex justify-center items-center w-full">
      <PulseLoader color='#a4d958' />
      </div>:<>
      <div className="w-1/4">
      

      <Slider {...settings}>
      {productDetails.images.map(src => <img src={src}/>)}
      </Slider>

      </div>
      <div className="w-3/4 p-5   ">
     <h2 className='text-4xl font-light mb-2'>{productDetails.title}</h2>
     <p className='mb-5 text-gray-400 font-light' >{productDetails.description}</p>

     <span className='block mb-5 '>{productDetails.category.name}</span>

     <div className='flex justify-between pt-2'>
      <span>{productDetails.price} EGP</span>
      <span>{productDetails.ratingsAverage} <i className='fa fa-star text-yellow-300'></i> </span>
     </div>
     <button onClick={()=>addToWishList(productDetails.id)}><i className=' fa-regular fa-heart text-red-500 text-2xl mt-3'></i></button>
     <button className='btn' onClick={() => addToCartItem(productDetails.id)}>+Add to Cart</button>
      </div>
      </>}
     
    
      
     </div>
<h2 className='text-2xl mt-10 text-green-500 '>Related  Products</h2>
     <div className="row">
      {relatedProduct.map(product=> <ProductItem key={product._id} product={product}/>)}
     </div>
    </div>
    </>
  )
}
