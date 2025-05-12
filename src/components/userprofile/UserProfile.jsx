import React, { useState, useEffect } from "react";
import FooterPage from "../footer/FooterPage.jsx";
import UserNav from "../usernav/UserNav.jsx";
import { uploadProfileImage } from "../utils/apiImage";
import { updateUser } from "../utils/apiUpadate";
import "./UserProfile.scss";
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
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.user);
        setImageUrl(data.user.profileImageUrl);
      })
      .catch((err) => console.error("Errore:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const id = userData.id;

    if (!id || !imageFile) {
      alert("ID utente non valido o nessun file selezionato.");
      setUpdating(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const res = await uploadProfileImage(id, formData);
      setUserData(res.user);
      setImageUrl(res.user.profileImageUrl);
      setMessage("Immagine aggiornata con successo.");
    } catch (err) {
      console.error("Errore upload immagine:", err);
      setMessage("Errore nel caricamento dell'immagine.");
    } finally {
      setUpdating(false);
    }
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const id = userData.id;

    if (!newUsername && !newPassword) {
      setMessage("Inserisci almeno uno dei campi da aggiornare.");
      setUpdating(false);
      return;
    }

    if (newPassword && newPassword.length < 8) {
      setMessage("La password deve contenere almeno 8 caratteri.");
      setUpdating(false);
      return;
    }

    try {
      const res = await updateUser(id, newUsername, newPassword);
      setUserData(res.user);
      setMessage("Dati aggiornati con successo.");
      setNewUsername("");
      setNewPassword("");
    } catch {
      setMessage("Errore nell'aggiornamento dei dati.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <UserNav userData={userData} />
      <div className="user-profile-container-pp">
        <div className="profile-wrapper">
          <h2 className="title-pp">PROFILO UTENTE</h2>

          {updating ? (
            <LoadingSpinner />
          ) : (
            <div className="row gy-4 justify-content-center">
              <div className="col-md-4 text-center">
                <img
                  className="rounded-circle shadow-lg profile-img mb-3"
                  src={imageUrl || "https://placedog.net/500/280"}
                  alt="Profilo"
                />
                <form onSubmit={handleImageUpload}>
                  <input
                    type="file"
                    className="form-control mb-2"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    required
                  />
                  <button type="submit" className="btn btn-dark w-100">
                    Carica Immagine
                  </button>
                </form>
              </div>

              <div className="col-md-6">
                <div className="p-4 rounded shadow-sm bg-section mb-4">
                  <p><span className="profile-info-label">Username:</span> {userData.username}</p>
                  <p><span className="profile-info-label">Email:</span> {userData.email}</p>
                  <p><span className="profile-info-label">Nome:</span> {userData.firstName}</p>
                  <p><span className="profile-info-label">Cognome:</span> {userData.lastName}</p>
                  <p><span className="profile-info-label">Immagine Profilo:</span> {userData.profileImageUrl ? "Presente" : "Nessuna immagine"}</p>
                </div>

                <form onSubmit={handleUserUpdate} className="bg-section p-4 rounded shadow-sm">
                  <div className="mb-3">
                    <label className="form-label">Nuovo Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nuova Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-dark w-100">
                    Aggiorna Dati
                  </button>
                  {message && <div className="alert alert-info mt-3">{message}</div>}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default UserProfile;
