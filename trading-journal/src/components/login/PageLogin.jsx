import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/api";
import "./PageLogin.scss";
import NavbarPage from "../navbar/NavbarPage";
import FooterPage from "../footer/FooterPage";
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
      <div className="container-login d-flex justify-content-center align-items-center vh-100">
        <div className="login-container">
          <h1 className="text-center mb-5">Weclocme to TradingJournal</h1>
          <p className="text-center mb-3">We help traders become profitable!</p>
          {loading && <LoadingSpinner />}
          {error && (
            <p className="alert alert-danger">
              <i className="bi bi-exclamation-circle"></i> {error}
            </p>
          )}
          {success && (
            <p className="alert alert-success">
              <i className="bi bi-check-circle"></i> {success}
            </p>
          )}
          {!loading && (
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-4">
                <span className="input-group-text">
                  <i className="bi bi-person"></i>
                </span>
                <input
                  type="text"
                  placeholder="Username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-4">
                <span className="input-group-text">
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="input-group-text toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  ></i>
                </span>
              </div>

              <button type="submit" className="btn-login">
                Sign up
              </button>
            </form>
          )}
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default PageLogin;
