import React, { useState, useEffect } from "react";
import FooterPage from "../footer/FooterPage";
import UserNav from "../usernav/UserNav";
import "./UserProfile.css";

const UserProfile = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/api/auth/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Errore nel recupero dei dati:", error));
  }, []);

  return (
    <>
      <UserNav />
      <div className="container user-profile-container">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h2 className="profile-title">Profilo Utente</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4 col-sm-12 text-center">
            <img
              className="profile-image"
              src={userData.profileImageUrl || "https://via.placeholder.com/150"}
              alt="Immagine Profilo"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <p className="mt-2">{userData.profileImageUrl ? "Immagine Profilo Presente" : "Nessuna immagine"}</p>
          </div>
          <div className="col-md-8 col-sm-12 mt-4 mt-md-0">
            <div className="profile-details">
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Nome:</strong> {userData.firstName}</p>
              <p><strong>Cognome:</strong> {userData.lastName}</p>
            </div>
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default UserProfile;










