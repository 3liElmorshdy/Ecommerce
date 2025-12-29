import React, { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
 import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import { toast } from 'react-toastify'

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const hideFooter = location.pathname === "/login" || location.pathname === "/register";


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    
    if (success === 'true') {
      toast.success("Payment successful! Redirecting to orders...");
      
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => {
        navigate("/allorders");
      }, 1500);
    }
  }, [navigate]);

  return (
     <div className="flex flex-col min-h-screen">
      <Nav/>
      <main className="flex-grow pb-24">
        <Outlet />
      </main>
      {!hideFooter && <Footer/>}
    </div>
  )
}

export default Layout