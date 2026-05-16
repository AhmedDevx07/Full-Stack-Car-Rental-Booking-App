import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { cars } = useAppContext();

  const featuredCars = cars.slice(0, 6);

  return (
    <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Title
            title="Featured Vehicles"
            subTitle="Explore our selection of premium vehicles available for your next adventure."
          />
        </motion.div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredCars.map((car, index) => (
            <motion.div
              key={car._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigate("/cars");
              window.scrollTo(0, 0);
            }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>Explore All Cars</span>
            <img src={assets.arrow_icon} alt="Arrow" className="w-4 h-4 invert" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSection;