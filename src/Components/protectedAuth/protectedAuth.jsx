import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedAuth({children}) {
  if(localStorage.getItem("token")!== null){
    return <Navigate to={"/home"}/>
  }
  return children
}

export default ProtectedAuth