import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FooterPage from "../footer/FooterPage";
import "./UserPage.scss";
import UserNav from "../usernav/UserNav";
import tutorialVideo1 from "./Video1_Navigazione.mp4";
import tutorialVideo2 from "./Video2_ModificaDati.mp4";
import tutorialVideo3 from "./Video3_Sezioni.mp4";
import { aggiornaValuta } from "../utils/apiValuta";

const UserPage = () => {
  const [userData, setUserData] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/api/auth/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.user);
        setSelectedCurrency(data.user.valuta); // Imposta la valuta attuale come valore di default
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const handleUpdateCurrency = async () => {
    const token = localStorage.getItem("token");

    try {
      // Aggiorna la valuta nel backend
      await aggiornaValuta(userData.id, selectedCurrency, token);

      // Aggiorna lo stato locale per riflettere la nuova valuta
      setUserData((prevUserData) => ({
        ...prevUserData,
        valuta: selectedCurrency,
      }));

      setMessage("Valuta aggiornata con successo!");

      setTimeout(() => {
        setMessage("");
      }, 1000);
    } catch (error) {
      setMessage("Errore durante l'aggiornamento della valuta.");
    }
  };

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

          {/* Sezione di selezione valuta */}
          <div className="currency-selection container mt-4">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="currency" className="currency-label">
                    Seleziona la tua valuta preferita:
                  </label>
                  <select
                    id="currency"
                    value={selectedCurrency}
                    onChange={handleCurrencyChange}
                    className="form-select mt-2"
                  >
                    <option value="USD">USD - Dollaro Statunitense</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - Sterlina Inglese</option>
                    <option value="JPY">JPY - Yen Giapponese</option>
                    <option value="AUD">AUD - Dollaro Australiano</option>
                    <option value="CAD">CAD - Dollaro Canadese</option>
                    <option value="CHF">CHF - Franco Svizzero</option>
                    <option value="NZD">NZD - Dollaro Neozelandese</option>
                  </select>
                </div>
                <button
                  className="btn-currency-update btn-lg mt-3 w-100"
                  onClick={handleUpdateCurrency}
                >
                  Aggiorna Valuta
                </button>
                {message && <p className="currency-message mt-2">{message}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Video Tutorial Section */}
        <div className="video-tutorials-section container my-5">
          <div className="row justify-content-center align-items-center">
            {[tutorialVideo1, tutorialVideo2, tutorialVideo3].map(
              (video, index) => (
                <React.Fragment key={index}>
                  <div className="col-md-5 text-center mb-4">
                    <video className="responsive-iframe" controls>
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="col-md-5 mb-4">
                    <p className="video-description">
                      {`Video ${index + 1}: ${
                        index === 0
                          ? "Navigazione all'interno della dashboard – scopri come muoverti tra le varie sezioni, accedere al Journal, alle Analytics e ai Report."
                          : index === 1
                          ? "Come modificare i dati utente – impara a cambiare il tuo username, la password e a caricare una nuova immagine profilo per personalizzare il tuo account."
                          : "Funzionamento delle varie sezioni – scopri come usare al meglio le sezioni Analytics, Report e Journal per tracciare e migliorare le tue performance di trading."
                      }`}
                    </p>
                  </div>
                </React.Fragment>
              )
            )}
          </div>
        </div>

        <div className="features-section container">
          <div className="row">
            {/* Journal Section */}
            <div className="col-md-6 col-lg-4 text-center mb-4">
              <div className="feature-card shadow h-100">
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
            <div className="col-md-6 col-lg-4 text-center mb-4">
              <div className="feature-card shadow h-100">
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
            <div className="col-md-6 col-lg-4 text-center mb-4">
              <div className="feature-card shadow h-100">
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
