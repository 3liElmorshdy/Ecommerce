import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import { counterObjProivder } from "../../context/CounterContext";
import { cartContext } from "../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { x: token, y: setToken } = useContext(counterObjProivder);
  const navigate = useNavigate();

  const { numOfCartItems, NumberOfWishList } = useContext(cartContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
    setIsOpen(false);
  };

  const navLinkClasses = ({ isActive }) =>
    `hover:underline ${isActive ? "text-yellow-300 font-bold text-center" : ""}`;

  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <NavLink to="/">E-Commerce</NavLink>
        </h1>
<div className="flex justify-between items-center">
        {/* Small-screen icons (Cart, Wishlist & Burger) */}
        <div className="flex md:hidden items-center gap-5">
          <NavLink to="/cart" className="relative">
            <FaShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full shadow-md px-1">
              {numOfCartItems}
            </span>
          </NavLink>

          <NavLink to="/wishlist" className="relative">
            <Heart size={20} className="text-red-500 fill-red-500" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full shadow-md px-1">
              {NumberOfWishList}
            </span>
          </NavLink>

          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        </div>

        {/* Desktop Links */}
        {token ? (
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink to="/home" className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClasses}>
              About
            </NavLink>
            <NavLink to="/contactUs" className={navLinkClasses}>
              contactUs
            </NavLink>
   
            <NavLink to="/myOrders" className={navLinkClasses}>
              My Orders
            </NavLink>

            {/* Shopping Cart Icon */}
            <NavLink to="/cart" className={navLinkClasses}>
              <div className="relative ">
                <FaShoppingCart size={20} />
                <span
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                             min-w-[1rem] h-4 flex items-center justify-center rounded-full shadow-md px-1 "
                >
                  {numOfCartItems}
                </span>
              </div>
            </NavLink>

          
            <NavLink to="/wishlist" className={navLinkClasses}>
              <div className="relative">
                <Heart 
                  size={20} 
                  className="text-red-500 fill-red-500 hover:scale-110 transition-transform duration-200" 
                />
                <span
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                             min-w-[1rem] h-4 flex items-center justify-center rounded-full shadow-md px-1"
                >
                  {NumberOfWishList}
                </span>
              </div>
            </NavLink>

            <button
              onClick={handleLogout}
              className="hover:underline text-red-300 hover:text-red-200 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden md:flex space-x-6">
            <NavLink to="/login" className={navLinkClasses}>
              Login
            </NavLink>
            <NavLink to="/register" className={navLinkClasses}>
              Register
            </NavLink>
          </div>
        )}

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-3 flex flex-col space-y-3 md:hidden">
          {token ? (
            <>
              <NavLink
                to="/home"
                onClick={() => setIsOpen(false)}
                className="hover:underline text-center"
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setIsOpen(false)}
                className="hover:underline text-center"
              >
                About
              </NavLink>

              {/*  Mobile */}
              {/* <NavLink
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="hover:underline flex justify-center"
              >
                <div className="relative inline-block">
                  <FaShoppingCart size={20} />
                  <span
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs
                               min-w-[1.25rem] h-5 flex items-center justify-center rounded-full shadow-md px-1"
                  >
                    {numOfCartItems}
                  </span>
                </div>
              </NavLink> */}

{/*               
              <NavLink
                to="/wishlist"
                onClick={() => setIsOpen(false)}
                className="hover:underline flex justify-center"
              >
                <div className="relative inline-block">
                  <Heart 
                    size={20} 
                    className="text-red-500 fill-red-500" 
                  />
                  <span
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs
                               min-w-[1.25rem] h-5 flex items-center justify-center rounded-full shadow-md px-1"
                  >
                    {NumberOfWishList}
                  </span>
                </div>
              </NavLink> */}

              <NavLink
                to="/contactUs"
                onClick={() => setIsOpen(false)}
                className="hover:underline flex justify-center items-center"
              >
                contactUs
              </NavLink>


              <NavLink
                to="/myOrders"
                onClick={() => setIsOpen(false)}
                className="hover:underline flex justify-center items-center"
              >
                My Orders
              </NavLink>

              <button
                onClick={handleLogout}
                className="hover:underline text-red-300 hover:text-red-200 transition text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className="hover:underline text-center"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="hover:underline text-center"
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
