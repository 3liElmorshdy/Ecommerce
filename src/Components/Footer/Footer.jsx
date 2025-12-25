import React from 'react'

function Footer() {
 

  return (
<footer className="bg-blue-900 text-white mt-auto">

      <div className="container mx-auto px-4 py-8 grid gap-6 lg:grid-cols-4 md:grid-cols-3" >
        <div>
          <h2 className="text-lg font-semibold mb-2">E-Commerce</h2>
          <p className="text-sm text-blue-100">
            Quality products, fast delivery, and secure checkout.
          </p>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2">Links</h3>
          <ul className="space-y-1 text-sm text-blue-100">
            <li><a className="hover:text-yellow-300" href="/home">Home</a></li>
            <li><a className="hover:text-yellow-300" href="/cart">Cart</a></li>
            <li><a className="hover:text-yellow-300" href="/allorders">All Orders</a></li>
          </ul>
        </div>

        <div>
  <h3 className="text-md font-semibold mb-2">Contact</h3>

  <p className="text-sm text-blue-100">
    email :
    <a
      href="mailto:alielmorshedy10@gmail.com"
      className="hover:text-yellow-300 transition"
    >
  alielmorshedy10@gmail.com
    </a>
  </p>

  <p className="text-sm text-blue-100">
    Phone : 
    <a
      href="tel:01067219108"
      className="hover:text-yellow-300 transition"
    >
      01067219108
    </a>
  </p>
</div>

        <div>
  <h3 className="text-md font-semibold mb-2">Follow Us</h3>
  <ul className="space-y-1 text-sm text-blue-100">
    <li><a href="https://www.facebook.com/share/1D9PUpvXiW/ "   target="_blank"   className="hover:text-yellow-300">Facebook</a></li>
  
    <li><a href="https://x.com/Elmorshedy43651" target="_blank"    className="hover:text-yellow-300">X </a></li>


    
    <li><a href="https://www.linkedin.com/in/ali-elmorshedy-363877348/"   target="_blank"   className="hover:text-yellow-300">LinkedIn</a></li>
  </ul>
</div>

      </div>


    </footer>
  );
}

export default Footer