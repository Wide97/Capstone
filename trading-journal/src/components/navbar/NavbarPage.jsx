
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./NavbarPage.css";

const NavbarPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Navbar
      expand="lg"
      className={`navbar-animated shadow fixed-top ${isVisible ? "visible" : ""}`}
      variant="dark"
    >
      <Container>
        <Navbar.Brand href="/" className="navbar-brand">
          <img
            src="/img/t-removebg-preview.png" 
            alt="Logo"
            style={{ width: "100px", marginRight: "10px" }}
          />
          Trading Journal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Registrazione</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPage;



