import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Cartcontext } from "../Context/CartContext";
import { Navigate } from "react-router-dom";

export default function CheckOut() {
 let {onlinePayment,cartID} =useContext(Cartcontext)
const[loading,setLoading]=useState(false)
    async function handlsubmit(values){
      setLoading(true)
        let response =await onlinePayment(cartID,values)
   
        if(response?.data?.status === "success"){
          window.location.href = response.data.session.url
          setLoading(false)
        }}

    let formik = useFormik({
        initialValues:{
            details:'',
            phone:'',
            
        },
        onSubmit:handlsubmit
    })
  return <>
    <Helmet>
  <meta charSet="utf-8" />
    <title>   check out</title>
  </Helmet>
  <div className="container py-5 col-md-8 mx-auto shadow pt-4 mt-3 rounded-2">
    <form onSubmit={formik.handleSubmit} >

    <label className="text-main" htmlFor="details">Details</label>
    <input value={formik.values.details} onChange={formik.handleChange} type="text" name="details" id="details" className="form-control mb-1 text-main py-1" placeholder="details..."/>
   
    <label className="text-main" htmlFor="phone">phone</label>
    <input value={formik.values.phone} onChange={formik.handleChange} type="tel" name="phone" id="phone" className="form-control mb-1 text-main py-1" placeholder="phone..."/>
   
    <label className="text-main" htmlFor="city">City</label>
    <input value={formik.values.city} onChange={formik.handleChange} type="text" name="city" id="city" className="form-control mb-1 text-main py-1" placeholder="City..."/>
   {loading? <button type="button" className="btn btn-sm btn-main px-5"><i className="fas fa-spinner fa-spin text-second"></i></button> :  
   
   <button type="submit" className="btn btn-sm btn-main px-3 mb-2 mt-2 ">Pay</button>
  }
   </form>
  </div>  
  </>
}
