import React from "react";
import NavbarPage from "../navbar/NavbarPage.jsx";
import FooterPage from "../footer/FooterPage.jsx";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./HomePage.scss";

// Media Assets
import HomePageImg from "./HomePage.png";
import JournalVideo from "./Journal.mp4";
import ReportVideo from "./Report.mp4";
import AnalyticsVideo from "./Analytics.mp4";
import StoricoVideo from "./Storico.mp4";

const HomePage = () => {
  return (
    <>
      {/* NAVBAR */}
      <NavbarPage />

      {/* HERO */}
      <section className="hero-section">
        <Container>
          <Row className="hero-content">
            <Col className="text-center">
              <h1 className="hero-title">
                <span className="highlight">WELCOME TO </span>
                <span className="highlight">TRADING JOURNAL</span>
              </h1>
              <p className="hero-description">
                Il tuo strumento definitivo per monitorare, analizzare e
                migliorare le tue performance di trading.
              </p>
              <div className="cta-buttons-container">
                <Button href="/register" className="cta-button">
                  <i className="fas fa-rocket" /> Inizia Subito
                </Button>
                <Button href="/demo" className="cta-button-demo">
                  <i className="fas fa-play-circle" /> Guarda la Demo
                </Button>
              </div>
            </Col>
          </Row>

          {/* WHY CHOOSE US */}
          <Row className="why-choose-section my-5 text-center">
            <h2 className="section-title">Perché scegliere il nostro Trading Journal?</h2>

            <Col md={4}>
              <i className="fas fa-chart-line feature-icon" />
              <h3 className="feature-heading">Analisi Dettagliata</h3>
              <p className="feature-text">
                Grafici chiari e dettagliati per capire dove migliorare.
              </p>
            </Col>

            <Col md={4}>
              <i className="fas fa-book feature-icon" />
              <h3 className="feature-heading">Journaling Semplificato</h3>
              <p className="feature-text">
                Registra ogni operazione con facilità.
              </p>
            </Col>

            <Col md={4}>
              <i className="fas fa-user-check feature-icon" />
              <h3 className="feature-heading">Personalizzato per Te</h3>
              <p className="feature-text">
                Scegli parametri e valuta in base alle tue esigenze.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <Container>

          {/* Homepage Feature */}
          <FeatureRow
            title="HomePage"
            content="Imposta il tuo capitale iniziale e seleziona la valuta preferita."
            media={<img src={HomePageImg} alt="HomePage" className="img-tutorials" />}
            icon="fa-home"
          />

          {/* Journal Feature */}
          <FeatureRow
            title="Journal"
            content="Registra un trade con data, leva, profitto, costi e strategia."
            media={<Video src={JournalVideo} />}
            icon="fa-book-open"
            reverse
          />

          {/* Analytics Feature */}
          <FeatureRow
            title="Analytics"
            content="Monitora l’andamento dei tuoi trade e l'evoluzione del capitale."
            media={<Video src={AnalyticsVideo} />}
            icon="fa-chart-line"
          />

          {/* Report Feature */}
          <FeatureRow
            title="Reporting"
            content="Visualizza il capitale attuale, percentuale di successo e riepilogo."
            media={<Video src={ReportVideo} />}
            icon="fa-file-alt"
            reverse
          />

          {/* Storico Feature */}
          <FeatureRow
            title="Storico"
            content="Genera report mensili e consulta i dati storici dei tuoi profitti."
            media={<Video src={StoricoVideo} />}
            icon="fa-calendar-alt"
          />
        </Container>
      </section>

      {/* FOOTER */}
      <FooterPage />
    </>
  );
};

const FeatureRow = ({ title, content, media, icon, reverse }) => (
  <>
    <Row className={`feature-row text-center align-items-center ${reverse ? "flex-row-reverse" : ""}`}>
      <Col md={6}>
        <div className="feature-icon-large"><i className={`fas ${icon}`} /></div>
        <p className="feature-description">{content}</p>
      </Col>
      <Col md={6}>
        <h2 className="feature-title">{title}</h2>
        <div className="video-tutorials mt-4">{media}</div>
      </Col>
    </Row>
    <hr className="feature-divider" />
  </>
);

const Video = ({ src }) => (
  <video width="100%" height="auto" controls>
    <source src={src} type="video/mp4" />
  </video>
);

export default HomePage;
