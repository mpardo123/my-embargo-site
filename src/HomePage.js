import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    navigate('/about'); // Navigate to the contact page
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundImage: "url('/homephoto.jpeg')", // Full league image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', // Move content higher up
        fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans font
        paddingTop: '10vh', // Add padding to create space from the top
      }}
    >
      <div
        style={{
          textAlign: 'center',
          color: '#ffffff', // White text
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)', // Add text shadow for better contrast
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Gray transparent background
          padding: '20px 40px', // Add padding inside the box
          borderRadius: '10px', // Rounded corners for the box
        }}
      >
        <h1
          style={{
            fontSize: '3em', // Large text for the title
            marginBottom: '20px',
          }}
        >
          Building a Brotherhood on and off the Court
        </h1>
        <button
          onClick={handleLearnMoreClick}
          style={{
            backgroundColor: '#1e3c72', // Dark blue button
            color: '#ffffff', // White text
            border: 'none',
            padding: '15px 30px',
            borderRadius: '5px',
            fontSize: '1.2em',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#16305a')} // Darker blue on hover
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#1e3c72')} // Reset color on mouse leave
        >
          Learn more
        </button>
      </div>
    </div>
  );
}

export default HomePage;