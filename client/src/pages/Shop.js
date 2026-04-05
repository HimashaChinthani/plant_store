import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Shop() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/plants")
      .then(res => {
        setPlants(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const containerStyles = {
    padding: "6rem 5%",
    maxWidth: "1400px",
    margin: "0 auto",
  };

  const headerStyles = {
    textAlign: "center",
    marginBottom: "4rem",
  };

  const gridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "2.5rem",
  };

  const cardStyles = {
    background: "var(--white)",
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
    boxShadow: "var(--shadow-sm)",
    transition: "var(--transition)",
    position: "relative",
    cursor: "pointer",
  };

  const imageContainerStyles = {
    aspectRatio: "4/5",
    overflow: "hidden",
    position: "relative",
  };

  const imageStyles = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "var(--transition)",
  };

  const infoStyles = {
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };

  const categoryStyles = {
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "var(--text-muted)",
    fontWeight: "600",
  };

  const nameStyles = {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "var(--primary)",
  };

  const priceStyles = {
    fontSize: "1.1rem",
    fontWeight: "500",
    color: "var(--secondary)",
  };

  const whatsappButtonStyles = {
    display: "block",
    textAlign: "center",
    padding: "0.8rem",
    background: "#25D366",
    color: "var(--white)",
    borderRadius: "var(--radius-sm)",
    fontSize: "0.9rem",
    fontWeight: "600",
    marginTop: "1rem",
    transition: "var(--transition)",
  };

  if (loading) {
    return (
      <div style={{ ...containerStyles, textAlign: "center" }}>
        <p>Loading our botanical collection...</p>
      </div>
    );
  }

  return (
    <div style={containerStyles}>
      <header style={headerStyles}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Botanical Collection</h1>
        <p style={{ color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto" }}>
          Hand-picked indoor oxygenators and aesthetic greenery for your urban oasis.
        </p>
      </header>

      <div style={gridStyles}>
        {plants.map(plant => (
          <div 
            key={plant.id} 
            style={cardStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-lg)";
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.querySelector("img").style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.querySelector("img").style.transform = "scale(1)";
            }}
          >
            <Link to={`/shop/${plant.id}`} style={{ display: "block" }}>
              <div style={imageContainerStyles}>
                <img 
                  src={plant.image_url} 
                  alt={plant.name} 
                  style={imageStyles} 
                />
              </div>
            </Link>
            
            <div style={infoStyles}>
              <span style={categoryStyles}>{plant.category}</span>
              <h3 style={nameStyles}>{plant.name}</h3>
              <p style={priceStyles}>LKR {plant.price}</p>
              
              <a 
                href={`https://wa.me/947XXXXXXXX?text=Hello,%20I%20want%20to%20order%20this%20plant:%20Name:%20${encodeURIComponent(plant.name)}%20Price:%20${plant.price}`}
                target="_blank" rel="noreferrer"
                style={whatsappButtonStyles}
              >
                Order via WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;