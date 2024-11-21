// About.js
import React from "react";
import { motion } from "framer-motion";
import { handleClick } from "../utils/global";
import NavButton from "../button/NavButton";
import "./styles.css"; // Make sure to define other styles in your CSS

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100vw" }} // Start position: off-screen left
      animate={{ opacity: 1, x: 0 }} // End position: center with full opacity
      exit={{ opacity: 0, x: "100vw" }} // Exit position: off-screen right
      transition={{ type: "spring", stiffness: 50 }} // Smooth spring transition
      className="home"
    >
      <div className="home-h1">BakeXpert</div>
      <div className="line-with-circle"></div>
      <span className="home-span">
        An Alternative E-Learning Module Designed to Elevate Your Skills in
        Advanced Baking Techniques and Master the Art of Culinary Precision.
      </span>
      <div className="nav-btn-container">
        <NavButton label="About" onClick={() => handleClick("about")} />
        <NavButton label="Modules" onClick={() => handleClick("modules")} />
        <NavButton
          label="Vision & Mission"
          onClick={() => handleClick("Vision & Mission")}
        />
      </div>
    </motion.div>
  );
}

export default Home;
