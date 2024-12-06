

import React, { useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./NavbarPage.scss";

const NavbarPage = () => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [isToggled, setIsToggled] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); 
      } else {
        setIsVisible(true); 
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  

  return (
    <Navbar
      expand="lg"
      className={`navbar-animated shadow fixed-top ${isVisible ? "visible" : "hidden"}`}
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
        <div
          className={`navbar-toggler ${isToggled ? "toggled" : ""}`}
          onClick={() => setIsToggled(!isToggled)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Navbar.Collapse className={isToggled ? "show" : ""}>
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







