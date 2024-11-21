import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import { FaHome } from "react-icons/fa"; // Import the Home icon from react-icons
import "./styles.css"; // Make sure to define styles in your CSS
import content from "../content.json";
import { handleClick } from "../utils/global";

function Modules() {
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100vw" }} // Start position: off-screen left
      animate={{ opacity: 1, x: 0 }} // End position: center with full opacity
      exit={{ opacity: 0, x: "100vw" }} // Exit position: off-screen right
      transition={{ type: "spring", stiffness: 50 }} // Smooth spring transition
      className="main-modules"
    >
      {/* Module Navigation Buttons */}
      <div className="module-btn-container">
        <h2>Select a Module</h2>
        <div className="btn-group">
          {/* Button for each module */}
          <Link to="/modules/1">
            <button className="module-btn">Module 1</button>
          </Link>
          <Link to="/modules/2">
            <button className="module-btn">Module 2</button>
          </Link>
          <Link to="/modules/3">
            <button className="module-btn">Module 3</button>
          </Link>
          <Link to="/modules/4">
            <button className="module-btn">Module 4</button>
          </Link>
          <Link to="/modules/5">
            <button className="module-btn">Module 5</button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Modules;
