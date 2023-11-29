import { Link} from "react-router-dom";
import Aos from "aos"
import "aos/dist/aos.css"
import Typewriter from "./Typewriter";
import { useContext, useEffect} from "react";
import { Cartcontext } from "../Context/CartContext";

export default function Navbar() {
  let {userData,logOut,numOfCartItems,userName}=useContext(Cartcontext);
 
  useEffect(()=>{
    Aos.init({duration:1000});
   
  },[])

  return <>
  <nav  className="navbar navbar-expand-lg fixed-top  bg-main text-second w-100 m-auto  p-0 shadow-sm py-0">
  <div className="container mx-auto">
    <Link className="navbar-brand" to="/">
    <h6 className="text-second " >
    <div   className="text-center position-absolute  ">
       <h6 className="text-center typewriter text-second   ">
       M<Typewriter text="arket." delay={500} />
      </h6></div>
    </h6>
    </Link>
    <button className="navbar-toggler text-main bg-second btn btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul  className="navbar-nav m-auto mb-1 mb-lg-0">
      
        <li  data-aos="fade-right"   className=" nav-item py-0 mb-0">
          <Link className="nav-link  " to="/">Home </Link>
        </li>
      
        <li  data-aos="fade-down" className="nav-item py-0 mb-0">
          <Link className="nav-link " to="Products">Products</Link>
        </li>
        <li data-aos="fade-down" className="nav-item  py-0 mb-0">
          <Link className="nav-link " to="Categories">Categories</Link>
        </li>
        <li data-aos="fade-down" className="nav-item py-0 mb-0">
          <Link className="nav-link " to="brands">Brands</Link>
        </li>
      </ul>

      
      <ul className="navbar-nav mt-md-0  m-auto mb-2 mb-lg-0">
     <div className="d-flex   ">
     {userData!== null?  <>
      <li data-aos="fade-right" className="nav-item">
          <Link className="nav-link " to="cart">Cart</Link>
      </li>
        
     <li data-aos="fade-down"   className="nav-item position-relative">
          <Link className="nav-link " to="Cart">
            <i className="fas fa-shopping-cart fa-lg text-second " ></i>
          <span className="badge text-thierd bg-success p-1  position-absolute top-0 end-0" > {numOfCartItems}</span>
          </Link>
        </li>

        <li data-aos="fade-right" className="nav-item">
         <button className="nav-link py-0 btn btn-sm mt-2 btn-main m-2 " onClick={logOut}  >log out</button>
       </li>
        <div data-aos="fade-up" className="person  mt-1">
          <i className="fas fa-user text-thierd" ></i>
          <span>{userName}</span>
        </div>



       </>
        :<>   
        <li      data-aos="fade-up" className="nav-item py-1">
          <Link className="nav-link py-0 btn btn-sm mt-1 btn-main m-2" to="register">Register</Link>
        </li>
        <li data-aos="fade-left" className="nav-item">
          <Link className="nav-link py-0 btn btn-sm mt-2 btn-main m-2 " to="Login">Login</Link>
        </li>
       
       
          </> }
       
       </div>
     


     </ul>
     
     
     
    </div>
  </div>
</nav>
  
  
  
  </>
}
