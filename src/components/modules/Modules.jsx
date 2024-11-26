import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import "./styles.css"; // Make sure to define styles in your CSS

function Modules() {
  // Animation variants for each button
  const buttonVariants = {
    initial: { opacity: 0, scale: 0.8 }, // Start with reduced size and opacity
    animate: { opacity: 1, scale: 1 }, // Animate to full size and opacity
    hover: { scale: 1.1, boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }, // On hover, slightly enlarge and add shadow
  };

  return (
    <motion.div className="main-modules">
      {/* Module Navigation Buttons */}
      <div className="module-btn-container">
        <h2>Select a Module</h2>
        <div className="btn-group">
          {/* Buttons with individual animations */}
          {Array.from({ length: 5 }, (_, i) => (
            <motion.div
              key={i}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ type: "spring", stiffness: 50, delay: i * 0.1 }} // Stagger animation for each button
            >
              <Link to={`/modules/${i + 1}`}>
                <button className="module-btn">Module {i + 1}</button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Modules;
