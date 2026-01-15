import React, { useState } from "react";
import "../styles/SearchFlight.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function SkyVerseBooking() {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState("oneway");
  const [currency, setCurrency] = useState("USD");

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    travellers: "",
    passengers: ""
  });

  const cities = [
    "Bangalore",
    "Hyderabad",
    "Delhi",
    "Mumbai",
    "Chennai",
    "Kolkata",
    "Goa",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Kochi"
  ];

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (
        name === "departureDate" &&
        prev.returnDate &&
        value > prev.returnDate
      ) {
        updated.returnDate = "";
      }

      return updated;
    });
  };

  const validate = () => {
    if (!formData.from || !formData.to) {
      alert("Please enter both departure and destination cities.");
      return false;
    }

    if (formData.from === formData.to) {
      alert("Departure and destination cities cannot be the same.");
      return false;
    }

    if (!formData.departureDate) {
      alert("Please select a departure date.");
      return false;
    }

    if (
      tripType === "round" &&
      (!formData.returnDate ||
        formData.returnDate < formData.departureDate)
    ) {
      alert("Return date must be same as or after departure date.");
      return false;
    }

    if (!formData.travellers || !formData.passengers) {
      alert("Please select class and passengers.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/search_page", {
        state: { tripType, currency, ...formData }
      });
    }
  };

  return (
    <div className="seat_flight">
      <Navbar />

      <header className="sf-header">
        <div className="sf-logo">✈ SkyVerse</div>
      </header>

      <main className="sf-main">
        <h1 className="sf-title">Book Your Flight</h1>

        <section className="sf-booking-form">
          <form onSubmit={handleSubmit}>
            <div className="sf-flight-box">

              {/* Trip Type */}
              <div className="sf-trip-type">
                <label>
                  <input
                    type="radio"
                    value="oneway"
                    checked={tripType === "oneway"}
                    onChange={(e) => setTripType(e.target.value)}
                  />
                  One Way
                </label>

                <label>
                  <input
                    type="radio"
                    value="round"
                    checked={tripType === "round"}
                    onChange={(e) => setTripType(e.target.value)}
                  />
                  Round Trip
                </label>

                <select
                  className="sf-currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="USD">$ USD</option>
                  <option value="EUR">€ EUR</option>
                  <option value="INR">₹ INR</option>
                </select>
              </div>

              {/* Cities */}
              <div className="sf-locations">
                <div className="sf-field">
                  <label>From</label>
                  <input
                    type="text"
                    name="from"
                    list="fromCities"
                    value={formData.from}
                    onChange={handleChange}
                    placeholder="Enter departure city"
                  />
                  <datalist id="fromCities">
                    {cities.map((city) => (
                      <option key={city} value={city} />
                    ))}
                  </datalist>
                </div>

                <div className="sf-field">
                  <label>To</label>
                  <input
                    type="text"
                    name="to"
                    list="toCities"
                    value={formData.to}
                    onChange={handleChange}
                    placeholder="Enter destination city"
                  />
                  <datalist id="toCities">
                    {cities
                      .filter((city) => city !== formData.from)
                      .map((city) => (
                        <option key={city} value={city} />
                      ))}
                  </datalist>
                </div>

                <div className="sf-field">
                  <label>Departure</label>
                  <input
                    type="date"
                    name="departureDate"
                    min={today}
                    value={formData.departureDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="sf-field">
                  <label>Return</label>
                  <input
                    type="date"
                    name="returnDate"
                    min={formData.departureDate || today}
                    value={formData.returnDate}
                    onChange={handleChange}
                    disabled={tripType === "oneway"}
                  />
                </div>
              </div>

              {/* Class & Passengers */}
              <div className="sf-locations">
                <div className="sf-field">
                  <label>Class</label>
                  <select
                    name="travellers"
                    value={formData.travellers}
                    onChange={handleChange}
                  >
                    <option value="" disabled hidden>Select Class</option>
                    <option value="economy">Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                </div>

                <div className="sf-field">
                  <label>Passengers</label>
                  <select
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                  >
                    <option value="" hidden>Select Number</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
            </div>

            <button className="sf-search-btn" type="submit">
              Search Flights
            </button>
          </form>
        </section>
      </main>

      <footer className="sf-footer">
        <p>&copy; 2024 SkyVerse. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default SkyVerseBooking;
