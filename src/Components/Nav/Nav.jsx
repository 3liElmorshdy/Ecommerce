import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { counterObjProivder } from "../../context/counterContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { x: token, y: setToken } = useContext(counterObjProivder);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
    setIsOpen(false);
  };

  const navLinkClasses = ({ isActive }) =>
    `hover:underline ${isActive ? "text-yellow-300 font-bold" : ""}`;

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
              <NavLink
                to="/parent"
                onClick={() => setIsOpen(false)}
                className="hover:underline text-center"
              >
                Parent
              </NavLink>


                          <NavLink to="/product" 
                            onClick={() => setIsOpen(false)} className="hover:underline text-center">
                                 
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
