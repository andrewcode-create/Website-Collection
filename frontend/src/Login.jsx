import { AuthForm, useAuth } from "react-auth-kit";

import React, { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useSignIn();

  const handleLogin = async () => {
    try {
      // Replace with your backend login endpoint
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      const { token, refreshToken, expiresIn } = response.data; // Adjust according to your response structure

      // Store tokens using react-auth-kit
      const isAuthenticated = signIn({
        token,
        expiresIn: expiresIn / 60, // expiresIn in minutes
        tokenType: "Bearer",
        authState: { email }, // Additional state (optional)
        refreshToken,
        refreshTokenExpireIn: 24 * 60, // Example: 24 hours
      });

      if (isAuthenticated) {
        console.log("User authenticated successfully");
      } else {
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials, please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

/*
import "./Login.css";
import React, { useEffect, useRef, useState } from "react";

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  register,
  login,
  theme,
  toggleTheme,
}) => {
  // Apply theme class to the body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const isFormValid = email && password.length > 6;

  return (
    <div className={`Login ${theme}`}>
      <h1>Login:</h1>
      <input
        type="text"
        placeholder="Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={register} disabled={!isFormValid}>
        Register
      </button>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
*/
