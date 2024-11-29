import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./FooterPage.scss";

const FooterPage = () => {
  return (
    <footer className="footer-container">
      <Container>
        <Row className="text-center">
          <Col md={6} className="mb-3">
            <h2 className="footer-brand">Trading Journal</h2>
            <p className="footer-p">
              Trading Journal ti aiuta a tracciare le tue operazioni, analizzare
              i tuoi risultati e migliorare come trader. Scopri il potere del
              journaling e delle analytics.
            </p>
          </Col>
          <Col md={6}>
            <h2 className="footer-brand">Seguici sui Social</h2>
            <div className="social-icons">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <p className="footer-credit">
              © 2024 Trading Journal - Tutti i diritti riservati.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterPage;
