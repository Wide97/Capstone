import React from "react";
import "./DemoPage.scss";
import NavbarPage from "../navbar/NavbarPage.jsx";
import FooterPage from "../footer/FooterPage.jsx";
import LoginVideo from "./LoginTutorial.mp4";
import RegisterVideo from "./RegisterTutorial.mp4";
import JournalVideo from "./JournalTutorial.mp4";
import AnalyticsVideo from "./AnalyticsTutorial.mp4";
import ReportVideo from "./ReportTutorial.mp4";

const VideoCard = ({ title, src, description }) => (
  <div className="video-card">
    <h3 className="video-title">{title}</h3>
    <video controls className="video-element">
      <source src={src} type="video/mp4" />
      Il tuo browser non supporta il video.
    </video>
    <p className="video-description">{description}</p>
  </div>
);

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
        "Come utilizzare la sezione Journal: inserimento di un'operazione con data, ora, lottaggio e tutte le info per salvare un trade.",
    },
    {
      title: "Analytics",
      src: AnalyticsVideo,
      description:
        "Come analizzare i tuoi dati: grafici per long/short, profitto/perdita, curva di equità, sessioni e capitale.",
    },
    {
      title: "Report",
      src: ReportVideo,
      description:
        "Come generare report dettagliati: percentuale di successo, capitale, PnL e rimozione trade.",
    },
  ];

  return (
    <>
      <NavbarPage />
      <div className="demo-page-container">
        <header className="demo-header">
          <h1 className="demo-title">Guida al Trading Journal</h1>
          <p className="demo-description">
            Esplora i video tutorial per imparare a usare il nostro sito.
          </p>
        </header>
        <section className="videos-container">
          {videos.map((video, index) => (
            <VideoCard
              key={index}
              title={video.title}
              src={video.src}
              description={video.description}
            />
          ))}
        </section>
      </div>
      <FooterPage />
    </>
  );
};

export default DemoPage;
