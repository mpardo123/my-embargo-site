import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function StatisticsPage() {
  const [playerLeaders, setPlayerLeaders] = useState({ ppg: [], rpg: [], apg: [] });
  const [teamLeaders, setTeamLeaders] = useState({ ppg: [], rpg: [], apg: [] });
  const [allPlayers, setAllPlayers] = useState([]); // Store all players for the full stats table
  const [showFullStats, setShowFullStats] = useState(false); // Toggle between season leaders and full stats
  const [rowsToShow, setRowsToShow] = useState(30); // Number of rows to show in the full stats table
  const [sortColumn, setSortColumn] = useState('PPG'); // Current column to sort by
  const [sortDirection, setSortDirection] = useState('desc'); // Current sort direction ('asc' or 'desc')
  const [error, setError] = useState(null);

  // Map of team names to their logo file paths
  const teamLogos = {
    "Tropical Smoothie Cafe": "/logos/trops.jpeg",
    "Better Way Primary Care": "/logos/bwpc.png",
    "All Season Services": "/logos/All Season Services.jpg",
    "OSS Landscape": "/logos/oss.jpg",
    "Cornerstone Financial": "/logos/Cornerstone.jpg",
    "Rock Electric": "/logos/rock.png",
    "Mattapoisett PD": "/logos/Matt PD.jpg",
    "Amp'd Up": "/logos/ampd.png",
    "Buzzards Bay Basins": "/logos/basins.jpg",
    "Traveler's Alehouse": "/logos/travelers.jpeg",
    "Minkle Boys / SPM": "/logos/Minkle Boys.png",
    "River Junction": "/logos/River Junction.png",
    "Wash Ashore": "/logos/washashore.png",
    "Cantara Brothers Co": "/logos/Cantara Brothers Co.png"
  };

  useEffect(() => {
    // Fetch season leaders data from the "Statistics" tab
    const statisticsApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/1aRRv1kR7BweWa7GZInAncIvpWwks0Ttm7_WAz5FWpRA/values/Statistics!A1:Z1000?key=AIzaSyAQQPxbPiu32yVmxzQMp9YCQWCGWa4uVNo`;

    fetch(statisticsApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const rows = data.values;
        const headers = rows[0];
        const statsData = rows.slice(1).map((row) =>
          headers.reduce((acc, header, index) => {
            acc[header] = row[index];
            return acc;
          }, {})
        );

        // Separate player and team leaders
        const playerStats = { ppg: [], rpg: [], apg: [] };
        const teamStats = { ppg: [], rpg: [], apg: [] };

        statsData.forEach((stat) => {
          if (stat.Type === 'player') {
            if (stat.Stat === 'ppg') playerStats.ppg.push(stat);
            if (stat.Stat === 'rpg') playerStats.rpg.push(stat);
            if (stat.Stat === 'apg') playerStats.apg.push(stat);
          } else if (stat.Type === 'team') {
            if (stat.Stat === 'ppg') teamStats.ppg.push(stat);
            if (stat.Stat === 'rpg') teamStats.rpg.push(stat);
            if (stat.Stat === 'apg') teamStats.apg.push(stat);
          }
        });

        // Sort by rank and take the top 5
        ['ppg', 'rpg', 'apg'].forEach((stat) => {
          playerStats[stat] = playerStats[stat].sort((a, b) => a.Rank - b.Rank).slice(0, 5);
          teamStats[stat] = teamStats[stat].sort((a, b) => a.Rank - b.Rank).slice(0, 5);
        });

        setPlayerLeaders(playerStats);
        setTeamLeaders(teamStats);
      })
      .catch((error) => {
        console.error('Error fetching statistics data:', error);
        setError('Failed to fetch statistics data.');
      });
  }, []);

  useEffect(() => {
    // Fetch full player stats data from the "PlayerCard" tab
    const playerCardApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/1aRRv1kR7BweWa7GZInAncIvpWwks0Ttm7_WAz5FWpRA/values/PlayerCard!A1:Z1000?key=AIzaSyAQQPxbPiu32yVmxzQMp9YCQWCGWa4uVNo`;

    fetch(playerCardApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const rows = data.values;
        const headers = rows[0];
        const players = rows.slice(1).map((row) =>
          headers.reduce((acc, header, index) => {
            acc[header] = row[index];
            return acc;
          }, {})
        );

        setAllPlayers(players);
      })
      .catch((error) => {
        console.error('Error fetching player card data:', error);
        setError('Failed to fetch player card data.');
      });
  }, []);

  const handleSort = (column) => {
    const newDirection = sortColumn === column && sortDirection === 'desc' ? 'asc' : 'desc';
    setSortColumn(column);
    setSortDirection(newDirection);

    const sortedPlayers = [...allPlayers].sort((a, b) => {
      const aValue = parseFloat(a[column]) || 0;
      const bValue = parseFloat(b[column]) || 0;

      if (newDirection === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    setAllPlayers(sortedPlayers);
  };

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  if (showFullStats) {
    // Full Player Stats Table
    const playersToShow = allPlayers.slice(0, rowsToShow);

    return (
      <div
        style={{
          fontFamily: "'Cal Sans', Arial, sans-serif",
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ color: '#1e3c72' }}>Full Player Stats</h1>
        <table
  className="statistics-table"
  style={{
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    backgroundColor: '#ffffff',
  }}
>
          <thead>
            <tr style={{ backgroundColor: '#1e3c72', color: '#ffffff' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>#</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Player</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>GP</th>
              <th
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#ffffff', e.target.style.color = '#1e3c72')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#1e3c72', e.target.style.color = '#ffffff')}
                onClick={() => handleSort('PPG')}
              >
                PPG {sortColumn === 'PPG' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#ffffff', e.target.style.color = '#1e3c72')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#1e3c72', e.target.style.color = '#ffffff')}
                onClick={() => handleSort('RPG')}
              >
                RPG {sortColumn === 'RPG' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#ffffff', e.target.style.color = '#1e3c72')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#1e3c72', e.target.style.color = '#ffffff')}
                onClick={() => handleSort('APG')}
              >
                APG {sortColumn === 'APG' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {playersToShow.map((player, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                  {index + 1}
                </td>
                <td
  className="name-column"
  style={{
    padding: '10px',
    border: '1px solid #ddd',
    display: 'flex',
    alignItems: 'center',
  }}
>
  <img
    src={teamLogos[player.Team]}
    alt={player.Team}
    style={{ width: '30px', height: '30px', marginRight: '10px' }}
  />
  <Link
    to={`/players/${player.Name}`}
    style={{
      textDecoration: 'none',
      color: '#1e3c72',
      fontWeight: 'bold',
    }}
  >
    {player.Name}
  </Link>
</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                  {player.GP || '-'}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                  {player.PPG || '-'}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                  {player.RPG || '-'}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                  {player.APG || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rowsToShow < allPlayers.length && (
          <button
            onClick={() => setRowsToShow(rowsToShow + 30)}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#1e3c72',
              color: '#ffffff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Load More
          </button>
        )}
        <button
          onClick={() => setShowFullStats(false)}
          style={{
            marginTop: '20px',
            marginLeft: '10px',
            padding: '10px 20px',
            backgroundColor: '#e41616',
            color: '#ffffff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Back to Season Leaders
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "'Cal Sans', Arial, sans-serif",
        padding: '20px',
        textAlign: 'center',
      }}
    >
      {/* Season Leaders Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h1 style={{ color: '#1e3c72' }}>2025 Statistics Leaders</h1>
        <button
          onClick={() => setShowFullStats(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1e3c72',
            color: '#ffffff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Full Player Stats
        </button>
      </div>

      {/* Player Leaders Section */}
<h2 style={{ marginTop: '40px', color: '#1e3c72' }}>Player Leaders</h2>
<div className="leaders-section" style={{ marginTop: '20px' }}>
  {/* PPG Leaders */}
  <div>
    <h3 style={{ color: '#1e3c72' }}>PPG Leaders</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
      <tbody>
        {playerLeaders.ppg.map((player, index) => (
          <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#1e3c72' }}>
              {index + 1}.
            </td>
            <td style={{ padding: '10px', textAlign: 'left' }}>{player.Name}</td>
            <td style={{ padding: '10px', textAlign: 'right', color: '#333' }}>{player.Value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* RPG Leaders */}
  <div>
    <h3 style={{ color: '#1e3c72' }}>RPG Leaders</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
      <tbody>
        {playerLeaders.rpg.map((player, index) => (
          <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#1e3c72' }}>
              {index + 1}.
            </td>
            <td style={{ padding: '10px', textAlign: 'left' }}>{player.Name}</td>
            <td style={{ padding: '10px', textAlign: 'right', color: '#333' }}>{player.Value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* APG Leaders */}
  <div>
    <h3 style={{ color: '#1e3c72' }}>APG Leaders</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
      <tbody>
        {playerLeaders.apg.map((player, index) => (
          <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#1e3c72' }}>
              {index + 1}.
            </td>
            <td style={{ padding: '10px', textAlign: 'left' }}>{player.Name}</td>
            <td style={{ padding: '10px', textAlign: 'right', color: '#333' }}>{player.Value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

{/* Team Leaders Section */}
<h2 style={{ marginTop: '40px', color: '#1e3c72' }}>Team Leaders</h2>
<div className="leaders-section" style={{ marginTop: '20px' }}>
  {/* PPG Leaders */}
  <div>
    <h3 style={{ color: '#1e3c72' }}>PPG Leaders</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
      <tbody>
        {teamLeaders.ppg.map((team, index) => (
          <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#1e3c72' }}>
              {index + 1}.
            </td>
            <td style={{ padding: '10px', textAlign: 'left' }}>{team.Name}</td>
            <td style={{ padding: '10px', textAlign: 'right', color: '#333' }}>{team.Value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* RPG Leaders */}
  <div>
    <h3 style={{ color: '#1e3c72' }}>RPG Leaders</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
      <tbody>
        {teamLeaders.rpg.map((team, index) => (
          <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#1e3c72' }}>
              {index + 1}.
            </td>
            <td style={{ padding: '10px', textAlign: 'left' }}>{team.Name}</td>
            <td style={{ padding: '10px', textAlign: 'right', color: '#333' }}>{team.Value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* APG Leaders */}
  <div>
    <h3 style={{ color: '#1e3c72' }}>APG Leaders</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
      <tbody>
        {teamLeaders.apg.map((team, index) => (
          <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#1e3c72' }}>
              {index + 1}.
            </td>
            <td style={{ padding: '10px', textAlign: 'left' }}>{team.Name}</td>
            <td style={{ padding: '10px', textAlign: 'right', color: '#333' }}>{team.Value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    </div>
  );
}

export default StatisticsPage;