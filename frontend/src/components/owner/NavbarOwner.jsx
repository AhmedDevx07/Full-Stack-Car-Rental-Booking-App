import React from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const NavbarOwner = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 py-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex-shrink-0">
          <img src={assets.logo} alt="Logo" className="h-8" />
        </Link>
        <div className="hidden md:block h-6 w-px bg-gray-200"></div>
        <span className="hidden md:block text-sm text-gray-500">Owner Dashboard</span>
      </div>

      <div className="flex items-center gap-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{user?.name || "Owner"}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium  text-blue-600 hover:text-gray-900 bg-blue-50 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Logout
        </button>

        {/* View Website */}
        <Link
          to="/"
          className="hidden md:inline-flex px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          View Website
        </Link>
      </div>
    </div>
  );
};

export default NavbarOwner;