
import React, { Suspense, lazy } from 'react'



import CounterContext from './context/CounterContext'
import { createBrowserRouter } from 'react-router-dom'
const Home = lazy(() => import('./Components/Home/Home'))
const About = lazy(() => import('./Components/About/About'))
const Layout = lazy(() => import('./Components/Layout/Layout'))
const Login = lazy(() => import('./Components/LogIn/Login'))
const Register = lazy(() => import('./Components/Register/Register'))
const ForgotPassword = lazy(() => import('./Components/ForgetPass/ForgetPass'))
const ResetPass = lazy(() => import('./Components/ForgetPass/ResetPass/ResetPass'))
const ResetCorrect = lazy(() => import('./Components/ResetPassCorrect/ResetCorrect'))
const ProductDetails = lazy(() => import('./ProductDetails/ProductDetails'))
const Cart = lazy(() => import('./Components/Cart/Cart'))
const Checkout = lazy(() => import('./Checkout/Checkout'))
const AllOrders = lazy(() => import('./Components/Product/AllOrders'))
const CategoryDetails = lazy(() => import('./CategoryDetails/CategoryDetails'))
const SubCategoryDetails = lazy(() => import('./SubCategoryDetails/SubCategoryDetails'))
const Wishlist = lazy(() => import('./Wishlist/Wishlist'))
const MyOrders = lazy(() => import('./MyOrders/MyOrders'))
const ContactUs = lazy(() => import('./Contact-Us/Contact-Us'))

// import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
// import ProtectedAuth from './Components/protectedAuth/protectedAuth'
// // import Product from './Components/Product/Product'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// // Remove direct route component imports
// // import ProductDetails from './ProductDetails/ProductDetails'
// import CartContext from './context/CartContext'
// import { ToastContainer } from 'react-toastify'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import useOnlineStatus from './customHook/useOnlineStatus'
// // import CategoryDetails from './CategoryDetails/CategoryDetails'
// // import SubCategoryDetails from './SubCategoryDetails/SubCategoryDetails'
// import Wishlist from './Wishlist/Wishlist'
// import MyOrders from './MyOrders/MyOrders'
// import ContactUs from './Contact-Us/Contact-Us'
// import { Offline } from 'react-detect-offline'
// import AdminRoute from './AdminRoute/AdminRoute'
// import AdminDashboard from './AdminDashboard/AdminDashboard'




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProtectedRoute><Home/></ProtectedRoute>,
      },
      {
        path: "home",
        element: <ProtectedRoute><Home/></ProtectedRoute>,
      },
      { path: "about", element: 
      <ProtectedRoute>
        <About />
      </ProtectedRoute> },

      { path: "login", element: <ProtectedAuth><Login /></ProtectedAuth> },
      { path: "register", element: <ProtectedAuth><Register /> </ProtectedAuth>},
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "resetPass", element: <ResetPass /> },
      { path: "ResetCorrect", element: <ResetCorrect /> },
      // allorders
      { path: "allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },


      { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },


      { path: 'subCategoryDetails/:id', element: <ProtectedRoute><SubCategoryDetails /></ProtectedRoute> },



      { path: 'categoryDetails/:id', element: <ProtectedRoute><CategoryDetails /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: 'myOrders', element: <ProtectedRoute><MyOrders /></ProtectedRoute> },
      { path: 'contactUs', element: <ProtectedRoute><ContactUs /></ProtectedRoute> },
      // < path: "/CategoryDetails/:id" : element={<CategoryDetails />} />

      //    { 
      //   path: "admin", 
      //   element: <AdminRoute><AdminDashboard /></AdminRoute> 
      // },
      { path: "*", element: <h1 className='flex items-center justify-center w-full h-screen text-4xl  text-amber-500 font-bold'>Page Not Found</h1> }
 
   
      
    ],
  },
]);



function App() {

  const cahce = new QueryClient()


  
  const isOnline = useOnlineStatus();
  
// useEffect(() => {
//   const elements = document.querySelectorAll("*");

//   elements.forEach(el => {
//     if (el.scrollWidth > el.clientWidth) {
//       console.log("سبب السكرول:", el);
//     }
//   });
// }, []);

  return (
 <>

 <CounterContext>
  <QueryClientProvider client={cahce}>
    <CartContext>


 <Suspense fallback={<div className="flex justify-center items-center h-screen w-full">Loading...</div>}>
              <RouterProvider router={router} />
            </Suspense>
            <ToastContainer />

    </CartContext>

  
     
  </QueryClientProvider>
           

 </CounterContext>



 
{!isOnline && (
  <div className="fixed top-4 right-4 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-pulse">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
</svg>

    <span>You are offline</span>
  </div>
)}



















































 
 </>
  )
}

export default App
