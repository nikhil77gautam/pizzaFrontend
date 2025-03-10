import React, { useRef } from "react";
import Navigation2 from "./Componant/Navigation2";
import Home from "./Componant/Home";
import Slider from "./Componant/Slider";
import Pizzass from "./Componant/Pizzass";
import Footer from "./Componant/Foter";
import NavCategory from "./Componant/NavCategory";

const MainApp = () => {
  
   // Refs for scrolling to sections
   const vegRef = useRef(null);
   const nonVegRef = useRef(null);
   const Beverages = useRef(null);
   const Desserts = useRef(null);
   

   const scrollToVeg = () => {
    vegRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToNonVeg = () => {
    nonVegRef.current.scrollIntoView({ behavior: 'smooth' });
  };
   const scrollToBeverages = () => {
    Beverages.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDesserts = () => {
    Desserts.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
    <NavCategory scrollToVeg={scrollToVeg} scrollToNonVeg={scrollToNonVeg} scrollToBeverages={scrollToBeverages} scrollToDesserts={scrollToDesserts}/>
      <Slider />
        <Home />

      <Pizzass  vegRef={vegRef} nonVegRef={nonVegRef} Beverages={Beverages} Desserts={Desserts}/>
      <Footer />
    </div>
  );
};

export default MainApp;
