// import { Link, useNavigate } from "react-router-dom";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// function Register() {
//   const navigate = useNavigate();
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null)

// console.log("register compeonent MOunting pHase")
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();
//   const password = watch("password");


//   const formData = async (data)=>{
//     console.log("data")
//     axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", data)
//     .then(res => console.log("success " , res   , setIsSuccess(true)  ,
//   setTimeout(() => {

//     navigate("/login")
    
//   }, 3000))
  
//     ).catch(err => console.error("error" , err , setErrorMessage(err.response.data.message) , setTimeout(()=>{
//       setTimeout(()=>{
//         setErrorMessage(null)
//       } , 3000)

//     }))
//   )
//   }


//   return (




//     <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
//           Create Account
//         </h2>
//       </div>



// {isSuccess && (

    
//     <div className="text-green-600 mt-3 font-bold">success</div>

// )}
// {/* 
// {isSuccess && (
// {setTimeout(() => {
        
//   <div className="text-green-600 mt-3 font-bold">success</div>
 
// )
//  navigate("/login")

// }
// }, 2500)
// } */}
//     {errorMessage && (

//       <div className="text-red-60 text-center text-3xl  mt-4 bg-red-800 text-white">email is alerady Exist</div>
//     )}

//       <div className="mt-10 sm:mx-auto sm:w-full  lg:max-w-lg">
//         <form onSubmit={handleSubmit(formData , (err) =>console.log("fsdfhisdfvn" , err))} className="space-y-6">


//           {/* First + Last Name */}
//           <div className="flex flex-col sm:flex-row gap-6">
//             {/* First Name */}
//             <div className="flex flex-col w-full sm:w-1/2">
//               <label
//                 htmlFor="fName"
//                 className="block text-sm font-medium text-gray-900 dark:text-gray-600"
//               >
//                 First Name
//               </label>
//               <input
//                 id="fName"
//                 type="text"
//                 {...register("name", { required: "Must write First Name" })}
//                 autoComplete="given-name"
//                 className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base 
//                  text-gray-900 outline outline-1 outline-gray-300 
//                  placeholder:text-gray-400 focus:outline-2 
//                  focus:outline-indigo-600 sm:text-sm"
//               />
//               {errors.name && (
//                 <p className="text-red-600 text-sm mt-1">
//                   {errors.name.message}
//                 </p>
//               )}
//             </div>

//             {/* Last Name */}
//             {/* <div className="flex flex-col w-full sm:w-1/2">
//               <label
//                 htmlFor="lName"
//                 className="block text-sm font-medium text-gray-900 dark:text-gray-600"
//               >
//                 Last Name
//               </label>
//               <input
//                 {...register("lName", { required: "Must write Last Name" })}
//                 id="lName"
//                 type="text"
//                 autoComplete="family-name"
//                 className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base 
//                  text-gray-900 outline outline-1 outline-gray-300 
//                  placeholder:text-gray-400 focus:outline-2 
//                  focus:outline-indigo-600 sm:text-sm"
//               />
//               {errors.lName && (
//                 <p className="text-red-600 text-sm mt-1">
//                   {errors.lName.message}
//                 </p>
//               )}
//             </div> */}
//           </div>

//           {/* Username
//           <div>
//             <label
//               htmlFor="username"
//               className="block text-sm font-medium text-gray-900"
//             >
//               Username
//             </label>
//             <input
//               {...register("username", {
//                 required: "must write User Name",
//                 pattern: {
//                   value: /^[a-zA-Z0-9]{3,15}$/,
//                   message:
//                     "Username should be alphanumeric and 3-15 characters long",
//                 },
//               })}
//               id="username"
//               type="text"
//               // name="username"
//               autoComplete="username"
//               placeholder="Enter unique username"
//               className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
//             />

//             {errors.username && (
//               <p className="text-red-600 text-sm mt-1">
//                 {errors.username.message}
//               </p>
//             )}
//           </div>
//         */}

//           {/* Email */}
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-900"
//             >
//               Email address
//             </label>
//             <input
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                   message: "invaid email address",
//                 },
//               })}
//               id="email"
//               type="email"
//               // name="email"
//               autoComplete="email"
//               className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
//             />



//             {errors.email && (
//               <p className="text-red-600 text-sm mt-1">
//                 {errors.email.message}
//               </p>
//             )
            
//             }
//           </div>

//           {/* Telephone */}
//           <div>
//             <label
//               htmlFor="tel"
//               className="block text-sm font-medium text-gray-900"
//             >
//               Phone Number
//             </label>
//             <input
//               {...register("phone", {
//                 required: "Phone number is required",
//                 pattern: {
//                   value: /^(?:\+20|0)?1[0125][0-9]{8}$/,

//                   message: "Invalid phone number",
//                 },
//               })}
//               id="tel"
//               type="tel"
//               // name="telphone"
//               autoComplete="tel"
//               placeholder="+20 10..."
//               className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
//             />
//           </div>


