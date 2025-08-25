// src/AboutPage.jsx
import React from "react";
import "./AboutPage.css";

function AboutPage({ onClose }) {
  return (
    <div className="about-overlay">
      <div className="about-container">
        <button className="about-close" onClick={onClose}>
          ✕
        </button>

        <div className="about-content">
          <img src="./favicon.jpg" alt="Abd" className="about-photo" />
          <h1>Abd Global Radio</h1>
          <p className="about-tagline">Listen to the world, one station at a time 🌍📻</p>

          <div className="about-section">
            <h2>🎯 Purpose</h2>
            <p>This app is perfect for:</p>
            <ul>
              <li>People who love global music</li>
              <li>Travelers, expats, and language learners</li>
              <li>Those who want relaxing background music</li>
              <li>Users with poor internet (it works offline!)</li>
            </ul>
          </div>

          <div className="about-section">
            <h2>✨ Features</h2>
            <ul>
              <li>🎧 5 hand-picked global stations</li>
              <li>💾 Works offline after first load</li>
              <li>🎨 Dynamic background per station</li>
              <li>🔊 Volume control & visualizer</li>
              <li>🌙 Dark/Light mode toggle</li>
            </ul>
          </div>

          <div className="about-section">
            <h2>👨‍💻 Made by Abdu Mk</h2>
        
            <p><strong>One Radio. One World.</strong></p>
          </div>

          <button className="about-done" onClick={onClose}>
            Back to Radio
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;