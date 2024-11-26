import React, { useState, useEffect } from "react";
import { createTrade } from "../utils/apiJournal";
import "./UserJournal.css";
import FooterPage from "../footer/FooterPage";
import UserNav from "../usernav/UserNav";

const UserJournal = () => {
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    purchaseDate: "",
    saleDate: "",
    purchaseTime: "",
    saleTime: "",
    positionSize: "",
    leverage: "",
    strategy: "",
    tradeType: "LONG",
    openingCosts: "",
    closingCosts: "",
    result: "PROFIT",
    profitLoss: "",
    asset: "EUR_USD",
  });

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
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const resetForm = () => {
    setFormData({
      purchaseDate: "",
      saleDate: "",
      purchaseTime: "",
      saleTime: "",
      positionSize: "",
      leverage: "",
      strategy: "",
      tradeType: "LONG",
      openingCosts: "",
      closingCosts: "",
      result: "PROFIT",
      profitLoss: "",
      asset: "EUR_USD",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createTrade(formData);
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
      <UserNav userData={userData} />
      <h2 className="text-center mb-4">Creazione Trade</h2>
      <div className="container container-journal mt-5">
        <form onSubmit={handleSubmit} className="row gy-3">
          {/* Time Group */}
          <div className="col-12">
            <h4>Time</h4>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <label>Data di Acquisto</label>
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <label>Data di Vendita</label>
            <input
              type="date"
              name="saleDate"
              value={formData.saleDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <label>Ora di Acquisto</label>
            <input
              type="time"
              name="purchaseTime"
              value={formData.purchaseTime}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <label>Ora di Vendita</label>
            <input
              type="time"
              name="saleTime"
              value={formData.saleTime}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Lots & Leverage Group */}
          <div className="col-12">
            <h4>Lots & Leverage</h4>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <label>Lottaggio della Posizione</label>
            <input
              type="number"
              name="positionSize"
              value={formData.positionSize}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <label>Leva</label>
            <input
              type="text"
              name="leverage"
              value={formData.leverage}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Trade Group */}
          <div className="col-12">
            <h4>Trade</h4>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <label>Strategia</label>
            <input
              type="text"
              name="strategy"
              value={formData.strategy}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <label>Tipo di Trade</label>
            <select
              name="tradeType"
              value={formData.tradeType}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="LONG">LONG</option>
              <option value="SHORT">SHORT</option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <label>Asset</label>
            <select
              name="asset"
              value={formData.asset}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="EUR_USD">EUR/USD</option>
              <option value="USD_JPY">USD/JPY</option>
              <option value="GBP_USD">GBP/USD</option>
              <option value="AUD_USD">AUD/USD</option>
              <option value="USD_CAD">USD/CAD</option>
              <option value="EUR_GBP">EUR/GBP</option>
              <option value="EUR_JPY">EUR/JPY</option>
              <option value="NZD_USD">NZD/USD</option>
              <option value="USD_CHF">USD/CHF</option>
              <option value="USD_CNY">USD/CNY</option>
              <option value="BTC_USD">BTC/USD</option>
              <option value="ETH_USD">ETH/USD</option>
              <option value="LTC_USD">LTC/USD</option>
              <option value="XRP_USD">XRP/USD</option>
              <option value="DOGE_USD">DOGE/USD</option>
              <option value="ADA_USD">ADA/USD</option>
              <option value="DOT_USD">DOT/USD</option>
              <option value="SOL_USD">SOL/USD</option>
              <option value="AVAX_USD">AVAX/USD</option>
              <option value="MATIC_USD">MATIC/USD</option>
              <option value="SP500">SP500</option>
              <option value="NASDAQ">NASDAQ</option>
              <option value="DOWJONES">DOWJONES</option>
              <option value="FTSE100">FTSE100</option>
              <option value="NIKKEI">NIKKEI</option>
              <option value="HANGSENG">HANGSENG</option>
              <option value="CAC40">CAC40</option>
              <option value="DAX">DAX</option>
              <option value="ASX200">ASX200</option>
              <option value="SENSEX">SENSEX</option>
              <option value="RTS">RTS</option>
              <option value="GOLD_USD">GOLD/USD</option>
              <option value="SILVER_USD">SILVER/USD</option>
              <option value="WTI_OIL">WTI OIL</option>
              <option value="BRENT_OIL">BRENT OIL</option>
              <option value="COPPER_USD">COPPER/USD</option>
              <option value="PLATINUM_USD">PLATINUM/USD</option>
              <option value="PALLADIUM_USD">PALLADIUM/USD</option>
              <option value="COFFEE_USD">COFFEE/USD</option>
              <option value="SUGAR_USD">SUGAR/USD</option>
              <option value="COCOA_USD">COCOA/USD</option>
              <option value="WHEAT_USD">WHEAT/USD</option>
              <option value="CORN_USD">CORN/USD</option>
              <option value="RICE_USD">RICE/USD</option>
              <option value="SOYBEANS_USD">SOYBEANS/USD</option>
              <option value="OAT_USD">OAT/USD</option>
              <option value="SUGAR_CANE_USD">SUGAR CANE/USD</option>
              <option value="LUMBER_USD">LUMBER/USD</option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <label>Esito del Trade</label>
            <select
              name="result"
              value={formData.result}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="PROFIT">Profitto</option>
              <option value="STOP_LOSS">Stop Loss</option>
              <option value="BREAK_EVEN">Break Even</option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <label>Ammontare del profitto/perdita</label>
            <input
              type="number"
              name="profitLoss"
              value={formData.profitLoss}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Costs Group */}
          <div className="col-12">
            <h4>Costs</h4>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <label>Costi di Apertura</label>
            <input
              type="number"
              name="openingCosts"
              value={formData.openingCosts}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <label>Costi di Chiusura</label>
            <input
              type="number"
              name="closingCosts"
              value={formData.closingCosts}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-12 text-center mt-4">
            <button type="submit" className="button-journal">
              Crea Trade
            </button>
          </div>
        </form>
      </div>
      <FooterPage />
    </>
  );
};

export default UserJournal;
