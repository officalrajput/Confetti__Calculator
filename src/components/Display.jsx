import React from 'react';
import '../styles/Display.css'; // Import the CSS file

const Display = ({ value }) => {
  return <input maxLength={12} type="text" className="display-input" value={value} readOnly />;
};

export default Display;
