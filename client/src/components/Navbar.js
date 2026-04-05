import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navStyles = {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    padding: "1rem 5%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "var(--transition)",
  };

  const logoStyles = {
    fontSize: "1.5rem",
    fontWeight: "800",
    color: "var(--primary)",
    textDecoration: "none",
    letterSpacing: "-0.5px",
    fontFamily: "var(--font-heading)",
  };

  const linkContainerStyles = {
    display: "flex",
    gap: "2rem",
  };

  const getLinkStyle = (path) => ({
    fontSize: "0.95rem",
    fontWeight: "500",
    color: location.pathname === path ? "var(--primary)" : "var(--text-muted)",
    textDecoration: "none",
    position: "relative",
    padding: "0.5rem 0",
    transition: "var(--transition)",
  });

  return (
    <nav style={navStyles} className="glass-effect">
      <Link to="/" style={logoStyles}>
       Florixa Plant Nursery <span style={{ color: "var(--secondary)" }}></span>
      </Link>
      <div style={linkContainerStyles}>
        <Link to="/" style={getLinkStyle("/")}>Home</Link>
        <Link to="/shop" style={getLinkStyle("/shop")}>Shop</Link>
        <Link to="/gallery" style={getLinkStyle("/gallery")}>Gallery</Link>
        <Link to="/about" style={getLinkStyle("/about")}>About</Link>
        <Link to="/contact" style={getLinkStyle("/contact")}>Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;