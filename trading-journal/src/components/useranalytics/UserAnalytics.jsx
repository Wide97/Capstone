import React from "react";
import FooterPage from "../footer/FooterPage";
import UserNav from "../usernav/UserNav";

const UserAnalytics = () => {
  return (
    <>
      <UserNav />
      <div className="container text-center vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1>Analytics</h1>
        <p>Qui puoi analizzare le tue performance tramite grafici.</p>
      </div>
      <FooterPage />
    </>
  );
};

export default UserAnalytics;
