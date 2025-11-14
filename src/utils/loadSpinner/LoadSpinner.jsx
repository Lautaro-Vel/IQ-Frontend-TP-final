import React from "react";
import "./LoadSpinner.css";

const LoadSpinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
    <span className="spinner-text">Cargando...</span>
  </div>
);

export default LoadSpinner;