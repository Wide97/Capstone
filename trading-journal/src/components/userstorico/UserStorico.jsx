import React, { useEffect, useState } from "react";
import { getReportMensiliByUserId, generaReportMensile, deleteReportMensile } from "../utils/apiStorico";
import UserNav from "../usernav/UserNav";
import FooterPage from "../footer/FooterPage";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./UserStorico.scss";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const UserStorico = () => {
  const [userData, setUserData] = useState(null); 
  const [reportMensili, setReportMensili] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Recupera il profilo utente al caricamento della pagina
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/api/auth/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante il recupero del profilo utente.");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data.user); 
        fetchReports(data.user.id, token); 
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError("Errore nel recupero del profilo utente.");
      });
  }, []);

  // Recupera i report mensili di un utente
  const fetchReports = async (userId, token) => {
    try {
      setLoading(true);
      const reports = await getReportMensiliByUserId(userId, token);
      setReportMensili(reports);
    } catch (err) {
      setError("Errore nel recupero dei report mensili.");
    } finally {
      setLoading(false);
    }
  };

  // Funzione per generare un nuovo report mensile
  const handleGeneraReport = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await generaReportMensile(userData.id, token);
      alert("Report mensile generato con successo.");
      // Aggiorna i report dopo la generazione
      fetchReports(userData.id, token);
    } catch (err) {
      setError("Errore nella generazione del report mensile.");
    } finally {
      setLoading(false);
    }
  };

  // Funzione per eliminare un report mensile
  const handleDeleteReport = async (reportId) => {
    const confirmDelete = window.confirm("Sei sicuro di voler eliminare questo report?");
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await deleteReportMensile(reportId, token);
      alert("Report eliminato con successo.");
      // Aggiorna i report dopo l'eliminazione
      fetchReports(userData.id, token);
    } catch (err) {
      setError("Errore nell'eliminazione del report mensile.");
    } finally {
      setLoading(false);
    }
  };

  // Dati per il grafico
  const chartData = {
    labels: reportMensili.map((report) => report.mese), 
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
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Mese",
        },
      },
      y: {
        title: {
          display: true,
          text: `Capitale Finale (${userData?.valuta?.simbolo || "€"})`,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      {/* Navbar */}
      {userData && <UserNav userData={userData} />}

      {/* Contenuto della pagina */}
      <div className="container mt-5">
        <h1 className="text-center">Storico Report Mensili</h1>
        {loading && <p className="text-center">Caricamento in corso...</p>}
        {error && <p className="text-danger text-center">{error}</p>}

        {userData && (
          <button
            className="btn btn-primary mb-4"
            onClick={handleGeneraReport}
            disabled={loading}
          >
            Genera Report Mensile
          </button>
        )}

        {reportMensili.length > 0 ? (
          <>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>Mese</th>
                    <th>Profitto ({userData?.valuta?.simbolo || "€"})</th>
                    <th>Perdita ({userData?.valuta?.simbolo || "€"})</th>
                    <th>Capitale Finale ({userData?.valuta?.simbolo || "€"})</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {reportMensili.map((report) => (
                    <tr key={report.id}>
                      <td>{report.mese}</td>
                      <td>{report.profitto.toFixed(2)}</td>
                      <td>{report.perdita.toFixed(2)}</td>
                      <td>{report.capitaleFinale.toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteReport(report.id)}
                          disabled={loading}
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
            <div className="chart-container">
              <Line data={chartData} options={chartOptions} />
            </div>
          </>
        ) : (
          <p className="text-center">Nessun report mensile disponibile.</p>
        )}
      </div>

      {/* Footer */}
      <FooterPage />
    </div>
  );
};

export default UserStorico;



