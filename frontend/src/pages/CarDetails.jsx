import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { useEffect } from "react";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const CarDetails = () => {
  const { id } = useParams();
  const { cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate, user } =
    useAppContext();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const currency = import.meta.env.VITE_CURRENCY;

  useEffect(() => {
    const foundCar = cars.find((car) => car._id === id);
    setCar(foundCar);
  }, [cars, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to book a car");
      return;
    }

    if (!pickupDate || !returnDate) {
      toast.error("Please select pickup and return dates");
      return;
    }

    try {
      const { data } = await axios.post("/api/bookings/create", {
        carId: id,
        pickupDate,
        returnDate,
      });
      if (data.success) {
        toast.success("Booking created successfully!");
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!car) {
    return <Loader />;
  }

  // Calculate rental days
  const getDays = () => {
    if (pickupDate && returnDate) {
      const start = new Date(pickupDate);
      const end = new Date(returnDate);
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 1;
    }
    return 0;
  };

  const days = getDays();
  const totalPrice = days * car.pricePerDay;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <img src={assets.arrow_icon} alt="Back" className="w-4 h-4 rotate-180" />
          <span>Back to all cars</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Car Image & Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Car Image */}
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl"
            >
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-64 md:h-80 lg:h-96 object-cover"
              />
              {car.isAvaliable && (
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white text-sm font-medium px-4 py-1.5 rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    Available Now
                  </span>
                </div>
              )}
            </motion.div>

            {/* Car Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-card"
            >
              {/* Title */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {car.category}
                </span>
                <span className="text-sm text-gray-500">{car.year}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {car.brand} <span className="font-medium">{car.model}</span>
              </h1>
              <p className="text-gray-500 flex items-center gap-2">
                <img src={assets.location_icon} alt="Location" className="w-4 h-4" />
                {car.location}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {[
                  { icon: assets.users_icon, label: "Seats", value: car.seating_capacity },
                  { icon: assets.fuel_icon, label: "Fuel", value: car.fuel_type },
                  { icon: assets.car_icon, label: "Transmission", value: car.transmission },
                  { icon: assets.location_icon, label: "Location", value: car.location },
                ].map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    key={item.label}
                    className="flex flex-col items-center bg-gray-50 p-4 rounded-xl"
                  >
                    <img src={item.icon} alt={item.label} className="w-5 h-5 mb-2 text-gray-400" />
                    <span className="text-sm text-gray-600">{item.value}</span>
                  </motion.div>
                ))}
              </div>

              {/* Description */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">{car.description}</p>
              </div>

              {/* Features */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Features</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "360 Camera",
                    "Bluetooth",
                    "GPS Navigation",
                    "Heated Seats",
                    "Rear View Mirror",
                    "USB Charging",
                  ].map((item) => (
                    <li key={item} className="flex items-center text-gray-600">
                      <img src={assets.check_icon} className="w-4 h-4 mr-3 text-green-500" alt="" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-premium sticky top-24"
            >
              {/* Price */}
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  {currency}{car.pricePerDay}
                </span>
                <span className="text-gray-500"> / day</span>
              </div>

              {/* Date Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pick-up Date
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return Date
                  </label>
                  <input
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    type="date"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    required
                    min={pickupDate || new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              {/* Total Price */}
              {days > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Duration</span>
                    <span>{days} {days === 1 ? "day" : "days"}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>{currency}{totalPrice}</span>
                  </div>
                </div>
              )}

              {/* Book Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {user ? "Book Now" : "Login to Book"}
              </motion.button>

              <p className="text-center text-sm text-gray-500 mt-4">
                No credit card required to reserve
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;