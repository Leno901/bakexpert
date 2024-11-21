// NavButton.js
import React from 'react';
import './styles.css';

function NavButton({ label, onClick }) {
  return (
    <button className="nav-btn" onClick={onClick}>
      {label}
    </button>
  );
}

export default NavButton;