//           {errors.phone && (
//             <p className="text-red-600 text-sm mt-1">
//               {errors.phone.message}
//             </p>
//           )}

//           {/* Gender
//           <div>
//             <label className="block text-sm font-medium text-gray-900">
//               Gender
//             </label>
//             <div className="mt-2 flex gap-4">
//               <label className="flex items-center gap-2 text-sm text-gray-700">
//                 <input
//                   type="radio"
//                   value="male"
//                   {...register("gender", {
//                     required: true,
//                     pattern: {
//                       value: /^(male|female|other)$/,
//                       message: "Please select a valid gender",
//                     },
//                   })}
//                 />
  
//                 Male
//               </label>

//               <label className="flex items-center gap-2 text-sm text-gray-700">
//                 <input
//                   type="radio"
//                   value="female"
//                   {...register("gender", { required: true })}
//                 />
//                 Female
 
//               </label>

//               <label className="flex items-center gap-2 text-sm text-gray-700">
//                 <input
//                   type="radio"
//                   value="other"
//                   {...register("gender", { required: true })}
//                 />
//                 Other
//               </label>
//             </div>
//                           {errors.gender && (
//                   <p className="text-red-600 text-sm mt-1">
//                     Please select your gender
//                   </p>
//                 )}
//           </div> */}

//           {/* Date of Birth */}
//           {/* <div>
//             <label
//               htmlFor="dob"
//               className="block text-sm font-medium text-gray-900"
//             >
//               Date of Birth
//             </label>
//             <input
//               id="dob"
//               type="date"
//               {...register("dob", {
//                 required: "Date of birth is required",
//                 validate: {
//                   notFuture: (value) => {
//                     const selectedDate = new Date(value);
//                     const today = new Date();
//                     return (
//                       selectedDate <= today || "Date cannot be in the future"
//                     );
//                   },
//                   minAge: (value) => {
//                     const selectedDate = new Date(value);
//                     const today = new Date();
//                     const age =
//                       today.getFullYear() - selectedDate.getFullYear();
//                     const monthDiff =
//                       today.getMonth() - selectedDate.getMonth();
//                     const dayDiff = today.getDate() - selectedDate.getDate();

//                     const isOldEnough =
//                       age > 10 ||
//                       (age === 10 &&
//                         (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));

//                     return isOldEnough || "You must be at least 10 years old";
//                   },
//                 },
//               })}
//               className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
//             />

//             {errors.dob && (
//               <p className="text-red-600 text-sm mt-1">{errors.dob.message}</p>
//             )}
//           </div> */}

//           {/* Profile Picture */}
//           {/* <div>
//             <label
//               htmlFor="profile"
//               className="block text-sm font-medium text-gray-900"
//             >
//               Profile Picture
//             </label>
//             <input
//               id="profile"
//               type="file"
//               // name="profile"
//               accept="image/*"
//               {...register("profile", { required: true })}
//               className="mt-2 block w-full text-sm text-gray-700"
//             />
//           </div> */}

//           {/* Country */}
//           {/* <div>
//             <label
//               htmlFor="country"
//               className="block text-sm font-medium text-gray-900"
//             >
//               Country
//             </label>
//             <select
//               id="country"
//               name="country"
//               className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
//               {...register("country", { required: "Enter your Country " ,pattern:{
//                 value: /^[a-zA-Z\s]+$/,
//                 message: "Invalid country name"
//               } })}
//             >
//               <option value="">Select Country</option>
//               <option value="Egypt">Egypt</option>
//               <option value="Saudi Arabia">Saudi Arabia</option>
//               <option value="UAE">United Arab Emirates</option>
//               <option value="Other">Other</option>
//             </select>

//             {errors.country && (
//               <p className="text-red-600 text-sm mt-1">
//                 {errors.country.message}
//               </p>
//             )}
//           </div> */}

//           {/* City
//           <div>
//             <label
//               htmlFor="city"
//               className="block text-sm font-medium text-gray-900"
//             >
//               City
//             </label>
//             <input
//               id="city"
//               type="text"
//               {...register("city", { required: "City is Reauired " , pattern :{
//                 value: /^[a-zA-Z\s]+$/,
//                 message:"INvalid City Name"
//               } })}
//               // name="city"
//               placeholder="Enter your city"
//               className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
//             />

//             {errors.city && (
//               <p className="text-red-600 text-sm mt-1">
//                 {errors.city.message}
//               </p>
//             )}
//           </div> */}

//           {/* Address
//           <div>
//             <label
//               htmlFor="address"
//               className="block text-sm font-medium text-gray-900"
//             >
//               Address
//             </label>
//             <textarea
//               id="address"
//               // name="address"
//               {...register("address", { required: "Addreess is Required " , pattern: {
//                 value: /^[a-zA-Z\s]+$/,
//                 message: "Invalid address forma"
//               } })}
//               rows="2"
//               placeholder="Enter your full address"
//               className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
//             ></textarea>
//             {errors.address && (
              
