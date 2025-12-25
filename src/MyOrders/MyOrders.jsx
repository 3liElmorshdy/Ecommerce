import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Loader, Package, MapPin, Phone, CreditCard, Calendar } from 'lucide-react';

function MyOrders() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // const [error, setError] = useState(null)
  
 
  const token = localStorage.getItem("token");

  let UserIDD = null
  try {
    if (token) {
      const decoded = jwtDecode(token);
      UserIDD = decoded?.id;
    }
  } catch (err) {
    console.error("Invalid token:", err);
  }

  useEffect(() => {
    const fetchOrders = async () => {
  if(!UserIDD){
    console.log("ارجع يا علق>>>>>>>>>>>>> احا لو رجع ");
    
  }
      try {
        setIsLoading(true)
        const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${UserIDD}`)
        setData(res.data)
        if(res){
  setIsLoading(false)
}
        // console.log(res.data)
      } catch (err) {
        console.error("Ay kalam", err)
      } 
    }

    fetchOrders()
  }, [UserIDD])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin" size={48} />
      </div>
    )
  }



  if (data.length == 0 ) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Package size={64} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
          <p className="text-gray-600">You haven't placed any orders yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h1>
      
      <div className="space-y-6">
        {data.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
            {/* Order Header */}
            <div className="flex justify-between items-start mb-4 pb-4 border-b">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Order #{order.id || order._id?.slice(-8)}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>{new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>
              <div className="text-right">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  order.isPaid 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.isPaid ? 'Paid' : 'Pending Payment'}
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ml-2 ${
                  order.isDelivered 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {order.isDelivered ? 'Delivered' : 'Processing'}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-3">Order Items</h3>
              <div className="space-y-3">
                {order.cartItems?.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                    <img 
                      src={item.product?.imageCover} 
                      alt={item.product?.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.product?.title}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.count}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">{item.price} EGP</p>
                      <p className="text-sm text-gray-600">Total: {item.price * item.count} EGP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <h3 className="font-semibold text-gray-800 mb-3">Shipping Address</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{order.shippingAddress?.details}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{order.shippingAddress?.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>{order.shippingAddress?.phone}</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Total :</span>
                <span className="font-medium">{order.totalOrderPrice - order.shippingPrice - order.taxPrice} EGP</span>
              </div>
  
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-lg font-semibold text-gray-800">Total:</span>
                <span className="text-xl font-bold text-blue-600">{order.totalOrderPrice} EGP</span>
              </div>
              <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                <CreditCard size={16} />
                <span>Payment Method: {order.paymentMethodType}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders
