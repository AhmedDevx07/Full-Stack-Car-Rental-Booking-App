import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const MyBookings = () => {
  const { axios, user, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user");
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 md:pt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50 pt-20 md:pt-30 pb-12"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Title
          title="My Bookings"
          subTitle="View and manage your all car bookings"
          align="left"
        />

        {bookings.length > 0 ? (
          <div className="space-y-6 mt-8">
            {bookings.map((booking, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                key={booking._id}
                className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-premium transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-4">
                  {/* Car Image + Info */}
                  <div className="md:col-span-1 p-4 md:p-0">
                    <div className="aspect-video md:aspect-auto md:h-full overflow-hidden">
                      <img
                        src={booking.car.image}
                        alt={`${booking.car.brand} ${booking.car.model}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="md:col-span-3 p-4 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {booking.car.brand} {booking.car.model}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                          {booking.car.year} • {booking.car.category} • {booking.car.location}
                        </p>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-sm font-medium border ${getStatusStyle(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <img src={assets.calendar_icon_colored} alt="Dates" className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Rental Period</p>
                          <p className="font-medium text-gray-900 text-sm">
                            {booking.pickupDate?.split("T")[0]} - {booking.returnDate?.split("T")[0]}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <img src={assets.location_icon_colored} alt="Location" className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Pick-up Location</p>
                          <p className="font-medium text-gray-900 text-sm">{booking.car.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <img src={assets.carIcon} alt="Car" className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Booking ID</p>
                          <p className="font-medium text-gray-900 text-sm">#{booking._id.slice(-8).toUpperCase()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Price & Date */}
                    <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-100 gap-4">
                      <div className="text-sm text-gray-500">
                        Booked on {booking.createdAt?.split("T")[0]}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total Price</p>
                        <h3 className="text-2xl font-bold text-blue-600">
                          {currency}{booking.price}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 mt-8 bg-white rounded-2xl shadow-card"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <img src={assets.carIcon} alt="No bookings" className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Yet</h3>
            <p className="text-gray-500">Start exploring cars and make your first booking!</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MyBookings;