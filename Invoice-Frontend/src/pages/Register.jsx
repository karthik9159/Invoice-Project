// src/pages/Register.jsx
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("/auth/users/", { username, password, re_password: password2 });
      alert("User registered! Please login.");
      navigate("/login");
    } catch (err) {
      setError("Registration failed. " + (err.response?.data?.username?.[0] || ""));
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          placeholder="Confirm Password"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
