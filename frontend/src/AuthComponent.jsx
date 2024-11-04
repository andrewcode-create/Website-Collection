import React, { useState, useEffect } from "react";
import axios from "axios";
import Websites from "./Websites";
import Login from "./Login";

const Storage = localStorage;

const backend = "http://localhost:3000";

function AuthComponent({
  theme,
  toggleTheme,
  settings,
  setSettings,
  setTheme,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(Storage.getItem("token"));

  const register = async () => {
    try {
      const res = await axios.post(`${backend}/register`, { email, password });
      alert("User registered successfully!");
    } catch (err) {
      console.error(
        "Registration error:",
        err.message,
        err.response.data.message
      );
      alert(
        `Registration failed! ${
          err.response?.data?.message || "An unexpected error occurred"
        }`
      );
    }
  };

  const login = async () => {
    try {
      const response = await axios.post(`${backend}/login`, {
        email,
        password,
      });
      Storage.setItem("token", response.data.token);
      setToken(response.data.token);
      alert("Login successful!");
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Invalid email or password");
    }
  };

  const logout = () => {
    setToken(null);
    Storage.removeItem("token");
    alert("Logged out!");
  };

  useEffect(() => {
    if (token) {
      // Optional: Verify token validity with a request to the server or decode it locally
      console.log("User is logged in");
    }
  }, [token]);

  console.log(`theme: ${theme}`);

  return (
    <div>
      {token ? (
        <Websites
          logout={logout}
          storage={Storage}
          theme={theme}
          toggleTheme={toggleTheme}
          settings={settings}
          setSettings={setSettings}
          setTheme={setTheme}
        />
      ) : (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          login={login}
          register={register}
          storage={Storage}
          theme={theme}
          toggleTheme={toggleTheme}
          settings={settings}
          setSettings={setSettings}
        />
      )}
    </div>
  );
}

export default AuthComponent;
