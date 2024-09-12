import React, { useContext, useEffect, useState } from 'react'
import styles from'./Login.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UesrTokenContext } from '../../Context/UserTokenContext';
import { jwtDecode } from 'jwt-decode';


export default function Login() {
  useEffect(() => { }, []);
  let[apiError,setApiError]=useState(null);
  let[isLoading,setIsLoading]=useState(false);
  let tokenContext=useContext(UesrTokenContext)
  let{convertToken}=useContext(UesrTokenContext);

  let navigate=useNavigate()

  function login(formValue) {
    // 3ashan lama a3mel submit tani a5fy el meg le3'ayet ma a3mel call tani lel api
    setApiError(null)
    // a3mel el loading

    setIsLoading(true)



    // call API

    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formValue)
    .then((res) => {
      let {data}=res
      console.log(data.message,"data message");
      
      if(data.message=="success"){
        //yro7 lel login
        localStorage.setItem("token",data.token)

        console.log(data);
        tokenContext.setToken(data.token)
        convertToken()
        
        navigate('/home')
      }
      else{

      }
    })
    .catch((err) => {
      setApiError(err.response.data.message)
      setIsLoading(false)
    })
    


    //3ashan ahandel el error message
    if (data.message == "success") {
      // login
    } else {

    }
    console.log(data);




  }

  // VALIDATION USING YUP

  const validationSchema = () => {
    return Yup.object({
      
      email: Yup.string().email("Invalid Email").required("Required"),
      password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/).required("Required"),
     
    })
  }
  let myForm = useFormik({
    initialValues: {
    
      email: "",
      password: "",
     
    },
    validationSchema,

    onSubmit:login
  })
  return (
    <>

    {apiError && <div className="max-w-lg mt-5 mx-auto p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{apiError}</span>
        </div>}
      <form className="max-w-lg mt-5 mx-auto" onSubmit={myForm.handleSubmit}>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" id="email" name='email' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
        </div>
        {myForm.errors.email && myForm.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{myForm.errors.email}</span>
        </div> : null}
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" id="password" name='password' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.password} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your password" />
        </div>
        {myForm.errors.password && myForm.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{myForm.errors.password}</span>
        </div> : null}
     
        <button disabled={isLoading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          
         {isLoading?<i className='fa fa-spinner fa-spin'></i>:"Login"} </button>
        
      </form>
    </>
  )
}
