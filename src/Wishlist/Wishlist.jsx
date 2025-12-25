import React from 'react'
import { useContext, useState } from 'react'
import { cartContext } from '../context/CartContext'
import { Heart, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import  { counterObjProivder } from '../context/CounterContext';

function Wishlist() {
  const { wishlist, addProductToCart, removeProductFromWishlist } = useContext(cartContext)
  const { x } = useContext(counterObjProivder)
  const [test, setTest] = useState(0);

  function RemoveProductFromWishlist(id) {
    // Call context method to remove and refresh wishlist
    removeProductFromWishlist(id)
    setTest(x)
    console.log(test);
  }

  async function handleAddToCart(id) {
    if (!id) {
      toast.error("Failed to add to cart", { position: "top-left" });
      return;
    }
    const res = await addProductToCart(id);
    if (res) {
      toast.success("Product added to cart", { position: "top-left" });
    } 
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Heart size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Your Wishlist is Empty</h2>
          <p className="text-gray-500">Start adding items you love!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
        <p className="text-gray-600 mt-2">{wishlist.length} items</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => {
          const product = item.data?.data || item;
          const productId = product?._id || product?.id;

          return (
            <div 
              key={productId}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={product.imageCover} 
                  alt={product.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <button
                    onClick={() => RemoveProductFromWishlist(productId)}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Heart size={20} className="text-red-500 fill-red-500" />
                  </button>
                </div>
                {product.ratingsAverage && (
                  <div className="absolute bottom-2 left-2 bg-yellow-400 text-white px-2 py-1 rounded-md text-sm font-semibold flex items-center gap-1">
                    ⭐ {product.ratingsAverage}
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 uppercase">
                    {product.brand?.name || product.category?.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    Qty: {product.quantity}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-12">
                  {product.title}
                </h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">
                      {product.price} EGP
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(productId)}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Wishlist;
