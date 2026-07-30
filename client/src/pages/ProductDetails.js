import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { CONTACT_CONFIG } from "../config/contact";

function ProductDetails() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/plants/${id}`)
      .then(res => {
        setPlant(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const containerStyles = {
    padding: "6rem 5%",
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "4rem",
    minHeight: "80vh",
  };

  const imageWrapperStyles = {
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
    boxShadow: "var(--shadow-lg)",
    height: "100%",
  };

  const imageStyles = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const infoSectionStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "2rem",
  };

  const breadcrumbStyles = {
    fontSize: "0.9rem",
    color: "var(--text-muted)",
    marginBottom: "-1rem",
  };

  const nameStyles = {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    lineHeight: "1.2",
    marginBottom: "0.5rem",
  };

  const priceStyles = {
    fontSize: "2rem",
    color: "var(--secondary)",
    fontWeight: "600",
  };

  const descriptionStyles = {
    lineHeight: "1.8",
    color: "var(--text-muted)",
  };

  const careSectionStyles = {
    padding: "1.5rem",
    background: "rgba(116, 198, 157, 0.1)",
    borderRadius: "var(--radius-md)",
    borderLeft: "4px solid var(--secondary)",
  };

  const whatsappButtonStyles = {
    display: "block",
    textAlign: "center",
    padding: "1.2rem",
    background: "#25D366",
    color: "var(--white)",
    borderRadius: "var(--radius-sm)",
    fontSize: "1.1rem",
    fontWeight: "600",
    transition: "var(--transition)",
    boxShadow: "var(--shadow-md)",
  };

  if (loading) return <div style={{ padding: "10rem", textAlign: "center" }}>Loading botanical details...</div>;
  if (!plant) return <div style={{ padding: "10rem", textAlign: "center" }}>Plant not found.</div>;

  return (
    <div style={containerStyles}>
      <div style={imageWrapperStyles} className="animate-fade-in">
        <img src={plant.image_url} alt={plant.name} style={imageStyles} />
      </div>

      <div style={infoSectionStyles} className="animate-fade-in">
        <div style={breadcrumbStyles}>
          <Link to="/shop">Shop</Link> / <span>{plant.category}</span>
        </div>
        
        <div>
          <h1 style={nameStyles}>{plant.name}</h1>
          <p style={priceStyles}>LKR {plant.price}</p>
        </div>

        <div style={descriptionStyles}>
          <h3 style={{ color: "var(--primary)", marginBottom: "0.5rem", fontSize: "1.1rem" }}>Description</h3>
          <p>{plant.description}</p>
        </div>

        <div style={careSectionStyles}>
          <h3 style={{ color: "var(--primary-light)", marginBottom: "0.5rem", fontSize: "1rem" }}>🌱 Care Instructions</h3>
          <p style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>{plant.care_instructions}</p>
        </div>

        <a 
          href={`https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=Hello!%20I%27m%20interested%20in%20ordering:%20${encodeURIComponent(plant.name)}%20(Rs.%20${plant.price})`}
          target="_blank" rel="noreferrer"
          style={whatsappButtonStyles}
        >
          Order via WhatsApp
        </a>
      </div>
    </div>
  );
}

export default ProductDetails;