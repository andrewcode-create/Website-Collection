const Websites = () => {
  return (
    <>
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
        </button>{" "}
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
    </>
  );
};
