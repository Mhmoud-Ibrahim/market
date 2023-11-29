import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export  let Cartcontext=createContext();
 export default function CartContextProvider(props)
 {
   const [cartID,setCartID]=useState(null);
   const [numOfCartItems,setNumOfCartItems]=useState(0);
   const[userData,setUserData]= useState(null);
   const[userName,setUserName]=useState(null);
  

   async function getCart(){
      let response = await getLogedUser();
      if(response?.data?.status === 'success'){
         setNumOfCartItems(response.data.numOfCartItems);
         setCartID(response.data.data._id)
      }
   }
  
  

  
    function saveUserData(){
      let encodedToken = localStorage.getItem('userToken');
      let decodedToken = jwtDecode(encodedToken);
      setUserData(decodedToken);
     
    }
    function logOut(){
      localStorage.removeItem('userToken');
      localStorage.removeItem('userNames');
      setUserData(null);
      toast('we hope to see you soon',{className:'bg-second text-light'})
    }

    
    
   function stelllogin(){
  if(localStorage.getItem('userToken') !== null){
   saveUserData();
  }
   }
  
     function getuserName(){
    let userN = localStorage.getItem('userName');
    setUserName(userN)
     }
    
   useEffect(()=>{
      getCart();
      stelllogin();
      getuserName()
   },[])

    let userToken = localStorage.getItem('userToken');
    let headers = {token:userToken}

   function addToCart(productId){
   return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`,
    {productId:productId},
    {headers})
    .then((response)=>response)
    .catch((error)=>error)
   }

   function getLogedUser(){
   return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`,{headers})
    .then((response)=>response)
    .catch((error)=>error)
   }
   function removeItem(productId){
      return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
      {headers})
      .then((response)=>response)
      .catch((error)=>error)
      }

   function updateProductCount(productId,count){
      return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
      {count:count},
       {headers})
       .then((response)=>response)
       .catch((error)=>error)
      }
      
   function onlinePayment(cartId,shippingAdress){
      return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
      {shippingAdress:shippingAdress},
       {headers})
       .then((response)=>response)
       .catch((error)=>error)
      }

   function clearCart(){
      return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart`,
       {headers})
       .then((response)=>response)
       .catch((error)=>error)
      }
    
    return<Cartcontext.Provider 
    value={{numOfCartItems,cartID,userData,getuserName,userName,setUserData,saveUserData,logOut,setNumOfCartItems,addToCart,getLogedUser,removeItem,updateProductCount,clearCart,onlinePayment}} >
       {props.children}
    </Cartcontext.Provider>
 }