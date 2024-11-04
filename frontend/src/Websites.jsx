import React, { useEffect, useRef, useState } from "react";
import "./Websites.css";
import { useProtectedData } from "./hooks/useProtectedData";

function Websites({
  logout,
  storage,
  theme,
  toggleTheme,
  setTheme,
  settings,
  setSettings,
}) {
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(window.innerHeight);
  const [iframeWidth, setIframeWidth] = useState(window.innerHeight);
  const [iframeSrc, setIframeSrc] = useState("https://example.com");
  const [refresh, setRefresh] = useState(0);

  const result = useProtectedData("settings", storage, settings, setSettings);
  const loading = result.loading;
  const error = result.error;

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

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    if (theme !== settings.theme) {
      toggleTheme();
    }
  }, [settings]);

  const handleButtonClick = (url) => {
    setIframeSrc(url);
    setRefresh(refresh + 1);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error === "User not authenticated") {
    return (
      <p>Not Authenticated.</p>
      //<div>{login_component}</div>
    );
  }
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`app-container ${theme}`}>
      <div className={`sidebar ${theme}`}>
        <h3 className="sidebar-text">Websites</h3>
        <button
          className="webite-button"
          onClick={() => handleButtonClick("https://example.com")}
        >
          Example
        </button>
        <button
          className="webite-button"
          onClick={() => handleButtonClick("https://www.nhc.noaa.gov/gtwo.php")}
        >
          Tropical Outlook
        </button>
        <button
          className="webite-button"
          onClick={() =>
            handleButtonClick("https://www.spc.noaa.gov/products/outlook/")
          }
        >
          Convective Outlooks
        </button>
        <button
          className="webite-button"
          onClick={() => handleButtonClick("https://www.tropicaltidbits.com/")}
        >
          Tropical Tidbits
        </button>
        <button onClick={logout}>Logout</button>

        <button className="webite-button" onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>

      <div className="iframe-container">
        <iframe
          className="iframe-content"
          ref={iframeRef}
          key={refresh}
          src={iframeSrc}
          width={iframeWidth}
          height={iframeHeight}
        />
      </div>
    </div>
  );
}

export default Websites;
