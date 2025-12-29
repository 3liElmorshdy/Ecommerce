  import axios from "axios"
  import { useContext } from "react"
  import { createContext, useState } from "react"
  import {counterObjProivder}  from "./CounterContext"
  import { useEffect } from "react"
  import { toast } from "react-toastify"

  export const cartContext = createContext()
  function CartContext({children}) {

  const{x , y}= useContext(counterObjProivder)
  //  console.log(x)
  // const [message, setMessage]=useState()
  const [product, setProduct]=useState(null)
  // const [numOfCartItems, setNumOfCartItems]=useState()
  // const [totalCartPrice, setTotalCartPrice]=useState()
  // console.log(numOfCartItems, "test")
  // console.log(message, "test")
  // console.log(totalCartPrice, "test")
  const [updatingId, setUpdatingId] = useState(null);


  const[wishlist, setWishsLiat] = useState([])
  const[NumberOfWishList, setNumberOfWhishListItems] = useState(0)
  // Fetch wishlist count from API to persist across refresh
  async function GetLoggedUserWishlist() {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers: { token: x } });
      // console.log(res.data.count)
    
      setNumberOfWhishListItems(res.data.count);
      setWishsLiat(res.data.data)
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  }
  const numOfCartItems = product?.length || 0;


  const [cartId , setCartId] = useState();



  async function addProductToWhishList(id) {
    // Local pre-checks
    if (!id) {
      toast.error("Failed to add product to wishlist", { position: "top-left" });
      return null;
    }

    const exists = wishlist.some((item) => {
      const product = item.data?.data || item;
      const productId = product?._id || product?.id;
      return productId === id;
    });

    if (exists) {
      toast.error("Product already in wishlist", { position: "top-left" });
      return null;
    }

    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: id },
        { headers: { token: x } }
      );
      await GetLoggedUserWishlist();
      return res;
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      toast.error("Failed to add product to wishlist", { position: "top-left" });
      return null;
    }
  }


  async function removeProductFromWishlist(id) {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        { headers: { token: x } }
      );

      await GetLoggedUserWishlist();

      toast.success(
        res.data.message ,
        { position: "top-left"

        }
      );
    } catch (err) {
      toast.error(
        "Failed to remove product",
        { position: "top-left" }
      );
    }
  }

  async function removeAllItem(){
    return await axios.delete("https://ecommerce.routemisr.com/api/v1/cart" , {headers:{token:x}})
  }

  function calculateTotalCartPrice(product) {
    // return product?.reduce((total, item) => total + item.price * item.count, 0);

    if (!product) return 0;

    let total = 0;

    if (!product) {
      return 0;
    }

    for (let i= 0; i< product.length; i++) {
      total= total+ (product[i].price * product[i].count)
    }

    return total;
  }

  const totalCartPrice = calculateTotalCartPrice(product);



  async function updateProductQuantity(id, quantity) {
    // console.log(quantity);
    // console.log(id);
      setUpdatingId(id);
    try {
      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: quantity },
        { headers: { token: x } }
      );

      console.log(res);
      

      // setNumOfCartItems(res.data.numOfCartItems);
      // setTotalCartPrice(res.data.data.totalCartPrice);

      calculateTotalCartPrice(res.data.data.products)
      setProduct(res.data.data.products);
      return true;
    } catch (err) {
      console.error("Error updating quantity:", err);
      return false;
    } finally {
      setUpdatingId(null);
    }
  }






  // async function removeSpacificItem(id) {
  //   try {
  //     const res = await axios.delete(
  //       `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
  //       { headers: { token: x } }
  //     );

  //     setProduct(res.data.data.products);
  //     setNumOfCartItems(res.data.numOfCartItems);
  //     setTotalCartPrice(res.data.data.totalCartPrice);
  //   } catch (err) {
  //     console.error("Error removing item:", err);
  //   }
  // }






  async function removeSpacificItem(id) {
    try {
      // console.log(id);
      
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { headers: { token: x } } 
      );
      // console.log(res)
  // console.log(id);
  // console.log(res.data.data.products);

  // setNumOfCartItems(res.data.numOfCartItems),
  calculateTotalCartPrice(res.data.data.products)
  setProduct(res.data.data.products)



      // console.log(res);
    // const copyOfData = structuredClone(res.data.data.products)
    // console.log(copyOfData);
    // const filteredData = copyOfData.filter((item) => item._id !== id)
    // console.log(filteredData);
    //  setProduct(filteredData)
      // setNumOfCartItems(res.data.numOfCartItems);
      // setTotalCartPrice(res.data.data.totalCartPrice);
  
      
      // setNumOfCartItems(res.data.numOfCartItems);
      // setTotalCartPrice(res.data.data.totalCartPrice);
      return res
      
    } catch (err) {
      console.error("Error removing item:", err);
    }

  
  }





    async function addProductToCart(productId) {
      // Local pre-checks
      if (!productId) {
        toast.error("Failed to add product to cart", { position: "top-left" });
        return false;
      }

      const exists = Array.isArray(product) && product.some((item) => {

        if (item?.product && item.product?._id) {
          return item.product._id === productId;
        }

        return item?._id === productId || item?.id === productId;
      });

      if (exists) {
        toast.error("Product already in cart", { position: "top-left" });
        return false;
      }
    
      try {
        const res = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/cart",
          { productId },
          { headers: { token: x } }
        );
        setCartId(res.data.cartId);
      
        getLoginUserData();
        return true;
      } catch (err) {
        

        return false;
      }
    }
























    function getLoginUserData(){
      axios.get("https://ecommerce.routemisr.com/api/v1/cart" ,{headers:{
        token:x

      }})
  .then((res)=>{
  // console.log(res.data , "the func get")


        setCartId(res.data.data._id || res.data.cartId);
        // console.log(cartId , "this is ht e tesgsrtwniwjeo");
        


  // setNumOfCartItems(res.data.numOfCartItems),
  // setTotalCartPrice(res.data.data.totalCartPrice)
  calculateTotalCartPrice(res.data.data.products)
  const products = res.data.data.products || []
  setProduct(products)

  })
  .catch((err)=>{console.log(err , "the func get Bad")})
    }

  useEffect(()=>{
    
    if(x){
      getLoginUserData()
      GetLoggedUserWishlist()
    }
    
  },[x])

    return (
      <div>
        <cartContext.Provider value={{addProductToCart ,
  
    
        numOfCartItems,
        // calculateTotalCartPrice,
        setProduct,
        product,
        totalCartPrice,
        removeSpacificItem,
        updateProductQuantity,
        updatingId , setUpdatingId, removeAllItem,
        cartId, addProductToWhishList,
        NumberOfWishList, wishlist,
          removeProductFromWishlist
        }}>
          {children}
        </cartContext.Provider>
        
      </div>
    )
  }

  export default CartContext
