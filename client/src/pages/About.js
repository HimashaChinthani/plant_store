import React from "react";

function About() {
  const containerStyles = {
    padding: "8rem 5%",
    maxWidth: "1000px",
    margin: "0 auto",
  };

  const sectionStyles = {
    marginBottom: "5rem",
    textAlign: "center",
  };

  const lineStyles = {
    width: "60px",
    height: "3px",
    background: "var(--secondary)",
    margin: "1.5rem auto",
    borderRadius: "10px",
  };

  const textStyles = {
    fontSize: "1.1rem",
    lineHeight: "1.8",
    color: "var(--text-muted)",
    maxWidth: "800px",
    margin: "0 auto",
  };

  const missionSectionStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "3rem",
    marginTop: "4rem",
    textAlign: "left",
  };

  const missionCardStyles = {
    padding: "2rem",
    background: "var(--white)",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-sm)",
  };

  return (
    <div style={containerStyles} className="animate-fade-in">
      <section style={sectionStyles}>
        <h1 style={{ fontSize: "3rem" }}>Our Story</h1>
        <div style={lineStyles}></div>
        <p style={textStyles}>
          Established in 2026, Florixa Plant Nursery is a dedicated small business that began with a passion for bringing nature's tranquility into modern homes. What started as an intimate personal collection has grown into a mission to share the restorative power of greenery throughout the island. We hope to grow and build our presence all across Sri Lanka, helping every home discover its own natural sanctuary.
        </p>
      </section>

      <div style={missionSectionStyles}>
        <div style={missionCardStyles}>
          <h3 style={{ marginBottom: "1rem", color: "var(--primary)" }}>Our Mission</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            To bring the restorative power of greenery into urban living spaces, fostering a deeper connection between modern life and the natural world.
          </p>
        </div>
        <div style={missionCardStyles}>
          <h3 style={{ marginBottom: "1rem", color: "var(--primary)" }}>Our Promise</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            We guarantee the health of every plant delivered via our courier partners, providing the expert planting advice you need to help your garden thrive.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;