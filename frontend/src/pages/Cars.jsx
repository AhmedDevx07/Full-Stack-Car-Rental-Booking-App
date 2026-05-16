import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");
  const { cars, axios } = useAppContext();
  const [input, setInput] = useState("");
  const isSearchData = pickupLocation && pickupDate && returnDate;
  const [filteredCars, setFilteredCars] = useState([]);
  const [baseCars, setBaseCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const applyFilter = () => {
    const sourceCars = baseCars.length > 0 ? baseCars : cars;
    if (input === "") {
      setFilteredCars(sourceCars);
      return;
    }
    const filtered = sourceCars.slice().filter((car) => {
      return (
        car.brand.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase()) ||
        car.category.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission.toLowerCase().includes(input.toLowerCase())
      );
    });
    setFilteredCars(filtered);
  };

  const searchCarAvailability = async () => {
    try {
      const { data } = await axios.post("/api/bookings/check-availability", {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });
      if (data.success && data.data.length > 0) {
        setBaseCars(data.data);
        setFilteredCars(data.data);
      } else if (data.success && data.data.length === 0) {
        toast.error("No cars available for selected dates");
        setBaseCars([]);
        setFilteredCars([]);
      } else {
        setBaseCars(cars);
        setFilteredCars(cars);
      }
    } catch (error) {
      setBaseCars(cars);
      setFilteredCars(cars);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (isSearchData) {
      searchCarAvailability();
    } else {
      setBaseCars(cars || []);
      setFilteredCars(cars || []);
      setIsLoading(false);
    }
  }, [isSearchData]);

  useEffect(() => {
    if (!isSearchData && cars && cars.length > 0) {
      setBaseCars(cars);
      setFilteredCars(cars);
    }
  }, [cars, isSearchData]);

  useEffect(() => {
    if ((baseCars.length > 0 || (!isSearchData && cars?.length > 0))) {
      applyFilter();
    }
  }, [input, baseCars, cars, isSearchData]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white border-b border-gray-200 py-8 md:py-12 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <Title
            title="Available Cars"
            subTitle="Browse our selection of premium vehicles available for your next adventure"
          />

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center bg-gray-50 px-5 mt-6 max-w-2xl mx-auto h-14 rounded-2xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all"
          >
            <img src={assets.search_icon} alt="Search" className="w-5 h-5 text-gray-400 mr-3" />
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Search by make, model, or features"
              className="flex-1 h-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />
            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
              <img src={assets.filter_icon} alt="Filter" className="w-5 h-5 text-gray-400" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between mb-6"
        >
          <p className="text-gray-600">
            {isLoading ? "Searching..." : `Showing ${filteredCars?.length || 0} Cars`}
          </p>
          {isSearchData && pickupLocation && (
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border">
              <img src={assets.location_icon} alt="Location" className="w-4 h-4" />
              <span>{pickupLocation}</span>
              {pickupDate && (
                <>
                  <span className="text-gray-300">|</span>
                  <span>{new Date(pickupDate).toLocaleDateString()}</span>
                </>
              )}
            </div>
          )}
        </motion.div>

        {/* Cars Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-72 animate-pulse"></div>
            ))}
          </div>
        ) : filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {(filteredCars || []).map((car, index) => (
              <motion.div
                key={car._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <img src={assets.car_icon} alt="No cars" className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Cars Found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cars;