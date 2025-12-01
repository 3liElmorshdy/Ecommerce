
import Parent from './Components/Parent/Parent'
import Home from './Components/Home/Home'
import Nav from './Components/Nav/Nav'
import About from './Components/About/About'
import Layout from './Components/Layout/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Components/LogIn/Login'
import Register from './Components/Register/Register'
import ForgotPassword from './Components/ForgetPass/ForgetPass'
import ResetPass from './Components/ForgetPass/ResetPass/ResetPass'
import ResetCorrect from './Components/ResetPassCorrect/ResetCorrect'
import CounterContext from './context/counterContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProtectedAuth from './Components/protectedAuth/protectedAuth'
import Product from './Components/Product/Product'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductDetails from './ProductDetails/ProductDetails'
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
      { path: "parent", element:
        <ProtectedRoute><Parent /></ProtectedRoute> },
      { path: "login", element: <ProtectedAuth><Login /></ProtectedAuth> },
      { path: "register", element: <ProtectedAuth><Register /> </ProtectedAuth>},
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "resetPass", element: <ResetPass /> },
      { path: "ResetCorrect", element: <ResetCorrect /> },
      { path: "product", element: <ProtectedRoute><Product /></ProtectedRoute> },
      { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
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

  return (
 <>
 <CounterContext>
  <QueryClientProvider client={cahce}>

   <RouterProvider router={router}/>
     
  </QueryClientProvider>
           

 </CounterContext>







 
 </>
  )
}

export default App
