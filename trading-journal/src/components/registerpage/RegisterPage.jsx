import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarPage from "../navbar/NavbarPage";
import "./RegisterPage.scss";
import FooterPage from "../footer/FooterPage";
import LoadingSpinner from "../spinner/LoadingSpinner";

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
    return () =>
      setFormData({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
      });
  }, []);

  const validateForm = () => {
    const fields = {};
    if (!formData.email.includes("@")) fields.email = true;
    if (formData.password.length < 8) fields.password = true;
    if (!formData.username) fields.username = true;
    if (!formData.firstName) fields.firstName = true;
    if (!formData.lastName) fields.lastName = true;

    setInvalidFields(fields);
    if (Object.keys(fields).length > 0) {
      setError("Tutti i campi sono obbligatori e corretti.");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setInvalidFields({ ...invalidFields, [e.target.name]: false });
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
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Email o username già in uso.");
        }
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
      <div className="container-register d-flex justify-content-center align-items-center vh-100">
        <div className="form-container">
          <h1 className="text-center mb-4">Registrazione</h1>
          {loading && <LoadingSpinner />}
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          {!loading && (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="firstName"
                placeholder="Nome"
                className={`form-control ${
                  invalidFields.firstName ? "invalid" : ""
                }`}
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Cognome"
                className={`form-control ${
                  invalidFields.lastName ? "invalid" : ""
                }`}
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`form-control ${
                  invalidFields.email ? "invalid" : ""
                }`}
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                className={`form-control ${
                  invalidFields.username ? "invalid" : ""
                }`}
                value={formData.username}
                onChange={handleChange}
                required
              />
              <div className="input-group mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={`form-control ${
                    invalidFields.password ? "invalid" : ""
                  }`}
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
                    className={`bi ${
                      showPassword ? "bi-eye-slash" : "bi-eye"
                    }`}
                  ></i>
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

export default RegisterPage;
