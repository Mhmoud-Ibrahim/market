

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Aos from "aos"
import "aos/dist/aos.css"
import Loading from "./Loading";
import { Helmet } from "react-helmet";
export default function Products() {
  const [loading,setLoading]=useState(true);
    const[products,setProducts]=useState([]);
    async function getfeaturedproducts(){
      setLoading(true)
        let {data} =await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`)
        setProducts(data.data);
        setLoading(false)
      }
      useEffect(()=>{
        getfeaturedproducts();
        Aos.init({duration:1000});
      },[])
  
  return <>
   <Helmet>
  <meta charSet="utf-8" />
    <title>   Home</title>
  </Helmet>
  {loading? <Loading/>:
   <div className="container mt-3 p-0 mt-0">
    <div className="row allProducts g-2"> 
    {products?.map((product,index)=>
  <div key={index} className="col-md-2 text-center" >
    <Link to={`/ProductDetails/${product._id}`} >
   <div data-aos="fade-right"   className="items  p-0 shadow border border-1 border-black rounded-1  ">
   <img height={150}  className='w-100 img-fluid'  src={product?.imageCover} alt="product" />
   <div className="details px-1 py-3 ">
   <span className=' price p-2 py-1'> {product.price} EGP</span>
  <h3 className='text-main mb-0 mt-2'>{product.title.split(' ').slice(0,2).join(" ")}</h3>
   <p className='text-dark mb-0'  >{product.description.split(' ').slice(0,3).join(" ")}</p>
   <span className='quantity '>Quantity:{product.quantity}</span>
      <i className='fas fa-star text-warning' > 
       <span className='text-secondary rating ' >{product.ratingsAverage}</span></i>
  <div> <button id='btnaddtocart'  className='btn addtocart btn-sm mb-2 btn-main py-1 mt-1 '>add to cart</button>
  
   </div>

   
 
  
   </div>
</div>
</Link>
      
  </div>




) }</div>
   
  </div>
  }
  
  
  </>
}


