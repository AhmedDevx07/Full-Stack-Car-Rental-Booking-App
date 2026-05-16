import React, { useEffect, useState } from "react";
import TitleOwner from "../../components/owner/TitleOwner";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";

const ManageBooking = () => {
  const { currency, axios } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/owner");
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

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post("/api/bookings/change-status", {
        bookingId,
        status,
      });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  const filteredBookings = filter === "all"
    ? bookings
    : bookings.filter(b => b.status === filter);

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
      <div className="flex-1 p-6 md:p-10 bg-gray-50">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="grid gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-28 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 md:p-10 bg-gray-50 min-h-screen">
      <TitleOwner
        title="Manage Bookings"
        subTitle="View all bookings for your cars, update their status, or cancel them if needed."
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mt-8 mb-6 overflow-x-auto pb-2">
        {["all", "pending", "confirmed", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-4 md:p-6 shadow-card hover:shadow-premium transition-all border border-gray-100"
              >
                <div className="flex flex-col md:flex-row items-start gap-4">
                  {/* Car Image & Info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-24 h-20 flex-shrink-0 rounded-xl overflow-hidden">
                      <img
                        src={booking.car.image}
                        alt={`${booking.car.brand} ${booking.car.model}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-gray-900">
                        {booking.car.brand} {booking.car.model}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {booking.car.year} • {booking.car.category}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <img src={assets.calendar_icon_colored} alt="Dates" className="w-4 h-4" />
                        <span>
                          {booking.pickupDate?.split("T")[0]} - {booking.returnDate?.split("T")[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {currency}{booking.price}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Total Amount</p>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center gap-3 mt-4 md:mt-0">
                    {booking.status === "pending" ? (
                      <select
                        onChange={(e) => changeBookingStatus(booking._id, e.target.value)}
                        value={booking.status}
                        className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirm</option>
                        <option value="cancelled">Cancel</option>
                      </select>
                    ) : (
                      <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusStyle(booking.status)}`}>
                        {booking.status}
                      </span>
                    )}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <img src={assets.location_icon_colored} alt="Location" className="w-4 h-4" />
                    <span>{booking.car.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">Booking ID: #{booking._id.slice(-8).toUpperCase()}</span>
                  </div>
                  <div className="ml-auto">
                    Booked on {booking.createdAt?.split("T")[0]}
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
                <img src={assets.listIcon} alt="No bookings" className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bookings Found</h3>
              <p className="text-gray-500">
                {filter === "all" ? "No bookings yet for your cars." : `No ${filter} bookings found.`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ManageBooking;