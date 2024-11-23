// Balloon.js
import React from 'react';
import './PopBalloon.css'; // Ensure your styles are imported

const Balloon = ({ color, delay, shouldFloat }) => {
  return (
    <div
      className={`balloon-wrapper ${color} ${shouldFloat ? 'float' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="balloon"></div>
      <div className="string"></div>
    </div>
  );
};

export default Balloon;