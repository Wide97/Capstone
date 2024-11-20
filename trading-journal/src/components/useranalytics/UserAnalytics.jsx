import React from "react";
import NavbarPage from "../navbar/NavbarPage";
import FooterPage from "../footer/FooterPage";

const UserAnalytics = () => {
  return (
    <>
      <NavbarPage />
      <div className="container text-center vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1>Analytics</h1>
        <p>Qui puoi analizzare le tue performance tramite grafici.</p>
      </div>
      <FooterPage />
    </>
  );
};

export default UserAnalytics;
