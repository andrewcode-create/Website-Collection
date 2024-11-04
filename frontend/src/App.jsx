import React from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import Login from "./Login";

const App = () => {
  // Check if the user is authenticated
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const signOut = useSignOut();

  const handleLogout = () => {
    signOut();
    console.log("User logged out");
  };

  return (
    <div>
      <h1>React Auth Kit Example</h1>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {authUser()?.email}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;

/*
import React, { useEffect, useRef, useState } from "react";

import AuthComponent from "./AuthComponent";

import { PrivateRoute, useAuth } from "react-auth-kit";

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Page</h1>
    </div>
  );
};

const App = () => {
  const { authState, refreshToken } = useAuth();
  const {
    accessToken,
    refreshToken: storedRefreshToken,
    isAuthenticated,
  } = authState;
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/admin" component={AdminPage} />
      </Switch>
    </Router>
  );
};
*/

/*
function App() {

  /*
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
  */

//export default App;
