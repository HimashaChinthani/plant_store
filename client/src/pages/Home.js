import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const heroStyles = {
    height: "90vh",
    minHeight: "600px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 10%",
    position: "relative",
    overflow: "hidden",
    borderRadius: "0 0 var(--radius-lg) var(--radius-lg)",
  };

  const heroImageStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
  };

  const overlayStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 30%, transparent 100%)",
    zIndex: -1,
  };

  const heroContentStyles = {
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  };

  const titleStyles = {
    fontSize: "clamp(2.5rem, 8vw, 4rem)",
    lineHeight: "1.1",
    color: "var(--primary)",
    fontWeight: "800",
  };

  const descriptionStyles = {
    fontSize: "1.1rem",
    color: "var(--text-muted)",
    maxWidth: "450px",
  };

  const buttonStyles = {
    background: "var(--primary)",
    color: "var(--white)",
    padding: "1.2rem 2.5rem",
    fontSize: "1rem",
    borderRadius: "var(--radius-sm)",
    width: "fit-content",
    transition: "var(--transition)",
    boxShadow: "var(--shadow-md)",
  };

  const sectionStyles = {
    padding: "6rem 10%",
    textAlign: "center",
  };

  const featureGridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "3rem",
    marginTop: "4rem",
  };

  const featureCardStyles = {
    padding: "2.5rem",
    borderRadius: "var(--radius-md)",
    background: "var(--white)",
    boxShadow: "var(--shadow-sm)",
    transition: "var(--transition)",
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section style={heroStyles}>
        <img 
          src="/hero_plant_store_1775372986857.png" 
          alt="Modern Plant Boutique" 
          style={heroImageStyles} 
        />
        <div style={overlayStyles}></div>
        <div style={heroContentStyles} className="animate-fade-in">
          <h1 style={titleStyles}>Elevate Your Living Space</h1>
          <p style={descriptionStyles}>
            Discover a curated collection of exquisite indoor plants, meticulously handpicked to bring serenity and style to your home.
          </p>
          <Link to="/shop" style={buttonStyles}>
            Browse Collection
          </Link>
        </div>
      </section>

      {/* Featured Section */}
      <section style={sectionStyles}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Why GreenNest?</h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>
          We provide more than just plants; we deliver long-lasting, vibrant companions for your modern lifestyle.
        </p>
        <div style={featureGridStyles}>
          <div style={featureCardStyles}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>🌿</div>
            <h3 style={{ marginBottom: "1rem" }}>Premium Quality</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              Each plant is carefully selected and nurtured to ensure peak health and aesthetics.
            </p>
          </div>
          <div style={featureCardStyles}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>🚚</div>
            <h3 style={{ marginBottom: "1rem" }}>Careful Delivery</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              Our specialized packaging ensures your new plants arrive safely at your doorstep.
            </p>
          </div>
          <div style={featureCardStyles}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>💚</div>
            <h3 style={{ marginBottom: "1rem" }}>Lifetime Support</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              Get expert advice and plant care tips whenever you need them from our experts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;