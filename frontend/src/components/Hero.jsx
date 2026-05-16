import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/cars?pickupLocation=" +
        pickupLocation +
        "&pickupDate=" +
        pickupDate +
        "&returnDate=" +
        returnDate,
    );
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-100 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }}></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-27 pb-12">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-100 mb-6"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-600 font-medium">Premium Car Rental Experience</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Perfect Ride</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-8"
          >
            Choose from thousands of premium cars at unbeatable prices. Your journey starts here.
          </motion.p>
        </div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass-effect rounded-2xl p-6 md:p-8 shadow-premium max-w-4xl mx-auto"
        >
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Location
              </label>
              <select
                required
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
              >
                <option value="">Select City</option>
                {cityList.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Pickup Date */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Pick-up
              </label>
              <input
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                required
              />
            </div>

            {/* Return Date */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Return
              </label>
              <input
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                type="date"
                min={pickupDate || new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                required
              />
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full gradient-primary text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <img src={assets.search_icon} alt="Search" className="w-5 h-5 brightness-200" />
                <span className="text-base">Search Cars</span>
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Stats / Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16"
        >
          {[
            { number: "10K+", label: "Cars Available" },
            { number: "50+", label: "Cities" },
            { number: "4.9", label: "Customer Rating" },
            { number: "24/7", label: "Support" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.number}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Car Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <img
            src={assets.main_car}
            alt="Premium Car"
            className="max-h-64 md:max-h-80 lg:max-h-96 w-auto object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;