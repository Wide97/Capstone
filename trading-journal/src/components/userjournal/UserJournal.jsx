// Journal.jsx
import React, { useState } from "react";
import { createTrade } from "../utils/apiJournal"; // Importa la logica dal file apiJournal
import "./UserJournal.css"; // Aggiungeremo eventuali stili personalizzati
import FooterPage from "../footer/FooterPage";

const Journal = () => {
  const [tradeData, setTradeData] = useState({
    purchaseDate: "",
    saleDate: "",
    purchaseTime: "",
    saleTime: "",
    positionSize: "",
    leverage: "",
    strategy: "",
    tradeType: "LONG", // Default to LONG
    openingCosts: "",
    closingCosts: "",
    result: "PROFIT", // Default to PROFIT
    asset: "EUR/USD", // Default to EUR/USD
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTradeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createTrade(tradeData); // Usa la funzione di apiJournal
      setMessage("Trade creato con successo!");
    } catch (error) {
      setMessage("Errore nella creazione del trade.");
    }
  };

  return (
    <>
    <div className="container mt-5">
      <div className="text-center">
        <h2>Inserisci un Nuovo Trade</h2>
        <p>Compila i campi per registrare un nuovo trade nel tuo Journal</p>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="purchaseDate" className="form-label">Data di Acquisto</label>
          <input
            type="date"
            className="form-control"
            id="purchaseDate"
            name="purchaseDate"
            value={tradeData.purchaseDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="saleDate" className="form-label">Data di Vendita</label>
          <input
            type="date"
            className="form-control"
            id="saleDate"
            name="saleDate"
            value={tradeData.saleDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="purchaseTime" className="form-label">Ora di Acquisto</label>
          <input
            type="time"
            className="form-control"
            id="purchaseTime"
            name="purchaseTime"
            value={tradeData.purchaseTime}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="saleTime" className="form-label">Ora di Vendita</label>
          <input
            type="time"
            className="form-control"
            id="saleTime"
            name="saleTime"
            value={tradeData.saleTime}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="positionSize" className="form-label">Lottaggio della Posizione</label>
          <input
            type="number"
            className="form-control"
            id="positionSize"
            name="positionSize"
            value={tradeData.positionSize}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="leverage" className="form-label">Leva</label>
          <input
            type="text"
            className="form-control"
            id="leverage"
            name="leverage"
            value={tradeData.leverage}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="strategy" className="form-label">Strategia</label>
          <input
            type="text"
            className="form-control"
            id="strategy"
            name="strategy"
            value={tradeData.strategy}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tradeType" className="form-label">Tipo di Trade</label>
          <select
            className="form-select"
            id="tradeType"
            name="tradeType"
            value={tradeData.tradeType}
            onChange={handleInputChange}
            required
          >
            <option value="LONG">LONG</option>
            <option value="SHORT">SHORT</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="openingCosts" className="form-label">Costi di Apertura</label>
          <input
            type="number"
            className="form-control"
            id="openingCosts"
            name="openingCosts"
            value={tradeData.openingCosts}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="closingCosts" className="form-label">Costi di Chiusura</label>
          <input
            type="number"
            className="form-control"
            id="closingCosts"
            name="closingCosts"
            value={tradeData.closingCosts}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="result" className="form-label">Esito del Trade</label>
          <select
            className="form-select"
            id="result"
            name="result"
            value={tradeData.result}
            onChange={handleInputChange}
            required
          >
            <option value="PROFIT">Profit</option>
            <option value="STOP LOSS">Stop Loss</option>
            <option value="BREAK EVEN">Break Even</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="asset" className="form-label">Asset</label>
          <select
            className="form-select"
            id="asset"
            name="asset"
            value={tradeData.asset}
            onChange={handleInputChange}
            required
          >
            <option value="EUR/USD">EUR/USD</option>
            <option value="BTC/USD">BTC/USD</option>
            <option value="ETH/USD">ETH/USD</option>
            <option value="GOLD/USD">GOLD/USD</option>
            {/* Aggiungi gli altri asset qui */}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Crea Trade</button>
      </form>
    </div>
    <FooterPage/>
    </>
  );
};

export default Journal;

