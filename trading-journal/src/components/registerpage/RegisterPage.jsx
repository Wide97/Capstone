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
  const [showPassword, setShowPassword] = useState(false);

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
      <div className="container-register d-flex justify-content-center align-items-center vh-100">
        <div className="form-container">
          <h1 className="text-center mb-4">Registrazione</h1>
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
            <div className="input-group mb-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="btn toggle-password mb-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </button>
            </div>

            <button type="submit" className="btn-register">
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
