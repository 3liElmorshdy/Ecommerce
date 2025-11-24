import React, { createContext, useEffect, useState } from 'react'

export const counterObjProivder= createContext()
function CounterContext({children}) {

 const [token, setToken] = useState(null)

 useEffect(() => {
  const tkn = localStorage.getItem("token")
if(tkn !==null)
 

 {
setToken(tkn)
 }


}, [])
 
  return (
    <counterObjProivder.Provider value={{x:token , y :setToken}}>
      {children}
      </counterObjProivder.Provider>
  )
}

export default CounterContext