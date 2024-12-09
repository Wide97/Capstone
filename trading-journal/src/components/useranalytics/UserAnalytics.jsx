import React, { useState, useEffect, useRef } from "react";
import { getAllTrades } from "../utils/apiReport";
import FooterPage from "../footer/FooterPage";
import UserNav from "../usernav/UserNav";
import Chart from "chart.js/auto";
import "./UserAnalytics.scss";
import { getCapitaleIniziale } from "../utils/apiCapitale";
import LoadingSpinner from "../spinner/LoadingSpinner"; 

const UserAnalytics = () => {
  const [userData, setUserData] = useState({});
  const [performanceData, setPerformanceData] = useState(null);
  const [equityData, setEquityData] = useState(null);
  const [strategyData, setStrategyData] = useState(null);
  const [tradeTypeData, setTradeTypeData] = useState(null);
  const [tradePerformanceData, setTradePerformanceData] = useState(null);
  const [tradeSessionData, setTradeSessionData] = useState(null);
  const [error, setError] = useState("");
  const [capitalTrendData, setCapitalTrendData] = useState(null);
  const [loading, setLoading] = useState(true);

  const chartRefPerformance = useRef(null);
  const chartRefEquity = useRef(null);
  const chartRefStrategy = useRef(null);
  const chartRefTradeType = useRef(null);
  const chartRefTradePerformance = useRef(null);
  const chartRefTradeSession = useRef(null);
  const chartRefCapitalTrend = useRef(null);

  const chartInstancePerformance = useRef(null);
  const chartInstanceEquity = useRef(null);
  const chartInstanceStrategy = useRef(null);
  const chartInstanceTradeType = useRef(null);
  const chartInstanceTradePerformance = useRef(null);
  const chartInstanceTradeSession = useRef(null);
  const chartInstanceCapitalTrend = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || token === "null" || token === "undefined") {
      setError("Token non valido, effettua il login.");
      setLoading(false); 
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
        loadAnalytics(data.user.id, token);
      })
      .catch((error) => {
        console.error("Errore nel recupero del profilo utente:", error);
        setError("Errore nel recupero del profilo utente.");
        setLoading(false); 
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Crea il grafico del trend del capitale una volta che i dati sono disponibili
    if (capitalTrendData && chartRefCapitalTrend.current) {
      createCapitalTrendChart(capitalTrendData);
    }
  }, [capitalTrendData]);

  const loadAnalytics = async (userId, token) => {
    try {
      const trades = await getAllTrades(userId);
      const performance = processTradePerformance(trades);
      const equity = processEquityCurve(performance);
      const strategyPerformance = processStrategyPerformance(trades);
      const tradeTypeDistribution = processTradeTypeDistribution(trades);
      const tradePerformanceDistribution =
        processTradePerformanceDistribution(trades);
      const tradeSessionDistribution = processTradesBySession(trades);
      const capitalTrend = await getCapitalTrend(userId, token);

      setPerformanceData(performance);
      setEquityData(equity);
      setStrategyData(strategyPerformance);
      setTradeTypeData(tradeTypeDistribution);
      setTradePerformanceData(tradePerformanceDistribution);
      setTradeSessionData(tradeSessionDistribution);
      setCapitalTrendData(capitalTrend);

      createPerformanceChart(performance);
      createEquityChart(equity);
      createStrategyChart(strategyPerformance);
      createTradeTypeChart(tradeTypeDistribution);
      createTradePerformanceChart(tradePerformanceDistribution);
      createTradeSessionChart(tradeSessionDistribution);
    } catch (error) {
      console.error("Errore nel caricamento dei dati analitici:", error);
      setError("Errore nel recupero dei dati analitici.");
    } finally {
      setLoading(false); 
    }
  };

  const getCapitalTrend = async (userId, token) => {
    try {
      // Recupera il capitale iniziale
      const capitaleIniziale = await getCapitaleIniziale(userId, token);

      // Verifica che il capitale iniziale sia un numero valido
      if (!capitaleIniziale || isNaN(parseFloat(capitaleIniziale))) {
        throw new Error(
          "Il capitale iniziale non è stato restituito correttamente dal backend."
        );
      }

      let cumulativeCapital = parseFloat(capitaleIniziale);
      const trades = await getAllTrades(userId);

      const capitalData = [{ date: "Iniziale", capital: cumulativeCapital }];

      trades.forEach((trade) => {
        let profitLoss = parseFloat(trade.profitLoss);
        if (isNaN(profitLoss)) {
          console.error(
            "Errore: il profit/loss del trade non è un numero valido.",
            trade.profitLoss
          );
          profitLoss = 0;
        }
        cumulativeCapital += profitLoss;
        capitalData.push({
          date: trade.saleDate,
          capital: cumulativeCapital,
        });
      });

      const dates = capitalData.map((data) => data.date);
      const capitalValues = capitalData.map((data) => data.capital);

      return { dates, capitalValues };
    } catch (error) {
      console.error(
        "Errore durante il recupero del trend del capitale:",
        error
      );
      throw error;
    }
  };

  const createCapitalTrendChart = (data) => {
    if (chartInstanceCapitalTrend.current) {
      chartInstanceCapitalTrend.current.destroy();
    }

    if (!chartRefCapitalTrend.current) {
      console.error("Canvas per il grafico Trend Capitale non disponibile.");
      return;
    }

    const ctx = chartRefCapitalTrend.current.getContext("2d");
    chartInstanceCapitalTrend.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.dates,
        datasets: [
          {
            label: "Capitale Attuale",
            data: data.capitalValues,
            borderColor: "#007bff",
            backgroundColor: "rgba(0, 123, 255, 0.2)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: {
            display: true,
            text: "Andamento del Capitale Attuale",
            color: "#FFC200",
          },
        },
        scales: {
          x: {
            title: { display: true, text: "Date", color: "#FFC200" },
            ticks: { color: "#FFC200" },
          },
          y: {
            title: { display: true, text: "Capitale", color: "#FFC200" },
            ticks: { color: "#FFC200" },
          },
        },
      },
    });
  };

  const processTradePerformance = (trades) => {
    const dateMap = {};

    trades.forEach((trade) => {
      const date = trade.saleDate;
      if (!dateMap[date]) {
        dateMap[date] = 0;
      }
      dateMap[date] += trade.profitLoss;
    });

    const dates = Object.keys(dateMap).sort();
    const profitLoss = dates.map((date) => dateMap[date]);

    return { dates, profitLoss };
  };

  const processEquityCurve = (performance) => {
    const equity = [];
    let cumulative = 0;

    performance.profitLoss.forEach((value) => {
      cumulative += value;
      equity.push(cumulative);
    });

    return { dates: performance.dates, equity };
  };

  const processStrategyPerformance = (trades) => {
    const strategyMap = {};

    trades.forEach((trade) => {
      const strategy = trade.strategy;
      if (!strategyMap[strategy]) {
        strategyMap[strategy] = 0;
      }
      strategyMap[strategy] += trade.profitLoss;
    });

    const strategies = Object.keys(strategyMap);
    const profitLoss = strategies.map((strategy) => strategyMap[strategy]);

    return { strategies, profitLoss };
  };

  const processTradeTypeDistribution = (trades) => {
    let longCount = 0;
    let shortCount = 0;

    trades.forEach((trade) => {
      if (trade.tradeType === "LONG") {
        longCount++;
      } else if (trade.tradeType === "SHORT") {
        shortCount++;
      }
    });

    return { long: longCount, short: shortCount };
  };

  const processTradesBySession = (trades) => {
    const sessions = { Asia: 0, Europa: 0, America: 0 };

    trades.forEach((trade) => {
      const time = trade.purchaseTime.split(":");
      const hour = parseInt(time[0], 10);

      if (hour >= 0 && hour < 8) {
        sessions.Asia++;
      } else if (hour >= 8 && hour < 16) {
        sessions.Europa++;
      } else {
        sessions.America++;
      }
    });

    return sessions;
  };

  const processTradePerformanceDistribution = (trades) => {
    let profitCount = 0;
    let stopLossCount = 0;
    let breakEvenCount = 0;

    trades.forEach((trade) => {
      if (trade.result === "PROFIT") {
        profitCount++;
      } else if (trade.result === "STOP_LOSS") {
        stopLossCount++;
      } else if (trade.result === "BREAK_EVEN") {
        breakEvenCount++;
      }
    });

    return {
      profit: profitCount,
      stopLoss: stopLossCount,
      breakEven: breakEvenCount,
    };
  };

  const createPerformanceChart = (data) => {
    if (chartInstancePerformance.current) {
      chartInstancePerformance.current.destroy();
    }

    const ctx = chartRefPerformance.current.getContext("2d");
    chartInstancePerformance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.dates,
        datasets: [
          {
            label: "Profit/Loss",
            data: data.profitLoss,
            borderColor: "#FFC200",
            backgroundColor: "rgba(75, 0, 130, 0.2)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: {
            display: true,
            text: "Performance dei Trade nel Tempo",
            color: "#FFC200",
          },
        },
        scales: {
          x: {
            title: { display: true, text: "Date", color: "#FFC200" },
            ticks: { color: "#FFC200" },
          },
          y: {
            title: { display: true, text: "Profit/Loss", color: "#FFC200" },
            ticks: { color: "#FFC200" },
          },
        },
      },
    });
  };

  const createEquityChart = (data) => {
    setTimeout(() => {
      if (!chartRefEquity.current) {
        console.error(
          "Canvas per il grafico Equity Curve non disponibile. Riprovo..."
        );
        return;
      }

      if (chartInstanceEquity.current) {
        chartInstanceEquity.current.destroy();
      }

      const ctx = chartRefEquity.current.getContext("2d");
      chartInstanceEquity.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.dates,
          datasets: [
            {
              label: "Equity",
              data: data.equity,
              borderColor: "#28a745",
              backgroundColor: "rgba(40, 167, 69, 0.2)",
              borderWidth: 2,
              color: "#FFC200",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            labels: { color: "#FFC200" },
            legend: { position: "top", color: "#FFC200" },
            title: { display: true, text: "Equity Curve", color: "#FFC200" },
          },
          scales: {
            x: {
              title: { display: true, text: "Date", color: "#FFC200" },
              ticks: { color: "#FFC200" },
            },
            y: {
              title: { display: true, text: "Equity", color: "#FFC200" },
              ticks: { color: "#FFC200" },
            },
          },
        },
      });
    }, 100);
  };

  const createStrategyChart = (data) => {
    setTimeout(() => {
      if (!chartRefStrategy.current) {
        console.error(
          "Canvas per il grafico Strategy Performance non disponibile. Riprovo..."
        );
        return;
      }

      if (chartInstanceStrategy.current) {
        chartInstanceStrategy.current.destroy();
      }

      const ctx = chartRefStrategy.current.getContext("2d");
      chartInstanceStrategy.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.strategies,
          datasets: [
            {
              label: "Profit/Loss",
              data: data.profitLoss,
              backgroundColor: data.profitLoss.map((value) =>
                value >= 0 ? "rgba(40, 167, 69, 0.6)" : "rgba(220, 53, 69, 0.6)"
              ),
              borderColor: data.profitLoss.map((value) =>
                value >= 0 ? "rgba(40, 167, 69, 1)" : "rgba(220, 53, 69, 1)"
              ),
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "Strategy Performance",
              color: "#FFC200",
            },
          },
          scales: {
            x: {
              title: { display: true, text: "Strategie", color: "#FFC200" },
              ticks: { color: "#FFC200" },
            },
            y: {
              title: {
                display: true,
                text: "Profit/Loss ",
                color: "#FFC200",
              },
              ticks: { color: "#FFC200" },
            },
          },
        },
      });
    }, 100);
  };

  const createTradeTypeChart = (data) => {
    setTimeout(() => {
      if (!chartRefTradeType.current) {
        console.error(
          "Canvas per il grafico Trade Long/Short non disponibile. Riprovo..."
        );
        return;
      }

      if (chartInstanceTradeType.current) {
        chartInstanceTradeType.current.destroy();
      }

      const ctx = chartRefTradeType.current.getContext("2d");
      chartInstanceTradeType.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["LONG", "SHORT"],
          datasets: [
            {
              label: "Distribuzione Trade",
              data: [data.long, data.short],
              backgroundColor: ["#007bff", "#dc3545"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "Distribuzione Trade LONG/SHORT",
              color: "#FFC200",
            },
          },
        },
      });
    }, 100);
  };

  const createTradePerformanceChart = (data) => {
    setTimeout(() => {
      if (!chartRefTradePerformance.current) {
        console.error(
          "Canvas per il grafico Trade Performance non disponibile. Riprovo..."
        );
        return;
      }

      if (chartInstanceTradePerformance.current) {
        chartInstanceTradePerformance.current.destroy();
      }

      const ctx = chartRefTradePerformance.current.getContext("2d");
      chartInstanceTradePerformance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Profit", "Stop Loss", "Break Even"],
          datasets: [
            {
              label: "Distribuzione Trade Performance",
              data: [data.profit, data.stopLoss, data.breakEven],
              backgroundColor: ["#28a745", "#dc3545", "#ffc107"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "Distribuzione Trade Performance",
              color: "#FFC200",
            },
          },
        },
      });
    }, 100);
  };

  const createTradeSessionChart = (data) => {
    setTimeout(() => {
      if (!chartRefTradeSession.current) {
        console.error(
          "Canvas per il grafico Trade per Sessione non disponibile. Riprovo..."
        );
        return;
      }

      if (chartInstanceTradeSession.current) {
        chartInstanceTradeSession.current.destroy();
      }

      const ctx = chartRefTradeSession.current.getContext("2d");
      chartInstanceTradeSession.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Asia", "Europa", "America"],
          datasets: [
            {
              label: "Numero di Trade",
              data: [data.Asia, data.Europa, data.America],
              backgroundColor: ["#007bff", "#28a745", "#ffc107"],
              borderColor: ["#0056b3", "#1c7430", "#e0a800"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "Trade per Sessione di Trading",
              color: "#FFC200",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Sessioni di Trading",
                color: "#FFC200",
              },
              ticks: { color: "#FFC200" },
            },
            y: {
              title: {
                display: true,
                text: "Numero di Trade",
                color: "#FFC200",
              },
              ticks: { color: "#FFC200" },
            },
          },
        },
      });
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (chartInstancePerformance.current) {
        chartInstancePerformance.current.destroy();
      }
      if (chartInstanceEquity.current) {
        chartInstanceEquity.current.destroy();
      }
      if (chartInstanceStrategy.current) {
        chartInstanceStrategy.current.destroy();
      }
      if (chartInstanceTradeType.current) {
        chartInstanceTradeType.current.destroy();
      }
      if (chartInstanceTradePerformance.current) {
        chartInstanceTradePerformance.current.destroy();
      }
      if (chartInstanceTradeSession.current) {
        chartInstanceTradeSession.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <UserNav userData={userData} />
      <div className="container-fluid mt-5 me-5">
        <h2 className="text-center mb-4 journal-title">Analytics</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading && <LoadingSpinner />} 
        {!performanceData && !error && (
          <p className="text-center">Caricamento in corso...</p>
        )}

        <div className="row gy-4 mt-5">
          {/* Grafico Trade Performance */}
          <div className="col-12 col-md-6 col-lg-6">
            <div className="d-flex justify-content-center align-items-center animated-background p-5">
              <canvas
                id="tradePerformanceChart"
                ref={chartRefPerformance}
                style={{ maxWidth: "100%", height: "100%" }}
              />
            </div>
          </div>

          {/* Grafico Equity Curve */}
          {equityData && (
            <div className="col-12 col-md-6 col-lg-6">
              <div className="d-flex justify-content-center align-items-center animated-background p-5">
                <canvas
                  id="equityCurveChart"
                  ref={chartRefEquity}
                  style={{ maxWidth: "100%", height: "100%" }}
                />
              </div>
            </div>
          )}

          {/* Grafico Strategy Performance */}
          {strategyData && (
            <div className="col-12 col-md-6 col-lg-6">
              <div className="d-flex justify-content-center align-items-center animated-background p-5">
                <canvas
                  id="strategyPerformanceChart"
                  ref={chartRefStrategy}
                  style={{ maxWidth: "100%", height: "100%" }}
                />
              </div>
            </div>
          )}

          {/* Grafico Trade per Sessione */}
          {tradeSessionData && (
            <div className="col-12 col-md-6 col-lg-6 mb-5">
              <div className="d-flex justify-content-center align-items-center animated-background p-5">
                <canvas
                  id="tradeSessionChart"
                  ref={chartRefTradeSession}
                  style={{ maxWidth: "100%", height: "100%" }}
                />
              </div>
            </div>
          )}

          {/* Grafico Trade LONG/SHORT */}
          {tradeTypeData && (
            <div className="col-12 col-md-6 col-lg-6">
              <div className="d-flex justify-content-center align-items-center animated-background p-5">
                <canvas
                  id="tradeTypeChart"
                  ref={chartRefTradeType}
                  style={{ maxWidth: "100%", height: "100%" }}
                />
              </div>
            </div>
          )}

          {/* Grafico Trade Performance */}
          {tradePerformanceData && (
            <div className="col-12 col-md-6 col-lg-6">
              <div className="d-flex justify-content-center align-items-center animated-background p-5">
                <canvas
                  id="tradePerformancePieChart"
                  ref={chartRefTradePerformance}
                  style={{ maxWidth: "100%", height: "100%" }}
                />
              </div>
            </div>
          )}

          {capitalTrendData && (
            <div className="col-12 col-md-6 col-lg-6 mb-5">
              <div className="d-flex justify-content-center align-items-center animated-background p-5">
                <canvas
                  id="capitalTrendChart"
                  ref={chartRefCapitalTrend}
                  style={{ maxWidth: "100%", height: "100%" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default UserAnalytics;
