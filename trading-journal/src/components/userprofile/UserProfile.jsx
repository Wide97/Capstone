import React, { useState, useEffect } from "react";
import FooterPage from "../footer/FooterPage";
import UserNav from "../usernav/UserNav";
import { uploadProfileImage } from "../utils/apiImage";
import { updateUser } from "../utils/apiUpadate"; 
import "./UserProfile.css";

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
      <UserNav userData={userData}/>
      <div className="container user-profile-container">
        <div className="profile-header text-center mb-4">
          <h2 className="text-light">Profilo Utente</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4 col-sm-12 text-center mb-4">
            <div className="profile-image-container rounded-circle">
              <img
                className="profile-image rounded-circle shadow-lg"
                src={imageUrl || userData.profileImageUrl || "https://placedog.net/500/280"}
                alt="Profilo"
                width="150"
                height="150"
              />
            </div>
            <form onSubmit={handleImageUpload}>
              <input
                type="file"
                id="fileInput" 
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                required
                className="form-control mt-3"
                style={{
                  display: "none",
                }}
              />
              <label htmlFor="fileInput" className="file-label">
                Scegli file
              </label>
              <button type="submit" className=" mt-3">
                Carica immagine
              </button>
            </form>
          </div>

          <div className="col-md-8 col-sm-12 profile-details py-5">
            <div className="card-body ps-5">
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

            <div className="input-container">
              <form onSubmit={handleUserUpdate}>
                <div className="form-group">
                  <label className="text-form-group mb-2">Nuovo Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="text-form-group mb-2" >Nuova Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn mt-4">
                  Aggiorna Dati
                </button>
              </form>
            </div>

            {message && <div className="alert mt-3">{message}</div>}
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default UserProfile;
