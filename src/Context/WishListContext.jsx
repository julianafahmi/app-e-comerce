import axios from "axios";
import { createContext, useState } from "react";


const headers={
    token:localStorage.getItem("token")
}

function addProductToWishList(productId){
  return  axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId},{headers})
    .then((res)=>res.data)
    .catch((err)=>err.data)
}

function getWishList(){
    return  axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{headers})
    .then((res)=>res.data)
    .catch((err)=>err.data)
}
function removeProductFromWishList(productId){
    return  axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers})
      .then((res)=>res.data)
      .catch((err)=>err.data)
  }



export let WishListContext = createContext()



export default function WishListContextProvider({ children }) {
  

    return <WishListContext.Provider value={{ addProductToWishList , getWishList , removeProductFromWishList }}>
        {children}
    </WishListContext.Provider>
}