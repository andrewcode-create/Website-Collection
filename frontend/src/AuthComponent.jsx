import React, { useState, useEffect } from "react";
import axios from "axios";
import Websites from "./Websites";
import Login from "./Login";

const backend = "http://localhost:3000";

function AuthComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  const register = async () => {
    var msg = "";
    try {
      const res = await axios.post(`${backend}/register`, { email, password });
      alert("User registered successfully!");
    } catch (err) {
      console.error(
        "Registration error:",
        err.message,
        err.response.data.message
      );
      alert(`Registration failed! ${err.response.data.message}`);
    }
  };

  const login = async () => {
    try {
      const response = await axios.post(`${backend}/login`, {
        email,
        password,
      });
      sessionStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      alert("Login successful!");
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Invalid email or password");
    }
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
    alert("Logged out!");
  };

  useEffect(() => {
    if (token) {
      // Optional: Verify token validity with a request to the server or decode it locally
      console.log("User is logged in");
    }
  }, [token]);

  const getPassword = () => password;
  const getEmail = () => email;

  return (
    <div>
      {!token ? (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          login={login}
          register={register}
        />
      ) : (
        <div>
          <Websites
            logout={logout}
            login_component={
              <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                login={login}
                register={register}
              />
            }
          />
        </div>
      )}
    </div>
  );
}

export default AuthComponent;
