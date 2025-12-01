// // في Components/AdminRoute/AdminRoute.jsx
// import { Navigate } from 'react-router-dom';

// function AdminRoute({ children }) {
//   const token = localStorage.getItem('token');
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
  
//   if (!token) {
//     return <Navigate to="/login" />;
//   }
  
//   if (user.role == 'admin') {
//     return <h1 className='flex items-center justify-center w-full h-screen text-4xl text-red-500 font-bold'>Unauthorized - Admin Only</h1>;
//   }
//   // if (user.role !== 'admin') {
//   //   return <h1 className='flex items-center justify-center w-full h-screen text-4xl text-red-500 font-bold'>Unauthorized - Admin Only</h1>;
//   // }
  
//   return children;
// }

// export default AdminRoute;
