import React, { useContext, useEffect, useState } from 'react'
import styles from './CheckOut.module.css';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function CheckOut() {
  useEffect(() => { }, []);
  let navigate = useNavigate();
  let { cartId } = useParams()
  let { cashOnDelievery } = useContext(CartContext)
  let [isOnlinePayment, setIsOnlinePayment] = useState(false)

  async function pay() {

    //data
    console.log(myForm.values);
    // handle payment
    let url = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`

    if (isOnlinePayment) {
      url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`

    }


    let res = await cashOnDelievery(url, myForm.values);
    if (res.status == "success") {
      
      console.log(res);

      if(isOnlinePayment){
        window.location.href = res.session.url
      }else{
       navigate('/allorders')
      }
    } else {
      console.log('error');

    }

  }

  let myForm = useFormik({
    initialValues: {
      details: "details",
      phone: "01010800921",
      city: "Cairo"
    },
    onSubmit: pay
  })

  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>CheckOut</title>
               
            </Helmet>
      <h1>Checkout now :</h1>
      <form className="max-w-lg mt-5 mx-auto" onSubmit={myForm.handleSubmit}>
        <div >
          <div className="mb-5">
            <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
            <input type="text" id="details" name='details' onChange={myForm.handleChange} value={myForm.values.details} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your password" />
          </div>
          <div className="mb-5">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
            <input type="tel" id="phone" name='phone' onChange={myForm.handleChange} value={myForm.values.phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your password" />
          </div>
          <div className="mb-5">
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
            <input type="text" id="city" name='city' onChange={myForm.handleChange} value={myForm.values.city} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your password" />
          </div>

          <input type="checkbox" className=' mr-2 my-6' id='forOnline' onChange={() => setIsOnlinePayment(!isOnlinePayment)} />
          <label htmlFor="forOnline">Pay Online</label>

          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

            {isOnlinePayment ? 'Pay Online' : 'COD'} </button>
        </div>


      </form>

    </>
  )
}
