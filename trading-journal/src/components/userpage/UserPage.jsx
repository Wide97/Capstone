import React from "react";
import NavbarPage from "../navbar/NavbarPage";
import FooterPage from "../footer/FooterPage";

const UserPage = () => {
  return (
    <>
      <NavbarPage />
      <div className="container text-center vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className="mb-4">Benvenuto nella tua pagina utente!</h1>
        <p>Questa è la tua dashboard personale. Altre funzionalità verranno implementate qui.</p>
      </div>
      <FooterPage />
    </>
  );
};

export default UserPage;
