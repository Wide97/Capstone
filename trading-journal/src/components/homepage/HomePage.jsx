import React from "react";
import NavbarPage from "../navbar/NavbarPage";
import "./HomePage.scss";
import { Container, Row, Col, Button } from "react-bootstrap";
import FooterPage from "../footer/FooterPage";
import JournalVideo from "./Journal.mp4";
import ReportVideo from "./Report.mp4";
import AnalyticsVideo from "./Analytics.mp4";
import HomePageImg from "./HomePage.png";
import StoricoVideo from "./Storico.mp4";


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
                migliorare le tue performance di trading.
              </p>
              {/* Contenitore dei pulsanti */}
              <div className="cta-buttons-container">
                <Button href="/register" className="cta-button">
                  <i className="fas fa-rocket"></i> Inizia Subito
                </Button>
                <Button href="/demo" className="cta-button-demo">
                  <i className="fas fa-play-circle"></i> Guarda la Demo
                </Button>
              </div>
            </Col>
          </Row>

          {/* Why Choose Us Section */}
          <Row className="text-center why-choose-section my-5">
            <h2 className="section-title text-center mb-5">
              Perché scegliere il nostro Trading Journal?
            </h2>
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
          {/* HomePage section */}
          <Row className="text-center align-items-center feature-row">
            <Col md={6} className="text-center">
              <h2 className="feature-title">HomePage</h2>
              <div className="img-tutorials mt-4">
                <img src={HomePageImg} alt="HomePage" />
              </div>
            </Col>
            <Col md={6}>
              <div className="feature-icon-large">
                <i className="fas fa-home"></i>
              </div>
              <p className="feature-description">
                Inizia impostando il tuo capitale iniziale. Puoi scegliere un
                numero compreso tra 0 e infinito, che rappresenterà il tuo
                capitale iniziale. Una volta impostato, utilizza l'opzione
                Imposta Capitale Iniziale per salvare il valore.
                Successivamente, seleziona la valuta preferita, ovvero la valuta
                che desideri associare al tuo conto
              </p>
            </Col>
          </Row>
          <hr className="feature-divider" />

          {/* Journal Section */}
          <Row className="text-center align-items-center feature-row">
            <Col md={6} className="text-center">
              <div className="feature-icon-large">
                <i className="fas fa-book-open"></i>
              </div>
              <p className="feature-description">
                Dopo aver impostato il capitale iniziale, accedi alla pagina
                Journal, dove potrai registrare un trade specificando dati come
                la data e l'ora di esecuzione, la leva, il profitto, la perdita,
                i costi di apertura e chiusura, la strategia e tutte le altre
                informazioni necessarie.
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
                Ogni tuo trade verrà registrato e visualizzato nei grafici
                all'interno della sezione Analytics. L'Analytics è una parte del
                tuo profilo in cui potrai monitorare l'andamento dei tuoi trade
                nel tempo e l'evoluzione del tuo capitale, utilizzando vari
                filtri come curva di equità, profitti e perdite, operazioni long
                e short, posizioni e molto altro.
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
                Nella sezione Reporting avrai accesso al tuo capitale attuale,
                con la possibilità di visualizzare l'andamento del capitale nel
                tempo, il numero di trade effettuati, la percentuale di successo
                e l'ammontare dei profitti o delle perdite. Inoltre, saranno
                mostrati tutti i trade registrati, che potrai filtrare per
                strategia o per esito. Al di sotto, un grafico rappresenterà
                l'ammontare dei trade in profitto rispetto alle perdite nel
                tempo.
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

          {/* Storico Section */}
          <Row className="text-center align-items-center feature-row">
            <Col md={6} className="text-center">
              <div className="feature-icon-large">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <p className="feature-description">
                L'ultima sezione del profilo riguarda lo Storico, inizialmente
                vuoto, che potrai aggiornare generando un report mensile. Lo
                storico mostrerà il mese di riferimento, i profitti e le perdite
                registrati durante quel periodo, oltre al capitale finale. Ogni
                report potrà essere eliminato e successivamente ricalcolato
              </p>
            </Col>
            <Col md={6}>
              <h2 className="feature-title">Storico</h2>
              <div className="video-tutorials mt-4">
                <video width="100%" height="auto" controls>
                  <source src={StoricoVideo} type="video/mp4" />
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
