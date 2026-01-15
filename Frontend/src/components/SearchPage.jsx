import React, { useEffect, useState } from "react";
import "../styles/SearchPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Flights = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { searchInputs, flights: flightResults } = location.state || {};

  const [flights, setFlights] = useState(flightResults || []);

  useEffect(() => {
    if (!location.state) {
      alert("Flight search missing! Go back.");
      navigate("/search");
      return;
    }
  }, [location.state, navigate]);

  const handleSelect = (flight) => {
    navigate("/details", {
        state: {
          flight: flight
        },
      });
  };

  if (!searchInputs) {
    return <p>No search data found. Go back and search again.</p>;
  }

  return (
    <div className="flights-page">
      <Navbar />
      <br></br>
      <br></br>

      <main className="main">
        <button className="back" onClick={() => navigate("/search")}>
          ← Back to Search
        </button>

        <h2 className="heading">Available Flights</h2>

        <div className="summary">
          <span>📍 {searchInputs.from} → {searchInputs.to}</span>
          <span>📅 {searchInputs.departureDate}</span>
        </div>

        {flights.length === 0 ? (
          <p>No flights available.</p>
        ) : (
          flights.map((flight) => (
            <div key={flight.id} className="flight-card">
              <div className="flight-info">
                <div className="flight-details">
                  <div>
                    <span className="flight-name">{flight.airline}</span>{" "}
                    <span className="flight-code">{flight.flight_number}</span>
                  </div>
                  <div>{flight.source} → {flight.destination}</div>
                  <div>Class: {flight.travel_class}</div>
                </div>
              </div>

              <div className="price-section">
                <p className="class">{flight.travel_class}</p>
                <p className="price">₹{flight.price}</p>

                <button
                  className="select-btn"
                  onClick={() => handleSelect(flight)}
                >
                  Select Flight
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default Flights;
