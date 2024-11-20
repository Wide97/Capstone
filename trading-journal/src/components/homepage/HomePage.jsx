import React from "react";
import NavbarPage from "../navbar/NavbarPage";
import "./HomePage.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import FooterPage from "../footer/FooterPage";

const HomePage = () => {
  return (
    <>
      {/* Navbar */}
      <NavbarPage />

      {/* Hero Section */}
      <div className="hero-section d-flex flex-column justify-content-center align-items-center">
        <Container>
          <Row className="text-center">
            <Col>
              <h1 className="hero-title">
                The Only <span className="highlight">Tool You Need</span> to
                Become <span className="highlight">Profitable</span>
              </h1>
              <p className="hero-description">
                Trading Journal ti aiuta a scoprire i tuoi punti di forza e
                debolezza per diventare un trader di successo grazie al potere
                del journaling e dell'analisi.
              </p>
              <Button href="/register" className="cta-button">
                Get Started Now
              </Button>
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
              <div className="feature-icon-large">📓</div>
            </Col>
            <Col md={6}>
              <h2 className="feature-title">Journal</h2>
              <p className="feature-description text-light">
                Il Journal è un posto dedicato dove puoi inserire e tracciare
                tutte le tue operazioni giornaliere. Organizza i tuoi trade con
                dettagli come date, strumenti finanziari e risultati per
                migliorare la tua disciplina di trading.
              </p>
            </Col>
          </Row>
          <hr className="feature-divider" />

          {/* Analytics Section */}
          <Row className="text-center align-items-center feature-row">
            <Col md={6} className="text-center order-md-2">
              <div className="feature-icon-large">📊</div>
            </Col>
            <Col md={6} className="order-md-1">
              <h2 className="feature-title">Analytics</h2>
              <p className="feature-description text-light">
                La sezione Analytics ti offre grafici e statistiche per
                analizzare l'andamento dei tuoi trade. Esamina i tuoi guadagni,
                perdite, e altri indicatori chiave per capire meglio i tuoi
                punti di forza e debolezza.
              </p>
            </Col>
          </Row>
          <hr className="feature-divider" />

          {/* Reporting Section */}
          <Row className="text-center align-items-center feature-row">
            <Col md={6} className="text-center">
              <div className="feature-icon-large">📑</div>
            </Col>
            <Col md={6}>
              <h2 className="feature-title">Reporting</h2>
              <p className="feature-description text-light">
                La sezione Reporting ti permette di visualizzare tutte le
                operazioni fatte in un formato chiaro e dettagliato. Puoi
                filtrare e ordinare i dati per una migliore analisi delle tue
                performance passate.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <FooterPage/>
    </>
  );
};

export default HomePage;
