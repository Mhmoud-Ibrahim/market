import Aos from "aos"
import "aos/dist/aos.css"
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "./Loading";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Brands() {
    const [loading,setLoading]=useState(true);
    const[products,setProducts]=useState([]);
    async function getfeaturedproducts(){
      setLoading(true)
        let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
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
    <title>Categories</title>
  </Helmet>
  {loading? <Loading/>: 
   <div className="container mt-3 p-0 mt-0">
   
    <div className="row allProducts g-2"> 
    {products?.map((product,index)=>
  <div key={index} className="col-md-2 text-center" >
    <Link  >
   <div data-aos="fade-right"   className="items  p-0 shadow border border-1 border-black rounded-1  ">
   <img height={150}  className='w-100 img-fluid ' loading="lazy" src={product?.imageCover} alt="product" />
   <div className="details px-1 py-3 ">
  <h3 className='text-main mb-0 mt-5 fs-1 text-main'>{product?.title.split(' ').slice(0,2).join(" ")}</h3>
   </div>
</div>
</Link>
  </div>
) }</div>
  </div>
}
  
  
  
  </>
}
