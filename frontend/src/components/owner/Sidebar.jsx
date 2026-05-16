import React, { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const updateImage = async () => {
    if (!image) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      const { data } = await axios.post("/api/owner/update-image", formData);
      if (data.success) {
        fetchUser();
        toast.success("Profile updated!");
        setImage("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0 hidden md:flex flex-col">
      {/* Profile Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="relative w-20 h-20 mx-auto mb-3">
          <label htmlFor="profile-image" className="cursor-pointer block">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : user?.image ||
                    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"
              }
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 hover:border-blue-500 transition-colors"
            />
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <img src={assets.edit_icon} alt="Edit" className="w-5 h-5 invert" />
            </div>
          </label>
          {image && (
            <button
              onClick={updateImage}
              disabled={isUploading}
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
            >
              {isUploading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <img src={assets.check_icon} alt="Save" className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        <p className="text-center font-semibold text-gray-900">{user?.name || "Owner"}</p>
        <p className="text-center text-xs text-gray-500">{user?.email}</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end={index === 0}
            className={({ isActive }) => {
              return `relative flex items-center gap-3 px-6 py-3.5 transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`;
            }}
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? link.coloredIcon : link.icon}
                  alt={link.name}
                  className="w-5 h-5"
                />
                <span className="font-medium">{link.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <p className="text-xs text-center text-gray-400">© 2026 CarRental</p>
      </div>
    </div>
  );
};

export default Sidebar;