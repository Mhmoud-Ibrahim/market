import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Aos from "aos"
import "aos/dist/aos.css"
import { useParams } from "react-router-dom";

import Slider from "react-slick";
import { Cartcontext } from "../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  
const settings ={
dots:true,
Infinity:true,
speed:500,
slidesToShow:1,
slideToScroll:3,
autoplay:true
}
let params = useParams();
let {addToCart} = useContext(Cartcontext)
  const[productsDetails,setProductDetails]=useState(null );
  async function getproductDetails(id){
      let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      setProductDetails(data.data);
     console.log(data.data);
    }
   
    useEffect(()=>{
      getproductDetails(params.id);
      Aos.init({duration:1000});
    },[])

    async function addproductToCart(productId){
      let response =await addToCart(productId);
     
      if(response?.data?.status == 'success'){
        toast.success(response.data.message,{className:'bg-second text-light'})
      }else{
        toast.error('Something went wrong',{className:'bg-red-500 text-white'})
      }
    }
  return<>
  <div className="container py-2 mt-1">
     <div className="row  py-2 bg-second">
    <div className="col-md-4 p-4">
      <Slider {...settings}>
    {productsDetails?.images.map((img,index)=> <img height={290} className="img-fluie rounded-2 " key={index} src={img} /> )}
      </Slider>
      </div>
      <div className="col-md-8 py-5">
     <div className="content mt-4 m-lg-5 ">
  <h3 className='text-theird mb-0 mt-2 fs-2'>{productsDetails?.title.split(' ').slice(0,2).join(" ")}</h3>
   <p className='text-dark mb-0'  >{productsDetails?.description.split(' ').slice(0,3).join(" ")}</p>
   <span className='quantfs-5 '><b>Quantity:</b>{productsDetails?.quantity}</span><br />
   <span className=' price p-2 py-1'><b>Price</b> {productsDetails?.price} EGP</span>
      <i className='fas fa-star text-warning' > 
       <span className='text-secondary rating  ' >{productsDetails?.ratingsAverage}</span></i>
  <div> 
    <button id='btnaddtocart' onClick={()=>addproductToCart(productsDetails._id)}  className='btn addtocart btn-sm mb-2 btn-main py-1 px-4 mt-1 '>add to cart</button>
  
   </div>
   </div>
      </div>

    </div>
 

   
  
  </div>
  
  
  
  </>
}
