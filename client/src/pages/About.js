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
          Founded in 2026, Florixa Plant Nursery began with a simple belief: every home deserves a touch of nature's tranquility. What started as a small personal collection has grown into a curated sanctuary for plant lovers across the country.
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
            We guarantee the health and beauty of every plant we deliver, providing the knowledge and support you need to help your indoor garden thrive.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;