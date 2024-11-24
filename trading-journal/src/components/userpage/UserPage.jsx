import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FooterPage from "../footer/FooterPage";
import "./UserPage.css";
import UserNav from "../usernav/UserNav";

const UserPage = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    fetch("http://localhost:3001/api/auth/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.user);  
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return (
    <>
      <UserNav userData={userData} /> 
      <div className="userpage-container">
        <div className="hero-section text-center">
          <h1 className="hero-title">Benvenuto nella tua Dashboard</h1>
          <p className="hero-description">
            Esplora le funzionalità del tuo Trading Journal. Traccia le tue
            operazioni, analizza i tuoi dati e accedi ai report dettagliati.
          </p>
        </div>

        <div className="features-section container">
          <div className="row">
            {/* Journal Section */}
            <div className="col-md-6 col-lg-4 text-center">
              <div className="feature-card shadow">
                <h3 className="feature-title">Journal</h3>
                <p className="feature-description">
                  Registra le tue operazioni quotidiane e tieni traccia dei tuoi
                  progressi.
                </p>
                <Link to="/userjournal" className="btn-feature text-light">
                  Vai al Journal
                </Link>
              </div>
            </div>

            {/* Analytics Section */}
            <div className="col-md-6 col-lg-4 text-center">
              <div className="feature-card shadow">
                <h3 className="feature-title">Analytics</h3>
                <p className="feature-description">
                  Analizza le tue performance con grafici dettagliati e
                  statistici.
                </p>
                <Link to="/useranalytics" className="btn-feature text-light">
                  Vai alle Analytics
                </Link>
              </div>
            </div>

            {/* Reporting Section */}
            <div className="col-md-6 col-lg-4 text-center">
              <div className="feature-card shadow">
                <h3 className="feature-title">Reporting</h3>
                <p className="feature-description">
                  Visualizza tutti i tuoi trade e scarica i report dettagliati.
                </p>
                <Link to="/userreport" className="btn-feature text-light">
                  Vai al Reporting
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default UserPage;

