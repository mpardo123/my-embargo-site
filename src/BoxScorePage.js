import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function BoxScorePage() {
  const { week, team1, team2 } = useParams();
  const [boxScore, setBoxScore] = useState([]);
  const [headers, setHeaders] = useState([]); // Store headers in state
  const [error, setError] = useState(null);

  useEffect(() => {
    const gameStatsApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/1aRRv1kR7BweWa7GZInAncIvpWwks0Ttm7_WAz5FWpRA/values/GameStats!A1:Z1000?key=${process.env.REACT_APP_GOOGLE_SHEETS_API_KEY}`;

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
        setHeaders(headers); // Save headers to state

        // Ensure required columns exist
        const requiredColumns = ["Week", "Opponent", "Name", "Points", "Rebounds", "Assists"];
        const missingColumns = requiredColumns.filter(col => !headers.includes(col));
        if (missingColumns.length > 0) {
          throw new Error(`Missing columns in Google Sheet: ${missingColumns.join(", ")}`);
        }

        // Filter rows for the current game (both teams and correct week)
        const filteredStats = rows.slice(1).filter(row =>
          row[headers.indexOf("Week")] === `Week ${week}` && // Match the week as a string
          (
            (row[headers.indexOf("Opponent")] === team2 && row[headers.indexOf("Name")]) || // Team1 players
            (row[headers.indexOf("Opponent")] === team1 && row[headers.indexOf("Name")])    // Team2 players
          )
        );

        setBoxScore(filteredStats);
      })
      .catch(error => {
        console.error('Error fetching game stats data:', error);
        setError('Failed to fetch game stats data.');
      });
  }, [week, team1, team2]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!boxScore || boxScore.length === 0) {
    return (
      <div
        style={{
          fontFamily: "'Cal Sans', Arial, sans-serif",
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ color: '#1e3c72' }}>Box Score</h1>
        <h2>
          Week {week}: {team1} vs {team2}
        </h2>
        <p>No stats available for this game. Please check back later.</p>
      </div>
    );
  }

  // Group stats by team
  const team1Stats = boxScore.filter(row => row[headers.indexOf("Opponent")] === team2); // Players from team1
  const team2Stats = boxScore.filter(row => row[headers.indexOf("Opponent")] === team1); // Players from team2

  return (
    <div
      className="box-score-container"
      style={{
        fontFamily: "'Cal Sans', Arial, sans-serif",
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h1 style={{ color: '#1e3c72' }}>Box Score</h1>
      <h2>
        Week {week}: {team1} vs {team2}
      </h2>

      {/* Team 1 Stats */}
      <h3 style={{ color: '#1e3c72' }}>{team1}</h3>
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            margin: '20px auto',
            borderCollapse: 'collapse',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#1e3c72', color: '#ffffff' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Points</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Rebounds</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Assists</th>
            </tr>
          </thead>
          <tbody>
            {team1Stats.map((row, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <Link
                    to={`/players/${encodeURIComponent(row[headers.indexOf("Name")])}`} // Link to Player Card Page
                    style={{ textDecoration: 'none', color: '#1e3c72', fontWeight: 'bold' }}
                  >
                    {row[headers.indexOf("Name")]} {/* Player Name */}
                  </Link>
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{row[headers.indexOf("Points")]}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{row[headers.indexOf("Rebounds")]}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{row[headers.indexOf("Assists")]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Team 2 Stats */}
      <h3 style={{ color: '#1e3c72' }}>{team2}</h3>
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            margin: '20px auto',
            borderCollapse: 'collapse',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#1e3c72', color: '#ffffff' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Points</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Rebounds</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Assists</th>
            </tr>
          </thead>
          <tbody>
            {team2Stats.map((row, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <Link
                    to={`/players/${encodeURIComponent(row[headers.indexOf("Name")])}`} // Link to Player Card Page
                    style={{ textDecoration: 'none', color: '#1e3c72', fontWeight: 'bold' }}
                  >
                    {row[headers.indexOf("Name")]} {/* Player Name */}
                  </Link>
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{row[headers.indexOf("Points")]}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{row[headers.indexOf("Rebounds")]}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{row[headers.indexOf("Assists")]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BoxScorePage;