import React, { useState } from "react";
import TitleOwner from "../../components/owner/TitleOwner";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const AddCar = () => {
  const { axios, currency } = useAppContext();

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: "",
    location: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return null;
    if (!image) {
      toast.error("Please upload a car image");
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(car));
      const { data } = await axios.post("/api/owner/add-car", formData);
      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setImagePreview(null);
        setCar({
          brand: "",
          model: "",
          year: "",
          pricePerDay: "",
          category: "",
          transmission: "",
          fuel_type: "",
          seating_capacity: "",
          location: "",
          description: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div className="flex-1 p-6 md:p-10 bg-gray-50 min-h-screen">
      <TitleOwner
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 max-w-3xl"
      >
        <form onSubmit={onSubmitHandler} className="bg-white rounded-2xl p-6 md:p-8 shadow-card space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Car Image</label>
            <div className="flex items-center gap-4">
              <label htmlFor="car-image" className="cursor-pointer">
                <div className={`w-32 h-32 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-all ${imagePreview ? 'border-solid border-blue-500' : ''}`}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <div className="text-center">
                      <img src={assets.upload_icon} alt="Upload" className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <span className="text-xs text-gray-500">Upload</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="car-image"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </label>
              <div>
                <p className="text-sm font-medium text-gray-900">Upload a picture of your car</p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
              </div>
            </div>
          </div>

          {/* Brand & Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Brand</label>
              <input
                type="text"
                placeholder="e.g. BMW, Mercedes, Audi..."
                required
                className={inputClasses}
                value={car.brand}
                onChange={(e) => setCar({ ...car, brand: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClasses}>Model</label>
              <input
                type="text"
                placeholder="e.g. X5, E-Class, A4..."
                required
                className={inputClasses}
                value={car.model}
                onChange={(e) => setCar({ ...car, model: e.target.value })}
              />
            </div>
          </div>

          {/* Year, Price, Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClasses}>Year</label>
              <input
                type="number"
                placeholder="2025"
                required
                className={inputClasses}
                value={car.year}
                onChange={(e) => setCar({ ...car, year: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClasses}>Daily Price ({currency})</label>
              <input
                type="number"
                placeholder="100"
                required
                className={inputClasses}
                value={car.pricePerDay}
                onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClasses}>Category</label>
              <select
                onChange={(e) => setCar({ ...car, category: e.target.value })}
                value={car.category}
                className={inputClasses}
                required
              >
                <option value="">Select category</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Van">Van</option>
                <option value="Sports">Sports</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>
          </div>

          {/* Transmission, Fuel Type, Seating */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClasses}>Transmission</label>
              <select
                onChange={(e) => setCar({ ...car, transmission: e.target.value })}
                value={car.transmission}
                className={inputClasses}
                required
              >
                <option value="">Select transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
              </select>
            </div>
            <div>
              <label className={labelClasses}>Fuel Type</label>
              <select
                onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
                value={car.fuel_type}
                className={inputClasses}
                required
              >
                <option value="">Select fuel type</option>
                <option value="Gas">Gas</option>
                <option value="Diesel">Diesel</option>
                <option value="Petrol">Petrol</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className={labelClasses}>Seating Capacity</label>
              <input
                type="number"
                placeholder="4"
                required
                className={inputClasses}
                value={car.seating_capacity}
                onChange={(e) => setCar({ ...car, seating_capacity: e.target.value })}
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className={labelClasses}>Location</label>
            <select
              onChange={(e) => setCar({ ...car, location: e.target.value })}
              value={car.location}
              className={inputClasses}
              required
            >
              <option value="">Select location</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Houston">Houston</option>
              <option value="Chicago">Chicago</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className={labelClasses}>Description</label>
            <textarea
              rows={4}
              placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine..."
              required
              className={`${inputClasses} resize-none`}
              value={car.description}
              onChange={(e) => setCar({ ...car, description: e.target.value })}
            ></textarea>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <img src={assets.tick_icon} alt="" className="w-5 h-5" />
            {isLoading ? "Listing Car..." : "List Your Car"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddCar;