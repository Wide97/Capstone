import React, { useState, useEffect, useRef } from "react";
import { getAllTrades, deleteTrade } from "../utils/apiReport";
import { getCapitaleAttuale } from "../utils/apiCapitale";
import "./UserReport.scss";
import FooterPage from "../footer/FooterPage";
import UserNav from "../usernav/UserNav";
import Chart from "chart.js/auto";

const UserReport = () => {
  const [userData, setUserData] = useState({});
  const [trades, setTrades] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [capital, setCapital] = useState(null);
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
        loadCapital(data.user.id, token); // Carica il capitale attuale
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

  // Funzione per caricare il capitale attuale
  const loadCapital = async (userId, token) => {
    try {
      const capitaleAttuale = await getCapitaleAttuale(userId, token);
      setCapital(capitaleAttuale);
    } catch (error) {
      console.error("Errore nel caricamento del capitale attuale:", error);
      setError("Errore nel recupero del capitale attuale.");
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
      // Ricarica il capitale attuale dopo aver eliminato un trade
      loadCapital(userId, localStorage.getItem("token"));
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
      <div className="user-report-container-ur">
        {/* Header Profilo */}
        <div className="profile-header-ur text-center">
          <h2 className="title-ur">Benvenuto, {userData.username}</h2>
        </div>

        {/* Capitale Attuale */}
        <div className="capital-container-ur text-center">
          <h4>
            Capitale Attuale:{" "}
            {capital !== null
              ? `${capital} ${currencySymbol}`
              : "Caricamento..."}
          </h4>

          {error && <div className="alert">{error}</div>}
        </div>

        {/* Statistiche */}
        <div className="stats-container-ur row text-center">
          <div className="col-md-4 stat-box-ur">
            <h5>Numero di Trade</h5>
            <p>{trades.length}</p>
          </div>
          <div className="col-md-4 stat-box-ur">
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
          <div className="col-md-4 stat-box-ur">
            <h5>Profitto Netto ({currencySymbol})</h5>
            <p>
              {trades
                .reduce((acc, trade) => acc + parseFloat(trade.profitLoss), 0)
                .toFixed(2)}
            </p>
          </div>
        </div>

        {/* Filtri */}
        <div className="filters-container-ur row">
          <div className="col-md-4">
            <label className="filter-label-ur">Asset</label>
            <input
              type="text"
              className="form-control-ur"
              name="asset"
              value={filters.asset}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-4">
            <label className="filter-label-ur">Strategia</label>
            <input
              type="text"
              className="form-control-ur"
              name="strategy"
              value={filters.strategy}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-4">
            <label className="filter-label-ur">Esito</label>
            <select
              className="form-control-ur"
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

        {/* Tabella */}
        <div className="table-container-ur table-responsive-ur">
          <table className="table-ur">
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
                      className="btn-delete-ur"
                    >
                      Elimina
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Grafico */}
        <div className="chart-container-ur">
          <canvas id="tradeChart" ref={chartRef} />
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default UserReport;
