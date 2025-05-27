import React from 'react';

function Sponsors() {
  const sponsors = {
    platinum: [
      { name: "Tropical Smoothie Cafe", Logo: "/trops.jpeg", url: "https://www.instagram.com/tropicalsmoothiefairhaven/" },
      { name: "Better Way Primary Care", Logo: "/bwpc.png", url: "https://www.betterwayprimarycare.com/" },
      { name: "All Season Services", Logo: "/All Season Services.jpg", url: "https://www.instagram.com/all.seasonsservices/" },
      { name: "OSS Landscape", Logo: "/OSS.jpg", url: "https://www.instagram.com/osslandscapeandhardscape/" },
    ],
    gold: [
      { name: "Cornerstone Financial Group", Logo: "/Cornerstone.jpg", url: "https://cstonefinancial.com/" },
      { name: "Rock Electric", Logo: "/rock.png", url: "https://rockelectricinc.com/" },
      { name: "Mattapoisett PD", Logo: "/Matt PD.jpg", url: "http://www.mattapoisettpolice.com/" },
      { name: "Amp'd Up Electric", Logo: "/Ampd.png", url: "https://www.ampdupelectricalservices.com/" },
      { name: "Buzzards Bay Basins", Logo: "/Basins.jpg", url: "https://www.buzzardsbaybasins.com/" },
      { name: "Travelers Alehouse", Logo: "/travelers.jpeg", url: "https://travelersalehouse.com/" },
      { name: "Minkle Boys/Stone Path Malt", Logo: "/Minkle Boys.png", url: "https://www.minkleboyscatering.com/" },
      { name: "River Junction", Logo: "/River Junction.png", url: "https://riverjunctionmarion.com/" },
      { name: "Wash Ashore Car Wash", Logo: "/Wash Ashore.png", url: "https://washashorecarwash.com/" },
    ],
    silver: [
      { name: "Marion Golf Club", Logo: "/mariongolf.png", url: "https://www.mariongolfclub.com/" },
      { name: "Southeastern Development Co", Logo: "/scd.png", url: "https://southeasterndevelopment.net/" },
      { name: "Nick's Pizza", Logo: "/nickspizza.png", url: "https://www.nickshomemadepizza.com/" },
      { name: "Play Arcade", Logo: "/play.png", url: "https://www.playarcadenb.com/" },
    ],
  };

  const renderSponsors = (sponsors, color) => (
    <div style={{ width: "100%", marginBottom: "40px" }}>
      <h2 style={{ color, textAlign: "center", marginBottom: "20px" }}>
        {color === "#d4af37" ? "Platinum Sponsors" : color === "#ffd700" ? "Gold Sponsors" : "Silver Sponsors"}
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {sponsors.map((sponsor, index) => (
          <a
            key={index}
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#ffffff",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px 30px", // Increase padding for larger boxes
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                width: "350px", // Increase width for larger boxes
                transition: "transform 0.2s, box-shadow 0.2s", // Add smooth transition for hover effect
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge the box on hover
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)"; // Add a stronger shadow on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"; // Reset the box size
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // Reset the shadow
              }}
            >
              <img
                src={sponsor.Logo}
                alt={`${sponsor.name} Logo`}
                style={{ width: "60px", height: "60px", marginRight: "20px" }} // Slightly larger logo
              />
              <span style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}> {/* Larger text */}
                {sponsor.name}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className="sponsors-page"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f4f4f4",
        color: "#333",
        minHeight: "100vh",
        fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans globally to the page
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "#1e3c72",
        }}
      >
        Thank you to our generous 2025 sponsors!
      </h1>

      {renderSponsors(sponsors.platinum, "#d4af37")}
      {renderSponsors(sponsors.gold, "#ffd700")}
      {renderSponsors(sponsors.silver, "#c0c0c0")}
    </div>
  );
}

export default Sponsors;