

import { Link } from "react-router-dom";
import Typewriter from "./Typewriter";
import ecomercy from '../assets/img/project-picture/E-comercy2.jpg'
import weather from '../assets/img/project-picture/weather.jpg'
import Trending from '../assets/img/project-picture/Trending.jpg'
import Aos from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react";

export default function Projects() {
  useEffect(()=>{
    Aos.init({duration:1000});
   
  },[])
  return <>
  
  <div className="container  px-0 m-auto  mt-2 py-4 ">

  {/* ecomercy */}
    <div data-aos="fade-up-left" className="row bg-light shadow-sm  justify-content-around p-3 mb-3 rounded-2 ">
    <div  className="card col-md-6 " data-aos="fade-up-right">
    <div className="cardborder"></div>
    <div className="content">
      <div className="logo">
        <div className="logo1">
        <i className="fa-solid fa-cart-shopping fa-1x text-second"></i>
       
        </div>
        <div className="logo2">
        <h5 className='text-second'>comercy</h5>
        </div>
        <span className="trail"></span>
      </div>
     
      <span className="logo-bottom-text text-center">Mahmoud developer </span>
    </div>
    <span className="bottom-text">
      <Link className="btn btn-sm text-main bg-second " to='https://mhmoud-ibrahim.github.io/E-comercy/' >LIVE</Link>
        </span>
    </div>
    <div className="col-md-6 ">
    <img data-aos="fade-up-left" className="w-100  rounded-2 mt-2" loading="lazy" src={ecomercy} alt="ecomercy" />
    <div className="text-center">
       <h6 className="text-center typewriter text-main   m-auto">
     E-<Typewriter text="comercy website that can shopping and sale products and login & register and so on" delay={100} />
      </h6></div>
  </div>
    </div>
  {/* ecomercy */}
  {/* trending */}
    <div data-aos="fade-up-left" className="row bg-light shadow-sm  justify-content-around p-3 mb-3 rounded-2 ">
    <div data-aos="fade-up-right" className="card col-md-6 ">
    <div className="cardborder"></div>
    <div className="content">
      <div className="logo">
        <div className="logo1">
        <i className="fa-solid fa-tv fa-1x text-second"></i>
        </div>
        <div className="logo2">
        <h5 className='text-second'>Trending</h5>
        </div>
        <span className="trail"></span>
      </div>
     
      <span className="logo-bottom-text text-center">Mahmoud developer </span>
    </div>
    <span className="bottom-text">
      <Link className="btn btn-sm text-main bg-second " to='https://mhmoud-ibrahim.github.io/Trending/' >LIVE</Link>
        </span>
    </div>
    <div className="col-md-6 ">
    <img data-aos="fade-up-left" className="w-100  rounded-2 mt-2" loading="lazy" src={Trending} alt="Trending" />
    <div className="text-center">
       <h6 className="text-center typewriter text-main   m-auto">
     T<Typewriter text="rending website show moveis that be trending in last month" delay={100} />
      </h6></div>
  </div>
    </div>
 {/* trending */}

{/* weather */}
    
    <div  data-aos="fade-up-left" className="row   bg-light shadow-sm w-100 justify-content-around p-3 mb-3 rounded-2 ">
    <div data-aos="fade-up-right" className="card col-md-6 ">
    <div className="cardborder"></div>
    <div className="content">
      <div className="logo">
        <div className="logo1">
        <i className="fa-solid fa-cloud fa-1x text-second"></i>
        </div>
        <div className="logo2">
        <h5 className='text-second'>weather</h5>
        </div>
        <span className="trail"></span>
      </div>
     
      <span className="logo-bottom-text text-center">Mahmoud developer </span>
    </div>
    <span className="bottom-text">
      <Link className="btn btn-sm text-main bg-second " to='https://mhmoud-ibrahim.github.io/weather' >LIVE</Link>
        </span>
    </div>
   
    <div className="col-md-6 text-center  ">
    <img data-aos="fade-up-left" className="w-100  rounded-2 mt-2" loading="lazy" src={weather} alt="weather" />
    <div className="text-center">
       <h6 className="text-center typewriter text-main   m-auto">
      W<Typewriter text="eather website to search all over the world" delay={100} />
      </h6></div>
  </div>
    </div> 
{/* weather */}


    
  </div>
  
  </>
}
