import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./FooterPage.scss";

const FooterPage = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socialLinks = [
    { href: "https://www.linkedin.com/in/marco-widesott-6187291b8/", icon: "fab fa-linkedin" },
    { href: "https://www.facebook.com/marco.wide", icon: "fab fa-facebook" },
    { href: "https://www.instagram.com/marcowidesott/", icon: "fab fa-instagram" },
  ];

  return (
    <footer className="footer-container">
      <Container>
        <Row className="text-center pt-5">
          <Col md={4} className="mb-3">
            <h2 className="footer-brand">Trading Journal</h2>
            <p className="footer-p">
              Traccia le tue operazioni, analizza i risultati e migliora come trader.
              Scopri il potere del journaling e delle analytics.
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h2 className="footer-brand">Link Utili</h2>
            <ul className="quick-links">
              {[
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contattaci" },
                { href: "/terms", label: "Termini e Condizioni" },
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </Col>
          <Col md={4}>
            <h2 className="footer-brand">Seguici</h2>
            <div className="social-icons">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={`Vai a ${link.href}`}
                >
                  <i className={link.icon}></i>
                </a>
              ))}
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
          <button
            className="scroll-to-top"
            onClick={scrollToTop}
            aria-label="Torna in alto"
          >
            ↑
          </button>
        )}
      </Container>
    </footer>
  );
};

export default FooterPage;
