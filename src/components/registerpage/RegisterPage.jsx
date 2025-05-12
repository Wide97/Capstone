import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarPage from "../navbar/NavbarPage.jsx";
import FooterPage from "../footer/FooterPage.jsx";
import LoadingSpinner from "../spinner/LoadingSpinner";
import "./RegisterPage.scss";

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
  const [loading, setLoading] = useState(false);
  const [invalidFields, setInvalidFields] = useState({});

  useEffect(() => {
    return () => {
      setFormData({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
      });
    };
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.email.includes("@")) errors.email = true;
    if (formData.password.length < 8) errors.password = true;
    if (!formData.username) errors.username = true;
    if (!formData.firstName) errors.firstName = true;
    if (!formData.lastName) errors.lastName = true;

    setInvalidFields(errors);

    if (Object.keys(errors).length > 0) {
      setError("Tutti i campi sono obbligatori e corretti.");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setInvalidFields((prev) => ({ ...prev, [e.target.name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 400) throw new Error("Email o username già in uso.");
        throw new Error("Errore durante la registrazione. Riprova.");
      }

      setSuccess("Registrazione completata con successo!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarPage />
      <div className="container-register">
        <div className="form-container">
          <h1 className="text-center mb-4">Registrazione</h1>

          {loading && <LoadingSpinner />}
          {error && <AlertMessage type="danger" message={error} />}
          {success && <AlertMessage type="success" message={success} />}

          {!loading && (
            <form onSubmit={handleSubmit} noValidate>
              {["firstName", "lastName", "email", "username"].map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={field === "firstName" ? "Nome" :
                               field === "lastName" ? "Cognome" :
                               field === "username" ? "Username" : "Email"}
                  className={`form-control ${invalidFields[field] ? "invalid" : ""}`}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              ))}

              <div className="input-group mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password (min 8 caratteri)"
                  className={`form-control ${invalidFields.password ? "invalid" : ""}`}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="btn toggle-password mb-3"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Mostra/Nascondi password"
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
                </button>
              </div>

              <button type="submit" className="btn-register" disabled={loading}>
                {loading ? "Registrazione in corso..." : "Registrati"}
              </button>
            </form>
          )}
        </div>
      </div>
      <FooterPage />
    </>
  );
};

const AlertMessage = ({ type, message }) => (
  <div className={`alert alert-${type}`}>{message}</div>
);

export default RegisterPage;
