import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/car-details/${car._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-premium cursor-pointer border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Available Badge */}
        {car.isAvaliable && (
          <div className="absolute top-4 left-4">
            <span className="bg-green-500/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              Available
            </span>
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2.5 rounded-xl shadow-lg">
          <span className="text-xl font-bold">
            {currency}{car.pricePerDay}
          </span>
          <span className="text-sm text-gray-500">/day</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              {car.category}
            </span>
            <span className="text-xs text-gray-400">{car.year}</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            {car.brand} <span className="font-medium">{car.model}</span>
          </h3>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
            <img src={assets.users_icon} alt="Seats" className="w-4 h-4 text-gray-400" />
            <span>{car.seating_capacity} Seats</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
            <img src={assets.fuel_icon} alt="Fuel" className="w-4 h-4 text-gray-400" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
            <img src={assets.car_icon} alt="Transmission" className="w-4 h-4 text-gray-400" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
            <img src={assets.location_icon} alt="Location" className="w-4 h-4 text-gray-400" />
            <span className="truncate">{car.location}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;