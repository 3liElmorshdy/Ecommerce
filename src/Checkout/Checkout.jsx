import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useCart from "../customHook/useCart";
import { counterObjProivder } from "../context/CounterContext";
import { cartContext } from "../context/CartContext";
import { Loader } from "lucide-react";

function Checkout() {
  const { product, totalCartPrice } = useCart();
  const { x: token } = useContext(counterObjProivder);
  const { cartId } = useContext(cartContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => 
    {
    if (!product || product.length === 0) {
      toast.error("Your cart is empty!");
      navigate("/cart");
      return;
    }

    setIsLoading(true);

    try
     {
      let currentCartId = cartId;
      
      if (!currentCartId) {
        const cartRes = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/cart",
          { headers: { token } }
        );
        currentCartId = cartRes.data.data._id || cartRes.data.cartId;
            
   
      }

      
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${currentCartId}`,
        {
          shippingAddress: {
            details: data.address,
            phone: data.phone,
            city: data.city,
          },
        },
        { headers: {token}, 
      
      params:{
        url:"http://localhost:5173"
      }


    }



      );


      
      if (response.data.session.url) {
      window.location.href = response.data.session.url;



      } else {
        toast.error("Payment session creation failed");
        setIsLoading(false);
      }
    }

     catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        error.response?.data?.message || "Failed to process checkout"
      );
      setIsLoading(false);

    
  
     }

     
  };

















  if (!product || product.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-4">
            Add some products to checkout!
          </p>
          <button
            onClick={() => navigate("/cart")}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Order Summary
          </h2>
          <div className="space-y-4 mb-6">
            {product.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center gap-4 pb-4 border-b border-gray-200"
              >
                <img
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {item.product.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.count}
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {(item.price * item.count).toFixed(2)} EGP
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold text-gray-800">
                Total:
              </span>
              <span className="text-xl font-bold text-blue-600">
                {totalCartPrice.toFixed(2)} EGP
              </span>
            </div>
          </div>
        </div>

        {/* Shipping Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Shipping Details
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address Details
              </label>
              <input
                type="text"
                id="details"
                {...register("address", {
                  required: "Address is required",
                  minLength: {
                    value: 5,
                    message: "Address must be at least 5 characters",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^01[0125][0-9]{8}$/,
                    message: "Please enter a valid Egyptian phone number",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+20 10"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                {...register("city", {
                  required: "City is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your city"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              // onClick = {()=>handelProceedPayment()}
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
