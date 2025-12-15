import axios from "axios"
import { useContext } from "react"
import { createContext, useState } from "react"
import {counterObjProivder}  from "./CounterContext"
import { useEffect } from "react"

export const cartContext = createContext()
function CartContext({children}) {

 const{x , y}= useContext(counterObjProivder)
//  console.log(x)
// const [message, setMessage]=useState()
const [product, setProduct]=useState(null)
const [numOfCartItems, setNumOfCartItems]=useState()
const [totalCartPrice, setTotalCartPrice]=useState()
// console.log(numOfCartItems, "test")
// console.log(message, "test")
// console.log(totalCartPrice, "test")



 async function updateProductQuantity(id, quantity){
  // https://ecommerce.routemisr.com/api/v1/cart/

  // Ensure quantity is a number (not a string)
  // const count = Number(quantity);
  // if (isNaN(count) || count < 1) {
  //   console.error("Invalid quantity:", quantity);
  //   return false;
  // }

const res =await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,
  {
    "count": quantity
},
  {headers:{token:localStorage.getItem("token")}}

).then((res)=>{
  // console.log(res , "good")
  // console.log("ana el res");
  
  setNumOfCartItems(res.data.numOfCartItems)
  setTotalCartPrice(res.data.data.totalCartPrice)
  setProduct(res.data.data.products)
  return true
}).catch((err)=>{
  console.log(err , "bad")
  // console.error("Error response:", err.response?.data);
  // Refresh cart data even on error to get latest state
  // getLoginUserData();
  return false
}


)
return res

}




async function removeSpacificItem(id){
 
  // console.log("click on remove item")
await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,
      {headers: {token:x}}
    ).then((res) =>{
      // console.log(res , "good")
      // setProduct(res.data.data.data.products)

      const newProduct =structuredClone(product );
      // console.log(newProduct , "this come from newProduct")

      const filteredProduct = newProduct.filter((item)=> item._id !== id)
      // console.log(filteredProduct , "this come from filteredProduct")
      setProduct(filteredProduct)
      // getLoginUserData()
    }).catch((err) =>{
      console.log(err , "bad")
    })


}


  async function addProductToCart(productId) {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers: { token: x } }
      )
   
      // setMessage(res.message)
      // setNumOfCartItems(res.numOfCartItems)
      // setTotalCartPrice(res.data.data.totalCartPrice)
      // console.log(res.data , "test")
      // console.log(res.data.message , "message add")

      // Refresh cart data to update numOfCartItems in NavBar
      getLoginUserData()

      return true
    } catch (err) {
      console.log("Error adding to cart:", err)
      return false
    }
  }

  function getLoginUserData(){
    axios.get("https://ecommerce.routemisr.com/api/v1/cart" ,{headers:{
      token:x

    }})
 .then((res)=>{
// console.log(res.data , "the func get")



setNumOfCartItems(res.data.numOfCartItems),
setTotalCartPrice(res.data.data.totalCartPrice)
setProduct(res.data.data.products)

 })
 .catch((err)=>{console.log(err , "the func get Bad")})
  }

useEffect(()=>{
  
  if(x){
    getLoginUserData()
  }
  
},[x])

  return (
    <div>
      <cartContext.Provider value={{addProductToCart ,
 
   
      numOfCartItems,
      totalCartPrice,
      product,
      removeSpacificItem,
      updateProductQuantity
     
      }}>
        {children}
      </cartContext.Provider>
      
    </div>
  )
}

export default CartContext
