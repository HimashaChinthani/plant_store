import React from "react";

function Gallery() {
  const galleryImages = [
    { 
      url: "/botanical_gallery_1_1775377581623.png", 
      title: "Monstera Elegance", 
      desc: "Macro botanical art for modern spaces." 
    },
    { 
      url: "/botanical_gallery_2_1775377613151.png", 
      title: "Serene Living", 
      desc: "Lush companion plants in minimalist interiors." 
    },
    { 
      url: "/hero_plant_store_1775372986857.png", 
      title: "Botanical Boutique", 
      desc: "A curate world of indoor greenery." 
    },
    { 
      url: "/premium_hero_plant_store_1775377446929.png", 
      title: "Architectural Greenery", 
      desc: "Plants that define your personal sanctuary." 
    }
  ];

  const containerStyles = {
    padding: "6rem 5%",
    maxWidth: "1300px",
    margin: "0 auto",
  };

  const headerStyles = {
    textAlign: "center",
    marginBottom: "5rem",
  };

  const gridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "2.5rem",
  };

  const imageCardStyles = {
    position: "relative",
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
    boxShadow: "var(--shadow-md)",
    aspectRatio: "4 / 5",
    cursor: "pointer",
  };

  const imgStyles = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 1.2s cubic-bezier(0.2, 1, 0.3, 1)",
  };

  const overlayStyles = {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: "2rem",
    background: "linear-gradient(transparent, rgba(13, 59, 46, 0.9))",
    color: "white",
    opacity: 0,
    transition: "var(--transition)",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };

  return (
    <div style={containerStyles} className="animate-fade-in">
      <header style={headerStyles}>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>Botanical <span style={{ color: "var(--secondary)" }}>Gallery</span></h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
          Explore our curated gallery of high-quality plant photos, showcasing the beauty and diversity of our actual nursery collection.
        </p>
      </header>

      <div style={gridStyles}>
        {galleryImages.map((img, index) => (
          <div 
            key={index} 
            style={imageCardStyles}
            onMouseEnter={(e) => {
              e.currentTarget.querySelector("img").style.transform = "scale(1.1)";
              e.currentTarget.querySelector(".overlay").style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector("img").style.transform = "scale(1)";
              e.currentTarget.querySelector(".overlay").style.opacity = "0";
            }}
          >
            <img src={img.url} alt={img.title} style={imgStyles} />
            <div className="overlay" style={overlayStyles}>
              <h3 style={{ color: "var(--accent-light)", fontSize: "1.2rem" }}>{img.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.8)" }}>{img.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
