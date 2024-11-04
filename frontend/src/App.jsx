import React, { useEffect, useRef, useState } from "react";

import AuthComponent from "./AuthComponent";

function App() {
  const toggleTheme = () => {
    if (theme === "Dark") {
      setTheme("Light");
    } else if (theme === "Light") {
      setTheme("Dark");
    }
  };

  const [theme, setTheme] = useState("Dark");

  return (
    <div className={theme}>
      <AuthComponent theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;
