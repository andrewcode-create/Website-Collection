import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Websites from "./Websites";
import AuthComponent from "./AuthComponent";

const toggleTheme = () => {
  if (theme === "Dark") {
    setTheme("Light");
  } else if (theme === "Light") {
    setTheme("Dark");
  }
};

function App() {
  const [theme, setTheme] = useState("Light");
  return (
    <div>
      <AuthComponent theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;
