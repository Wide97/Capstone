import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage/HomePage";
import PageLogin from "./components/login/PageLogin";
import RegisterPage from "./components/registerpage/RegisterPage";
import UserPage from "./components/userpage/UserPage";
import UserAnalytics from "./components/useranalytics/UserAnalytics";
import UserReport from "./components/userreport/UserReport";
import UserJournal from "./components/userjournal/UserJournal";
import UserProfile from "./components/userprofile/UserProfile";
import UserStorico from "./components/userstorico/UserStorico";
import DynamicBackground from "./components/dynamic-bg/DynamicBackground";
import DemoPage from "./components/demopage/DemoPage";

function App() {
    console.log("Trigger deploy Vercel"); // 👈 modifica finta
  return (
    <Router>
      {/* Sfondo dinamico visibile su tutte le pagine */}
      <DynamicBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<PageLogin />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/userjournal" element={<UserJournal />} />
          <Route path="/useranalytics" element={<UserAnalytics />} />
          <Route path="/userreport" element={<UserReport />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/userstorico" element={<UserStorico />} />
          <Route path="/demo" element={<DemoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


