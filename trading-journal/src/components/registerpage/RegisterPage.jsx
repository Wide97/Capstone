import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarPage from "../navbar/NavbarPage";
import "./RegisterPage.scss";
import FooterPage from "../footer/FooterPage";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateForm = () => {
    if (!formData.email.includes("@")) {
      setError("Inserisci un'email valida.");
      return false;
    }
    if (formData.password.length < 8) {
      setError("La password deve contenere almeno 8 caratteri.");
      return false;
    }
    if (!formData.username || !formData.firstName || !formData.lastName) {
      setError("Tutti i campi sono obbligatori.");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Errore durante la registrazione. Controlla i dati.");
      }

      setSuccess("Registrazione completata con successo!");
      setTimeout(() => navigate("/login"), 2000); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <NavbarPage />
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="form-container">
          <h1 className="mb-5">Registrazione</h1>
          {error && <div className="alert">{error}</div>}
          {success && <div className="alert">{success}</div>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="Nome"
              className="form-control"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Cognome"
              className="form-control"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn btn-primary">
              Registrati
            </button>
          </form>
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default RegisterPage;