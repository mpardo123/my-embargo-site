import React, { useEffect, useState } from 'react';

function SchedulePage() {
  const [currentWeek, setCurrentWeek] = useState(1); // Track the current week
  const [standings, setStandings] = useState({});
  const [error, setError] = useState(null);

  // Define team colors
  const teamColors = {
    "Wash Ashore": "#689bbc",
    "Buzzards Bay Basins": "#1e633f",
    "Cantara Brothers Co": "#e888a3",
    "OSS Landscape": "#373879",
    "Tropical Smoothie Cafe": "#00b0de",
    "Traveler's Alehouse": "#b89d52",
    "Mattapoisett PD": "#0e4769",
    "Amp'd Up": "#e41616",
    "River Junction": "#fa690c",
    "Rock Electric": "#012a52",
    "Cornerstone Financial": "#3a3c92",
    "Minkle Boys / SPM": "#ffe327",
    "Better Way Primary Care": "#acc5d7",
    "All Season Services": "#b2b6b7",
  };

  // Define team logos
  const teamLogos = {
    "Wash Ashore": "/Logos/washashore.png",
    "Buzzards Bay Basins": "/Logos/basins.jpg",
    "Cantara Brothers Co": "/Logos/Cantara_Brothers_Co.png",
    "OSS Landscape": "/Logos/oss.jpg",
    "Tropical Smoothie Cafe": "/Logos/trops.jpeg",
    "Traveler's Alehouse": "/Logos/travelers.jpeg",
    "Mattapoisett PD": "/Logos/Matt_PD.jpg",
    "Amp'd Up": "/Logos/ampd.png",
    "River Junction": "/Logos/River_Junction.png",
    "Rock Electric": "/Logos/rock.png",
    "Cornerstone Financial": "/Logos/Cornerstone.jpg",
    "Minkle Boys / SPM": "/Logos/Minkle_Boys.png",
    "Better Way Primary Care": "/Logos/bwpc.png",
    "All Season Services": "/Logos/All_Season_Services.jpg",
  };

  // Full schedule data
  const scheduleData = [
    { week: 1, date: "5/24", time: "4:00", team1: "Wash Ashore", team2: "Buzzards Bay Basins" },
    { week: 1, date: "5/24", time: "5:00", team1: "Cantara Brothers Co", team2: "OSS Landscape" },
    { week: 1, date: "5/24", time: "6:00", team1: "Tropical Smoothie Cafe", team2: "Traveler's Alehouse" },
    { week: 1, date: "5/24", time: "7:00", team1: "Mattapoisett PD", team2: "Amp'd Up" },
    { week: 1, date: "5/25", time: "5:00", team1: "River Junction", team2: "Rock Electric" },
    { week: 1, date: "5/25", time: "6:00", team1: "Cornerstone Financial", team2: "Minkle Boys / SPM" },
    { week: 1, date: "5/25", time: "7:00", team1: "Better Way Primary Care", team2: "All Season Services" },
    { week: 2, date: "5/31", time: "4:00", team1: "Minkle Boys / SPM", team2: "Rock Electric" },
{ week: 2, date: "5/31", time: "5:00", team1: "Tropical Smoothie Cafe", team2: "Better Way Primary Care" },
{ week: 2, date: "5/31", time: "6:00", team1: "Cantara Brothers Co", team2: "Wash Ashore" },
{ week: 2, date: "5/31", time: "7:00", team1: "Traveler's Alehouse", team2: "River Junction" },
{ week: 2, date: "6/1", time: "5:00", team1: "OSS Landscape", team2: "Cornerstone Financial" },
{ week: 2, date: "6/1", time: "6:00", team1: "Amp'd Up", team2: "All Season Services" },
{ week: 2, date: "6/1", time: "7:00", team1: "Mattapoisett PD", team2: "Buzzards Bay Basins" },
{ week: 3, date: "6/7", time: "4:00", team1: "OSS Landscape", team2: "Wash Ashore" },
{ week: 3, date: "6/7", time: "5:00", team1: "River Junction", team2: "Tropical Smoothie Cafe" },
{ week: 3, date: "6/7", time: "6:00", team1: "Buzzards Bay Basins", team2: "Cantara Brothers Co" },
{ week: 3, date: "6/7", time: "7:00", team1: "Minkle Boys / SPM", team2: "Mattapoisett PD" },
{ week: 3, date: "6/8", time: "5:00", team1: "Rock Electric", team2: "Amp'd Up" },
{ week: 3, date: "6/8", time: "6:00", team1: "Traveler's Alehouse", team2: "All Season Services" },
{ week: 3, date: "6/8", time: "7:00", team1: "Cornerstone Financial", team2: "Better Way Primary Care" },
{ week: 4, date: "6/14", time: "4:00", team1: "Mattapoisett PD", team2: "Cornerstone Financial" },
{ week: 4, date: "6/14", time: "5:00", team1: "All Season Services", team2: "River Junction" },
{ week: 4, date: "6/14", time: "6:00", team1: "Amp'd Up", team2: "Traveler's Alehouse" },
{ week: 4, date: "6/14", time: "7:00", team1: "Rock Electric", team2: "OSS Landscape" },
{ week: 4, date: "6/15", time: "5:00", team1: "Tropical Smoothie Cafe", team2: "Buzzards Bay Basins" },
{ week: 4, date: "6/15", time: "6:00", team1: "Wash Ashore", team2: "Minkle Boys / SPM" },
{ week: 4, date: "6/15", time: "7:00", team1: "Cantara Brothers Co", team2: "Better Way Primary Care" },
{ week: 5, date: "6/21", time: "4:00", team1: "Rock Electric", team2: "Traveler's Alehouse" },
{ week: 5, date: "6/21", time: "5:00", team1: "Minkle Boys / SPM", team2: "Buzzards Bay Basins" },
{ week: 5, date: "6/21", time: "6:00", team1: "Cornerstone Financial", team2: "Tropical Smoothie Cafe" },
{ week: 5, date: "6/21", time: "7:00", team1: "Cantara Brothers Co", team2: "All Season Services" },
{ week: 5, date: "6/22", time: "5:00", team1: "Better Way Primary Care", team2: "Wash Ashore" },
{ week: 5, date: "6/22", time: "6:00", team1: "Mattapoisett PD", team2: "OSS Landscape" },
{ week: 5, date: "6/22", time: "7:00", team1: "River Junction", team2: "Amp'd Up" },
{ week: 6, date: "6/27", time: "6:00", team1: "Makeup", team2: "Game" },
{ week: 6, date: "6/27", time: "7:00", team1: "Makeup", team2: "Game" },
{ week: 6, date: "6/28", time: "4:00", team1: "River Junction", team2: "Cantara Brothers Co" },
{ week: 6, date: "6/28", time: "5:00", team1: "Amp'd Up", team2: "Cornerstone Financial" },
{ week: 6, date: "6/28", time: "6:00", team1: "Wash Ashore", team2: "Rock Electric" },
{ week: 6, date: "6/28", time: "7:00", team1: "Tropical Smoothie Cafe", team2: "Mattapoisett PD" },
{ week: 6, date: "6/29", time: "5:00", team1: "Minkle Boys / SPM", team2: "All Season Services" },
{ week: 6, date: "6/29", time: "6:00", team1: "Better Way Primary Care", team2: "OSS Landscape" },
{ week: 6, date: "6/29", time: "7:00", team1: "Traveler's Alehouse", team2: "Buzzards Bay Basins" },
{ week: 7, date: "7/5", time: "4:00", team1: "Amp'd Up", team2: "Tropical Smoothie Cafe" },
{ week: 7, date: "7/5", time: "5:00", team1: "Minkle Boys / SPM", team2: "River Junction" },
{ week: 7, date: "7/5", time: "6:00", team1: "Cantara Brothers Co", team2: "Cornerstone Financial" },
{ week: 7, date: "7/5", time: "7:00", team1: "Buzzards Bay Basins", team2: "OSS Landscape" },
{ week: 7, date: "7/6", time: "5:00", team1: "Better Way Primary Care", team2: "Rock Electric" },
{ week: 7, date: "7/6", time: "6:00", team1: "All Season Services", team2: "Mattapoisett PD" },
{ week: 7, date: "7/6", time: "7:00", team1: "Wash Ashore", team2: "Traveler's Alehouse" },
{ week: 8, date: "7/11", time: "6:00", team1: "Makeup", team2: "Game" },
{ week: 8, date: "7/11", time: "7:00", team1: "Makeup", team2: "Game" },
{ week: 8, date: "7/12", time: "4:00", team1: "Better Way Primary Care", team2: "Amp'd Up" },
{ week: 8, date: "7/12", time: "5:00", team1: "OSS Landscape", team2: "All Season Services" },
{ week: 8, date: "7/12", time: "6:00", team1: "Buzzards Bay Basins", team2: "River Junction" },
{ week: 8, date: "7/12", time: "7:00", team1: "Cantara Brothers Co", team2: "Traveler's Alehouse" },
{ week: 8, date: "7/13", time: "5:00", team1: "Minkle Boys / SPM", team2: "Tropical Smoothie Cafe" },
{ week: 8, date: "7/13", time: "6:00", team1: "Rock Electric", team2: "Cornerstone Financial" },
{ week: 8, date: "7/13", time: "7:00", team1: "Mattapoisett PD", team2: "Wash Ashore" },
{ week: 9, date: "7/18", time: "6:00", team1: "Makeup", team2: "Game" },
{ week: 9, date: "7/18", time: "7:00", team1: "Makeup", team2: "Game" },
{ week: 9, date: "7/19", time: "4:00", team1: "Mattapoisett PD", team2: "Cantara Brothers Co" },
{ week: 9, date: "7/19", time: "5:00", team1: "All Season Services", team2: "Rock Electric" },
{ week: 9, date: "7/19", time: "6:00", team1: "Minkle Boys / SPM", team2: "Amp'd Up" },
{ week: 9, date: "7/19", time: "7:00", team1: "Tropical Smoothie Cafe", team2: "Wash Ashore" },
{ week: 9, date: "7/20", time: "5:00", team1: "River Junction", team2: "Cornerstone Financial" },
{ week: 9, date: "7/20", time: "6:00", team1: "OSS Landscape", team2: "Traveler's Alehouse" },
{ week: 9, date: "7/20", time: "7:00", team1: "Better Way Primary Care", team2: "Buzzards Bay Basins" },
{ week: 10, date: "7/25", time: "6:00", team1: "Makeup", team2: "Game" },
{ week: 10, date: "7/25", time: "7:00", team1: "Makeup", team2: "Game" },
{ week: 10, date: "7/26", time: "4:00", team1: "OSS Landscape", team2: "Amp'd Up" },
{ week: 10, date: "7/26", time: "5:00", team1: "Rock Electric", team2: "Buzzards Bay Basins" },
{ week: 10, date: "7/26", time: "6:00", team1: "Cantara Brothers Co", team2: "Tropical Smoothie Cafe" },
{ week: 10, date: "7/26", time: "7:00", team1: "Minkle Boys / SPM", team2: "Traveler's Alehouse" },
{ week: 10, date: "7/27", time: "5:00", team1: "All Season Services", team2: "Cornerstone Financial" },
{ week: 10, date: "7/27", time: "6:00", team1: "Wash Ashore", team2: "River Junction" },
{ week: 10, date: "7/27", time: "7:00", team1: "Mattapoisett PD", team2: "Better Way Primary Care" },
  ];

  // Fetch standings data
  useEffect(() => {
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
        const standingsData = rows.slice(1).reduce((acc, row) => {
          const teamName = row[headers.indexOf("Team")];
          const record = `${row[headers.indexOf("Wins")]}-${row[headers.indexOf("Losses")]}`;
          acc[teamName] = record;
          return acc;
        }, {});
        setStandings(standingsData);
      })
      .catch(error => {
        console.error('Error fetching standings data:', error);
        setError('Failed to fetch standings data.');
      });
  }, []);

  // Filter games for the current week
  const gamesForCurrentWeek = scheduleData.filter(game => game.week === currentWeek);

  // Handle week navigation
  const handlePreviousWeek = () => {
    if (currentWeek > 1) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  const handleNextWeek = () => {
    if (currentWeek < 10) { // Assuming 10 weeks in the schedule
      setCurrentWeek(currentWeek + 1);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      className="schedule-page"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f4f4f4",
        color: "#333",
        minHeight: "100vh",
        fontFamily: "'Cal Sans', Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <button
          onClick={handlePreviousWeek}
          style={{
            backgroundColor: "#1e3c72",
            color: "#ffffff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "20px",
            fontFamily: "'Cal Sans', Arial, sans-serif",
          }}
        >
          ← Previous Week
        </button>
        <h1 style={{ textAlign: "center", color: "#1e3c72", fontFamily: "'Cal Sans', Arial, sans-serif" }}>
          Week {currentWeek}
        </h1>
        <button
          onClick={handleNextWeek}
          style={{
            backgroundColor: "#1e3c72",
            color: "#ffffff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            marginLeft: "20px",
            fontFamily: "'Cal Sans', Arial, sans-serif",
          }}
        >
          Next Week →
        </button>
      </div>

      <table
        style={{
          width: "80%",
          borderCollapse: "collapse",
          marginBottom: "20px",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          fontFamily: "'Cal Sans', Arial, sans-serif",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#1e3c72", color: "#ffffff" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Time</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Matchup</th>
          </tr>
        </thead>
        <tbody>
  {gamesForCurrentWeek.map((game, index) => (
    <tr key={index}>
      <td style={{ padding: "10px", textAlign: "center" }}>{game.date}</td>
      <td style={{ padding: "10px", textAlign: "center" }}>{game.time}</td>
      <td className="matchup-column">
        <img
          src={teamLogos[game.team1]}
          alt={`${game.team1} Logo`}
          style={{ width: "30px", height: "30px" }}
        />
        <span style={{ color: teamColors[game.team1], fontWeight: "bold" }}>
          {game.team1} ({standings[game.team1] || "0-0"})
        </span>
        <span style={{ margin: "0 10px" }}>VS</span>
        <img
          src={teamLogos[game.team2]}
          alt={`${game.team2} Logo`}
          style={{ width: "30px", height: "30px" }}
        />
        <span style={{ color: teamColors[game.team2], fontWeight: "bold" }}>
          {game.team2} ({standings[game.team2] || "0-0"})
        </span>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}

export default SchedulePage;