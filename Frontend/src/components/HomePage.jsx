import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";
import { Link, useNavigate } from "react-router-dom"; // add this import at the top


const HomePage = () => {
  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const lines = [
    "Find your perfect flight with SkyVerse",
    "Book anytime, anywhere",
    "Compare prices instantly",
  ];

  const typingSpeed = 80;
  const deletingSpeed = 40;
  const delayBetweenLines = 1200;

  useEffect(() => {
    const currentLine = lines[lineIndex];

    let timer;

    if (!isDeleting && text.length < currentLine.length) {
      timer = setTimeout(() => {
        setText(currentLine.substring(0, text.length + 1));
      }, typingSpeed);
    } else if (isDeleting && text.length > 0) {
      timer = setTimeout(() => {
        setText(currentLine.substring(0, text.length - 1));
      }, deletingSpeed);
    } else if (!isDeleting && text.length === currentLine.length) {
      timer = setTimeout(() => setIsDeleting(true), delayBetweenLines);
    } else if (isDeleting && text.length === 0) {
      setIsDeleting(false);
      setLineIndex((prev) => (prev + 1) % lines.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, lineIndex]);
  const [dailyFlights, setDailyFlights] = useState(0);
const [hasAnimated, setHasAnimated] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    const statsSection = document.getElementById("stats-section");
    if (statsSection) {
      const rect = statsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && !hasAnimated) {
        setHasAnimated(true);
        let count = 0;
        const interval = setInterval(() => {
          count += 50;
          if (count >= 2200) {
            count = 2200;
            clearInterval(interval);
          }
          setDailyFlights(count);
        }, 20);
      }
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [hasAnimated]);

  return (
    <div className="home-page">
      <Link to="/login" className="login-btn">Login</Link>
      <h1>SkyVerse</h1>

      <div className="typewriter-container">
        <div className="typewriter">
          {text}
          <span className="cursor">|</span>
        </div>

      </div>

      <h3>search, compare, and book flights to destinations worldwide</h3>

      <h3>Popular Flights</h3>
      <div className="flight-suggestions">
        <div className="flight_card" onClick={() => navigate("/login",
           { state: { from: "Delhi", to: "Mumbai" } })}>
          <h3>New Delhi → Mumbai</h3>
          <p>From ₹3,499 | Non-stop | 2h 10m</p>
        </div>

        <div className="flight_card" onClick={() => navigate("/login",{ state: { from: "Bangalore", to: "Mumbai" } })}>
          <h3 id="second" >Bangalore → Mumbai</h3>
          <p>From ₹2,799 | Non-stop | 1h 30m</p>
        </div>

        <div className="flight_card" onClick={() => navigate("/login",{ state: { from: "Chennai", to: "Kolkata" } })}>
          <h3>Chennai → Kolkata</h3>
          <p>From ₹9,999 | Direct | 4h 25m</p>
        </div>

        <div className="flight_card" onClick={() => navigate("/login",{ state: { from: "Hyderabad", to: "Bangalore" } })}>
          <h3>Hyderabad → Bangalore</h3>
          <p>From ₹11,499 | Non-stop | 4h 45m</p>
        </div>
      </div>
      <div className="airline-stats" id="stats-section">
        <div className="stat-card">
          <h2>{dailyFlights}+</h2>
          <p>Daily Flights</p>
        </div>
        <div className="stat-card">
          <h2>90+</h2>
          <p>Domestic Destinations</p>
        </div>
        <div className="stat-card">
          <h2>40+</h2>
          <p>International Destinations</p>
        </div>
        <div className="stat-card">
          <h2>750 Mn+</h2>
          <p>Happy Customers</p>
        </div>
        <div className="stat-card">
          <h2>400+</h2>
          <p>Fleet Strong</p>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
