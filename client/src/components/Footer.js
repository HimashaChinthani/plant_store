import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const footerStyles = {
    background: "var(--primary)",
    color: "var(--white)",
    padding: "4rem 5% 2rem",
    marginTop: "4rem",
  };

  const gridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "3rem",
    marginBottom: "3rem",
  };

  const columnStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const titleStyles = {
    color: "var(--secondary)",
    fontSize: "1.2rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
  };

  const linkStyles = {
    opacity: 0.8,
    fontSize: "0.9rem",
    transition: "var(--transition)",
  };

  const copyrightStyles = {
    textAlign: "center",
    paddingTop: "2rem",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    fontSize: "0.8rem",
    opacity: 0.6,
  };

  return (
    <footer style={footerStyles}>
      <div style={gridStyles}>
        <div style={columnStyles}>
          <h3 style={titleStyles}>Florixa Plant Nursery</h3>
          <p style={{ ...linkStyles, opacity: 0.7 }}>
            Bringing the tranquility of nature into your modern living spaces.
          </p>
        </div>
        <div style={columnStyles}>
          <h4 style={{ ...titleStyles, color: "var(--white)", fontSize: "1rem" }}>Quick Links</h4>
          <Link to="/" style={linkStyles}>Home</Link>
          <Link to="/shop" style={linkStyles}>Shop</Link>
          <Link to="/about" style={linkStyles}>About</Link>
          <Link to="/contact" style={linkStyles}>Contact</Link>
        </div>
        <div style={columnStyles}>
          <h4 style={{ ...titleStyles, color: "var(--white)", fontSize: "1rem" }}>Contact Us</h4>
          <p style={linkStyles}>Email: hello@florixa.com</p>
          <p style={linkStyles}>Phone: +94 72 486 8388</p>
        </div>
      </div>
      <div style={copyrightStyles}>
        &copy; {new Date().getFullYear()} Florixa Plant Nursery. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;