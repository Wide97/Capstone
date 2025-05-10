import React, { useState, useEffect } from "react";
import FooterPage from "../footer/FooterPage.jsx";
import UserNav from "../usernav/UserNav.jsx";
import { uploadProfileImage } from "../utils/apiImage";
import { updateUser } from "../utils/apiUpadate";
import LoadingSpinner from "../spinner/LoadingSpinner";

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    fetch(`${API_BASE_URL}/api/auth/profile`, {
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
      .catch((error) => console.error("Error fetching user data:", error))
      .finally(() => setLoading(false));
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
    setUpdating(true);

    const id = userData.id;
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
    } catch (error) {
      setMessage("Errore nel caricamento dell'immagine.");
    } finally {
      setUpdating(false);
    }
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const id = userData.id;
    if (!id) {
      alert("ID utente non valido.");
      return;
    }
    if (newPassword.length < 8) {
      setMessage("La password deve contenere almeno 8 caratteri.");
      setUpdating(false);
      return;
    }

    try {
      const updatedData = await updateUser(id, newUsername, newPassword);
      setUserData(updatedData.user);
      setMessage("Dati aggiornati con successo.");
    } catch (error) {
      setMessage("Errore nell'aggiornamento dei dati.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <UserNav userData={userData} />
      <div className="container my-5">
        <h2 className="text-center mb-4">Profilo Utente</h2>
        <div className="row g-4">
          {/* IMMAGINE E UPLOAD */}
          <div className="col-12 col-md-5 text-center">
            <img
              className="img-fluid rounded-circle shadow mb-3"
              style={{ maxWidth: "250px" }}
              src={
                imageUrl ||
                userData.profileImageUrl ||
                "https://placedog.net/500/280"
              }
              alt="Profilo"
            />
            <form onSubmit={handleImageUpload}>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  required
                />
              </div>
              <button className="btn btn-primary" type="submit" disabled={updating}>
                Carica immagine
              </button>
            </form>
          </div>

          {/* DETTAGLI E FORM UPDATE */}
          <div className="col-12 col-md-7">
            <div className="card p-3 shadow-sm mb-4">
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Nome:</strong> {userData.firstName}</p>
              <p><strong>Cognome:</strong> {userData.lastName}</p>
              <p>
                <strong>Immagine Profilo:</strong>{" "}
                {userData.profileImageUrl ? "Presente" : "Nessuna immagine"}
              </p>
            </div>

            <form onSubmit={handleUserUpdate}>
              <div className="mb-3">
                <label className="form-label">Nuovo Username:</label>
                <input
                  type="text"
                  className="form-control"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nuova Password:</label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button className="btn btn-success" type="submit" disabled={updating}>
                Aggiorna Dati
              </button>
            </form>

            {message && <div className="alert alert-info mt-3">{message}</div>}
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default UserProfile;