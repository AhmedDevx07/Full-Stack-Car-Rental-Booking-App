import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="my-12 md:my-16 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 md:p-12 lg:p-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Content */}
          <div className="text-white max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Do You Own a Luxury Car?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-blue-100 text-lg mb-4"
            >
              Monetize your vehicle effortlessly by listing it on our platform.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-blue-200 text-sm mb-6"
            >
              We take care of insurance, driver verification and secure payments
              — so you can earn passive income, stress-free.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/owner/add-car")}
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              List Your Car
            </motion.button>
          </div>

          {/* Car Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <img
              src={assets.banner_car_image}
              alt="Luxury Car"
              className="max-h-48 md:max-h-64 lg:max-h-80 w-auto object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;