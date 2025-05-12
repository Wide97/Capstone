import React from "react";
import "./LoadingSpinner.scss";

/**
 * Spinner di caricamento centrale.
 * Utilizzabile ovunque per feedback visivo durante l'attesa.
 */
const LoadingSpinner = () => (
  <div className="loading-spinner" role="status" aria-label="Caricamento in corso">
    <div className="spinner" />
  </div>
);

export default LoadingSpinner;
