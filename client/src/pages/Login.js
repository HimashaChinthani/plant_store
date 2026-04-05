import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    axios.post("http://localhost:5000/login", { username, password })
      .then((res) => {
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("adminUsername", res.data.username);
        setLoading(false);
        navigate("/admin");
      })
      .catch((err) => {
        console.error(err);
        setError("Invalid credentials. Please try again.");
        setLoading(false);
      });
  };

  const containerStyles = {
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 5%",
  };

  const loginCardStyles = {
    background: "var(--white)",
    padding: "3.5rem",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-lg)",
    width: "100%",
    maxWidth: "450px",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    textAlign: "center",
  };

  const inputStyles = {
    padding: "1rem",
    borderRadius: "var(--radius-sm)",
    border: "1px solid #ddd",
    fontSize: "1rem",
    fontFamily: "inherit",
    width: "100%",
    transition: "var(--transition)",
  };

  const buttonStyles = {
    background: "var(--primary)",
    color: "white",
    padding: "1.2rem",
    fontSize: "1rem",
    fontWeight: "700",
    borderRadius: "var(--radius-sm)",
    marginTop: "1rem",
    boxShadow: "var(--shadow-md)",
  };

  return (
    <div style={containerStyles} className="animate-fade-in">
      <div style={loginCardStyles}>
        <div>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Admin Portal</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Secure login for Florixa staff</p>
        </div>

        {error && (
          <div style={{ color: "#721c24", background: "#f8d7da", padding: "0.8rem", borderRadius: "var(--radius-sm)", fontSize: "0.9rem" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            style={inputStyles}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={inputStyles}
          />
          <button type="submit" disabled={loading} style={buttonStyles}>
            {loading ? "Authenticating..." : "Login to Workspace"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
