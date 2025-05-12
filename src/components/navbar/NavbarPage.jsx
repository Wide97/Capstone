import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import useNavbarVisibility from "./useNavbarVisibility";
import "./NavbarPage.scss";

const NavbarPage = () => {
  const { isVisible, isToggled, setIsToggled } = useNavbarVisibility();

  return (
    <Navbar
      expand="lg"
      variant="dark"
      className={`navbar-animated shadow fixed-top ${isVisible ? "visible" : "hidden"}`}
    >
      <Container>
        <Navbar.Brand href="/" className="navbar-brand">
          <img
            src="/img/t-removebg-preview.png"
            alt="Logo Trading Journal"
            onError={(e) => (e.target.src = "/img/fallback-logo.png")}
          />
          Trading Journal
        </Navbar.Brand>

        {/* Custom Hamburger */}
        <div
          className={`navbar-toggler ${isToggled ? "toggled" : ""}`}
          onClick={() => setIsToggled(!isToggled)}
          aria-label="Toggle navigation"
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
