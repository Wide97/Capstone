import React, { useState, useEffect } from "react";
import FooterPage from "../footer/FooterPage";
import UserNav from "../usernav/UserNav";
import { uploadProfileImage } from "../utils/apiImage"; 
import "./UserProfile.css";

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState(""); // Messaggio di stato per l'errore o successo
  const [imageUrl, setImageUrl] = useState(""); // URL dell'immagine aggiornata

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    fetch("http://localhost:3001/api/auth/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Dati utente ricevuti:", data);  // Verifica i dati ricevuti
        setUserData(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);
  

  const handleImageUpload = async (e) => {
    e.preventDefault();
  
    // Assicurati che l'ID dell'utente sia valido
    const id = userData.id ? userData.id : null; // Verifica che l'ID sia presente
    console.log('User ID:', id);  // Log per vedere l'ID
  
    if (!id) {
      alert("ID utente non valido.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", imageFile);
  
    try {
      const response = await uploadProfileImage(id, formData);
      if (response && response.message) {
        setMessage(response.message); // Mostra il messaggio di successo
        setImageUrl(response.imageUrl); // Aggiorna l'URL dell'immagine
      }
    } catch (error) {
      setMessage("Errore nel caricamento dell'immagine.");
    }
  };

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
              src={imageUrl || userData.profileImageUrl || "default-image.png"}
              alt="Profilo"
              width="150"
              height="150"
            />
            <form onSubmit={handleImageUpload}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                required
              />
              <button type="submit">Carica immagine</button>
            </form>
          </div>
          <div className="col-md-8 col-sm-12 profile-details">
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Nome:</strong> {userData.firstName}</p>
            <p><strong>Cognome:</strong> {userData.lastName}</p>
            <p><strong>Immagine Profilo:</strong> {userData.profileImageUrl ? "Presente" : "Nessuna immagine"}</p>

            <div>{message && <p>{message}</p>}</div> {/* Mostra il messaggio di stato */}
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default UserProfile;















