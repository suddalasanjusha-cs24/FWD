import React, { useState } from "react";
import "../styles/SearchFlight.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function SkyVerseBooking() {
  const navigate = useNavigate();
  const location = useLocation();

  const [tripType, setTripType] = useState("oneway");
  const [currency, setCurrency] = useState("USD");

  const from = location.state?.from;
  const to = location.state?.to;

  const [formData, setFormData] = useState({
    from: from || "",
    to: to || "",
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
  const goHome = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // VALIDATION
  const validate = () => {
    if (!formData.from || !formData.to) {
      alert("Please select both departure and destination cities.");
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
    if (tripType === "round" && !formData.returnDate) {
      alert("Please select a return date.");
      return false;
    }
    if (!formData.travellers) {
      alert("Please select your travel class.");
      return false;
    }
    if (!formData.passengers) {
      alert("Please select number of passengers.");
      return false;
    }
    return true;
  };

  // SUBMIT HANDLER → calls backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post("http://localhost:8000/api/flights/search", {
        source: formData.from,
        destination: formData.to,
        departure_date: formData.departureDate,
        travel_class: formData.travellers,
        passengers: Number(formData.passengers)
      });


      const flightResults = Array.isArray(response.data?.flights)
        ? response.data.flights
        : Array.isArray(response.data)
        ? response.data
        : [];
      navigate("/search_page", {
        state: {
          searchInputs: { tripType, currency, ...formData },
          flights: flightResults
        },
      });

    } catch (error) {
      console.error(error);
      alert("No flights available or server error.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="seat_flight">
        {/* Header */}
        <br></br>

        <main className="sf-main">
          <h1 className="sf-title">Book Your Flight</h1>

          <section className="sf-booking-form">
            <h4>Plan your next journey effortlessly</h4>

            <form onSubmit={handleSubmit}>
              <div className="sf-flight-box">
                <h6>✈ Flight Details</h6>

                <div className="sf-trip-type">
                  <label>
                    <input
                      type="radio"
                      name="trip"
                      value="oneway"
                      checked={tripType === "oneway"}
                      onChange={(e) => setTripType(e.target.value)}
                    />
                    One Way
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="trip"
                      value="round"
                      checked={tripType === "round"}
                      onChange={(e) => setTripType(e.target.value)}
                    />
                    Round Trip
                  </label>

                  <select
                    className="sf-currency"
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="USD">$ USD</option>
                    <option value="EUR">€ EUR</option>
                    <option value="INR">₹ INR</option>
                  </select>
                </div>

                {/* From - To */}
                <div className="sf-locations">
                  <div className="sf-field">
                    <label>From</label>
                    <select
                      name="from"
                      value={formData.from}
                      onChange={handleChange}
                    >
                      <option value="" hidden>Select Departure City</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sf-field">
                    <label>To</label>
                    <select
                      name="to"
                      value={formData.to}
                      onChange={handleChange}
                    >
                      <option value="" hidden>Select Destination City</option>
                      {cities
                        .filter((city) => city !== formData.from) // prevent selecting same city
                        .map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
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
                      value={formData.returnDate}
                      min={today}
                      disabled={tripType === "oneway"}
                      onChange={handleChange}
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
                      <option value="" hidden>Select Class</option>
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

              <button className="sf-search-btn" type="submit">Search Flights</button>
            </form>
          </section>
        </main>

        <footer className="sf-footer">
          <p>© 2024 SkyVerse. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default SkyVerseBooking;
