import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./FooterPage.scss";

const FooterPage = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-container">
      <Container>
        <Row className="text-center pt-5">
          <Col md={4} className="mb-3">
            <h2 className="footer-brand">Trading Journal</h2>
            <p className="footer-p">
              Trading Journal ti aiuta a tracciare le tue operazioni, analizzare
              i tuoi risultati e migliorare come trader. Scopri il potere del
              journaling e delle analytics.
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h2 className="footer-brand">Link Utili</h2>
            <ul className="quick-links">
              <li>
                <a href="/faq">FAQ</a>
              </li>
              <li>
                <a href="/contact">Contattaci</a>
              </li>
              <li>
                <a href="/terms">Termini e Condizioni</a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
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
        {showButton && (
          <button className="scroll-to-top" onClick={scrollToTop}>
            ↑
          </button>
        )}
      </Container>
    </footer>
  );
};

export default FooterPage;
