import axios from "axios";
import { useFormik } from "formik"
import  { useState } from 'react'
import *as Yup from 'yup';
import {  useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
export default function Register() {
  const [loading,setLoading]=useState(false);
  const[errormessage,setErrormessage]=useState('')
let navigate = useNavigate()

  async function sendData(values){
    setLoading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).catch((err)=>{
      setLoading(false);
    setErrormessage(`${err.response.data.errors.msg}`)
    
  })
    
  if(data.message === 'success'){
    setLoading(false);
 
   navigate('/Login')

  }
  }

  let validationSchema =Yup.object({
    name:Yup.string().required('name is required').min(4,'must less than 4 digites'),
    email:Yup.string().required('email is required').email().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'email invalid EX: nnn50@gamil.com'),
    password:Yup.string().required('password is required').matches(/^[a-zA-Z0-9]{1,10}$/,'EX:aA1234'),
    rePassword:Yup.string().required('repassword is required').oneOf([Yup.ref('password')],'not matched'),
    phone:Yup.string().required('phone is required').matches(/^(002){0,1}01[0125][0-9]{8}$/,'invalid number egption nummber is needed')})
    
let formik =useFormik({
  initialValues:{
    name:'',
    email:'',
    password:'',
    rePassword:'',
    phone:''
  },validationSchema
  ,onSubmit:sendData
})


// shoHidePassword
 const pass = document.querySelector('.pass');
 const toggler = document.querySelector('.fa-eye');
  const showHidepassword = ()=>{
    if(pass.type == 'password'){
      pass.setAttribute('type','text');
    }else{
      pass.setAttribute('type','password');
    }
    toggler.classList.toggle('fa-eye');
    toggler.classList.toggle('fa-eye-slash');
  }
  return <>

   <Helmet>
  <meta charSet="utf-8" />
    <title>Register</title>
  </Helmet>
  <form onSubmit={formik.handleSubmit} >
    
    <div className="container w-75  mt-3 br-second">
    <h3 className="text-main">Register now</h3>
    {errormessage?<div className='alert alert-danger mt-2'>Email:{errormessage}</div>:null}

    <label htmlFor="name" >Name:</label>
    <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="name" name="name" className="form-control mb-2 " />
    {formik.errors.name&&formik.touched.name? <div className='alert alert-danger mt-1'>{formik.errors.name}</div>:null}

    <label htmlFor="email" >Email:</label>
    <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="email" name="email" className="form-control mb-2 " />
    {formik.errors.email&&formik.touched.email?     <div className='alert alert-danger mt-2'>{formik.errors.email}</div>:null}

    <label htmlFor="password" >password:</label>
    <div className="d-flex password position-relative">
       <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}   type="password" id="password" name="password" className="pass form-control mb-2 "/>   
   <span > <i onClick={showHidepassword}  className="fa-regular fa-eye text-main " ></i> </span>
    </div>  {formik.errors.password&&formik.touched.password?     <div className='alert alert-danger mt-2'>{formik.errors.password}</div>:null}
   
    <label htmlFor="rePassword">rePassword: </label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" value={formik.values.rePassword} name="rePassword" id='rePassword' className='form-control mb-2' placeholder='Enter Your rePassword.....'/>
           {formik.errors.rePassword&&formik.touched.rePassword?<div className='alert alert-danger mt-2'>{formik.errors.rePassword}</div>:null}


    <label htmlFor="phone" >phone:</label>
    <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" id="phone" name="phone" className="form-control mb-2 " />
    {formik.errors.phone&&formik.touched.phone?<div className='alert alert-danger mt-2'>{formik.errors.phone}</div>:null}
    
    {loading? <button disabled={!(formik.dirty&&formik.isValid) } type='button' className='btn btn-main mt-2 mb-2 '> <i className='fas fa-spinner fa-spin' ></i></button>
:<button disabled={!(formik.dirty&&formik.isValid) } type='submit' className='btn btn-main mt-2 mb-2 '>Register</button>}
    
    </div>
  </form>
  
  </>
}
