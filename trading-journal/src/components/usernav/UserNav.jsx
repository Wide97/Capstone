import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import "./UserNav.css";

const UserNav = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    window.location.href = "/"; 
  };

  return (
    <Navbar
      expand="lg"
      className={`navbar-animated shadow fixed-top ${isVisible ? "visible" : ""}`}
      variant="dark"
    >
      <Container>
        <Navbar.Brand href="/user" className="navbar-brand d-flex align-items-center">
          <img
            src="/img/t-removebg-preview.png" 
            alt="Trading Journal Logo"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          Trading Journal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/userjournal" className="nav-link-custom">
              Journal
            </Nav.Link>
            <Nav.Link href="/useranalytics" className="nav-link-custom">
              Analytics
            </Nav.Link>
            <Nav.Link href="/userreport" className="nav-link-custom">
              Report
            </Nav.Link>
            <Dropdown align="end" className="profile-dropdown">
              <Dropdown.Toggle
                variant="custom"
                id="dropdown-profile"
                className="profile-icon"
              >
                <i className="bi bi-person-circle"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/userprofile">Profilo</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Esci</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNav;

