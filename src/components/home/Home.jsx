// About.js
import React from "react";
import { motion } from "framer-motion";
import { handleClick } from "../utils/global";
import NavButton from "../button/NavButton";
import "./styles.css"; // Make sure to define other styles in your CSS

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: "-50vh" }} // Start position: off-screen top
      animate={{ opacity: 1, y: 0 }} // End position: center with full opacity
      exit={{ opacity: 0, y: "50vh" }} // Exit position: off-screen bottom
      transition={{ type: "spring", stiffness: 75, damping: 25 }} // Smooth spring transition
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
          onClick={() => handleClick("vmission")}
        />
      </div>
    </motion.div>
  );
}

export default Home;
