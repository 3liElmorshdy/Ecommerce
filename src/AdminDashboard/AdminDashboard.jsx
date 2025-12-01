// import { useState, useEffect } from 'react';
// import axios from 'axios';

// function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   const fetchAllUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("https://ecommerce.routemisr.com/api/v1/users");
//       setUsers(response.data.data || []);
//       console.log(users , "tsdkfjdsi ")
//     } catch (error) {
//       console.log('Error fetching users:', error.message);
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllUsers();
//   }, []);

//   // const filteredUsers = users.filter(user =>
//   //   user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   //   user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   // );

//   if (loading) {
//     return (
//       <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center'>
//         <div className='flex flex-col items-center gap-4'>
//           <div className='w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin'></div>
//           <p className='text-gray-300 font-medium'>Loading users...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 md:p-12'>
    
//       <div className='mb-8'>
//         <h1 className='text-4xl font-bold text-white mb-2 flex items-center gap-3'>
//           <div className='p-3 bg-teal-500/20 rounded-lg'>
//             <svg className='w-8 h-8 text-teal-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//               <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' />
//             </svg>
//           </div>
//           Admin Dashboard
//         </h1>
//         <p className='text-gray-400 ml-11'>Manage users and their roles</p>
//       </div>

    
//       <div className='mb-8'>
//         <div className='relative'>
//           <input
//             type='text'
//             placeholder='Search by email or name...'
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className='w-full px-4 py-3 pl-11 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition'
//           />
//           <svg className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//             <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
//           </svg>
//         </div>
//       </div>

 
//       <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
//         <div className='bg-slate-800 border border-slate-700 rounded-lg p-4'>
//           <p className='text-gray-400 text-sm'>Total Users</p>
//           <p className='text-3xl font-bold text-white mt-2'>{users.length}</p>
//         </div>
//         <div className='bg-slate-800 border border-slate-700 rounded-lg p-4'>
//           <p className='text-gray-400 text-sm'>Admins</p>
//           <p className='text-3xl font-bold text-red-400 mt-2'>{users.filter(u => u.role === 'admin').length}</p>
//         </div>
//         <div className='bg-slate-800 border border-slate-700 rounded-lg p-4'>
//           <p className='text-gray-400 text-sm'>Regular Users</p>
//           <p className='text-3xl font-bold text-blue-400 mt-2'>{users.filter(u => u.role !== 'admin').length}</p>
//         </div>
//       </div>

  
//       {/* <div className='bg-slate-800 border border-slate-700 rounded-lg overflow-hidden shadow-2xl'>
//         {filteredUsers.length > 0 ? (
//           <div className='overflow-x-auto'>
//             <div className='w-full'>
//               {/* Header */}
//               {/* <div className='bg-gradient-to-r from-slate-700 to-slate-800 border-b border-slate-700 grid grid-cols-5 gap-4 px-6 py-4'>
//                 <div className='text-left text-sm font-semibold text-gray-300'>ID</div>
//                 <div className='text-left text-sm font-semibold text-gray-300'>Email</div>
//                 <div className='text-left text-sm font-semibold text-gray-300'>Name</div>
//                 <div className='text-left text-sm font-semibold text-gray-300'>Role</div>
//                 <div className='text-left text-sm font-semibold text-gray-300'>Actions</div>
//               </div>
//               {/* Body */}
//               <div>
//                 {/* {filteredUsers.map((user, index) => (
//                   <div
//                     key={user._id}
//                     className='grid grid-cols-5 gap-4 px-6 py-4 hover:bg-slate-700/50 transition duration-200 group border-b border-slate-700 last:border-b-0'
//                   >
//                     <div className='text-sm text-gray-300'>
//                       <span className='bg-slate-700 px-3 py-1 rounded text-gray-400 text-xs font-mono'>
//                         {index + 1}
//                       </span>
//                     </div>
//                     <div className='text-sm text-white font-medium'>{user.email}</div>
//                     <div className='text-sm text-gray-300'>{user.name}</div>
//                     <div className='text-sm'>
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold flex w-fit ${
//                         user.role === 'admin'
//                           ? 'bg-red-500/20 text-red-300 border border-red-500/30'
//                           : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
//                       }`}>
//                         <span className={`w-2 h-2 rounded-full mr-2 mt-0.5 ${
//                           user.role === 'admin' ? 'bg-red-400' : 'bg-blue-400'
//                         }`}></span>
//                         {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//                       </span>
//                     </div>
//                     <div className='text-sm'>
//                       <button className='px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium transition duration-200 opacity-0 group-hover:opacity-100 transform group-hover:scale-105'>
//                         Edit
//                       </button>
//                     </div>
//                   </div>
//                 ))} */}
//               </div>
//             </div>
//       //     </div> */}
//       //   ) : (
//       //     <div className='flex flex-col items-center justify-center py-16'>
//       //       <svg className='w-16 h-16 text-gray-600 mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//       //         <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' />
//       //       </svg>
//       //       <p className='text-gray-400 text-lg'>No users found</p>
//       //       <p className='text-gray-500 text-sm mt-1'>Try adjusting your search criteria</p>
//       //     </div>
//       //   )}
//       // </div> */}

//     //   {/* Footer Stats */}
//     //   {/* <div className='mt-8 text-center text-gray-400 text-sm'>
//     //     <p>Showing {filteredUsers.length} of {users.length} users</p>
//     //   </div> */}
//     // </div>
//   );
// }

// export default AdminDashboard;
