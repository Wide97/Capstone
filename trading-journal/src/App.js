import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage/HomePage";
import PageLogin from "./components/login/PageLogin";
import RegisterPage from "./components/registerpage/RegisterPage";
import UserPage from "./components/userpage/UserPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<PageLogin />} />
        {<Route path="/register" element={<RegisterPage />} /> }
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;

