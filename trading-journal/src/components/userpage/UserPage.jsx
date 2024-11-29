import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FooterPage from "../footer/FooterPage";
import "./UserPage.scss";
import UserNav from "../usernav/UserNav";
import tutorialVideo1 from "./Video1_Navigazione.mp4";
import tutorialVideo2 from "./Video2_ModificaDati.mp4";
import tutorialVideo3 from "./Video3_Sezioni.mp4";

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

        {/* Video Tutorial Section */}
        <div className="video-tutorials-section container my-5">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-5 text-center mb-4">
              <video className="responsive-iframe" controls>
                <source src={tutorialVideo1} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="col-md-5 mb-4">
              <p className="video-description">
                Video 1: Navigazione all'interno della dashboard – scopri come muoverti tra le varie sezioni, accedere al Journal, alle Analytics e ai Report.
              </p>
            </div>

            <div className="col-md-5 text-center mb-4">
              <video className="responsive-iframe" controls>
                <source src={tutorialVideo2} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="col-md-5 mb-4">
              <p className="video-description">
                Video 2: Come modificare i dati utente – impara a cambiare il tuo username, la password e a caricare una nuova immagine profilo per personalizzare il tuo account.
              </p>
            </div>

            <div className="col-md-5 text-center mb-4">
              <video className="responsive-iframe" controls>
                <source src={tutorialVideo3} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="col-md-5 mb-4">
              <p className="video-description">
                Video 3: Funzionamento delle varie sezioni – scopri come usare al meglio le sezioni Analytics, Report e Journal per tracciare e migliorare le tue performance di trading.
              </p>
            </div>
          </div>
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
