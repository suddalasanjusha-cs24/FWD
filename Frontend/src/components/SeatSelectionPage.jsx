import React, { useState, useEffect } from "react";
import { FaHome, FaPlaneDeparture, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import "../styles/SeatSelectionPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const SeatSelection = () => {
  
  const [selectedSeats, setSelectedSeats] = useState({});
  const [passengers, setPassengers] = useState([]);
  const [contact, setContact] = useState(null);
  const [activePassenger, setActivePassenger] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);

  const navigate = useNavigate();
  const { state } = useLocation();
  const { flight } = state || { flight: null };
  // Load passenger + contact from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("passengerData");
    if (stored) {
      const data = JSON.parse(stored);
      setPassengers(data.passengers || []);
      setContact(data.contact || {});
    }
  }, []);

  // Fetch booked seats
  useEffect(() => {
    if (!flight?.id) return;
    axios.get(`http://localhost:8000/seats/${flight.id}`)
      .then((res) => {
        const taken = res.data.filter(s => s.is_booked).map(s => s.seat_number);
        setBookedSeats(taken);
      })
      .catch(() => setBookedSeats([]));
  }, [flight]);

  
  // Handlers Block 
  // Click Event : Handle Seat Click handler
  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats(prev => ({ ...prev, [activePassenger]: seat }));
  };

  // Click Event : Handle Seat Click handler
  const handleContinue = async () => {
    if (!flight?.id) return alert("Flight data missing. Go back and select a flight.");
    if (Object.keys(selectedSeats).length < passengers.length) 
      return alert("Select seats for all passengers.");

    try {
      // Book each seat
      for (let i = 0; i < passengers.length; i++) {
        const flight_id = flight.id
        await axios.post("http://localhost:8000/seats/book", {
          flight_id: flight_id,
          seat_number: selectedSeats[i]
        });
      }

      navigate("/payment", {
        state: {
          flight,
          passengers: passengers.map((p, i) => ({ ...p, seat: selectedSeats[i] })),
          contact
        }
      });

    } catch (err) {
      alert(err.response?.data?.detail || "Booking failed, try again.");
    }
  };
  // End Of Handlers

  const seats = Array.from({ length: 20 }, (_, i) => {
    const r = i + 1;
    return [`${r}A`, `${r}B`, "", `${r}C`, `${r}D`, `${r}E`];
  });

  return (
    <div className="seat-page">
      <Navbar />

      {/* Flight Info */}
      <div className="flight-info">
        <h2>
          {flight?.flight_number ?? "N/A"} ✈ {flight?.source ?? "Unknown"} ➜ {flight?.destination ?? "Unknown"}
        </h2>
        <p>
          Departure: {flight?.departure ?? "--"} | Arrival: {flight?.arrival ?? "--"} | Gate {flight?.gate ?? "--"}
        </p>
      </div>

      <div className="main-container">
        {/* Passenger Box */}
        <div className="passenger-box">
          <h3>Passenger Details</h3>

          {passengers.length ? (
            <div className="passenger-list">
              {passengers.map((p, i) => (
                <div
                  key={i}
                  className={`passenger-item ${activePassenger === i ? "active-passenger" : ""}`}
                  onClick={() => setActivePassenger(i)}
                >
                  <p>Passenger: {i + 1}</p>
                  <p><b>Name:</b> {p.title} {p.firstName} {p.lastName}</p>
                  <p><b>Age:</b> {p.dob ? new Date().getFullYear() - new Date(p.dob).getFullYear() : "N/A"}</p>
                  <p><b>Seat:</b> {selectedSeats[i] || "Not selected"}</p>
                  <p>---------------------------</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No passengers found — Go back & enter details.</p>
          )}

          {contact && (
            <div className="contact-info">
              <h4>Contact Info</h4>
              <p><b>Email:</b> {contact.email}</p>
              <p><b>Phone:</b> {contact.phone}</p>
            </div>
          )}
        </div>

        {/* Seat Layout */}
        <div className="seat-layout">
          <div className="cockpit">🛫 Cockpit</div>

          <div className="seats-box">
            {seats.map((row, rowIndex) => (
              <div className="seat-row" key={rowIndex}>
                {row.map((seat, seatIndex) => {
                  const isBooked = bookedSeats.includes(seat);
                  const isDisabled = isBooked;
                  return seat ? (
                    <button
                      key={seatIndex}
                      className={`seat
                        ${selectedSeats[activePassenger] === seat ? "selected" : ""}
                        ${isDisabled ? "booked" : ""}
                      `}
                      disabled={isDisabled}
                      onClick={() => handleSeatClick(seat)}
                    >
                      {seat}
                    </button>
                  ) : <div className="aisle" key={seatIndex}></div>;
                })}
              </div>
            ))}
          </div>

          <div className="seat-page__actions">
            <button className="seat-page__continue-btn" onClick={handleContinue}>
              Continue to Payment 💳
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
