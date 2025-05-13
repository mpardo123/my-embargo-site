import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TeamPage({ teamName }) {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  // Define team colors
  const teamColors = {
    "All Season Services": { primary: "#b2b6b7", secondary: "#e888a3", logo: "/logos/All_Season_Services.jpg" },
    "Amp'd Up": { primary: "#e41616", secondary: "#000000", logo: "/logos/ampd.png" },
    "Buzzards Bay Basins": { primary: "#1e633f", secondary: "#000000", logo: "/logos/basins.jpg" },
    "Better Way Primary Care": { primary: "#acc5d7", secondary: "#8abf6f", logo: "/logos/bwpc.png" },
    "Cornerstone Financial": { primary: "#c0bcdc", secondary: "#3a3c92", logo: "/logos/Cornerstone.jpg" },
    "Cantara Brothers Co": { primary: "#e888a3", secondary: "#000000", logo: "/logos/Cantara_Brothers_Co.png" },
    "OSS Landscape": { primary: "#373879", secondary: "#b1b7b7", logo: "/logos/oss.jpg" },
    "Wash Ashore": { primary: "#ede4c0", secondary: "#689bbc", logo: "/logos/washashore.png" },
    "Mattapoisett PD": { primary: "#000000", secondary: "#0e4769", logo: "/logos/Matt_PD.jpg" },
    "Minkle Boys / SPM": { primary: "#ffe327", secondary: "#000000", logo: "/logos/Minkle_Boys.png" },
    "River Junction": { primary: "#fa690c", secondary: "#000000", logo: "/logos/River_Junction.png" },
    "Rock Electric": { primary: "#012a52", secondary: "#e25f28", logo: "/logos/rock.png" },
    "Traveler's Alehouse": { primary: "#b89d52", secondary: "#000000", logo: "/logos/travelers.jpeg" },
    "Tropical Smoothie Cafe": { primary: "#00b0de", secondary: "#da3987", logo: "/logos/trops.jpeg" }
  };

  // Get the team's colors or use default colors
  const teamColor = teamColors[teamName] || { primary: "#000000", secondary: "#FFFFFF", logo: "/logos/default-logo.png" };

  useEffect(() => {
    const playerCardApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/1aRRv1kR7BweWa7GZInAncIvpWwks0Ttm7_WAz5FWpRA/values/PlayerCard!A1:Z1000?key=${process.env.REACT_APP_GOOGLE_SHEETS_API_KEY}`;

    fetch(playerCardApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const rows = data.values;
        const headers = rows[0];
        const filteredRows = rows.slice(1).filter(row => row[headers.indexOf('Team')] === teamName);

        const playersData = filteredRows.map(row => {
          return headers.reduce((acc, header, index) => {
            acc[header] = row[index];
            return acc;
          }, {});
        });

        setPlayers(playersData);
      })
      .catch(error => {
        console.error('Error fetching team data:', error);
        setError('Failed to fetch team data.');
      });
  }, [teamName]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!players.length) {
    return <div>Loading...</div>;
  }

  // Sort players by their number (ascending order)
  const sortedPlayers = [...players].sort((a, b) => {
    const numA = parseInt(a.Number, 10);
    const numB = parseInt(b.Number, 10);
    return numA - numB;
  });

  return (
    <div
      className="team-section"
      style={{
        backgroundColor: teamColor.primary,
        color: teamColor.secondary,
        fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans font
        textAlign: "center", // Center-align the content
        padding: "20px", // Add padding around the section
      }}
    >
      <div className="team-header" style={{ marginBottom: "20px" }}>
        <img
          src={teamColor.logo}
          alt={`${teamName} Logo`}
          className="team-logo"
          style={{
            width: "100px", // Set a fixed width for the logo
            height: "100px", // Set a fixed height for the logo
            objectFit: "contain", // Ensure the logo fits within the box
            marginBottom: "10px", // Add spacing below the logo
          }}
        />
        <h1
          className="team-name"
          style={{
            fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans font to the team name
            fontSize: "2em", // Increase font size for the team name
            fontWeight: "bold", // Make the team name bold
            margin: 0, // Remove default margin
          }}
        >
          {teamName}
        </h1>
      </div>
      <div className="team-roster-grid">
        {sortedPlayers.map((player) => (
          <div
            className="team-player-card"
            key={player.Name}
            style={{
              borderColor: teamColor.secondary,
              fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans font to player cards
            }}
          >
            <img
              src={`/headshots/${player.headshot && player.headshot.trim() ? player.headshot : 'embargo.jpg'}`}
              alt={player.Name}
              className="team-player-photo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/headshots/embargo.jpg';
              }}
            />
            <div className="team-player-info">
              <Link
                to={`/players/${encodeURIComponent(player.Name)}`}
                className="team-player-name"
                style={{
                  color: teamColor.secondary,
                  fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans font to player names
                }}
              >
                {player.Name}
              </Link>
              <div className="team-player-number">#{player.Number}</div>
              <table className="team-player-stats-table">
                <thead>
                  <tr>
                    <th>GP</th>
                    <th>PPG</th>
                    <th>RPG</th>
                    <th>APG</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{player.GP || '-'}</td>
                    <td>{player.PPG || '-'}</td>
                    <td>{player.RPG || '-'}</td>
                    <td>{player.APG || '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamPage;