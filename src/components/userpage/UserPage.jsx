import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FooterPage from "../footer/FooterPage.jsx";
import "./UserPage.scss";
import UserNav from "../usernav/UserNav.jsx";
import tutorialVideo1 from "./Navigazione.mp4";
import tutorialVideo2 from "./Profilo.mp4";
import tutorialVideo3 from "./Usage.mp4";
import { aggiornaValuta, getAllValute } from "../utils/apiValuta";
import { getCapitaleByUserId, setCapitaleIniziale } from "../utils/apiCapitale";

const UserPage = () => {
  const [userData, setUserData] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [message, setMessage] = useState("");
  const [valute, setValute] = useState([]);
  const [capitaleIniziale, setCapitaleInizialeValue] = useState("");
  const [newCapitaleIniziale, setNewCapitaleIniziale] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const API_BASE_URL = import.meta.env.VITE_API_URL;


    fetch(`${API_BASE_URL}/api/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.user);
        setSelectedCurrency(data.user.valuta?.id);

        getCapitaleByUserId(data.user.id, token)
          .then((capitale) => {
            setCapitaleInizialeValue(capitale.capitaleIniziale);
          })
          .catch((error) =>
            console.error("Errore durante il recupero del capitale:", error)
          );
      })
      .catch((error) => console.error("Error fetching user data:", error));

    getAllValute()
      .then((data) => {
        setValute(data);
      })
      .catch((error) =>
        console.error("Errore durante il recupero delle valute:", error)
      );
  }, []);

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const handleUpdateCurrency = async () => {
    const token = localStorage.getItem("token");
    const API_BASE_URL = import.meta.env.VITE_API_URL;


    try {
      await aggiornaValuta(userData.id, selectedCurrency, token);

      fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data.user);
        });

      setMessage("Valuta aggiornata con successo!");
      setTimeout(() => setMessage(""), 1000);
    } catch (error) {
      setMessage("Errore durante l'aggiornamento della valuta.");
    }
  };

  const handleSetCapitaleIniziale = async () => {
    const token = localStorage.getItem("token");

    try {
      await setCapitaleIniziale(userData.id, newCapitaleIniziale, token);

      setCapitaleInizialeValue(newCapitaleIniziale);
      setNewCapitaleIniziale("");

      setMessage("Capitale iniziale impostato con successo!");

      setTimeout(() => {
        setMessage("");
      }, 1000);
    } catch (error) {
      setMessage("Errore durante l'impostazione del capitale iniziale.");
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
        </div>

        {/* Sezione per impostare e visualizzare il capitale iniziale */}
        <div className="capitale-valuta-section container mt-5">
          <div className="row justify-content-center">
            {/* Colonna per impostare il capitale iniziale */}
            <div className="col-lg-6 col-md-12 mb-4">
              <div className="form-group">
                <label htmlFor="capitaleIniziale" className="capitale-label">
                  Imposta Capitale:
                </label>
                <input
                  type="number"
                  id="capitaleIniziale"
                  value={newCapitaleIniziale}
                  onChange={(e) => setNewCapitaleIniziale(e.target.value)}
                  className="form-control mt-2"
                />
              </div>
              <button
                className="btn-set-capitale btn-lg mt-3 w-100"
                onClick={handleSetCapitaleIniziale}
              >
                Imposta Capitale Iniziale
              </button>
            </div>

            {/* Colonna per selezionare la valuta */}
            <div className="col-lg-6 col-md-12 mb-4">
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
                  {valute.map((valuta) => (
                    <option key={valuta.id} value={valuta.id}>
                      {valuta.codice} - {valuta.nome}
                    </option>
                  ))}
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

            {/* Sezione per visualizzare il capitale iniziale */}
            <div className="col-md-6 mb-4 spacing">
              <div className="form-group text-center">
                <label className="capitale-label2">Capitale Iniziale:</label>
                <div className="capitale-value mt-2">
                  {capitaleIniziale
                    ? `${capitaleIniziale} ${userData?.valuta?.simbolo || ""}`
                    : "-"}
                </div>
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

        <div className="features-section-up container">
          <div className="row">
            {/* Journal Section */}
            <div className="col-md-6 col-lg-3 text-center mb-4">
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
            <div className="col-md-6 col-lg-3 text-center mb-4">
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
            <div className="col-md-6 col-lg-3 text-center mb-4">
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

            {/* Storico Session*/}
            <div className="col-md-6 col-lg-3 text-center mb-4">
              <div className="feature-card shadow h-100">
                <h3 className="feature-title">Storico</h3>
                <p className="feature-description">
                  Analizza le tue performance con grafici dettagliati e
                  statistici.
                </p>
                <Link to="/userstorico" className="btn-feature text-light">
                  Vai allo Storico
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
