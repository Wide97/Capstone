import React, { useState, useEffect } from "react";
import FooterPage from "../footer/FooterPage";
import UserNav from "../usernav/UserNav";

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
    .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return (
    <>
      <UserNav />
      <div className="container user-profile-container">
        <div className="profile-header">
          <h2>Profilo Utente</h2>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-12 text-center">
            <img
              className="profile-image"
              src={userData.profileImageUrl || "default-image.png"}
              alt="Profilo"
            />
          </div>
          <div className="col-md-8 col-sm-12 profile-details">
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Nome:</strong> {userData.firstName}</p>
            <p><strong>Cognome:</strong> {userData.lastName}</p>
            <p><strong>Immagine Profilo:</strong> {userData.profileImageUrl ? "Presente" : "Nessuna immagine"}</p>
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default UserProfile;


