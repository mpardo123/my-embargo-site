import React from 'react';

function AboutPage() {
  return (
    <div
      style={{
        fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans font
        padding: '20px',
        textAlign: 'center',
        lineHeight: '1.8', // Improve readability
        color: '#333', // Dark text color for better contrast
      }}
    >
      <h1 style={{ marginBottom: '20px', color: '#1e3c72' }}>About Us</h1>
      <p>
        Welcome to <strong>The Embargo League</strong>, where community, competition, and a love for basketball come together. Founded in 2021 with a mission to bring players of high skill level together in a fun, fast-paced, and professionally organized environment, our league has grown from a small summer league of 6 teams into a thriving basketball community.
      </p>
      <p>
        What started as a passion project has become a cornerstone for players looking to stay active, connect with others, and compete at a high level. Our league offers a well-structured format with refereed games, comprehensive statistics, and a welcoming atmosphere for players of all backgrounds. From local high school stars to D3 athletes to former D1 sensations and beyond, we pride ourselves on fostering a diverse community of basketball enthusiasts.
      </p>
      <p>
        We believe in more than just basketball – we believe in creating memories, building friendships, and giving back to our community. Our commitment to player experience is unmatched, with carefully curated schedules, organized events, and a focus on sportsmanship and respect on and off the court.
      </p>
      <p>
        Join us and experience what makes <strong>The Embargo League</strong> more than just a basketball league. It's where great games, lifelong friendships, and unforgettable moments happen every summer.
      </p>

      {/* Meet the Team Section */}
      <h2 style={{ marginTop: '40px', color: '#1e3c72' }}>Meet the Commissioners</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <img
          src="/headshots/commish.jpg"
          alt="Commissioners"
          style={{
            width: '100%',
            maxWidth: '600px',
            height: 'auto',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        />
        <p
          style={{
            marginTop: '10px',
            fontSize: '0.9em',
            color: '#555',
          }}
        >
          From left to right: Andrew Bellemare, Liam Geraghty, Daniel Delacruz, Dylan Cantara, Michael Pardo
        </p>
      </div>

      {/* In the News Section */}
      <h2 style={{ marginTop: '40px', color: '#1e3c72' }}>In the News</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {/* Article 1 */}
        <div style={{ textAlign: 'center', width: '300px' }}>
          <a
            href="https://sippican.theweektoday.com/article/nothing-net-tabor-grad%E2%80%99s-summer-league-fills-athletic-void/54191"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              color: '#1e3c72',
              fontWeight: 'bold',
            }}
          >
            <h3>Nothing but net: Tabor grad’s summer league fills athletic void</h3>
          </a>
          <p style={{ fontSize: '0.9em', color: '#555' }}>
            Launched the Embargo Summer League in Marion, creating a competitive basketball outlet for local young adults seeking organized play beyond high school.
          </p>
        </div>

        {/* Article 2 */}
        <div style={{ textAlign: 'center', width: '300px' }}>
          <a
            href="https://sippican.theweektoday.com/article/marion-basketball-league-grows-second-summer-season/59275"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              color: '#1e3c72',
              fontWeight: 'bold',
            }}
          >
            <h3>Marion basketball league grows into second summer season</h3>
          </a>
          <p style={{ fontSize: '0.9em', color: '#555' }}>
            The Embargo League, now in its second year, has grown into a thriving summer basketball league for local college students, featuring eight teams, official sponsors, and a strong sense of community.
          </p>
        </div>

        {/* Article 3 */}
        <div style={{ textAlign: 'center', width: '300px' }}>
          <a
            href="https://sippican.theweektoday.com/article/summer-basketball-league-%E2%80%98brotherhood%E2%80%99/65282"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              color: '#1e3c72',
              fontWeight: 'bold',
            }}
          >
            <h3>Summer basketball league a brotherhood</h3>
          </a>
          <p style={{ fontSize: '0.9em', color: '#555' }}>
            Now in its third year, the Embargo League has grown into a popular summer basketball league for over 140 South Coast players, complete with sponsorships, stat tracking, and leadership expansion.
          </p>
        </div>

        {/* Article 4 */}
        <div style={{ textAlign: 'center', width: '300px' }}>
          <a
            href="https://sippican.theweektoday.com/article/beachside-buckets-embargo-league-kicks-fourth-season/69834"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              color: '#1e3c72',
              fontWeight: 'bold',
            }}
          >
            <h3>Beachside buckets: Embargo League kicks off fourth season</h3>
          </a>
          <p style={{ fontSize: '0.9em', color: '#555' }}>
            The Embargo League grows to new heights in fourth season, with more expansion and more competition.
          </p>
        </div>

        {/* Article 5 */}
        <div style={{ textAlign: 'center', width: '300px' }}>
          <a
            href="https://sippican.theweektoday.com/article/last-minute-layup-seals-league-title-silvershell-beach/71166"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              color: '#1e3c72',
              fontWeight: 'bold',
            }}
          >
            <h3>Last minute layup seals league title at Silvershell Beach</h3>
          </a>
          <p style={{ fontSize: '0.9em', color: '#555' }}>
            Cio’s Auto Detail won the Embargo League championship at Silvershell Beach with a dramatic last-second basket, remaining undefeated for two summers, while Aiden Smith earned MVP honors.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;