import React, { useState, useEffect } from "react";
import { Button, Container, Spinner, Table, Alert } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import UserNav from "../usernav/UserNav.jsx";
import FooterPage from "../footer/FooterPage.jsx";
import {
  getReportMensiliByUserId,
  generaReportMensile,
  deleteReportMensile,
} from "../utils/apiStorico";
import "./UserStorico.scss";

const UserStorico = () => {
  const [userData, setUserData] = useState(null);
  const [reportMensili, setReportMensili] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
     const API_BASE_URL = import.meta.env.VITE_API_URL;


      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Errore durante il recupero del profilo utente.");
        }

        const data = await response.json();
        setUserData(data.user);
        fetchReports(data.user.id, token);
      } catch (error) {
        console.error("Errore nel recupero dei dati utente:", error);
        showError("Errore nel recupero del profilo utente.");
      }
    };

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchReports = async (userId, token) => {
    try {
      setLoading(true);
      const reports = await getReportMensiliByUserId(userId, token);
      setReportMensili(reports);
    } catch (err) {
      showError("Errore nel recupero dei report mensili.");
    } finally {
      setLoading(false);
    }
  };

  const handleGeneraReport = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await generaReportMensile(userData.id, token);
      alert("Report mensile generato con successo.");
      fetchReports(userData.id, token);
    } catch (err) {
      if (err.message.includes("già generato")) {
        alert("Report mensile già generato per il mese precedente.");
      } else {
        showError("Errore nella generazione del report mensile.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReport = async (reportId) => {
    const confirmDelete = window.confirm(
      "Sei sicuro di voler eliminare questo report?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await deleteReportMensile(reportId, token);
      alert("Report eliminato con successo.");
      fetchReports(userData.id, token);
    } catch (err) {
      showError("Errore nell'eliminazione del report mensile.");
    } finally {
      setLoading(false);
    }
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 2000);
  };

  const chartData = {
    labels: reportMensili.map((report) => `${report.mese} ${report.anno}`),
    datasets: [
      {
        label: `Capitale Finale (${userData?.valuta?.simbolo || "€"})`,
        data: reportMensili.map((report) => report.capitaleFinale),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        title: { display: true, text: "Capitale", color: "#FFC200" },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Mese",
          color: "#FFC200",
        },
        ticks: { color: "#FFC200" },
      },
      y: {
        title: {
          display: true,
          text: `Capitale Finale (${userData?.valuta?.simbolo || "€"})`,
          color: "#FFC200",
        },
        ticks: { color: "#FFC200" },
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div className="user-storico-container-us">
        {userData && <UserNav userData={userData} />}
        <Container className="mt-5 content-wrapper-us">
          <h1 className="text-center titolo-storico-us">
            Storico Report Mensili
          </h1>
          {loading && (
            <Spinner
              animation="border"
              className="d-block mx-auto my-3 spinner-us"
            />
          )}
          {error && (
            <Alert variant="danger" className="alert-us">
              {error}
            </Alert>
          )}

          {userData && (
            <Button
              className="btn-generale-us"
              onClick={handleGeneraReport}
              disabled={loading}
            >
              Genera Report Mensile
            </Button>
          )}

          {reportMensili.length > 0 ? (
            <>
              <div className="table-container-us">
                <Table bordered hover responsive className="table-us">
                  <thead className="thead-dark-us">
                    <tr>
                      <th>Mese</th>
                      <th>Profitto ({userData?.valuta?.simbolo || "€"})</th>
                      <th>Perdita ({userData?.valuta?.simbolo || "€"})</th>
                      <th>
                        Capitale Finale ({userData?.valuta?.simbolo || "€"})
                      </th>
                      <th>Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportMensili.map((report) => (
                      <tr key={report.id}>
                        <td>{`${report.mese} ${report.anno}`}</td>
                        <td>
                          {report.profitto
                            ? report.profitto.toFixed(2)
                            : "0.00"}
                        </td>
                        <td>
                          {report.perdita ? report.perdita.toFixed(2) : "0.00"}
                        </td>
                        <td>
                          {report.capitaleFinale
                            ? report.capitaleFinale.toFixed(2)
                            : "0.00"}
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteReport(report.id)}
                            disabled={loading}
                            className="btn-elimina-us"
                          >
                            Elimina
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="chart-container-us">
                <Line data={chartData} options={chartOptions} />
              </div>
            </>
          ) : (
            <p className="text-center testo-nessun-report-us">
              Nessun report mensile disponibile.
            </p>
          )}
        </Container>
      </div>
      <FooterPage />
    </>
  );
};

export default UserStorico;
