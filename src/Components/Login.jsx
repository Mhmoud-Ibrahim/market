
import axios from "axios";
import { useFormik } from "formik"
import  { useContext, useState } from 'react'
import *as Yup from 'yup';
import {   useNavigate} from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Cartcontext } from "../Context/CartContext";
import toast from "react-hot-toast";

export default function Login() {

  const [loading,setLoading]=useState(false);
 
  const[errormessage,setErrormessage]=useState('')
  let navigate = useNavigate()
  let {saveUserData,getuserName,userName} =useContext(Cartcontext)
  
  async function sendDatalogin(values){
  setLoading(true);
  let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values).catch((err)=>{
      setLoading(false);
    setErrormessage(`${err.response.data.errors.msg}`)
  })
  if(data.message === 'success'){
    localStorage.setItem('userToken',data.token);
    localStorage.setItem('userName',data.user.name);
    saveUserData();
    setLoading(false);
    toast.success(`WELCOM  ${userName}  your are login` ,{className:'bg-second text-light'})
    getuserName()
  navigate('/home')
    
  }
}

  let validationSchema =Yup.object({
  email:Yup.string().required('email is required').email().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'email invalid EX: nnn50@gamil.com'),
  password:Yup.string().required('password is required').matches(/^[a-zA-Z0-9]{1,10}$/,'EX:aA1234'),
  
  })
    
let formik =useFormik({
  initialValues:{
    email:'',
    password:'',
  },validationSchema
  ,onSubmit:sendDatalogin
})



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
    <title>Login</title>
  </Helmet>
  <form onSubmit={formik.handleSubmit} >
    
    <div className="container w-75  mt-3 br-second">
    <h3 className="text-main">Register now</h3>
    {errormessage?<div className='alert alert-danger mt-2'>{errormessage}</div>:null}

 
    <label htmlFor="email" >Email:</label>
    <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="email" name="email" className="form-control mb-2 " />
    {formik.errors.email&&formik.touched.email?     <div className='alert alert-danger mt-2'>{formik.errors.email}</div>:null}

    <label htmlFor="password" >password:</label>
    <div className="d-flex password position-relative">
    <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}   type="password" id="password" name="password" className=" pass form-control mb-2 "/>   
    <span > <i onClick={showHidepassword}  className="fa-regular fa-eye text-main " ></i> </span>
    </div>  {formik.errors.password&&formik.touched.password?     <div className='alert alert-danger mt-2'>{formik.errors.password}</div>:null}
   
    {loading? <button disabled={!(formik.dirty&&formik.isValid) } type='button' className='btn btn-main mt-2 mb-2 '> <i className='fas fa-spinner fa-spin' ></i></button>
:<button disabled={!(formik.dirty&&formik.isValid) } type='submit' className='btn btn-main mt-2 mb-2 '>Login</button>}
    
    </div>
  </form>
  
  </>
}
