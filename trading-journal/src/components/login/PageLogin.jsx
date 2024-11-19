import React, { useState } from "react";
import { login } from "../utils/api"; 
import "./PageLogin.css"; 
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
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="login-container shadow-lg rounded">
        <h1 className="text-center mb-4">Login</h1>
        {error && <p className="alert alert-danger">{error}</p>}
        {success && <p className="alert alert-success">{success}</p>}
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
          <button type="submit" className="btn btn-primary w-100">
            Accedi
          </button>
        </form>
      </div>
    </div>
  );
};

export default PageLogin;

