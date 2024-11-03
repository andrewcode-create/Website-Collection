
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { useProtectedData } from "./hooks/useProtectedData";

function Websites({ logout }) {

  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(window.innerHeight);
  const [iframeWidth, setIframeWidth] = useState(window.innerHeight);
  const [iframeSrc, setIframeSrc] = useState("https://example.com");
  const [refresh, setRefresh] = useState(0);

  const { data, loading, error } = useProtectedData("settings");

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


  if (loading) return <p>Loading...</p>;
  if (error === "User not authenticated") {
    return (
      <p>Not Authenticated.</p>
      //<div>{login_component}</div>
    );
  }
  if (error) return <p>Error: {error}</p>;

  const config = data.json;

  return (
    <div className="app-container">

      <div className="sidebar">
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

        {/*todo catch this error*/}
        {/* Add more buttons as needed */}
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
