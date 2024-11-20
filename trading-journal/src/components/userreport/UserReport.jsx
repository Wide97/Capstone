import React from "react";
import FooterPage from "../footer/FooterPage";
import UserNav from "../usernav/UserNav";

const UserReport = () => {
  return (
    <>
      <UserNav />
      <div className="container text-center vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1>Reporting</h1>
        <p>Qui puoi visualizzare tutti i tuoi trade e scaricare i report.</p>
      </div>
      <FooterPage />
    </>
  );
};

export default UserReport;
