

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Aos from "aos"
import "aos/dist/aos.css"
import Loading from "./Loading";
import { Helmet } from "react-helmet";
export default function Categories() {
  const [loading,setLoading]=useState(true);
    const[products,setProducts]=useState([]);
    async function getfeaturedproducts(){
      setLoading(true)
        let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/categoriesn`)
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
    <Link  to={`/SubCategories/${product._id}`} >
   <div data-aos="fade-right"   className="items  p-0 shadow border border-1 border-black rounded-1  ">
   <img height={150}  className='w-100 img-fluid ' loading="lazy" src={product?.image} alt="product" />
   <div className="details px-1 py-3 ">
  <h3 className='text-main mb-0 mt-2'>{product.name.split(' ').slice(0,2).join(" ")}</h3>
   </div>
</div>
</Link>
  </div>
) }</div>
  </div>
}
  </>
}

