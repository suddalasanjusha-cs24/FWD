import React, { useEffect, useState } from "react";
import "../styles/Confirmation.css";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const BookingConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { price } = state || {};
  const { flight, passengers, contact } = state || {};

  useEffect(() => {
  const email = contact?.email; // safely assign
  if (email) {
    sendEmail(email);
  }
}, [contact]); // runs only once when page loads

  const sendEmail = async (email) => {
    try {
      const res = await fetch("http://localhost:8000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (!res.ok) console.warn("⚠ Email sending failed");
      else console.log("📧 Email sent automatically!");
    } catch (err) {
      console.error("❌ Email error:", err);
    }
  };

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className="confirm">
      <Navbar />
      

      <main className="container">
        {/* Confirmation */}
        <section className="confirmation-section">
          <div className="icon-success">✅</div>
          <h2>Booking Confirmed! 🎉</h2>
          <p>Your flight has been successfully booked. We've sent all the details to your email.</p>

          <div className="email-box">
            <div>
              <h4>Confirmation Email Sent</h4>
              <p>
                We've sent a detailed confirmation email to{" "}
                <a href={`mailto:${contact?.email || "support@skyverse.com"}`}>
                  {contact?.email || "support@skyverse.com"}
                </a>
                .<br />
                Please check your inbox (and spam folder) for your e-ticket and booking details.
              </p>
            </div>
          </div>

          <div className="booking-info">
            <p>
              <strong>Booking Reference:</strong> <span className="ref">SKY{Math.floor(Math.random() * 90000 + 10000)}</span>
            </p>
            <p>
              <strong>Booked on:</strong>{" "}
              {new Date().toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <span className="status confirmed">Confirmed</span>
          </div>
        </section>

        {/* Flight Details */}
        <section className="flight-details">
          <h3>✈️ Flight Details</h3>
          <div className="flight-card">
            <div className="flight-top">
              <div>
                <p>
                  <strong>{flight?.flight_number || "SV102"} • {flight?.airline}</strong>
                </p>
                <p>{flight?.departure_date || "November 5, 2025"}</p>
              </div>
              <div className="flight-tags">
                <span>{flight?.class || "Economy"}</span>
              </div>
            </div>

            <div className="route">
              <div className="airport">
                <p>
                  {flight?.source || "Bangalore"}
                </p>
                <span className="time">🕗 {flight?.departure || "10:30 AM"}</span>
              </div>

              <div className="duration">
                <p>{flight?.duration || "3h 35m"}</p>
              </div>

              <div className="airport">
                <p>
                  {flight?.destination || "Dubai"}
                  <br />
                </p>
                <span className="time">🕒 {flight?.arrival || "1:05 PM"}</span>
              </div>
            </div>

            <div className="baggage">🧳 1 checked bag (23kg)</div>
          </div>
        </section>

        {/* Passenger Info */}
        <section className="passenger-info">
          <h3>👤 Passenger Information</h3>
          {passengers && passengers.length > 0 ? (
            <div className="info-grid">
              {passengers.map((p, index) => (
                <div key={index} className="passenger-box">
                  <p>Passenger{index + 1}:</p>
                  <p>{[p.title, p.firstName, p.lastName].filter(Boolean).join(" ")}</p>
                  <p>Seat: {p.seat || "Not Assigned"}</p>
                  {p.dob && (
                    <p>
                      Age: {new Date().getFullYear() - new Date(p.dob).getFullYear()}
                    </p>
                  )}
                  <p></p>
                </div>
              ))}
            </div>
          ) : (
            <p>No passenger details found.</p>
          )}

          {contact && (
            <div className="contact-box">
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Phone:</strong> {contact.phone}</p>
            </div>
          )}
        </section>

        {/* Payment Summary */}
        <section className="payment-summary">
          <h3>💳 Payment Summary</h3>
          <div className="payment-total">
            <span>Total Paid</span>
            <p>₹{price}</p>
          </div>
        </section>

        

        {/* Important Info */}
        <section className="important-info">
          <h4>⚠️ Important Information</h4>
          <ul>
            <li>Check-in opens 24 hours before departure</li>
            <li>Arrive at the airport at least 2 hours before departure</li>
            <li>Ensure your travel documents are valid</li>
            <li>Review baggage allowances and restrictions</li>
          </ul>
        </section>

        <footer>
          <p>
            Thank you for choosing <strong>SkyVerse</strong>.<br />
            Have a wonderful journey! ✈️
          </p>
        </footer>
      </main>
    </div>
  );
};

export default BookingConfirmation;
