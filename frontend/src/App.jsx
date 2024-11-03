import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./AuthProvider";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard";
import Websites from "./Websites";

function App() {
  return (
    <div className="app-container">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/websites" element={<Websites />} />
            {/* Other routes */}
          </Routes>
        </AuthProvider>
      </Router>
      <AuthProvider></AuthProvider>
    </div>
  );
}

export default App;
