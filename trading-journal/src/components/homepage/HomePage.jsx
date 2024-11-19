import React from "react";
import NavbarPage from "../navbar/NavbarPage"; 
import "./HomePage.css"; 

const HomePage = () => {
  return (
    <>
      {/* Navbar */}
      <NavbarPage />

      {/* Main Content */}
      <div className="homepage-container d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="text-center mb-4">Benvenuto nel Trading Journal</h1>
        <p className="text-center mb-4">
          Tieni traccia delle tue operazioni e migliora la tua strategia.
        </p>
        <div>
          
        </div>
      </div>
    </>
  );
};

export default HomePage;


