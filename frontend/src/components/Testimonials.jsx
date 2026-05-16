import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Los Angeles, USA",
      image: assets.testimonial_image_1,
      rating: 5,
      testimonial: "Amazing service! The car was in perfect condition and the pickup process was seamless. Will definitely rent again!",
    },
    {
      name: "Michael Chen",
      location: "San Francisco, USA",
      image: assets.testimonial_image_2,
      rating: 5,
      testimonial: "Best car rental experience I've ever had. Professional staff, clean cars, and competitive prices. Highly recommended!",
    },
    {
      name: "Emily Davis",
      location: "Miami, USA",
      image: assets.testimonial_image_1,
      rating: 5,
      testimonial: "From booking to return, everything was smooth. The team was very helpful and accommodating. Truly exceptional service!",
    },
  ];

  return (
    <section className="py-20 md:py-24 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Title
            title="What Our Customers Say"
            subTitle="Discover why thousands of happy customers trust us for their car rental needs."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-card hover:shadow-premium transition-all duration-300 border border-gray-100"
            >
              {/* Quote Icon */}
              <div className="text-blue-600 text-4xl font-serif mb-4">"</div>

              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <img key={i} src={assets.star_icon} alt="Star" className="w-4 h-4" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 leading-relaxed mb-6">
                {testimonial.testimonial}
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;