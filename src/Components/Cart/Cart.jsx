// import { useContext } from "react";
// import { cartContext } from "../../context/CartContext";
// import { useState } from "react";


import useCart from "../../customHook/useCart";
import { Link } from "react-router-dom";

// function Cart() {
//   const {
//     addProductToCart,
//     message,
//     numOfCartItems,
//     totalCartPrice,
//     product,
//   } = useContext(cartContext);

// const [quantity , setQuantity] = useState({})



// function handelIncrement(id) {

//   setQuantity(prev => ({
//     ...prev , 
//     [id] :(prev[id] ||1 )+1
//   }))
//   console.log(id)
// }

// function handelDcrement(id) {
//   setQuantity(prev => ({
//     ...prev , 
//     [id] :      Math.max((prev[id] ||1 )-1 , 1)
//   }))
// }

//   console.log(numOfCartItems);
//   console.log(message);
//   console.log(totalCartPrice);
//   console.log(product, "this is product");


//   return (
//     <div className="container mx-auto">
// <div className=" relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
//   <table className="w-full text-sm text-left rtl:text-right text-body">
//     <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
//       <tr>
//         <th scope="col" className="px-16 py-3">
// Image        </th>
//         <th scope="col" className="px-6 py-3 font-medium">
//           Product
//         </th>
//         <th scope="col" className="px-6 py-3 font-medium">
//           Qty
//         </th>
//         <th scope="col" className="px-6 py-3 font-medium">
//           Price
//         </th>
//         <th scope="col" className="px-6 py-3 font-medium">
//           Action
//         </th>
//       </tr>
//     </thead>
//     <tbody>
// {
//   product?.map((item)=>{
//     return(
//       <tr className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium" key= {item._id}>
//         <td className="p-4">
//           <img
//             src={item.product.imageCover}
//             className="w-16 md:w-24 max-w-full max-h-full"
//             alt="Apple Watch"
//           />
//         </td>
//         <td className="px-6 py-4 font-semibold text-heading">
//           {item.product.title}
//         </td>
//         <td className="px-6 py-4">
//           <form className="max-w-xs mx-auto">
//             <label htmlFor="counter-input-1" className="sr-only">
//               Choose quantity:
//             </label>
//             <div className="relative flex items-center">
//               <button
//                 type="button"
//                 id="decrement-button-1"
//                 data-input-counter-decrement="counter-input-1"
//                 className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"

//                 onClick = {()=>handelDcrement(item._id)}


//               >
//                 <svg
//                   className="w-3 h-3 text-heading"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M5 12h14"
//                   />
//                 </svg>
//               </button>
// <input
//   type="text"
//   className="shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"

// value = {(quantity[item._id] ||1  )}










//   readOnly
// />

//               <button
//                 type="button"
//                 id="increment-button-1"
//                 data-input-counter-increment="counter-input-1"
//                 className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"



//                 onClick = {()=>handelIncrement(item._id)}

//               >
//                 <svg
//                   className="w-3 h-3 text-heading"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M5 12h14m-7 7V5"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </form>
//         </td>
//         <td className="px-6 py-4 font-semibold text-heading">
//           {item.price}
//         </td>
//         <td className="px-6 py-4">
//           <a href="#" className="font-medium text-fg-danger hover:underline">
//             Remove
//           </a>
//         </td>
//       </tr>
//     )
//   })
// }

//     </tbody>
//   </table>
// </div>

// </div>

//   )
// }

// export default Cart;



function Cart() {


      //const [quantity , setQuantity] = useState({});




// function handelIncrement (id){
//   setQuantity(prev =>({
//     ...prev , 
//     [id] : (prev[id] || 1) + 1
//   }))   
// }

//       function handelDecrement(id){
//         setQuantity(prev =>({
//           ...prev , 
//           [id] : Math.max((prev[id] || 1) - 1 , 1)
//         }))
//       }

  const {   handelRemoveSpacificItem,
    handleQuantityChange,
    product,
   totalCartPrice, updatingId, handelRemoveAllItem}= useCart();
  // console.log(product , numOfCartItems , totalCartPrice  );




if(product && product.length === 0){
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Link to="/allorders" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

 
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        {product && product.length > 0 && (
          <button
            onClick={() => handelRemoveAllItem()}
            className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-2 transition"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear Cart
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              {product?.map((item) => (
                <div
                  key={item.product._id}
                  className="p-4 md:p-6 hover:bg-gray-50 transition"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Product Image */}
                    <Link
                      to={`/productDetails/${item.product._id}`}
                      className="shrink-0"
                    >
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-full md:w-32 h-32 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col md:flex-row md:justify-between gap-4">
                      <div className="flex-1">
                        <Link
                          to={`/productDetails/${item.product._id}`}
                          className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition mb-2 block"
                        >
                          {item.product.title}
                        </Link>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.product.category?.name}
                        </p>
                        <p className="text-lg font-bold text-indigo-600">
                          {item.price} EGP
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Subtotal: {(item.price * item.count).toFixed(2)} EGP
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            type="button"
                            disabled={updatingId === item.product._id || item.count === 1}
                            onClick={() => {
                              const newCount = Math.max(1, item.count - 1);
                              handleQuantityChange(item.product._id, newCount);
                            }}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          <span className="px-4 py-2 min-w-12 text-center font-medium">
                            {item.count}
                          </span>
                          <button
                            type="button"
                            disabled={
                              item.count >= item.product.quantity ||
                              updatingId === item.product._id
                            }
                            onClick={() => {
                              const newCount = Math.min(
                                item.product.quantity,
                                item.count + 1
                              );
                              handleQuantityChange(item.product._id, newCount);
                            }}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handelRemoveSpacificItem(item.product._id)}
                          className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                          title="Remove item"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items ({product?.length || 0})</span>
                <span>{totalCartPrice.toFixed(2)} EGP</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-indigo-600">
                    {totalCartPrice.toFixed(2)} EGP
                  </span>
                </div>
              </div>
            </div>
            <Link to="/checkout" className="block">
              <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md">
                Proceed to Checkout
              </button>
            </Link>
            <Link
              to="/allorders"
              className="block mt-3 text-center text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
