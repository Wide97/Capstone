import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/api";
import "./PageLogin.scss";
import NavbarPage from "../navbar/NavbarPage.jsx";
import FooterPage from "../footer/FooterPage.jsx";
import LoadingSpinner from "../spinner/LoadingSpinner";

const PageLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = await login(username, password);
      setSuccess("Login effettuato con successo!");
      localStorage.setItem("token", token);
      setTimeout(() => navigate("/user"), 1500);
    } catch (err) {
      setError(err.message || "Errore durante il login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarPage />

      <div className="container-login">
        <div className="login-container">
          <h1 className="text-center">Welcome to TradingJournal</h1>
          <p className="text-center subtitle">We help traders become profitable!</p>

          {loading && <LoadingSpinner />}
          {error && <AlertMessage type="danger" icon="exclamation-circle" message={error} />}
          {success && <AlertMessage type="success" icon="check-circle" message={success} />}

          {!loading && (
            <form onSubmit={handleSubmit} autoComplete="off">
              {/* Username */}
              <div className="input-group mb-4">
                <span className="input-group-text">
                  <i className="bi bi-person"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="input-group mb-4">
                <span className="input-group-text">
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="input-group-text toggle-password" onClick={() => setShowPassword(!showPassword)}>
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
                </span>
              </div>

              {/* Submit */}
              <button type="submit" className="btn-login">
                Accedi
              </button>
            </form>
          )}
        </div>
      </div>

      <FooterPage />
    </>
  );
};

const AlertMessage = ({ type, icon, message }) => (
  <p className={`alert alert-${type}`}>
    <i className={`bi bi-${icon}`}></i> {message}
  </p>
);

export default PageLogin;
