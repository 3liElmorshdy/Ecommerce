import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader, Heart } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { cartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

function ProductDetails() {
  const { id } = useParams();

const {addProductToCart, addProductToWhishList} =  useContext(cartContext)


async function handelProductCart(productId){
  if (!productId) {
    // toast.error("Failed to add product to cart", { position: "top-left" });
    return;
  }
  const res = await addProductToCart(productId)

  if(res){
   console.log(res)
   console.log("product added to cart")
   toast.success("product Add to Cart Successfuly",{
     position:"top-left",
   })
  }
  else{
  //  toast.error("Failed to add product to cart", { position: "top-left" })
  }
 }

async function handelWishlist(productId) {
  const res = await addProductToWhishList(productId);
  if (res) {
    toast.success(res.data?.message || "Added to wishlist");
  } 
}
  function getSpecificProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['specificProduct', id],
    queryFn: getSpecificProduct,
  });

  const productDetails = data?.data.data;
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (productDetails?.imageCover) {
      const imageCover = Array.isArray(productDetails.imageCover) 
        ? productDetails.imageCover[0] 
        : productDetails.imageCover;
      setMainImage(imageCover);
    }
  }, [productDetails]);
  

  if (isLoading) { return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }


  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen"> 
        <div className="text-red-600 text-center">
          <p className="text-lg font-semibold">Error loading product</p>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  // Ensure imageCover is treated as a single string, not an array
  const imageCover = Array.isArray(productDetails.imageCover) 
    ? productDetails.imageCover[0] 
    : productDetails.imageCover;

  const allImages = [
    imageCover,
    ...(Array.isArray(productDetails.images) ? productDetails.images : [])
  ].filter(Boolean);

  return (

    
 
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            {mainImage && (
              <img
                src={mainImage}
                alt={productDetails.title}
                className="w-full h-full object-cover"
                width="800"
                height="800"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                srcSet={`${mainImage} 1x, ${mainImage} 2x`}
                sizes="(min-width:1024px) 50vw, 100vw"
              />
            )}
          </div>
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {allImages.map((img, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
                  onClick={() => setMainImage(img)}
                >
                  <img
                    src={img}
                    alt={`${productDetails.title} ${index + 1}`}
                    className={`w-full h-full object-cover hover:opacity-75 ${
                      mainImage === img ? 'ring-2 ring-blue-500' : ''
                    }`}
                    width="200"
                    height="200"
                    loading="lazy"
                    decoding="async"
                    srcSet={`${img} 1x, ${img} 2x`}
                    sizes="(min-width:1024px) 10vw, 25vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {productDetails.title}
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              {productDetails.category?.name} • {productDetails.brand?.name}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-green-600">
              {productDetails.price} EGP
            </span>
            {productDetails.priceAfterDiscount && (
              <span className="text-lg text-gray-500 line-through">
                {productDetails.priceAfterDiscount} EGP
              </span>
            )}
          </div>

          {productDetails.ratingsAverage && (
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(productDetails.ratingsAverage)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {productDetails.ratingsAverage} ({productDetails.ratingsQuantity} reviews)
              </span>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {productDetails.description}
            </p>
          </div>

          <div className="space-y-4">
            {/* <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                Quantity:
              </label>
              <select
                id="quantity"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="1"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="flex gap-3">
              <button 
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                onClick={() => handelProductCart(productDetails._id)}
              >
                Add to Cart
              </button>
              
              <button
                onClick={() => handelWishlist(productDetails._id)}
                className="px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-semibold transition duration-200 hover:bg-gray-50 hover:text-red-500"
                title="Add to wishlist"
              >
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>



  );
}

export default ProductDetails;
