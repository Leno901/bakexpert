import React from "react";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa"; // Import the Home icon from react-icons
import "./styles.css"; // Make sure to define styles in your CSS
import content from "../content.json";
import { handleClick } from "../utils/global";

function About() {
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100vw" }} // Start position: off-screen left
      animate={{ opacity: 1, x: 0 }} // End position: center with full opacity
      exit={{ opacity: 0, x: "100vw" }} // Exit position: off-screen right
      transition={{ type: "spring", stiffness: 50 }} // Smooth spring transition
      className="main-about"
    >
      {/* Home Button with Circular Background */}
      {/* <div className="abt-home-button">
        <button className="home-button" onClick={() => handleClick('/')}>
          <FaHome size={30} color="black" />
        </button>
        <span className="home-text" onClick={() => handleClick('/')}>Home</span>
      </div> */}

      <div className="abt-content">
        <h1 className="abt-h1">{content.about.title}</h1>
        <p className="abt-content-desc">{content.about.description}</p>
      </div>
    </motion.div>
  );
}

export default About;
