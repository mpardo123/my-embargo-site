import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PlayerCard() {
  const { playerName } = useParams(); // Get the player's name from the URL
  const [playerData, setPlayerData] = useState(null); // Store player data
  const [previousSeasons, setPreviousSeasons] = useState([]); // Store previous seasons data
  const [gameStats, setGameStats] = useState([]); // Store game-by-game stats
  const [error, setError] = useState(null); // Store error state

  // Define team colors
  const teamColors = {
    "All Season Services": { primary: "#b2b6b7", secondary: "#e888a3" },
    "Amp'd Up": { primary: "#e41616", secondary: "#000000" },
    "Buzzards Bay Basins": { primary: "#1e633f", secondary: "#000000" },
    "Better Way Primary Care": { primary: "#acc5d7", secondary: "#8abf6f" },
    "Cornerstone Financial": { primary: "#c0bcdc", secondary: "#3a3c92" },
    "Cantara Brothers Co": { primary: "#e888a3", secondary: "#000000" },
    "OSS Landscape": { primary: "#373879", secondary: "#b1b7b7" },
    "Wash Ashore": { primary: "#ede4c0", secondary: "#689bbc" },
    "Mattapoisett PD": { primary: "#000000", secondary: "#0e4769" },
    "Minkle Boys / SPM": { primary: "#ffe327", secondary: "#000000" },
    "River Junction": { primary: "#fa690c", secondary: "#000000" },
    "Rock Electric": { primary: "#012a52", secondary: "#e25f28" },
    "Traveler's Alehouse": { primary: "#b89d52", secondary: "#000000" },
    "Tropical Smoothie Cafe": { primary: "#00b0de", secondary: "#da3987" }
  };

  useEffect(() => {
    // Fetch player data from the PlayerCard sheet
    const playerApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/1aRRv1kR7BweWa7GZInAncIvpWwks0Ttm7_WAz5FWpRA/values/PlayerCard!A1:Z1000?key=${process.env.REACT_APP_GOOGLE_SHEETS_API_KEY}`;
    console.log('Fetching player data from:', playerApiUrl);

    fetch(playerApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const rows = data.values;
        const headers = rows[0];
        const playerRow = rows.find(row => row[headers.indexOf('Name')] === playerName);

        if (playerRow) {
          const player = headers.reduce((acc, header, index) => {
            acc[header] = playerRow[index];
            return acc;
          }, {});
          setPlayerData(player);
        } else {
          setError(`No player data found for: ${playerName}`);
        }
      })
      .catch(error => {
        console.error('Error fetching player data:', error);
        setError('Failed to fetch player data.');
      });

    // Fetch previous seasons data from the PreviousSeasons sheet
    const previousSeasonsApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/1aRRv1kR7BweWa7GZInAncIvpWwks0Ttm7_WAz5FWpRA/values/PreviousSeasons!A1:Z1000?key=${process.env.REACT_APP_GOOGLE_SHEETS_API_KEY}`;
    console.log('Fetching previous seasons data from:', previousSeasonsApiUrl);

    fetch(previousSeasonsApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const rows = data.values;
        const headers = rows[0];
        const filteredRows = rows.slice(1).filter(row => row[headers.indexOf('Name')] === playerName);

        const seasons = filteredRows.map(row => {
          return headers.reduce((acc, header, index) => {
            acc[header] = row[index];
            return acc;
          }, {});
        });

        setPreviousSeasons(seasons);
      })
      .catch(error => {
        console.error('Error fetching previous seasons data:', error);
      });

    // Fetch game-by-game stats from the GameStats sheet
    const gameStatsApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/1aRRv1kR7BweWa7GZInAncIvpWwks0Ttm7_WAz5FWpRA/values/GameStats!A1:Z1000?key=${process.env.REACT_APP_GOOGLE_SHEETS_API_KEY}`;
    console.log('Fetching game stats data from:', gameStatsApiUrl);

    fetch(gameStatsApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const rows = data.values;
        const headers = rows[0];
        const filteredRows = rows.slice(1).filter(row => row[headers.indexOf('Name')] === playerName);

        const games = filteredRows.map(row => {
          return headers.reduce((acc, header, index) => {
            acc[header] = row[index];
            return acc;
          }, {});
        });

        setGameStats(games);
      })
      .catch(error => {
        console.error('Error fetching game stats data:', error);
      });
  }, [playerName]);

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  if (!playerData) {
    return <div>Loading...</div>; // Display loading state
  }

  // Get the team's colors or use default colors
  const teamColor = teamColors[playerData.Team] || { primary: "#000000", secondary: "#FFFFFF" };

  return (
    <div
      className="player-card-page"
      style={{
        backgroundColor: teamColor.primary,
        color: teamColor.secondary,
        fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans font globally to the page
      }}
    >
      {/* Player Header */}
      <div className="player-header">
        <img
          src={`/headshots/${playerData.headshot && playerData.headshot.trim() ? playerData.headshot : 'embargo.jpg'}`}
          alt={playerData.Name}
          className="player-photo"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = '/headshots/embargo.jpg'; // Fallback to embargo.jpg
          }}
        />
        <h1
  className="player-name"
  style={{
    fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans font
    color: teamColor.secondary, // Use the team's secondary color
  }}
>
  {playerData.Name}
</h1>
<h2
  className="player-number"
  style={{
    fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans font
    color: teamColor.secondary, // Use the team's secondary color
  }}
>
  #{playerData.Number}
</h2>
      </div>
  
      {/* Current Season Stats */}
      <div className="player-stats">
        <h3
          style={{
            fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans font to section headers
          }}
        >
          Current Season Stats
        </h3>
        <table
  className="player-stats-table"
  style={{
    backgroundColor: "#ffffff", // Add white background
    color: teamColor.secondary, // Ensure text color contrasts with the background
    borderCollapse: "collapse", // Optional: Clean table borders
    width: "100%", // Optional: Make the table responsive
    fontFamily: "'Cal Sans', Arial, sans-serif", // Ensure font consistency
  }}
>
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
              <td>{playerData.GP || '-'}</td>
              <td>{playerData.PPG || '-'}</td>
              <td>{playerData.RPG || '-'}</td>
              <td>{playerData.APG || '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      {/* Previous Seasons Stats */}
      <div className="player-stats">
        <h3
          style={{
            fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans font to section headers
          }}
        >
          Previous Seasons
        </h3>
        <table
  className="player-stats-table"
  style={{
    backgroundColor: "#ffffff", // Add white background
    color: teamColor.secondary, // Ensure text color contrasts with the background
    borderCollapse: "collapse", // Optional: Clean table borders
    width: "100%", // Optional: Make the table responsive
    fontFamily: "'Cal Sans', Arial, sans-serif", // Ensure font consistency
  }}
>
          <thead>
            <tr>
              <th>Year</th>
              <th>Team</th>
              <th>GP</th>
              <th>PPG</th>
              <th>RPG</th>
              <th>APG</th>
            </tr>
          </thead>
          <tbody>
            {previousSeasons.map((season, index) => (
              <tr key={index}>
                <td>{season.Year}</td>
                <td>{season.Team}</td>
                <td>{season.GP}</td>
                <td>{season.PPG}</td>
                <td>{season.RPG}</td>
                <td>{season.APG}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {/* Game-by-Game Stats */}
<div className="player-stats">
  <h3
    style={{
      fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans font to section headers
    }}
  >
    Game-by-Game Stats
  </h3>
  <div className="player-gstats-table-wrapper">
    <table
      className="player-stats-table"
      style={{
        backgroundColor: "#ffffff", // Add white background
        color: teamColor.secondary, // Ensure text color contrasts with the background
        borderCollapse: "collapse", // Optional: Clean table borders
        width: "100%", // Optional: Make the table responsive
        fontFamily: "'Cal Sans', Arial, sans-serif", // Ensure font consistency
      }}
    >
      <thead>
        <tr>
          <th>Date</th>
          <th>Opponent</th>
          <th>Points</th>
          <th>Rebounds</th>
          <th>Assists</th>
        </tr>
      </thead>
      <tbody>
        {gameStats.map((game, index) => (
          <tr key={index}>
            <td>{game.Date}</td>
            <td>{game.Opponent}</td>
            <td>{game.Points}</td>
            <td>{game.Rebounds}</td>
            <td>{game.Assists}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    </div>
  );
}

export default PlayerCard;