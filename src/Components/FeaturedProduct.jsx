import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Aos from "aos"
import "aos/dist/aos.css"
import Loading from "./Loading";
import { Cartcontext } from "../Context/CartContext";
import toast from "react-hot-toast";

export default function FeaturedProduct() {
  let {addToCart,setNumOfCartItems} = useContext(Cartcontext)
  const [loading,setLoading]=useState(true)
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
  
        async function addproductToCart(productId){
        let response =await addToCart(productId);
        
        if(response?.data?.status == 'success'){
          setNumOfCartItems(response.data.numOfCartItems);
          toast.success(response.data.message,{className:'bg-second text-light'})
        }else{
          toast.error('Something went wrong',{className:'bg-red-500 text-white'})
        }
      }
  return <>
  {loading? <Loading/>:
   <div className="container mt-3 p-0 mt-0">
   
    <div className="row allProducts g-2"> 
    {products?.map((product)=>
  <div key={product._id} className="col-md-2 text-center" >
   <div data-aos="fade-right"   className="items cursor-pointer  p-0 shadow border border-1 border-black rounded-1  ">
    <Link to={`/ProductDetails/${product._id}`} >
   <img height={150}  className='w-100 img-fluid' loading="lazy" src={product?.imageCover} alt="product" />
   <div className="details px-1 py-3 ">
   <span className=' price p-2 py-1'> {product.price} EGP</span>
  <h3 className='text-main mb-0 mt-2'>{product.title.split(' ').slice(0,2).join(" ")}</h3>
   <p className='text-dark mb-0'  >{product.description.split(' ').slice(0,3).join(" ")}</p>
   <span className='quantity '>Quantity:{product.quantity}</span>
      <i className='fas fa-star text-warning' > 
       <span className='text-secondary rating ' >{product.ratingsAverage}</span></i>
   </div>
</Link>
  <div> 
    <button id='btnaddtocart' onClick={()=>addproductToCart(product._id)}  className='btn addtocart btn-sm mb-2 btn-main py-1 mt-1  '>add to cart</button>
  
   </div>
</div>
      
  </div>




) }</div>
   
  </div>
  }
  
  
  </>
}
