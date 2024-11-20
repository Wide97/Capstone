import React, { useState } from "react";
import NavbarPage from "../navbar/NavbarPage";
import "./RegisterPage.css";
import FooterPage from "../footer/FooterPage";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      setFormData({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
      });
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
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
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
