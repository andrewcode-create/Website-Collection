import React, { useEffect, useRef, useState } from "react";

import AuthComponent from "./AuthComponent";

function App() {
  const toggleTheme = () => {
    if (theme === "Dark") {
      setTheme("Light");
      setSettings({ ...setSettings, theme: "Light" });
    } else if (theme === "Light") {
      setTheme("Dark");
      setSettings({ ...setSettings, theme: "Dark" });
    }
  };
  const setNewTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const [theme, setTheme] = useState("Light");
  const [settings, setSettings] = useState({ theme: theme });

  return (
    <div className={theme}>
      <AuthComponent
        theme={theme}
        toggleTheme={toggleTheme}
        settings={settings}
        setSettings={setSettings}
        setTheme={setNewTheme}
      />
    </div>
  );
}

export default App;
