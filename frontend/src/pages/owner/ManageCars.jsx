import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import TitleOwner from "../../components/owner/TitleOwner";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";

const ManageCars = () => {
  const { currency, isOwner, axios } = useAppContext();
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/cars");
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteCar = async (carId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this car?");
      if (!confirm) return;

      const { data } = await axios.post("/api/owner/delete-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchOwnerCars();
    }
  }, [isOwner]);

  if (isLoading) {
    return (
      <div className="flex-1 p-6 md:p-10 bg-gray-50">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="grid gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 md:p-10 bg-gray-50 min-h-screen">
      <TitleOwner
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them from the booking platform."
      />

      <div className="mt-8 space-y-4">
        <AnimatePresence>
          {cars.length > 0 ? (
            cars.map((car, index) => (
              <motion.div
                key={car._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-4 md:p-6 shadow-card hover:shadow-premium transition-all border border-gray-100"
              >
                <div className="flex flex-col md:flex-row items-start gap-4">
                  {/* Car Image */}
                  <div className="w-full md:w-32 h-24 flex-shrink-0">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  {/* Car Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {car.brand} <span className="font-medium">{car.model}</span>
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {car.year} • {car.category} • {car.transmission}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-blue-600">
                          {currency}{car.pricePerDay}
                        </p>
                        <p className="text-xs text-gray-500">per day</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {car.seating_capacity} Seats
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {car.fuel_type}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {car.location}
                      </span>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                      car.isAvaliable
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-red-100 text-red-700 border border-red-200"
                    }`}>
                      {car.isAvaliable ? "Available" : "Unavailable"}
                    </span>

                    <button
                      onClick={() => toggleAvailability(car._id)}
                      className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                      title={car.isAvaliable ? "Mark Unavailable" : "Mark Available"}
                    >
                      <img
                        src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon}
                        alt="Toggle"
                        className="w-5 h-5"
                      />
                    </button>

                    <button
                      onClick={() => deleteCar(car._id)}
                      className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 transition-colors"
                      title="Delete Car"
                    >
                      <img
                        src={assets.delete_icon}
                        alt="Delete"
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-12 text-center shadow-card"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src={assets.carIcon} alt="No cars" className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Cars Listed</h3>
              <p className="text-gray-500">Start by adding your first car to the platform.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ManageCars;