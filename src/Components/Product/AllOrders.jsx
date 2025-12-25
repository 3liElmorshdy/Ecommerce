// import axios from 'axios'
// import React, { useEffect, useRef, useState } from 'react'

// function Product() {
//   const [allProduct, setAllProduct] = useState(null)
//   const flage= useRef(false)
//   const getAllProduct = async()=>{
//    axios.get("https://ecommerce.routemisr.com/api/v1/products")

//    .then((response) => {
//       console.log(response.data.data)
//       setAllProduct(response.data.data)
//       console.log("tse" , allProduct)
      
//     }).catch((err) => {
//       console.log(err)
      
//     })
   

//   }
//   useEffect(() => {
//     if(!flage.current){
//    getAllProduct()
//   flage.current = true
//   }
  

//   }, [])

//     return <div>{allProduct ? "Data loaded" : "Loading..."}</div>;

  
//   // return (
//   //   <div className='container mx-auto'>
//   //     <div className="grid md:grid-cols-4 lg:grid-cols-6 md:gap-3 gap-3 ">


//   //       <div className='bg-amber-500 rounded-lg'>


//   //         <img src="imageCover" alt="title" className='w-full' />
//   //         <h3>title</h3>
//   //         <h2>category.name</h2>
//   //         <div className='flex justify-between items-center'>
//   //           <p>rating average</p>
//   //           <p>price</p>
//   //         </div>
//   //       </div>



      
//   //     </div>
//   //   </div>
//   // )
// }

// export default Product

import axios from 'axios'
import { Loader, Heart } from 'lucide-react'
// import React, { useEffect, useRef, useState } from 'react'
import HomeSlider from '../HomeSlider/HomeSlider'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { cartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
// import { useEffect } from "react";
import { useState } from 'react';


function AllOrders() {
 const { addProductToCart   , addProductToWhishList} = useContext(cartContext);
 const nav = useNavigate()
//  product
  // const [allProduct, setAllProduct] = useState([])  
  // const flag = useRef(false)

  

  const [page, setPage] = useState(1);

  
  // const getAllProduct = async () => {
  //   try {
  //     const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  //     setAllProduct(res.data.data)
  //     console.log(res.data.data)
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  // useEffect(() => {
  //   if (!flag.current) {
  //     getAllProduct()
  //     flag.current = true
  //   }
  // }, [])


// useEffect(() => {
//   const elements = document.querySelectorAll("*");

//   elements.forEach(el => {
//     if (el.scrollWidth > el.clientWidth) {
//       console.log("سبب السكرول:", el);
//     }
//   });
// }, []);

 async function handelWishlist(id) {
   const res = await addProductToWhishList(id);
   if(res){
    toast.success(res.data?.message || "Added to wishlist", {
      position: "top-left"
    });   }
 }



async function handelProductCart(productId){
  console.log(productId)
 const res = await addProductToCart(productId)
 if(res) {
  console.log("tamam")
    toast.success("product Add to Cart Successfuly",{
      position:"top-left",
      // autoClose:5000,
      // hideProgressBar:true,
      // closeOnClick:true,
      // pauseOnHover:true,
      // draggable:true,
      // progress:undefined,
      // theme:"colored",
    })
  
 }
 else{
  console.log("someThing is Not Correct")
 }
}

  // function getQueryProduct (){
  //   return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  // }


  function handelNext(number){
    number == 5 ? setPage(1) : setPage(p => p + 1)
  }
  function getQueryProduct({ queryKey }) {
  const [_key, page] = queryKey;

  return axios.get(
    `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=12`
  );
}

  // const {data, isLoading , isError, error } =  useQuery({
  //   queryKey:["productDetils"] ,
  //   queryFn: getQueryProduct
  // })

  const { data, isLoading, isError, error } = useQuery({
  queryKey: ["productDetils", page],
  queryFn: getQueryProduct,
  keepPreviousData: true
});

// console.log("this is the teest of react query", data)
// console.log("this is the teest of react query", isError)
// console.log("this is the teest of react query", isFetching)
// console.log("this is the teest of react query", isError)
// console.log("this is the teest of react query", error)
if(isLoading){
return  <div className='flex justify-center items-center w-full h-screen ' ><Loader width={72}height={72}/></div>
}


const allProduct = data?.data.data

if(isError){
  return <h2  className='text-red-600 font-bold'>error occur {error.message}</h2>
}

// function getId(id){
//   console.log(id);
  
// }

  return (
    <div className="container mx-auto  ">
<div className="my-2 mb-7"><HomeSlider /></div>
      <div  className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-1 gap-1 scroll-smooth ">
        {allProduct?.map(product => (
          <div key={product._id} className="group relative bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
          
            <button
              className="absolute top-2 left-2 p-2 bg-white text-gray-600 hover:text-red-500 rounded-full shadow-md z-10 transition-colors"
              title="Add to wishlist"

              onClick={()=>handelWishlist(product._id)}
            >
              <Heart className="w-5 h-5" />
            </button>
            
            <div  className="cursor-pointer " onClick={() => nav(`/productDetails/${product._id}`)}>
              <img src={product.imageCover} alt={product.title} className="w-full rounded" />
              <h3 className="font-semibold mt-2">{product.title}</h3>
              <h2 className="text-sm text-gray-700">{product.category?.name}</h2>
              <div className="flex justify-between items-center mt-2">
                <p>Rating: {product.ratingsAverage}</p>
                <p>Price: {product.price} EGP</p>
                {/* <p>id :{product._id}</p> */}
              </div>
            </div>
            <button
              className="absolute   top-0 right-0 mt-4 mr-4  bg-blue-600 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-700"
              onClick={() => {
                // e.stopPropagation();
                handelProductCart(product._id);
                // getId(product._id)
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>


      <div className="flex justify-center gap-4 my-6 items-center">
  <button
    disabled={page === 1}
    onClick={() => setPage(p => p - 1)}
    className="px-4 py-2 bg-gray-300 rounded"
  >
    Prev
  </button>

  <span className="font-bold">Page {page}</span>

  <button
  // disabled={page === 5 }

    onClick={() => handelNext(page)}
    className="px-4 py-2 bg-blue-600 text-white rounded"
  >
    Next
  </button>
</div>

    </div>
  )
}

export default AllOrders
