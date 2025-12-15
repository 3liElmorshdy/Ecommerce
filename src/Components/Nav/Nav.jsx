import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { counterObjProivder } from "../../context/CounterContext";
import { cartContext } from "../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { x: token, y: setToken } = useContext(counterObjProivder);
  const navigate = useNavigate();

 const{numOfCartItems}= useContext(cartContext)

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

        {/* Desktop Links */}
        {token ? (
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink to="/home" className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClasses}>
              About
            </NavLink>
            <NavLink to="/parent" className={navLinkClasses}>
              Parent
            </NavLink>
            <NavLink to="/product" className={navLinkClasses}>
              product
            </NavLink>
     <NavLink to="/cart" className={navLinkClasses}>
  <div className="relative">
    <FaShoppingCart size={22} />
    <span
      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                 w-5 h-5 flex items-center justify-center rounded-full shadow-md"
    >
      {numOfCartItems}
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

        {/* Burger Icon (visible only on small screens) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
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


              <NavLink to="/cart"  
                 onClick={() => setIsOpen(false)}
                 className="hover:underline flex justify-center ">
              <FaShoppingCart size={20}  />
              <p  className=" position-absolute
               bg-red-500 text-white text-xs 
                 w-5 h-5
                 flex items-center justify-center
                 rounded-full shadow-md
                  top-0 right-0 -translate-y-1/2 ">{numOfCartItems}</p>
        

              

              
            </NavLink>



              <NavLink

                to="/parent"
                onClick={() => setIsOpen(false)}
                className="hover:underline flex justify-center items-center"
              >
                Parent
              </NavLink>


                          <NavLink to="/product" 
                            onClick={() => setIsOpen(false)} className="hover:underline flex justify-center items-center">
                                 
              product
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
