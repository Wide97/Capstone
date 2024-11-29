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
              <div className="feature-icon-large">
                📓
                <p>
                  {" "}
                  Video Tutorial: Journal – Inserimento delle Operazioni In
                  questo video tutorial, ti mostriamo come utilizzare la sezione
                  Journal del nostro Trading Journal per inserire e tracciare le
                  tue operazioni di trading. Cosa vedrai nel video: Come
                  accedere alla sezione Journal tramite il menu di navigazione.
                  Come iniziare una nuova registrazione di trade cliccando sul
                  pulsante "Aggiungi Operazione". Un esempio di inserimento di
                  una nuova operazione, dove ti mostreremo come compilare i
                  campi per la data di acquisto, l'asset utilizzato, la
                  quantità, il prezzo di ingresso e di uscita, e altri dettagli
                  importanti. Come specificare ulteriori informazioni come la
                  leva, la strategia di trading utilizzata, e il risultato
                  dell'operazione (profitto o perdita). 
                </p>
              </div>
            </Col>
            <Col md={6}>
              <h2 className="feature-title">Journal</h2>
              <p className="feature-description text-light">
                Obiettivo del video: Il video ha l'obiettivo di renderti
                familiare con il processo di journaling delle tue operazioni,
                aiutandoti a mantenere un registro accurato delle tue attività.
                Questo ti aiuterà a identificare i tuoi punti di forza e
                debolezza e a migliorare la tua strategia di trading nel tempo.
              </p>
              <div className="video-tutorials mt-4">
                <video width="100%" height="auto" controls>
                  <source src={JournalVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </Col>
          </Row>
          <hr className="feature-divider" />

          {/* Analytics Section */}
          <Row className="text-center align-items-center feature-row">
            <Col md={6} className="text-center order-md-2">
              <div className="feature-icon-large">
                📊
                <p>
                  Video Tutorial: Analytics – Analisi dei Tuoi Trade In questo
                  video tutorial, ti mostriamo come utilizzare la sezione
                  Analytics del nostro Trading Journal per analizzare le tue
                  operazioni di trading e ottenere statistiche utili. Cosa
                  vedrai nel video: Come accedere alla sezione Analytics tramite
                  il menu di navigazione. Un tour delle diverse funzionalità di
                  analisi, inclusi i grafici e le statistiche principali che
                  vengono generati in base alle tue operazioni registrate. Come
                  visualizzare i grafici dei tuoi guadagni e perdite nel tempo,
                  e come identificare i periodi di performance migliori e
                  peggiori. Come utilizzare i vari filtri per approfondire
                  specifici tipi di operazioni, come le operazioni long o short,
                  o per filtrare in base agli asset utilizzati. Una panoramica
                  su come interpretare le metriche chiave come il rapporto
                  rischio/ricompensa, il tasso di successo, e l'andamento
                  mensile, per avere un quadro completo delle tue prestazioni.
                </p>
              </div>
            </Col>
            <Col md={6} className="order-md-1">
              <h2 className="feature-title">Analytics</h2>
              <p className="feature-description text-light">
                Obiettivo del video: Il video ha l'obiettivo di mostrarti come
                usare gli strumenti analitici per comprendere meglio le tue
                abitudini di trading. Le Analytics ti aiutano a identificare
                cosa funziona e cosa no, consentendoti di migliorare
                continuamente la tua strategia e diventare un trader più
                efficace.
              </p>
              <div className="video-tutorials mt-4">
                <video width="100%" height="auto" controls>
                  <source src={AnalyticsVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </Col>
          </Row>
          <hr className="feature-divider" />

          {/* Reporting Section */}
          <Row className="text-center align-items-center feature-row">
            <Col md={6} className="text-center">
              <div className="feature-icon-large">
                📑
                <p>
                  Video Tutorial: Reporting – Visualizzazione delle Operazioni
                  In questo video tutorial, ti mostriamo come utilizzare la
                  sezione Reporting del nostro Trading Journal per visualizzare
                  e analizzare tutte le operazioni di trading che hai
                  registrato. Cosa vedrai nel video: Come accedere alla sezione
                  Reporting tramite il menu di navigazione. Una panoramica su
                  come visualizzare tutte le tue operazioni di trading in un
                  formato chiaro e dettagliato. Come utilizzare le opzioni di
                  filtro per trovare operazioni specifiche basate su criteri
                  come la data, l'asset, la tipologia di trade (long/short) e
                  l'esito dell'operazione (profitto, perdita, break-even). Come
                  ordinare i dati per identificare i trade migliori e peggiori,
                  e comprendere meglio le tue performance. Una dimostrazione di
                  come esportare i dati in formati compatibili (ad esempio CSV)
                  per ulteriori analisi o per condividere le tue performance con
                  altri. Come eliminare un trade passato.
                </p>
              </div>
            </Col>
            <Col md={6}>
              <h2 className="feature-title">Reporting</h2>
              <p className="feature-description text-light">
                Obiettivo del video: Il video ha l'obiettivo di insegnarti come
                utilizzare al meglio la sezione Reporting per avere una
                panoramica dettagliata e strutturata delle tue operazioni.
                Questa sezione ti permette di ottenere un quadro completo delle
                tue attività di trading, aiutandoti a prendere decisioni più
                informate e migliorare le tue performance nel tempo.
              </p>
              <div className="video-tutorials mt-4">
                <video width="100%" height="auto" controls>
                  <source src={ReportVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <FooterPage />
    </>
  );
};

export default HomePage;
