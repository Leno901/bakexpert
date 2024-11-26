import React from "react";
import { motion } from "framer-motion";
import "./styles.css"; // Ensure corresponding styles are defined
import content from "../content.json";

function Vmission() {
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100vw" }} // Start off-screen to the left
      animate={{ opacity: 1, x: 0 }} // Animate to the center with full opacity
      exit={{ opacity: 0, x: "100vw" }} // Exit off-screen to the right
      transition={{ type: "spring", stiffness: 50 }} // Springy transition effect
      className="vmission-container" // Updated class name
    >
      {/* Vision and Mission Title */}
      <h1 className="vmission-title">Vision & Mission</h1>

      {/* Vision and Mission Content */}
      <div className="vmission-content">
        <h2 className="vmission-vision-title">Vision</h2>
        <p className="vmission-desc">{content.vmission.vision}</p>

        <h2 className="vmission-mission-title">Mission</h2>
        <p className="vmission-desc">{content.vmission.mission}</p>
      </div>
    </motion.div>
  );
}

export default Vmission;
