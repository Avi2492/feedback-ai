"use client";

import "./globals.css";
import CarouselScreen from "./components/landingpage/CarouselScreen";
import HeroScreen from "./components/landingpage/HeroScreen";

const Home = () => {
  return (
    <>
      <HeroScreen />
      <CarouselScreen />
    </>
  );
};

export default Home;
