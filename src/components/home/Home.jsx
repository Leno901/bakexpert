// About.js
import React from 'react';
import { motion } from 'framer-motion';
import { handleClick } from '../utils/global';
import NavButton from '../button/NavButton';
import './styles.css';  // Make sure to define other styles in your CSS

function About() {


  return (
    <motion.div className='home'>
      <h1>BakeXpert</h1>
      <span>Alternative E - Module for Advance Baking</span>
      <div className="nav-btn-container">
        <NavButton label="About" onClick={() => handleClick('About')} />
        <NavButton label="Modules" onClick={() => handleClick('Modules')} />
        <NavButton label="Vision & Mission" onClick={() => handleClick('Vision & Mission')} />
      </div>
    </motion.div>
  );
}

export default About;
