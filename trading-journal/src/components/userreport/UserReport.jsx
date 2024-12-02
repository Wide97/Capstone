import React, { useState, useEffect, useRef } from "react";
import { getAllTrades, deleteTrade } from "../utils/apiReport";
import "./UserReport.scss"; 
import FooterPage from "../footer/FooterPage";
import UserNav from "../usernav/UserNav";
import Chart from "chart.js/auto";

const UserReport = () => {
  const [userData, setUserData] = useState({});
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [trades, setTrades] = useState([]);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    asset: "",
    strategy: "",
    result: "",
  });

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token non trovato, effettua il login.");
      return;
    }

    fetch("http://localhost:3001/api/auth/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel recupero del profilo utente.");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data.user);
        if (data.user.valuta && data.user.valuta.simbolo) {
          setCurrencySymbol(data.user.valuta.simbolo);
        }
        loadTrades(data.user.id);
      })
      .catch((error) => {
        console.error("Errore nel recupero dei dati dell'utente:", error);
        setError("Errore nel recupero del profilo utente.");
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTrades = async (userId) => {
    try {
      const trades = await getAllTrades(userId);
      setTrades(trades);
      updateChart(trades);
    } catch (error) {
      console.error("Errore nel caricamento dei trade:", error);
      setError("Errore nel recupero dei trade.");
    }
  };

  const handleDelete = async (tradeId) => {
    const userId = userData.id;

    try {
      await deleteTrade(tradeId, userId);
      const updatedTrades = trades.filter((trade) => trade.tradeId !== tradeId);
      setTrades(updatedTrades);
      updateChart(updatedTrades);
      setError("");
      alert("Trade eliminato con successo.");
    } catch (error) {
      console.error("Errore nell'eliminazione del trade:", error);
      setError("Errore nell'eliminazione del trade.");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredTrades = trades.filter((trade) => {
    return (
      (filters.asset === "" || trade.asset === filters.asset) &&
      (filters.strategy === "" || trade.strategy === filters.strategy) &&
      (filters.result === "" || trade.result === filters.result)
    );
  });

  const updateChart = (trades) => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const resultsCount = trades.reduce(
      (acc, trade) => {
        acc[trade.result] = (acc[trade.result] || 0) + 1;
        return acc;
      },
      { PROFIT: 0, STOP_LOSS: 0, BREAK_EVEN: 0 }
    );

    chartInstanceRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Profit", "Stop Loss", "Break Even"],
        datasets: [
          {
            label: "Distribuzione Esiti",
            data: [
              resultsCount.PROFIT,
              resultsCount.STOP_LOSS,
              resultsCount.BREAK_EVEN,
            ],
            backgroundColor: ["#28a745", "#dc3545", "#ffc107"],
          },
        ],
      },
    });
  };

  useEffect(() => {
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <UserNav userData={userData} />
      <div className="user-profile-container">
        <div className="profile-header text-center">
          <h2>Benvenuto, {userData.username}</h2>
        </div>
      </div>

      <div className="container mt-5">
        <h2 className="text-center mb-4">I Tuoi Trade</h2>

        {error && <div className="alert">{error}</div>}

        {/* Statistiche Responsive */}
        <div className="row text-center mb-4 profile-details">
          <div className="col-md-4 profile-details-h5">
            <h5>Numero di Trade</h5>
            <p>{trades.length}</p>
          </div>
          <div className="col-md-4 profile-details-h5">
            <h5>Successo (%)</h5>
            <p>
              {(
                (trades.filter((trade) => trade.result === "PROFIT").length /
                  trades.length) *
                  100 || 0
              ).toFixed(2)}
              %
            </p>
          </div>
          <div className="col-md-4 profile-details-h5">
            <h5>Profitto Netto ({currencySymbol})</h5>
            <p>
              {trades.reduce(
                (acc, trade) => acc + parseFloat(trade.profitLoss),
                0
              ).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Filtri Responsive */}
        <div className="row mb-4 input-container">
          <div className="col-md-4">
            <label className="text-form-group">Asset</label>
            <input
              type="text"
              className="form-control"
              name="asset"
              value={filters.asset}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-4">
            <label className="text-form-group">Strategia</label>
            <input
              type="text"
              className="form-control"
              name="strategy"
              value={filters.strategy}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-4">
            <label className="text-form-group">Esito</label>
            <select
              className="form-control"
              name="result"
              value={filters.result}
              onChange={handleFilterChange}
            >
              <option value="">Tutti</option>
              <option value="PROFIT">Profit</option>
              <option value="STOP_LOSS">Stop Loss</option>
              <option value="BREAK_EVEN">Break Even</option>
            </select>
          </div>
        </div>

        {/* Tabella Responsive */}
        <div className="table-responsive">
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
                <th>Profitto/Perdita ({currencySymbol})</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrades.map((trade) => (
                <tr key={trade.tradeId}>
                  <td>{trade.purchaseDate}</td>
                  <td>{trade.saleDate}</td>
                  <td>{trade.asset}</td>
                  <td>{trade.positionSize}</td>
                  <td>{trade.leverage}</td>
                  <td>{trade.strategy}</td>
                  <td>{trade.tradeType}</td>
                  <td>{trade.result}</td>
                  <td>{`${trade.profitLoss} ${currencySymbol}`}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(trade.tradeId)}
                      className="btn btn-danger"
                    >
                      Elimina
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Grafico Responsive */}
        <div className="mt-5 d-flex justify-content-center">
          <div style={{ maxWidth: "600px", width: "100%" }}>
            <canvas id="tradeChart" ref={chartRef} />
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default UserReport;

