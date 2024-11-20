import React, { useState } from "react";
import NavbarPage from "../usernav/UserNav" 
import FooterPage from "../footer/FooterPage";
import "./UserProfile.css";

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("MarcoWidesott");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("Username e Password non possono essere vuoti.");
      setSuccess("");
      return;
    }
    setSuccess("Modifiche salvate con successo!");
    setError("");
    // Qui potresti fare una chiamata API per salvare le modifiche
  };

  return (
    <>
      <NavbarPage />
      <div className="container d-flex flex-column align-items-center my-5">
        <h1 className="mb-4">Profilo Utente</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="profile-container">
          {/* Immagine del profilo */}
          <div className="profile-image-container">
            <img
              src={profileImage || "https://via.placeholder.com/150"}
              alt="Profilo"
              className="profile-image me-4"
            />
            <input
              type="file"
              id="profileImageUpload"
              className="file-input"
              onChange={handleImageUpload}
            />
            <label htmlFor="profileImageUpload" className="upload-label">
              Cambia Immagine
            </label>
          </div>

          {/* Form di modifica */}
          <form className="profile-form mt-4">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Nuova Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={handleSaveChanges}
            >
              Salva Modifiche
            </button>
          </form>
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default UserProfile;
