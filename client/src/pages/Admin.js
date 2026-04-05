import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    care_instructions: "",
    image_url: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/greennest-portal-2026");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    navigate("/greennest-portal-2026");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("adminToken");

    axios.post("http://localhost:5000/plants", formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        setMessage("Plant added successfully!");
        setFormData({
          name: "",
          category: "",
          price: "",
          description: "",
          care_instructions: "",
          image_url: "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 403 || err.response?.status === 401) {
          setMessage("Session expired. Please login again.");
          localStorage.removeItem("adminToken");
          setTimeout(() => navigate("/greennest-portal-2026"), 2000);
        } else {
          setMessage("Failed to add plant. Check backend console.");
        }
        setLoading(false);
      });
  };

  const containerStyles = {
    padding: "6rem 5%",
    maxWidth: "800px",
    margin: "0 auto",
  };

  const headerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "3rem",
  };

  const formStyles = {
    background: "var(--white)",
    padding: "3rem",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-lg)",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  };

  const logoutButtonStyles = {
    background: "transparent",
    color: "var(--text-muted)",
    border: "1px solid #ddd",
    padding: "0.5rem 1rem",
    fontSize: "0.85rem",
    fontWeight: "600",
    borderRadius: "var(--radius-sm)",
  };

  const inputGroupStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };

  const labelStyles = {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "var(--primary)",
  };

  const inputStyles = {
    padding: "0.8rem",
    borderRadius: "var(--radius-sm)",
    border: "1px solid #ddd",
    fontSize: "1rem",
    fontFamily: "inherit",
  };

  const buttonStyles = {
    background: "var(--primary)",
    color: "white",
    padding: "1rem",
    fontSize: "1rem",
    fontWeight: "600",
    marginTop: "1rem",
    boxShadow: "var(--shadow-md)",
  };

  return (
    <div style={containerStyles} className="animate-fade-in">
      <header style={headerStyles}>
        <div>
          <h1 style={{ fontSize: "2.5rem" }}>Admin Workspace</h1>
          <p style={{ color: "var(--text-muted)" }}>Welcome back, {localStorage.getItem("adminUsername") || "Admin"}</p>
        </div>
        <button onClick={handleLogout} style={logoutButtonStyles}>Logout</button>
      </header>

      {message && (
        <div style={{ 
          padding: "1rem", 
          marginBottom: "2rem", 
          borderRadius: "var(--radius-sm)", 
          textAlign: "center",
          background: message.includes("success") ? "#d4edda" : "#f8d7da",
          color: message.includes("success") ? "#155724" : "#721c24"
        }}>
          {message}
        </div>
      )}

      <form style={formStyles} onSubmit={handleSubmit}>
        <div style={inputGroupStyles}>
          <label style={labelStyles}>Plant Name *</label>
          <input 
            type="text" name="name" value={formData.name} onChange={handleChange} 
            placeholder="e.g. Fiddle Leaf Fig" required style={inputStyles}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div style={inputGroupStyles}>
            <label style={labelStyles}>Category</label>
            <input 
              type="text" name="category" value={formData.category} onChange={handleChange} 
              placeholder="e.g. Indoor Tree" style={inputStyles}
            />
          </div>
          <div style={inputGroupStyles}>
            <label style={labelStyles}>Price (LKR) *</label>
            <input 
              type="number" name="price" value={formData.price} onChange={handleChange} 
              placeholder="e.g. 4500" required style={inputStyles}
            />
          </div>
        </div>

        <div style={inputGroupStyles}>
          <label style={labelStyles}>Image URL</label>
          <input 
            type="text" name="image_url" value={formData.image_url} onChange={handleChange} 
            placeholder="Direct link to image" style={inputStyles}
          />
        </div>

        <div style={inputGroupStyles}>
          <label style={labelStyles}>Description</label>
          <textarea 
            name="description" value={formData.description} onChange={handleChange} 
            placeholder="Tell us about the plant..." rows="4" style={{ ...inputStyles, resize: "vertical" }}
          />
        </div>

        <div style={inputGroupStyles}>
          <label style={labelStyles}>Care Instructions</label>
          <textarea 
            name="care_instructions" value={formData.care_instructions} onChange={handleChange} 
            placeholder="Watering, sunlight, soil..." rows="3" style={{ ...inputStyles, resize: "vertical" }}
          />
        </div>

        <button type="submit" disabled={loading} style={buttonStyles}>
          {loading ? "Adding botanical piece..." : "Add to Live Collection"}
        </button>
      </form>
    </div>
  );
}

export default Admin;
