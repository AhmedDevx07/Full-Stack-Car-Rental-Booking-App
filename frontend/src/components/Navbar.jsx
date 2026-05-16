import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";
const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } =
    useAppContext();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const isHome = location.pathname === "/";

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHome ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <motion.img
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              src={assets.logo}
              alt="logo"
              className="h-9 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {menuLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative group ${
                    location.pathname === link.path
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                      location.pathname === link.path
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* List Your Car / Dashboard */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => (isOwner ? navigate("/owner") : changeRole())}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                isOwner
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
              }`}
            >
              {isOwner ? "Dashboard" : "List Your Car"}
            </motion.button>

            {/* Login / Logout */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                user ? logout() : setShowLogin(true);
              }}
              className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {user ? "Logout" : "Login"}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Menu"
          >
            <img
              src={open ? assets.close_icon : assets.menu_icon}
              alt="menu"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Links */}
              {menuLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                    location.pathname === link.path
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Actions */}
              <div className="pt-4 space-y-3 border-t border-gray-100">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setOpen(false);
                    isOwner ? navigate("/owner") : changeRole();
                  }}
                  className={`w-full py-3 rounded-lg text-sm font-medium transition-all ${
                    isOwner
                      ? "bg-blue-600 text-white"
                      : "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                  }`}
                >
                  {isOwner ? "Go to Dashboard" : "List Your Car"}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setOpen(false);
                    user ? logout() : setShowLogin(true);
                  }}
                  className="w-full py-3 bg-gray-900 text-white rounded-lg text-sm font-medium"
                >
                  {user ? "Logout" : "Login"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
