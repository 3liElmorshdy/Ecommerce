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
import { Loader } from 'lucide-react'
// import React, { useEffect, useRef, useState } from 'react'
import HomeSlider from '../HomeSlider/HomeSlider'
import { useQuery } from '@tanstack/react-query'

function Product() {
  // const [allProduct, setAllProduct] = useState([])  
  // const flag = useRef(false)

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



  function getQueryProduct (){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const {data, isLoading , isError, error , isFetching} =  useQuery({
    queryKey:["productDetils"] ,
    queryFn: getQueryProduct
  })
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


  return (
    <div className="container mx-auto">
<div className="my-2 mb-7"><HomeSlider /></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-2 gap-1.5">
        {allProduct.map(product => (
          <div key={product._id} className= " bg-green-400 rounded-lg p-4">
            <img src={product.imageCover} alt={product.title} className="w-full rounded" />
            <h3 className="font-semibold mt-2">{product.title}</h3>
            <h2 className="text-sm text-gray-700">{product.category?.name}</h2>
            <div className="flex justify-between items-center mt-2">
              <p>Rating: {product.ratingsAverage}</p>
              <p>Price: ${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Product
