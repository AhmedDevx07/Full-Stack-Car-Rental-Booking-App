import React, { useEffect, useState } from "react";
import TitleOwner from "../../components/owner/TitleOwner";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Dashboard = () => {
  const { currency, axios, isOwner } = useAppContext();
  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored, color: "blue" },
    { title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored, color: "purple" },
    { title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored, color: "orange" },
    { title: "Confirmed", value: data.completedBookings, icon: assets.check_icon, color: "green" },
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");
      if (data.success) {
        setData(data.dashboardData);
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
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]);

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50 text-blue-600",
      purple: "bg-purple-50 text-purple-600",
      orange: "bg-orange-50 text-orange-600",
      green: "bg-green-50 text-green-600",
    };
    return colors[color] || colors.blue;
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-6 md:p-10">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
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
        title="Admin Dashboard"
        subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {dashboardCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-card hover:shadow-premium transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(card.color)}`}>
                <img src={card.icon} alt={card.title} className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-card"
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
            <p className="text-sm text-gray-500">Latest customer bookings</p>
          </div>

          {data.recentBookings && data.recentBookings.length > 0 ? (
            <div className="space-y-4">
              {data.recentBookings.map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <img src={assets.carIcon} alt="Car" className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {booking.car?.brand} {booking.car?.model}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.createdAt?.split("T")[0]}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900">
                      {currency}{booking.price}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === "confirmed" ? "bg-green-100 text-green-700" :
                      booking.status === "pending" ? "bg-orange-100 text-orange-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No recent bookings
            </div>
          )}
        </motion.div>

        {/* Monthly Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white"
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Monthly Revenue</h2>
            <p className="text-blue-100 text-sm">Revenue for current month</p>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-bold">{currency}{data.monthlyRevenue || 0}</p>
              <p className="text-blue-100 text-sm mt-2">Total earnings this month</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <img src={assets.calendar_icon_colored} alt="Revenue" className="w-8 h-8 brightness-200" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;