import React, { useState } from "react";
import { login } from "../utils/api"; 
import "./PageLogin.css"; 
import NavbarPage from "../navbar/NavbarPage";
import FooterPage from "../footer/FooterPage";



const PageLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = await login(username, password);
      setSuccess("Login effettuato con successo!");
      localStorage.setItem("token", token);
    } catch (err) {
      setError(err.message || "Errore durante il login.");
    }
  };

  return (
    <>
    <NavbarPage/>
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="login-container">
        <h1 className="text-center mb-5">Login</h1>
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
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">
            Accedi
          </button>
        </form>
      </div>
    </div>
    <FooterPage/>
    </>
  );
};

export default PageLogin;

