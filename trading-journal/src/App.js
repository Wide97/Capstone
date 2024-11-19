import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage/HomePage";
import PageLogin from "./components/login/PageLogin";
import RegisterPage from "./components/registerpage/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<PageLogin />} />
        {<Route path="/register" element={<RegisterPage />} /> }
      </Routes>
    </Router>
  );
}

export default App;

