import React from "react";
import NavbarPage from "../navbar/NavbarPage";
import FooterPage from "../footer/FooterPage";

const UserJournal = () => {
  return (
    <>
      <NavbarPage />
      <div className="container text-center vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1>Journal</h1>
        <p>Qui puoi registrare le tue operazioni giornaliere.</p>
      </div>
      <FooterPage />
    </>
  );
};

export default UserJournal;
