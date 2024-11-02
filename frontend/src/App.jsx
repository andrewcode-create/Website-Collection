import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(window.innerHeight);
  const [iframeWidth, setIframeWidth] = useState(window.innerHeight);
  const [iframeSrc, setIframeSrc] = useState('https://example.com');

  useEffect(() => {
    const handleResize = () => {
      setIframeHeight(window.innerHeight);
      setIframeWidth(window.innerWidth-221);
    }
    handleResize()
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleButtonClick = (url) => {
    setIframeSrc(url);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h3>Websites</h3>
        <button className="webite-button" onClick={() => handleButtonClick('https://example.com')}>Example</button>
        <button className="webite-button" onClick={() => handleButtonClick('https://www.nhc.noaa.gov/gtwo.php')}>Tropical Outlook</button>
        <button className="webite-button" onClick={() => handleButtonClick('https://www.spc.noaa.gov/products/outlook/')}>Convective Outlooks</button>
        {/* Add more buttons as needed */}
      </div>

      <div className="iframe-container">
        <iframe className="iframe-content"
          ref={iframeRef}
          src={iframeSrc}
          width={iframeWidth}
          height={iframeHeight}
        />
      </div>
      
    </div>
  );
}

export default App;
