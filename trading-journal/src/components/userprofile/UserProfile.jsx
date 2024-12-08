import React, { useState, useEffect } from "react";
import FooterPage from "../footer/FooterPage";
import UserNav from "../usernav/UserNav";
import { uploadProfileImage } from "../utils/apiImage";
import { updateUser } from "../utils/apiUpadate"; 
import "./UserProfile.scss";

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [newUsername, setNewUsername] = useState(""); 
  const [newPassword, setNewPassword] = useState(""); 
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/api/auth/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.user);
        setImageUrl(data.user.profileImageUrl);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(""); 
      }, 2000);
      return () => clearTimeout(timer); 
    }
  }, [message]);

  const handleImageUpload = async (e) => {
    e.preventDefault();

    const id = userData.id ? userData.id : null;
    if (!id) {
      alert("ID utente non valido.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const updatedUserData = await uploadProfileImage(id, formData);
      setUserData(updatedUserData.user);
      setImageUrl(updatedUserData.user.profileImageUrl);

      setMessage("Immagine caricata con successo.");

      setTimeout(() => {
        setMessage(""); 
      }, 2000);
    } catch (error) {
      setMessage("Errore nel caricamento dell'immagine.");
    }
  };

  

  const handleUserUpdate = async (e) => {
    e.preventDefault();

    const id = userData.id ? userData.id : null;
    if (!id) {
      alert("ID utente non valido.");
      return;
    }
    if (newPassword.length < 8) {
      setMessage("La password deve contenere almeno 8 caratteri.");
      return;
    }

    try {
      const updatedData = await updateUser(id, newUsername, newPassword);
      setUserData(updatedData.user); 
      setMessage("Dati aggiornati con successo.");
    } catch (error) {
      setMessage("Errore nell'aggiornamento dei dati.");
    }
  };

  return (
    <>
      <UserNav userData={userData} />
      <div className="user-profile-container-pp">
        <div className="profile-header-pp text-center">
          <h2 className="title-pp">Profilo Utente</h2>
        </div>
        <div className="profile-content-pp">
          <div className="profile-image-section-pp">
            <div className="profile-image-container-pp">
              <img
                className="profile-image-pp shadow-lg"
                src={imageUrl || userData.profileImageUrl || "https://placedog.net/500/280"}
                alt="Profilo"
              />
            </div>
            <form onSubmit={handleImageUpload} className="image-upload-form-pp">
              <label htmlFor="fileInput" className="file-label-pp">
                Scegli file
              </label>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                required
                className="file-input-pp"
              />
              <button type="submit" className="btn-upload-pp">
                Carica immagine
              </button>
            </form>
          </div>
          <div className="profile-details-section-pp">
            <div className="details-card-pp">
              <p>
                <strong>Username:</strong> {userData.username}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Nome:</strong> {userData.firstName}
              </p>
              <p>
                <strong>Cognome:</strong> {userData.lastName}
              </p>
              <p>
                <strong>Immagine Profilo:</strong>{" "}
                {userData.profileImageUrl ? "Presente" : "Nessuna immagine"}
              </p>
            </div>
            <form onSubmit={handleUserUpdate} className="update-form-pp">
              <div className="form-group-pp">
                <label className="form-label-pp">Nuovo Username:</label>
                <input
                  type="text"
                  className="form-control-pp"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>
              <div className="form-group-pp">
                <label className="form-label-pp">Nuova Password:</label>
                <input
                  type="password"
                  className="form-control-pp"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-update-pp">
                Aggiorna Dati
              </button>
            </form>
            {message && <div className="alert-pp mt-3">{message}</div>}
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default UserProfile;
