
import axios from "axios";
import { useEffect, useState } from "react";
import Aos from "aos"
import "aos/dist/aos.css"
import { useParams } from "react-router-dom";

import Slider from "react-slick";

export default function SubCategories() {
  const settings ={
    dots:true,
    Infinity:true,
    speed:500,
    slidesToShow:1,
    slideToScroll:3,
    autoplay:true
    }
  let params = useParams();

  const[subcategories,setsubcategories]=useState(null );
  async function getsubcategories(id){
      let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`)
      setsubcategories(data.data);
     console.log(data);
    }
  useEffect(()=>{
    getsubcategories(params.id);
    Aos.init({duration:1000});
  },[])

 

  return <>
   <div className="container py-2 mt-1">
     <div className="row  py-2 bg-second">
    <div className="col-md-4 p-4">
      <Slider {...settings}>
    {subcategories?.images.map((img,index)=> <img height={290} className="img-fluie rounded-2 " key={index} src={img} /> )}
      </Slider>
      </div>
      <h6>sorry data is deleted temparory</h6>
      <div className="col-md-8 py-5">
     <div className="content mt-4 m-lg-5 ">
  <h3 className='text-theird mb-0 mt-2 fs-2'>{subcategories?.title.split(' ').slice(0,2).join(" ")}</h3>
   <p className='text-dark mb-0'  >{subcategories?.description.split(' ').slice(0,3).join(" ")}</p>
      <i className='fas fa-star text-warning' > 
       <span className='text-secondary rating  ' >{subcategories?.ratingsAverage}</span></i>
  <div> 
   
   </div>
   </div>
      </div>

    </div>
 

   
  
  </div>
  
  
  
  
  </>
}
