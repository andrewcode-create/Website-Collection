const Websites = () => {
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
export default Websites;
