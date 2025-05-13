// filepath: /Users/michaelpardo/my-embargo-site/src/ContactPage.js
import React from 'react';

function ContactPage() {
  return (
    <div
      style={{
        fontFamily: "'Cal Sans', Arial, sans-serif", // Apply Cal Sans font
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h1>Contact Us</h1>
      <p>
        Feel free to reach out to us at{' '}
        <a
          href="mailto:embargoleague1@gmail.com"
          style={{
            color: '#1e3c72',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          embargoleague1@gmail.com
        </a>
      </p>
      <div style={{ marginTop: '20px' }}>
        <h2>Follow Us</h2>
        <div className="social-icons">
          {/* Instagram Icon */}
          <a
            href="https://www.instagram.com/embargo.league/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          {/* TikTok Icon */}
          <a
            href="https://www.tiktok.com/@embargoleague"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <i className="fab fa-tiktok"></i>
          </a>
          {/* YouTube Icon */}
          <a
            href="https://www.youtube.com/channel/UC0B5T2zBsRfm8d2q2qBrk7A"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;