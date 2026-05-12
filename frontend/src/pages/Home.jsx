import React from "react";
import Hero from "../components/Hero";
import FeaturedSection from "../components/featuredSection";
import Banner from "../components/Banner";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <Banner/>
      <Testimonials/>
    </>
  );
};

export default Home;