//               <p className="text-red-600  text-sm  mt-1">{errors.address.message}</p>
//               )}
//           </div> */}

//           {/* Password */}
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-900"
//             >
//               Password
//             </label>
//             <input
//               {...register("password", {
//                 required: "Password is required",
//                 pattern: {
//                   value:
//                /^[A-Za-z0-9]{8,}$/,


//                   message:
//                     "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
//                 },
//               })}
//               id="password"
//               type="password"
//               // name="password"
//               autoComplete="new-password"
//               className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
//             />
//      {errors.password &&(
//       <p className="text-red-600 text-sm mt-1">Password Don't is incorrect</p>
//      )}
//           </div>

//           {/* Confirm Password */}

//           <label
//             htmlFor="confirmPassword"
//             className="block text-sm font-medium text-gray-900"
//           >
//             Confirm Password
//           </label>
//           <input
//             id="confirmPassword"
//             type="password"
//             className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
//             autoComplete="new-password"
//             {...register("rePassword", {
//               required: "Please confirm your password",
//               validate: (value) =>
//                 value === password || "Passwords do not match",
//             })}
//           />

//           {errors.rePassword && (
//             <p className="text-red-600 text-sm mt-1">
//               {errors.rePassword.message}
//             </p>
//           )}

//           {/* Submit Button */}
//           <div>
//             <button
            
//               type="submit"
//               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//             >
//               Create Account
//             </button>
//           </div>
//         </form>

//         <p className="mt-10 text-center text-sm text-gray-600">
//           Already have an account?
//           <Link
//             to={"/login"}
//             className="font-semibold text-indigo-600 hover:text-indigo-500 ps-1.5"
//           >
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;





import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'


function Register() {

  const {handleSubmit , register , watch , formState:{errors}}=useForm()
  const password = watch("password")
const navigate =useNavigate()
const [isSuccess, setIsSuccess] = useState(null)
  


const onsubmit = async (data) => {
  console.log("Form Data:", data);
  try {
    const res = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      data
    );
    console.log("Success:", res.data);
    setIsSuccess(true)
    setTimeout(() => {
      
      navigate("/login")
    }, 2000);

  } catch (err) {
    console.log("Error:", err.response?.data || err.message);
    setIsSuccess(false)
  }
};




  return (
    <div className='flex items-center justify-center w-full h-screen  '>

      <form onSubmit={handleSubmit(onsubmit )} className='flex flex-col'>



  {isSuccess && <div className='flex items-start justify-start'>Your register is success</div>}
  {isSuccess === false && <div className='flex items-start justify-start'>Try again</div>}


<label htmlFor="email">Email</label>

 
<input
  type="email"
  id="email"
  {...register("email", {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Email is not valid"
    }
  })}
  className="
    w-80           
    px-4 py-2     
    border-4 border-amber-900 rounded-lg 
    outline-none   
    focus:border-amber-600 focus:ring-2 focus:ring-amber-300  
    transition duration-200 ease-in-out
  "
/>


{errors.email && <p className='text-red-600'>{errors.email.message}</p>}






<label htmlFor="name">Name</label>
<input type="text" name='name'  id='name'   className="
    w-80           
    px-4 py-2     
    border-4 border-amber-900 rounded-lg 
    outline-none   
    focus:border-amber-600 focus:ring-2 focus:ring-amber-300  
    transition duration-200 ease-in-out
  "
  
  {...register  ("name" , {required:"name is required", pattern :{value :/^[A-Za-z]+(?:\s[A-Za-z]+)*$/ , message:"name is not valid"}})}
  
  
  />
  {errors.name &&(<p className='text-red-600'>{errors.name.message}</p>)}


  <label htmlFor="password">password</label>
  <input type="password"  id = "password"  name = "password"
  autoComplete ="password" className='    w-80           
    px-4 py-2     
    border-4 border-amber-900 rounded-lg 
    outline-none   
    focus:border-amber-600 focus:ring-2 focus:ring-amber-300  
    transition duration-200 ease-in-out'
    
    
    {...register ("password" ,{required:"password is required", pattern:{
    
          value: /^[A-Za-z0-9@#$%^&*]{6,}$/,


    
    message:"pass is not valid"}})}/>


{errors.password && (<p className='text-red-600'>{errors.password.message}</p>)}




<label htmlFor="rePassword">Confirm Password</label>
<input  id ="rePassword"type="password"  
  autoComplete="new-password" 
className='
 w-80           
    px-4 py-2     
    border-4 border-amber-900 rounded-lg 
    outline-none   
    focus:border-amber-600 focus:ring-2 focus:ring-amber-300  
    transition duration-200 ease-in-out'
    
    
    {

      ...register ("rePassword" , {required:"this field is required" , validate:(value)=>value===password||"password is not match" })


      
    }/>
    {errors.rePassword  &&(<p className='text-red-600'>{errors.rePassword.message}</p>)}    
        <button className='bg-blue-800  cursor-pointer py-2 rounded-2xl mt-6' type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register