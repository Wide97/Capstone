import React, { useState } from "react";
import { createTrade } from "../utils/apiJournal";
import "./UserJournal.css";
import FooterPage from "../footer/FooterPage";
import UserNav from "../usernav/UserNav"; 

const UserJournal = () => {

  const [purchaseDate, setPurchaseDate] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const [purchaseTime, setPurchaseTime] = useState("");
  const [saleTime, setSaleTime] = useState("");
  const [positionSize, setPositionSize] = useState("");
  const [leverage, setLeverage] = useState("");
  const [strategy, setStrategy] = useState("");
  const [tradeType, setTradeType] = useState("LONG"); 
  const [openingCosts, setOpeningCosts] = useState("");
  const [closingCosts, setClosingCosts] = useState("");
  const [result, setResult] = useState("PROFIT"); 
  const [asset, setAsset] = useState("EUR_USD"); 


  const resetForm = () => {
    setPurchaseDate("");
    setSaleDate("");
    setPurchaseTime("");
    setSaleTime("");
    setPositionSize("");
    setLeverage("");
    setStrategy("");
    setTradeType("LONG");
    setOpeningCosts("");
    setClosingCosts("");
    setResult("PROFIT");
    setAsset("EUR_USD");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const tradeData = {
      purchaseDate,
      saleDate,
      purchaseTime,
      saleTime,
      positionSize,
      leverage,
      strategy,
      tradeType,
      openingCosts,
      closingCosts,
      result,
      asset,
    };

    try {
      
      const response = await createTrade(tradeData);

      if (response.message) {
        alert(response.message);
        resetForm(); 
      }
    } catch (error) {
      alert("Errore nella creazione del trade");
      console.error(error);
    }
  };

  return (
    <>
      <UserNav />
      <h2 className="text-center text-white mt-5">Creazione Trade</h2>
      <div className="user-journal-container">
        <form onSubmit={handleSubmit} className="user-journal-form">
          <div className="form-group">
            <label>Data di Acquisto</label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Data di Vendita</label>
            <input
              type="date"
              value={saleDate}
              onChange={(e) => setSaleDate(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Ora di Acquisto</label>
            <input
              type="time"
              value={purchaseTime}
              onChange={(e) => setPurchaseTime(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Ora di Vendita</label>
            <input
              type="time"
              value={saleTime}
              onChange={(e) => setSaleTime(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Lottaggio della Posizione</label>
            <input
              type="number"
              value={positionSize}
              onChange={(e) => setPositionSize(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Leva</label>
            <input
              type="text"
              value={leverage}
              onChange={(e) => setLeverage(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Strategia</label>
            <input
              type="text"
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Tipo di Trade</label>
            <select
              value={tradeType}
              onChange={(e) => setTradeType(e.target.value)}
              className="form-control"
              required
            >
              <option value="LONG">LONG</option>
              <option value="SHORT">SHORT</option>
            </select>
          </div>

          <div className="form-group">
            <label>Costi di Apertura</label>
            <input
              type="number"
              value={openingCosts}
              onChange={(e) => setOpeningCosts(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Costi di Chiusura</label>
            <input
              type="number"
              value={closingCosts}
              onChange={(e) => setClosingCosts(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Esito del Trade</label>
            <select
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="form-control"
              required
            >
              <option value="PROFIT">Profitto</option>
              <option value="STOP_LOSS">Stop Loss</option>
              <option value="BREAK_EVEN">Break Even</option>
            </select>
          </div>

          <div className="form-group">
            <label>Asset</label>
            <select
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              className="form-control"
              required
            >
              <option value="EUR_USD">EUR/USD</option>
              <option value="BTC_USD">BTC/USD</option>
              <option value="GOLD_USD">GOLD/USD</option>
              <option value="SP500">SP500</option>
              {/* Aggiungi altre opzioni di asset qui */}
            </select>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Crea Trade
          </button>
        </form>
      </div>
      <FooterPage />
    </>
  );
};

export default UserJournal;
