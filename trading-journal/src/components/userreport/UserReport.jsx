import React, { useState, useEffect } from "react";
import { getAllTrades, deleteTrade } from "../utils/apiReport";
import "./UserReport.css";
import FooterPage from "../footer/FooterPage";
import UserNav from "../usernav/UserNav";

const UserReport = () => {
  const [userData, setUserData] = useState({});
  const [trades, setTrades] = useState([]);
  const [error, setError] = useState("");

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
        loadTrades(data.user.id);
      })
      .catch((error) => {
        console.error("Errore nel recupero dei dati dell'utente:", error);
      });
  }, []);

  const loadTrades = async (userId) => {
    try {
      const trades = await getAllTrades(userId);
      setTrades(trades);
    } catch (error) {
      setError("Errore nel recupero dei trade");
      console.error("Errore nel caricamento dei trade:", error);
    }
  };

  // Funzione per eliminare un trade
  const handleDelete = async (tradeId) => {
    const userId = userData.id;
    try {
      await deleteTrade(tradeId, userId);
      setTrades(trades.filter((trade) => trade.id !== tradeId));
      alert("Trade eliminato con successo");
    } catch (error) {
      setError("Errore nell'eliminazione del trade");
      console.error("Errore nell'eliminazione del trade:", error);
    }
  };

  return (
    <>
      <UserNav userData={userData} />
      <div className="container mt-5">
        <h2 className="text-center mb-4">I Tuoi Trade</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Data di Acquisto</th>
              <th>Data di Vendita</th>
              <th>Asset</th>
              <th>Posizione</th>
              <th>Leva</th>
              <th>Strategia</th>
              <th>Tipo di Trade</th>
              <th>Esito</th>
              <th>Profitto/Perdita</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => {
              const key = `${trade.purchaseDate}-${trade.asset}`;
              return (
                <tr key={key}>
                  <td>{trade.purchaseDate}</td>
                  <td>{trade.saleDate}</td>
                  <td>{trade.asset}</td>
                  <td>{trade.positionSize}</td>
                  <td>{trade.leverage}</td>
                  <td>{trade.strategy}</td>
                  <td>{trade.tradeType}</td>
                  <td>{trade.result}</td>
                  <td>{trade.profitLoss}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(trade.id)}
                      className="btn btn-danger"
                    >
                      Elimina
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <FooterPage />
    </>
  );
};

export default UserReport;
