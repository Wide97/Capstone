import React from "react";
import NavbarPage from "../navbar/NavbarPage";
import "./HomePage.scss";
import { Container, Row, Col, Button } from "react-bootstrap";
import FooterPage from "../footer/FooterPage";
import JournalVideo from "./Recording 2024-11-29 151150.mp4";
import ReportVideo from "./Recording 2024-11-29 151959.mp4";
import AnalyticsVideo from "./Recording 2024-11-29 152323.mp4";

const HomePage = () => {
  return (
    <>
      {/* Navbar */}
      <NavbarPage />

      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          {/* Hero Content */}
          <Row className="text-center hero-content">
            <Col>
              <h1 className="hero-title">
                Welcome to <span className="highlight">Trading Journal</span>
              </h1>
              <p className="hero-description">
                Il tuo strumento definitivo per monitorare, analizzare e
                migliorare le tue performance di trading. Scopri come il potere
                del journaling può trasformare il tuo approccio ai mercati
                finanziari.
              </p>
              <Button href="/register" className="cta-button">
                <i className="fas fa-rocket"></i> Inizia Subito
              </Button>
            </Col>
          </Row>

          {/* Why Choose Us Section */}
          <Row className="text-center why-choose-section mt-5">
            <h2 className="section-title text-center">Perché scegliere il nostro Trading Journal?</h2>
            <Col md={4}>
              <i className="fas fa-chart-line feature-icon"></i>
              <h3 className="feature-heading">Analisi Dettagliata</h3>
              <p className="feature-text">
                Ottieni grafici chiari e dettagliati che ti aiutano a capire
                dove migliorare e come ottimizzare le tue operazioni di trading.
              </p>
            </Col>
            <Col md={4}>
              <i className="fas fa-book feature-icon"></i>
              <h3 className="feature-heading">Journaling Semplificato</h3>
              <p className="feature-text">
                Registra ogni operazione con pochi clic e tieni traccia di tutti
                i dettagli, incluse strategie e risultati.
              </p>
            </Col>
            <Col md={4}>
              <i className="fas fa-user-check feature-icon"></i>
              <h3 className="feature-heading">Personalizzato per Te</h3>
              <p className="feature-text">
                Personalizza il tuo trading journal in base alle tue esigenze,
                scegliendo la valuta e i parametri che contano di più.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <div className="features-section py-5">
        <Container>
          {/* Journal Section */}
          <Row className="text-center align-items-center feature-row">
            <Col md={6} className="text-center">
              <div className="feature-icon-large">
                <i className="fas fa-book-open"></i>
              </div>
              <p className="feature-description">
                Registra le tue operazioni di trading con semplicità. Ogni
                dettaglio è salvato per analisi future, rendendo il tuo processo
                di trading più strutturato ed efficiente.
              </p>
            </Col>
            <Col md={6}>
              <h2 className="feature-title">Journal</h2>
              <div className="video-tutorials mt-4">
                <video width="100%" height="auto" controls>
                  <source src={JournalVideo} type="video/mp4" />
                </video>
              </div>
            </Col>
          </Row>
          <hr className="feature-divider" />

          {/* Analytics Section */}
          <Row className="text-center align-items-center feature-row">
            <Col md={6} className="text-center order-md-2">
              <div className="feature-icon-large">
                <i className="fas fa-chart-line"></i>
              </div>
              <p className="feature-description">
                Analizza i tuoi successi e fallimenti con grafici dettagliati,
                statistiche e metriche chiave per prendere decisioni più
                informate.
              </p>
            </Col>
            <Col md={6} className="order-md-1">
              <h2 className="feature-title">Analytics</h2>
              <div className="video-tutorials mt-4">
                <video width="100%" height="auto" controls>
                  <source src={AnalyticsVideo} type="video/mp4" />
                </video>
              </div>
            </Col>
          </Row>
          <hr className="feature-divider" />

          {/* Reporting Section */}
          <Row className="text-center align-items-center feature-row">
            <Col md={6} className="text-center">
              <div className="feature-icon-large">
                <i className="fas fa-file-alt"></i>
              </div>
              <p className="feature-description">
                Genera report dettagliati per analizzare le tue performance e
                individuare aree di miglioramento.
              </p>
            </Col>
            <Col md={6}>
              <h2 className="feature-title">Reporting</h2>
              <div className="video-tutorials mt-4">
                <video width="100%" height="auto" controls>
                  <source src={ReportVideo} type="video/mp4" />
                </video>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer */}
      <FooterPage />
    </>
  );
};

export default HomePage;

