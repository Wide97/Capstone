import React from "react";
import NavbarPage from "../navbar/NavbarPage";
import FooterPage from "../footer/FooterPage";

const UserReport = () => {
  return (
    <>
      <NavbarPage />
      <div className="container text-center vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1>Reporting</h1>
        <p>Qui puoi visualizzare tutti i tuoi trade e scaricare i report.</p>
      </div>
      <FooterPage />
    </>
  );
};

export default UserReport;
