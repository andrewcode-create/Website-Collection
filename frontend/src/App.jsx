import React, { useEffect, useRef, useState } from "react";

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
    <div className={theme}>
      <AuthComponent theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;
