import React, { useState } from "react";
import { motion } from "motion/react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing!");
      setEmail("");
    }
  };

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
      >
        {/* Background Effects */}
         <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Never Miss a Deal!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-200 text-lg mb-8 max-w-xl mx-auto"
          >
            Subscribe to get the latest offers, new arrivals, and exclusive discounts delivered to your inbox.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-3 max-w-xl mx-auto"
          >
            <input
              className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:bg-white/20 focus:border-white/40 transition-all"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Subscribe
            </motion.button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-200 text-sm mt-4"
          >
            No spam, unsubscribe anytime.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;