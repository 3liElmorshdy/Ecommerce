// import { useContext } from "react";
// import { cartContext } from "../../context/CartContext";
// import { useState } from "react";

import { useContext } from "react"
import { cartContext } from "../../context/CartContext"
import { useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

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

  const {product , numOfCartItems , totalCartPrice , removeSpacificItem , addProductToCart , updateProductQuantity}= useContext(cartContext);
  console.log(product , numOfCartItems , totalCartPrice  );



  async function handleQuantityChange(id, newCount) {
    // if (newCount >= 1 && newCount <= product.product.quantity) {
    // console.log(id , newCount , "this come from handleQuantityChange");
    
    const res = await updateProductQuantity(id, newCount);

    res ? toast.success("Quantity updated successfully") : toast.error("Quantity update failed");
    // }
  }
console.log(product , "this come from product");

  if(!product){
    return <Loader className="mx-auto h-screen   flex item-center justify-center" size={80} color="black"  />
  }
 
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold py-4"> totalCartPrice :{totalCartPrice}</h1>
      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
  <table className="w-full text-sm text-left rtl:text-right text-body">
    <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span >Image</span>
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Product
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Qty
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Price
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Action
        </th>
      </tr>
    </thead>
  

    <tbody>
      {product?.map((item)=>{
        return(
          <tr className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium" key= {item._id}>
        <td className="p-4">
          <img
            src={item.product.imageCover}
            className="w-16 md:w-24 max-w-full max-h-full"
            alt= {item.product.title}
          />
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          {item.product.title}
        </td>
        <td className="px-6 py-4">
          <form className="max-w-xs mx-auto">
            <label htmlFor="counter-input-1" className="sr-only">
              Choose quantity:
            </label>
            <div className="relative flex items-center">
              <button
                type="button"
                id="decrement-button-1"
                data-input-counter-decrement="counter-input-1"
                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
                disabled={item.count <= 1}
                onClick = {()=>{
                  const newCount = Math.max(1, item.count - 1);
                  handleQuantityChange(item.product.id , newCount);
                }}
              >
                <svg
                  className="w-3 h-3 text-heading"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14"
                  />
                </svg>
              </button>
              <input
                type="text"
                id="counter-input-1"
                data-input-counter
                className="shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                value={item.count}
                readOnly
              />
              <button
                type="button"
                id="increment-button-1"
                data-input-counter-increment="counter-input-1"
                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
                disabled={item.count >= item.product.quantity}
                onClick = {()=>{
                 const newCount = Math.min(item.product.quantity, item.count + 1);
                  handleQuantityChange(item.product.id, newCount);
                }}
              >
                <svg
                  className="w-3 h-3 text-heading"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
              </button>
            </div>
          </form>
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
         {item.price}
        </td> 
        <td className="px-6 py-4">
     <button  className="font-medium text-fg-danger hover:underline hover:text-red-800 transition cursor-pointer" 
     
     
     onClick={()=>removeSpacificItem(item._id)}>

    
    remove
     </button>
        </td>
      </tr>
        )
      })}

      
    </tbody>
  </table>
</div>
    </div>


  )
}

export default Cart
