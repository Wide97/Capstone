import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage/HomePage";
import PageLogin from "./components/login/PageLogin";
// Puoi aggiungere la pagina Register quando sarà pronta
// import PageRegister from "./components/register/PageRegister";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<PageLogin />} />
        {/* <Route path="/register" element={<PageRegister />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

