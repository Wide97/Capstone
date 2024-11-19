
import { Navbar, Nav, Container } from "react-bootstrap";
import "./NavbarPage.css";
import React, { useState, useEffect } from "react"; 

const NavbarPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    },1000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <Navbar
      expand="lg"
      className={`navbar-animated shadow ${isVisible ? "visible" : ""}`} 
      variant="dark"
    >
      <Container>
        <Navbar.Brand href="/"  className="navbar-brand">
          Trading Journal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/login" style={{ color: "#fff", fontWeight: "bold", marginRight: "15px" }}>
              Login
            </Nav.Link>
            <Nav.Link href="/register" style={{ color: "#fff", fontWeight: "bold" }}>
              Registrazione
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPage;


