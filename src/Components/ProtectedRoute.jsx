/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom"
export default function ProtectedRoute(props) {
  
  if(localStorage.getItem('userToken') == null ){
    return <Navigate to={'/'}/>
  }else{
    return props.children;
  }
 
}
