import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./Auth";

function App() {
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(window.innerHeight);
  const [iframeWidth, setIframeWidth] = useState(window.innerHeight);
  const [iframeSrc, setIframeSrc] = useState("https://example.com");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIframeHeight(window.innerHeight);
      setIframeWidth(window.innerWidth - 221);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleButtonClick = (url) => {
    setIframeSrc(url);
    setRefresh(refresh + 1);
  };

  return (
    <div className="app-container">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            {/* Other routes */}
          </Routes>
        </AuthProvider>
      </Router>
      <AuthProvider></AuthProvider>
    </div>
  );
}

export default App;
