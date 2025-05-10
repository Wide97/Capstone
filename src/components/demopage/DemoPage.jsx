import React from "react";
import "./DemoPage.scss";
import NavbarPage from "../navbar/NavbarPage.jsx";
import FooterPage from "../footer/FooterPage.jsx";
import LoginVideo from "./LoginTutorial.mp4";
import RegisterVideo from "./RegisterTutorial.mp4";
import JournalVideo from "./JournalTutorial.mp4";
import AnalyticsVideo from "./AnalyticsTutorial.mp4";
import ReportVideo from "./ReportTutorial.mp4";

const DemoPage = () => {
  const videos = [
    {
      title: "Login",
      src: LoginVideo,
      description: "Come effettuare il login.",
    },
    {
      title: "Registrazione",
      src: RegisterVideo,
      description: "Come registrarti al sito.",
    },
    {
      title: "Journal",
      src: JournalVideo,
      description:
        "Come utilizzare la sezione Journal. Inserimento di un' operazione reandom con date, ora di vendita e acquisto, lottaggio e tutte le informazioni necessarie per salvare un trade.",
    },
    {
      title: "Analytics",
      src: AnalyticsVideo,
      description: "Come analizzare i tuoi dati di trading. Visualizzazione dei vai grafici per trades distribuiti per long/short, profitto/perdita/break_even, curva di equità, trading per sessione e andamento del capitale nel tempo.",
    },
    {
      title: "Report",
      src: ReportVideo,
      description: "Come generare report dettagliati. Genrazione automatica dei report. percentuale di successo, capitale attuale, profitto/perdita, riepilogo di tutti i trade e possibilità di rimozione di un determinato trade.",
    },
  ];

  return (
    <>
      <NavbarPage />
      <div className="demo-page-container">
        <div className="demo-header text-center">
          <h1 className="demo-title">Guida al Trading Journal</h1>
          <p className="demo-description">
            Esplora i video tutorial per imparare a utilizzare al meglio il
            nostro sito.
          </p>
        </div>
        <div className="videos-container">
          {videos.map((video, index) => (
            <div className="video-card" key={index}>
              <h3 className="video-title">{video.title}</h3>
              <video controls className="video-element">
                <source src={video.src} type="video/mp4" />
                Il tuo browser non supporta il video.
              </video>
              <p className="video-description">{video.description}</p>
            </div>
          ))}
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default DemoPage;
