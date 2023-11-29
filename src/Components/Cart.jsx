
import { useContext, useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { Cartcontext } from "../Context/CartContext"
import toast from "react-hot-toast"
import Aos from "aos"
import "aos/dist/aos.css"
import Loading from "./Loading"
import { Link } from "react-router-dom"
export default function Cart() {
  
let {getLogedUser,removeItem,updateProductCount,clearCart} =useContext(Cartcontext)
const[cartDetails,setCartDetails]=useState(null)
const [loading,setLoading]=useState(true);

async function getCart(){
 let response = await getLogedUser();
 setCartDetails(response.data.data);
 setLoading(false)
}
 
 async function deleteItem(productId){
  let response = await removeItem(productId);
  setCartDetails(response.data.data);
  toast.success('iteme is removed',{className:'bg-second text-light'})
}
 async function updateproductquantity(productId, count){
  let response = await updateProductCount(productId,count);
  setCartDetails(response.data.data);
  toast.success('iteme is updated ',{className:'bg-second text-light'})
}
 async function clearproductcart(){
  let response = await clearCart();
  setCartDetails(response.data.data);
  toast.success('iteme is cleared',{className:'bg-second text-light'})
}

useEffect(()=>{
  getCart();
  Aos.init({duration:1000});
},[])
  return <>  <Helmet>
    
    <title>   Cart</title>
  </Helmet>
  {loading? <Loading/>:
  <>   {cartDetails !==null? <div data-aos="fade-in"  className="bg-light rounded-2 shadow-sm m-auto d-flex justify-content-between  py-1 w-75 my-4 p-4">
    <div>
        <h3 className="text-second fw-bold">Shop Cart:</h3>
  <h6 className="text-main text-break ">Total Cart Price :{cartDetails?.totalCartPrice}</h6>
  <button className="btn m-0 p-0 text-danger " onClick={()=>clearproductcart()}> <i   className="fa-regular curser-pointer fa-trash-can text-danger" ></i>clear All Cart</button>
  
    </div>

  <div>
  <button  className="btn btn-main btn-sm m-2 mt-4 ">
  <Link className="text-main btn btn-sm py-0" to={'/checkout'} >Check Out</Link>
</button>
  </div>
  </div>:null}
  {cartDetails?.products.map((product)=><div key={product.product._id} data-aos="fade-right"  className="row bg-light w-75 mt-0 py-0 mb-2 rounded-2 shadow m-auto p-0 align-items-center ">
  

  <div className="col-md-2">
    <img className='w-100 img-fluid rounded-2 '  loading="lazy" src={product?.product?.imageCover} alt="" />
  </div>
  <div className="col-md-10 d-flex justify-content-between">
      <div > 
          <h3 className='text-main fw-bold fs-5 mb-0 mt-2'>{product?.product?.title.split(' ').slice(0,2).join(" ")}</h3>
          <span className=' price  py-1 text-second '> Price: <b className="text-success" > {product?.price}</b> EGP</span><br />
      <button className="btn m-0 p-0 text-danger " onClick={()=>deleteItem(product.product._id)}> <i   className="fa-regular curser-pointer fa-trash-can text-danger" ></i> Remove</button>
   
      </div>
      <div>
        <button className="btn  btn-sm border-main " onClick={()=>updateproductquantity(product.product._id,product.count+1)}  >+</button>
        <span className="text-main m-2">{product.count}</span>
        <button className="btn btn-sm  border-main" onClick={()=>updateproductquantity(product.product._id,product.count-1)} >-</button>
      </div>
  </div>
  </div>  )}
 

  </>
 }
  


  </>
}
