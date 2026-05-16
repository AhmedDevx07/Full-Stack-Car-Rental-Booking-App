import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Cars", path: "/cars" },
    { name: "List Your Car", path: "/owner" },
    { name: "My Bookings", path: "/my-bookings" },
  ];

  const resources = [
    { name: "Help Center", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Insurance", href: "#" },
  ];

  const contactInfo = [
    { icon: "📍", text: "1234 Luxury Avenue, San Francisco" },
    { icon: "📞", text: "+1 555 123-4567" },
    { icon: "✉️", text: "info@luxurycarrental.com" },
  ];

  return (
    <footer className="bg-white text-gray-900 border-t border-gray-200">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link to="/" className="inline-block mb-4">
              <img src={assets.logo} alt="logo" className="h-10" />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 group">
                <img src={assets.facebook_logo} alt="Facebook" className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all duration-300 group">
                <img src={assets.instagram_logo} alt="Instagram" className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all duration-300 group">
                <img src={assets.twitter_logo} alt="Twitter" className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 group">
                <img src={assets.gmail_logo} alt="Gmail" className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-gray-900 font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-gray-900 font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {resources.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-gray-900 font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-500 text-sm">
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} CarRental. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Privacy</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Terms</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;