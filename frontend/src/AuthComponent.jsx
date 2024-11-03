import React, { useState, useEffect } from "react";
import axios from "axios";
import Websites from "./Websites";

const backend = "http://localhost:3000";

function AuthComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  const register = async () => {
    try {
      await axios.post(`${backend}/register`, { email, password });
      alert("User registered successfully!");
    } catch (error) {
      console.error("Registration error:", error.message);
      alert("Registration failed!");
    }
  };

  const login = async () => {
    try {
      const response = await axios.post(`${backend}/login`, {
        email,
        password,
      });
      localStorage.setItem("token", token);
      setToken(response.data.token);
      alert("Login successful!");
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Invalid email or password");
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    alert("Logged out!");
  };

  useEffect(() => {
    if (token) {
      // Optional: Verify token validity with a request to the server or decode it locally
      console.log("User is logged in");
    }
  }, [token]);

  return (
    <div>
      <h1>Login:</h1>
      {!token ? (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </div>
      ) : (
        <div>
          <p>Welcome!</p>
          <button onClick={logout}>Logout</button>
          <Websites />
        </div>
      )}
    </div>
  );
}

export default AuthComponent;
