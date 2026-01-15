import React, { useState } from "react";
import "../styles/DetailsPage.css";

const PassengerDetails = () => {
  const [passenger, setPassenger] = useState({
    gender: "",
    firstName: "",
    lastName: "",
    dob: "",
    mobile: "",
    email: "",
  });

  const selectedFlight = {
    flightNumber: "6E 1913",
    from: "Bengaluru (BLR)",
    to: "Abu Dhabi (AUH)",
    date: "Mon, 03 Nov 2025",
    time: "14:40 - 17:45 (4h 35m)",
    type: "Non-Stop",
    price: "₹30,117",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassenger({ ...passenger, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passenger.firstName || !passenger.lastName) {
      alert("Please enter your full name.");
      return;
    }

    alert(
      `✅ Passenger details saved!\n\n` +
        `Name: ${passenger.firstName} ${passenger.lastName}\n` +
        `Mobile: ${passenger.mobile}\n` +
        `Email: ${passenger.email}`
    );

    // Example: redirect (React Router)
    // navigate("/confirmation");
  };

  return (
    <div className="container-page">
      {/* Passenger Form */}
      <div className="form-section">
        <h2>Enter Passenger Details</h2>
        <form id="passengerForm" onSubmit={handleSubmit}>
          <div className="gender">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={passenger.gender === "Male"}
                onChange={handleChange}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={passenger.gender === "Female"}
                onChange={handleChange}
                required
              />
              Female
            </label>
          </div>

          <label>First and Middle Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter First and Middle Name"
            value={passenger.firstName}
            onChange={handleChange}
            required
          />

          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            value={passenger.lastName}
            onChange={handleChange}
            required
          />

          <label>Date of Birth (Optional)</label>
          <input
            type="date"
            name="dob"
            value={passenger.dob}
            onChange={handleChange}
          />

          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            placeholder="Enter Mobile Number"
            value={passenger.mobile}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            maxLength="10"
          />

          <label>Email ID</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={passenger.email}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn">
            Continue
          </button>
        </form>
      </div>

      {/* Flight Summary */}
      <div className="summary-section">
        <h3>Trip Summary</h3>
        <div className="flight-summary">
          <p>
            <strong>Flight:</strong> <span>{selectedFlight.flightNumber}</span>
          </p>
          <p>
            <strong>From:</strong> <span>{selectedFlight.from}</span>
          </p>
          <p>
            <strong>To:</strong> <span>{selectedFlight.to}</span>
          </p>
          <p>
            <strong>Date:</strong> <span>{selectedFlight.date}</span>
          </p>
          <p>
            <strong>Time:</strong> <span>{selectedFlight.time}</span>
          </p>
          <p>
            <strong>Type:</strong> <span>{selectedFlight.type}</span>
          </p>
        </div>
        <div className="price">{selectedFlight.price}</div>
      </div>
    </div>
  );
};

export default PassengerDetails;