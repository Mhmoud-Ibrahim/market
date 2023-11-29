

import './index.css'
import Home from './Components/Home'
import Login from './Components/Login'
import Cart from './Components/Cart'
import Register from './Components/Register'
import Categories from './Components/Categories'
import Brands from './Components/Brands'
import Notfound from './Components/Notfound'
import Products from './Components/Products'
import ProductDetails from './Components/ProductDetails'
import Layout from './Components/Layout'
import { RouterProvider, createHashRouter } from 'react-router-dom';
import CartContextProvider from './Context/CartContext'
import  { Toaster } from 'react-hot-toast'
import CheckOut from './Components/CheckOut'
import { Offline} from "react-detect-offline"; 
import ProtectedRoute from './Components/ProtectedRoute'
import SubCategories from './Components/SubCategories'


function App() {
 
  let routers=createHashRouter([
    {path:'',element:<Layout/>,children:[
      {index:true,element: <ProtectedRoute><Home/></ProtectedRoute> },
      {path:'home',element:<Home/>},
      {path:'products/:id?',element:<ProtectedRoute><Products/></ProtectedRoute> },
      {path:'productdetails/:id?',element:<ProductDetails/>},
      {path:'categories/:id?',element:<ProtectedRoute><Categories/></ProtectedRoute> },
      {path:'SubCategories/:id?',element:<ProtectedRoute><SubCategories/></ProtectedRoute> },
      {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute> },
      {path:'checkout',element:<ProtectedRoute><CheckOut/></ProtectedRoute> },
      {path:'cart',element: <ProtectedRoute><Cart/></ProtectedRoute> },
      {path:'login',element: <Login/>},
      {path:'register',element:<Register/>},
     {path:'*',element:<Notfound/>}
    ]}
  ])

  return<CartContextProvider>
    <Offline>  <div className='network text-main fw-bold '>
      <i className='fas fa-wifi mx-2  text-second shadow-sm' ></i>
      You are ofline (surprise!)  </div> </Offline>
    <Toaster/>
    <RouterProvider router={routers} ></RouterProvider>
  </CartContextProvider>

  
}

export default App
