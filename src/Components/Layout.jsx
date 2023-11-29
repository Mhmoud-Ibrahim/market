import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
export default function Layout() {

  return<>
 <Navbar/>
 <div className="pt-5">
  <Outlet></Outlet>

 </div>
  <Footer/>
  </>
}
