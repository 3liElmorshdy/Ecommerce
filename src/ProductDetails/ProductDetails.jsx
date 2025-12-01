import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader } from 'lucide-react';
import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();

  function getSpecificProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['specificProduct', id],
    queryFn: getSpecificProduct,
  });

  const productDetails = data?.data.data;

  if (isLoading) {
    return (
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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={productDetails.imageCover}
              alt={productDetails.title}
              className="w-full h-full object-cover"
            />
          </div>
          {productDetails.images && productDetails.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {productDetails.images.slice(1).map((img, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={img}
                    alt={`${productDetails.title} ${index + 2}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-75"
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
              ${productDetails.price}
            </span>
            {productDetails.priceAfterDiscount && (
              <span className="text-lg text-gray-500 line-through">
                ${productDetails.priceAfterDiscount}
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
            <div className="flex items-center space-x-4">
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
            </div>

            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            
            
            onClick={() => console.log('Add to cart:', productDetails._id)
              
            }
            >
              Add to Cart
              
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
