import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './navbar';
import TeamPage from './TeamPage';
import PlayerCard from './playercard';
import StandingsPage from './StandingsPage'; // Ensure this is imported
import { useParams } from 'react-router-dom';
import SponsorsPage from './Sponsors'; // Import the SponsorsPage component
import SchedulePage from './SchedulePage';
import HomePage from './HomePage';
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';
import StatisticsPage from './StatisticsPage'; // Import the StatisticsPage component
import AwardsPage from './AwardsPage';
import BoxScorePage from './BoxScorePage'; // Create this component



// Wrapper to get the teamName from the URL
function TeamPageWrapper() {
  const { teamName } = useParams();
  const teamDisplayNames = {
    basins: "Buzzards Bay Basins",
    oss: "OSS Landscape",
    allseason: "All Season Services",
    ampd: "Amp'd Up",
    bwpc: "Better Way Primary Care",
    cantara: "Cantara Brothers Co",
    cornerstone: "Cornerstone Financial",
    washashore: "Wash Ashore",
    mattpd: "Mattapoisett PD",
    minkle: "Minkle Boys / SPM",
    riverjunction: "River Junction",
    rock: "Rock Electric",
    trops: "Tropical Smoothie Cafe",
    travelers: "Traveler's Alehouse"
  };
  return <TeamPage teamName={teamDisplayNames[teamName] || teamName} />;
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="page-content">
        <Routes>
          <Route path="/teams/:teamName" element={<TeamPageWrapper />} />
          <Route path="/players/:playerName" element={<PlayerCard />} />
          <Route path="/standings" element={<StandingsPage />} /> {/* Standings route */}
          <Route path="/sponsors" element={<SponsorsPage/>} /> {/* Add Sponsors route */}
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
<Route path="/about" element={<AboutPage />} />
<Route path="/statistics" element={<StatisticsPage />} />
<Route path="/awards" element={<AwardsPage />} />
<Route path="/boxscore/:week/:team1/:team2" element={<BoxScorePage />} />
<Route path="/players/:playerName" element={<PlayerCard />} /> {/* Player Card Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;// Trigger redeployment
