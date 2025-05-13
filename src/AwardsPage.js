import React, { useState } from 'react';

function AwardsPage() {
  const awardsData = {
    2021: {
      "League Champion": "White Team",
      "All Star Game Champion": "Team Purple",
      "Most Valuable Player": "Ryon Thomas",
      "Defensive Player of the Year": "Nate Przybyszewski",
      "Hustle Player of the Year": "Justin Hankins",
      "Sportsmanship Player of the Year": "Jack Lebrun and Henry Ucci",
      "Coach of the Year": "Alex Wright",
    },
    2022: {
      "League Champion": "Tropical Smoothie Cafe",
      "All Star Game Champion": "Team Pardo",
      "Most Valuable Player": "Jaggar Jones",
      "Rookie of the Year": "Aidan Rock",
      "Defensive Player of the Year": "Sawyer Fox",
      "6th Man of the Year": "BJ Jenkins",
      "Most Improved Player of the Year": "Hunter Soares",
      "Hustle Player of the Year": "Michael Pardo",
      "Sportsmanship Player of the Year": "Jack Lebrun",
      "Coach of the Year": "Wade Saucier",
    },
    2023: {
      "League Champion": "Bocca",
      "All Star Game Champion": "Team Danny and Dylan",
      "Most Valuable Player": "Aiden Smith",
      "Rookie of the Year": "Aiden Smith",
      "Defensive Player of the Year": "Luke Brogioli",
      "Most Improved Player of the Year": "Braden Yeomans",
      "Sportsmanship Player of the Year": "Jack Lebrun",
    },
    2024: {
      "League Champion": "Cio’s Auto Detail",
      "All Star Game Champion": "Team Nickelodylan",
      "Most Valuable Player": "Dez Jernigan",
      "Rookie of the Year": "Zack Mourao",
      "Defensive Player of the Year": "Luis Cortijo",
      "Most Improved Player of the Year": "Ryan Deslauriers",
      "Clutch Player of the Year": "Braden Yeomans",
      "Hustle Player of the Year": "Jeffrey Radek",
      "Sportsmanship Player of the Year": "Marvin Delarosa",
      "Teammate of the Year": "Timmy Le",
      "Best Performance of the Year": "Braden Yeomans",
    },
  };

  const allEmbargoTeams = {
    2021: {
      firstTeam: [
        "Ryan Thomas",
        "Connor Rose",
        "Jaiden Johnson",
        "Luke Brogioli",
        "Josh Vargas",
      ],
      secondTeam: [
        "Elijah Miranda",
        "Liam Geraghty",
        "Garrett Brunette",
        "Dylan Cantara",
        "Michael Pardo",
      ],
      thirdTeam: [
        "Andrew Bellemare",
        "Ethan Risgin",
        "Justin Hankins",
        "Ryan Deslauriers",
        "Hunter Soares",
      ],
    },
    2022: {
      firstTeam: [
        "Ryon Thomas",
        "Aidan Rock",
        "Jaggar Jones",
        "Sawyer Fox",
        "Luke Brogioli",
      ],
      secondTeam: [
        "Connor Rose",
        "Caden Letendre",
        "Liam Geraghty",
        "Naji Karam",
        "Givel Nelson",
      ],
      thirdTeam: [
        "Jacob Smith",
        "Andrew Bellemare",
        "Dylan Cantara",
        "Hunter Soares",
        "Ethan Risgin",
      ],
    },
    2023: {
      firstTeam: [
        "Aiden Smith",
        "Braden Yeoman",
        "Peter Joseph",
        "Jaggar Jones",
        "Luke Brogioli",
      ],
      secondTeam: [
        "Aidan Rock",
        "Jacob Smith",
        "Caden Letendre",
        "Tajuan Estrella",
        "Luke Burke",
      ],
      thirdTeam: [
        "Neil Goodwin",
        "Liam Geraghty",
        "Nejohn Fortes",
        "Martini Kamga",
        "Steve Morrell",
      ],
    },
    2024: {
      firstTeam: [
        "Braden Yeomans",
        "Zack Mourao",
        "Shane Poitras",
        "Dez Jernigan",
        "Nejohn Fortes",
      ],
      secondTeam: [
        "Aiden Smith",
        "Aidan Rock",
        "Liam Geraghty",
        "John Butler",
        "Stanley Freeman",
      ],
      thirdTeam: [
        "Diesel Goodine",
        "Ryan Deslauriers",
        "Darryl Wood",
        "Steve Morrell",
        "Josh Vargas",
      ],
    },
  };

  const [currentYear, setCurrentYear] = useState(2024); // Default year is 2024

  const handlePreviousYear = () => {
    if (currentYear > 2021) {
      setCurrentYear(currentYear - 1);
    }
  };

  const handleNextYear = () => {
    if (currentYear < 2024) {
      setCurrentYear(currentYear + 1);
    }
  };

  const currentAwards = awardsData[currentYear];
  const currentTeams = allEmbargoTeams[currentYear];

  return (
    <div
      style={{
        fontFamily: "'Cal Sans', Arial, sans-serif",
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h1 style={{ color: '#1e3c72', marginBottom: '20px' }}>League Awards</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <button
          onClick={handlePreviousYear}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1e3c72',
            color: '#ffffff',
            border: 'none',
            borderRadius: '5px',
            cursor: currentYear > 2021 ? 'pointer' : 'not-allowed',
            opacity: currentYear > 2021 ? 1 : 0.5,
            marginRight: '10px',
          }}
        >
          Previous
        </button>
        <h2 style={{ color: '#1e3c72', margin: 0 }}>{currentYear}</h2>
        <button
          onClick={handleNextYear}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1e3c72',
            color: '#ffffff',
            border: 'none',
            borderRadius: '5px',
            cursor: currentYear < 2024 ? 'pointer' : 'not-allowed',
            opacity: currentYear < 2024 ? 1 : 0.5,
            marginLeft: '10px',
          }}
        >
          Next
        </button>
      </div>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px',
          backgroundColor: '#ffffff',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#1e3c72', color: '#ffffff' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Award</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Winner</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(currentAwards).map(([award, winner], index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{award}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{winner}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 style={{ color: '#1e3c72', marginTop: '40px' }}>All-Embargo Teams</h2>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px',
          backgroundColor: '#ffffff',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#1e3c72', color: '#ffffff' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Team</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Players</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '10px', textAlign: 'center' }}>First Team</td>
            <td style={{ padding: '10px', textAlign: 'center' }}>{currentTeams.firstTeam.join(', ')}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '10px', textAlign: 'center' }}>Second Team</td>
            <td style={{ padding: '10px', textAlign: 'center' }}>{currentTeams.secondTeam.join(', ')}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '10px', textAlign: 'center' }}>Third Team</td>
            <td style={{ padding: '10px', textAlign: 'center' }}>{currentTeams.thirdTeam.join(', ')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AwardsPage;