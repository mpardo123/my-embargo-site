import React, { useEffect, useState } from 'react';

function StandingsPage() {
  const [standings, setStandings] = useState([]);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2025"); // Default year
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  // Define team colors
  const teamColors = {
    "All Season Services": "#b2b6b7",
    "Amp'd Up": "#e41616",
    "Buzzards Bay Basins": "#1e633f",
    "Better Way Primary Care": "#acc5d7",
    "Cornerstone Financial": "#3a3c92",
    "Cantara Brothers Co": "#e888a3",
    "OSS Landscape": "#373879",
    "Wash Ashore": "#689bbc",
    "Mattapoisett PD": "#0e4769",
    "Minkle Boys / SPM": "#ffe327",
    "River Junction": "#fa690c",
    "Rock Electric": "#012a52",
    "Traveler's Alehouse": "#b89d52",
    "Tropical Smoothie Cafe": "#00b0de"
  };

  const fetchStandings = (year) => {
    const standingsApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/1aRRv1kR7BweWa7GZInAncIvpWwks0Ttm7_WAz5FWpRA/values/Standings_2025!A1:Z1000?key=${process.env.REACT_APP_GOOGLE_SHEETS_API_KEY}`;

    fetch(standingsApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const rows = data.values;
        const headers = rows[0];
        const standingsData = rows.slice(1).map(row => {
          return headers.reduce((acc, header, index) => {
            acc[header] = row[index];
            return acc;
          }, {});
        });

        setStandings(standingsData);
      })
      .catch(error => {
        console.error('Error fetching standings data:', error);
        setError('Failed to fetch standings data.');
      });
  };

  useEffect(() => {
    fetchStandings(selectedYear); // Fetch standings for the selected year
  }, [selectedYear]);

  const handleYearChange = (year) => {
    setSelectedYear(year); // Update the selected year
    setIsDropdownOpen(false); // Close the dropdown after selecting a year
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown visibility
  };

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  if (standings.length === 0) {
    return <div>Loading...</div>; // Display loading state
  }

  return (
    <div
  className="standings-page"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column", // Stack table and notes vertically
    minHeight: "100vh",
    backgroundColor: "#1e3c72", // Solid blue background for the entire page
    color: "#ffffff", // White text for better contrast
    paddingTop: "80px", // Reduced padding to bring content closer to the top
    fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans globally
  }}
>
      <div style={{ position: "relative", width: "80%" }}>
        <div style={{ position: "absolute", top: 0, right: 0 }}>
          <button
            onClick={toggleDropdown} // Toggle dropdown on button click
            style={{
              backgroundColor: "#ffffff",
              color: "#1e3c72",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans to button
            }}
          >
            {selectedYear} ▼
          </button>
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              backgroundColor: "#ffffff",
              color: "#1e3c72",
              border: "1px solid #ddd",
              borderRadius: "5px",
              display: isDropdownOpen ? "block" : "none", // Show or hide dropdown
              zIndex: 1,
              fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans to dropdown
            }}
            className="dropdown-menu"
          >
            {["2025", "2024", "2023", "2022", "2021"].map((year) => (
              <div
                key={year}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  textAlign: "right",
                  fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans to dropdown items
                }}
                onClick={() => handleYearChange(year)}
              >
                {year}
              </div>
            ))}
          </div>
        </div>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            backgroundColor: "#1e3c72", // Blue background for the heading
            color: "#ffffff", // White text for contrast
            padding: "10px", // Add padding for better spacing
            borderRadius: "5px", // Optional: Rounded corners
            fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans to heading
          }}
        >
          {selectedYear} Standings
        </h1>
        <div
          style={{
            overflowX: "auto", // Allow horizontal scrolling for the table if necessary
            width: "100%", // Ensure the container spans the full width
          }}
        >
          <table
            className="standings-table"
            style={{
              margin: "0 auto",
              borderCollapse: "collapse",
              width: "100%",
              backgroundColor: "#ffffff", // White background for the table
              borderRadius: "10px", // Rounded corners
              overflow: "hidden", // Prevent overflow
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow for the table
              fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans to table
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px", color: "#000000" }}>Rank</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", color: "#000000" }}>Team</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", color: "#000000" }}>Wins</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", color: "#000000" }}>Losses</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", color: "#000000" }}>Win%</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", color: "#000000" }}>PPG</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom:
                      team.Cutoff === 'dotted'
                        ? '2px dotted black'
                        : team.Cutoff === 'solid'
                        ? '2px solid black'
                        : 'none', // Apply dotted or solid line based on Cutoff value
                  }}
                >
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", color: "#000000" }}>{team.Rank}</td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                      color: teamColors[team.Team] || "#000000", // Apply team color or default to black
                    }}
                  >
                    {team.Team}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", color: "#000000" }}>{team.Wins}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", color: "#000000" }}>{team.Losses}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", color: "#000000" }}>{team['Win%']}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center", color: "#000000" }}>{team['PPG']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            backgroundColor: "#1e3c72", // Blue background for the note
            color: "#ffffff", // White text for contrast
            padding: "10px", // Add padding for better spacing
            borderRadius: "5px", // Optional: Rounded corners
            fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans to notes
          }}
        >
          <p style={{ margin: "5px 0" }}>* Dotted line indicates play-in cutoff (teams 7-10)</p>
          <p style={{ margin: "5px 0" }}>* Solid line indicates playoff cutoff (teams 11-14)</p>
        </div>
      </div>
    </div>
  );
}

export default StandingsPage;