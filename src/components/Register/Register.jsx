import React, { useEffect, useState } from 'react'
import styles from './Register.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  useEffect(() => { }, []);
  let[apiError,setApiError]=useState(null);
  let[isLoading,setIsLoading]=useState(false);

  let navigate=useNavigate()

  function register(formValue) {
    // 3ashan lama a3mel submit tani a5fy el meg le3'ayet ma a3mel call tani lel api
    setApiError(null)
    // a3mel el loading

    setIsLoading(true)



    // call API

    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formValue)
    .then((res) => {
      let {data}=res
      console.log(data.message,"data message");
      
      if(data.message=="success"){
        //yro7 lel login
        navigate('/login')
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
      name: Yup.string().min(3, "not less than 3").max(10, "not max than 10").required("Required"),
      email: Yup.string().email("Invalid Email").required("Required"),
      password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/).required("Required"),
      rePassword: Yup.string().oneOf([Yup.ref('password')]).required("Required"),
      phone: Yup.string().matches(/^[01][0125][0-9]{8}$/, "invalid").required("Required"),

    })
  }



  // CUSTOM VALIDATION 
  // function validateRegister(values){
  //   const errors={}

  //   if(!errors.name){
  //     errors.name="required"

  //   }else if(!/^[A-Z][a-z]{3,5}$/.test(values.name)){
  //     errors.name="name must start with capital letter"
  //   }

  //   if(!errors.email){
  //     errors.email="required"

  //   }else if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)){
  //     errors.email="invalid email"
  //   }

  //   if(!errors.password){
  //     errors.password="required"

  //   }else if(!/^[A-Z][a-z0-9]{3,5}$/.test(values.password)){
  //     errors.password="invalid password"
  //   }

  //   if(!errors.rePassword){
  //     errors.rePassword="required"

  //   }else if(values.rePassword!=values.password){
  //     errors.rePassword="rePassword should match password"
  //   }

  //   if(!errors.phone){
  //     errors.phone="required"

  //   }else if(!/^01[0125][0-9]{8}/.test(values.phone)){
  //     errors.phone="invalid phone number"
  //   }
  //   return errors;
  // }

  let myForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema,

    onSubmit: register
  })
  return (
    <>

    {apiError && <div className="max-w-lg mt-5 mx-auto p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{apiError}</span>
        </div>}
      <form className="max-w-lg mt-5 mx-auto" onSubmit={myForm.handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
          <input type="text" id="name" name='name' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your name" />
        </div>
        {myForm.errors.name && myForm.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{myForm.errors.name}</span>
        </div> : null}

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
        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your repassword</label>
          <input type="password" id="rePassword" name='rePassword' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.rePassword} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="renter your password" />
        </div>
        {myForm.errors.rePassword && myForm.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{myForm.errors.rePassword}</span>
        </div> : null}
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
          <input type="number" id="phone" name='phone' onBlur={myForm.handleBlur} onChange={myForm.handleChange} value={myForm.values.phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your phone" />
        </div>
        {myForm.errors.phone && myForm.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{myForm.errors.phone}</span>
        </div> : null}
        <button disabled={isLoading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          
         {isLoading?<i className='fa fa-spinner fa-spin'></i>:"Submit"} </button>
        
      </form>
    </>
  )
}
