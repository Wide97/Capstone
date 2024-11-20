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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<PageLogin />} />
        {<Route path="/register" element={<RegisterPage />} />}
        <Route path="/user" element={<UserPage />} />
        <Route path="/userjournal" element={<UserJournal />} />
        <Route path="/useranalytics" element={<UserAnalytics />} />
        <Route path="/userreport" element={<UserReport />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
