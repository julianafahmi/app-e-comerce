import React, { useContext, useEffect, useState } from 'react'
import styles from './RecentProducts.module.css';
import axios from 'axios';
import ProductItem from '../ProductItem/ProductItem';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';

export default function RecentProducts() {
  let { addProductToCart, cartItemsNo, setCartItemsNo } = useContext(CartContext)
  let { addProductToWishList } = useContext(WishListContext)
  useEffect(() => {
    getProducts();
  }, []);
  let [products, setProducts] = useState([])
  let [loading, setLoading] = useState(false)
  let [isFilled, setIsFilled] = useState(false)
  let [currentIds, setCurrentIds] = useState([])
  let [currentWishListIds, setCurrentWishListIds] = useState([])

  function getProducts() {
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then(({ data }) => setProducts(data.data))
      .catch(err => console.log(err))
  }

  async function addToCartItem(id) {
   
    setLoading(true)
    let x = [...currentIds];
    let newArray = x.pop()
    console.log(newArray);
    setCurrentIds(x)
    setTimeout(() => {
      currentIds[id] = true;
      setCurrentIds(currentIds)
      console.log(currentIds);
      
    },10)

    console.log(currentIds, "current");

    let data = await addProductToCart(id);
    if (data.data.status == "success") {
      let newCartItemsNo = cartItemsNo + 1;
      setCartItemsNo(newCartItemsNo)
      toast.success(data.data.message, {
        position: 'bottom-right',
      })
    } else {
      toast.error(data.response.data.message, {
        position: 'bottom-right',
      })
    }

    setLoading(false)

  }

  async function addToWishList(id) {
  
    currentWishListIds[id] = true
    setIsFilled(true)
    let x= structuredClone(currentWishListIds)
    console.log("curent ids",currentWishListIds);
    setCurrentWishListIds(x)

    let res = await addProductToWishList(id)
    
    console.log("heloooo wish", id);
    if (res.status == "success") {
      // console.log("added successfuly");
      toast.success(res.message, {
        position: 'bottom-right'
      })


    } else {
      toast.error("error");

    }

  }
  return (
    <>
      <div className="row">
        {products.map(product =>
          <ProductItem key={product.id} loading={loading} isFilled={isFilled} addToWishList={addToWishList} currentIds={currentIds} addCart={addToCartItem} product={product} currentWishListIds={currentWishListIds} />
        )}
      </div>

    </>
  )
}
