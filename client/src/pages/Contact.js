import React from "react";

function Contact() {
  const containerStyles = {
    padding: "8rem 5%",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const gridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "4rem",
    alignItems: "start",
  };

  const infoSectionStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "2.5rem",
  };

  const mapWrapperStyles = {
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
    boxShadow: "var(--shadow-lg)",
    height: "450px",
  };

  const titleStyles = {
    fontSize: "3rem",
    marginBottom: "1.5rem",
  };

  const contactItemStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };

  const labelStyles = {
    fontSize: "0.85rem",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "var(--secondary)",
    fontWeight: "700",
  };

  const valueStyles = {
    fontSize: "1.2rem",
    color: "var(--primary)",
    fontWeight: "500",
  };

  const whatsappButtonStyles = {
    display: "inline-block",
    padding: "1rem 2rem",
    background: "#25D366",
    color: "var(--white)",
    borderRadius: "var(--radius-sm)",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "var(--transition)",
    textAlign: "center",
  };

  return (
    <div style={containerStyles} className="animate-fade-in">
      <div style={gridStyles}>
        <div style={infoSectionStyles}>
          <div>
            <h1 style={titleStyles}>Get in Touch</h1>
            <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>
              Have questions about plant care or an upcoming order? We're here to help you grow your perfect indoor garden.
            </p>
          </div>

          <div style={contactItemStyles}>
            <span style={labelStyles}>WhatsApp</span>
            <a 
              href="https://wa.me/947XXXXXXXX" 
              target="_blank" rel="noreferrer"
              style={whatsappButtonStyles}
            >
              Chat With Our Experts
            </a>
          </div>

          <div style={contactItemStyles}>
            <span style={labelStyles}>Email Address</span>
            <p style={valueStyles}>hello@greennest.com</p>
          </div>

          <div style={contactItemStyles}>
            <span style={labelStyles}>Visit Us</span>
            <p style={valueStyles}>123 Botanical Lane, Colombo, Sri Lanka</p>
          </div>
        </div>

        <div style={mapWrapperStyles}>
          <iframe 
            title="Map"
            src="https://maps.google.com/maps?q=Colombo&t=&z=13&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;