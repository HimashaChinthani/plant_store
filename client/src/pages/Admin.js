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
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [plants, setPlants] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");
    } else {
      fetchPlants();
    }
  }, [navigate]);

  const fetchPlants = () => {
    axios.get("/api/plants")
      .then((res) => setPlants(res.data))
      .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (plant) => {
    setEditingId(plant.id);
    setFormData({
      name: plant.name,
      category: plant.category,
      price: plant.price,
      description: plant.description,
      care_instructions: plant.care_instructions,
    });
    setImagePreview(plant.image_url);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      category: "",
      price: "",
      description: "",
      care_instructions: "",
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this plant? This action cannot be undone.")) {
      const token = localStorage.getItem("adminToken");
      axios.delete(`/api/plants/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        setMessage("Plant deleted successfully!");
        fetchPlants();
      })
      .catch((err) => {
        console.error(err);
        setMessage("Failed to delete plant.");
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("adminToken");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("care_instructions", formData.care_instructions);
    if (imageFile) {
      data.append("image", imageFile);
    } else if (editingId && imagePreview) {
      data.append("image_url", imagePreview);
    }

    const request = editingId 
      ? axios.put(`/api/plants/${editingId}`, data, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
        })
      : axios.post("/api/plants", data, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
        });

    request
      .then((res) => {
        setMessage(editingId ? "Plant updated successfully!" : "Plant added successfully!");
        resetForm();
        fetchPlants();
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 403 || err.response?.status === 401) {
          setMessage("Session expired. Please login again.");
          localStorage.removeItem("adminToken");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setMessage(`Failed to ${editingId ? "update" : "add"} plant.`);
        }
        setLoading(false);
      });
  };

  const containerStyles = {
    padding: "6rem 5%",
    maxWidth: "1000px",
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
    marginBottom: "5rem",
  };

  const manageSectionStyles = {
    marginTop: "5rem",
  };

  const plantItemStyles = {
    display: "grid",
    gridTemplateColumns: "80px 1fr 100px 150px",
    alignItems: "center",
    padding: "1.5rem",
    background: "white",
    borderRadius: "var(--radius-md)",
    marginBottom: "1rem",
    boxShadow: "var(--shadow-sm)",
    gap: "1.5rem",
  };

  const actionButtonStyles = {
    padding: "0.5rem 1rem",
    fontSize: "0.85rem",
    fontWeight: "600",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
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
        <button onClick={handleLogout} style={{
          background: "transparent",
          color: "var(--text-muted)",
          border: "1px solid #ddd",
          padding: "0.5rem 1rem",
          fontSize: "0.85rem",
          fontWeight: "600",
          borderRadius: "var(--radius-sm)",
        }}>Logout</button>
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
        <h2 style={{ marginBottom: "1rem", color: "var(--primary)" }}>
          {editingId ? "Edit Botanical Entry" : "Create New Live Entry"}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--primary)" }}>Plant Name *</label>
          <input 
            type="text" name="name" value={formData.name} onChange={handleChange} 
            placeholder="e.g. Fiddle Leaf Fig" required style={{ padding: "0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid #ddd" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--primary)" }}>Category</label>
            <input 
              type="text" name="category" value={formData.category} onChange={handleChange} 
              placeholder="e.g. Indoor Tree" style={{ padding: "0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid #ddd" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--primary)" }}>Price (LKR) *</label>
            <input 
              type="number" name="price" value={formData.price} onChange={handleChange} 
              placeholder="e.g. 4500" required style={{ padding: "0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid #ddd" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--primary)" }}>Plant Image {editingId ? "(Replace Optional)" : "*"}</label>
          <input 
            type="file" accept="image/*" onChange={handleFileChange} 
            required={!editingId && !imageFile} style={{ padding: "0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid #ddd" }}
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "var(--radius-sm)", marginTop: "1rem" }} />
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--primary)" }}>Description</label>
          <textarea 
            name="description" value={formData.description} onChange={handleChange} 
            placeholder="Tell us about the plant..." rows="4" style={{ padding: "0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid #ddd", resize: "vertical" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--primary)" }}>Care Instructions</label>
          <textarea 
            name="care_instructions" value={formData.care_instructions} onChange={handleChange} 
            placeholder="Watering, sunlight, soil..." rows="3" style={{ padding: "0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid #ddd", resize: "vertical" }}
          />
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit" disabled={loading} style={{ ...buttonStyles, flex: 2 }}>
            {loading ? "Processing..." : editingId ? "Update Live Entry" : "Add to Live Collection"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} style={{ ...buttonStyles, background: "#666", flex: 1 }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <section style={manageSectionStyles}>
        <h2 style={{ fontSize: "2rem", marginBottom: "2rem", color: "var(--primary)" }}>Manage Collection</h2>
        <div>
          {plants.map((plant) => (
            <div key={plant.id} style={plantItemStyles}>
              <img src={plant.image_url} alt={plant.name} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "var(--radius-sm)" }} />
              <div>
                <h3 style={{ fontSize: "1.1rem" }}>{plant.name}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{plant.category}</p>
              </div>
              <p style={{ fontWeight: "700", color: "var(--primary)" }}>Rs. {plant.price}</p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={() => handleEdit(plant)} style={{ ...actionButtonStyles, background: "var(--accent)", color: "white" }}>Edit</button>
                <button onClick={() => handleDelete(plant.id)} style={{ ...actionButtonStyles, background: "#ff4d4d", color: "white" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Admin;
