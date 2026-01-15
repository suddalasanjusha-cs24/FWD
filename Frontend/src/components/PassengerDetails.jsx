import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/PassengerDetails.css";
import Flights from "./SearchPage";
import Navbar from "./Navbar";

const PassengerDetails = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const { flight } = state || {};

  const [passengers, setPassengers] = useState([
    {
      title: "",
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      nationality: "",
      passport: "",
      expiry: "",
    },
  ]);

  const [contact, setContact] = useState({ email: "", phone: "" });

  // Add another passenger card
  const addPassenger = () => {
    setPassengers([
      ...passengers,
      {
        title: "",
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        nationality: "",
        passport: "",
        expiry: "",
      },
    ]);
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for backend (adjust as per backend schema)
    const passengerPayloads = passengers.map((p) => ({
      full_name: `${p.title} ${p.firstName} ${p.lastName}`.trim(),
      age: 0, // You may want to calculate age from dob
      gender: p.gender,
      passport_number: p.passport,
      email: contact.email,
      phone: contact.phone,
    }));

    try {
      // Send each passenger to backend
      for (const passenger of passengerPayloads) {
        await axios.post("http://localhost:8000/passengers/", passenger);
      }
      // Optionally, store locally or navigate
      localStorage.setItem("passengerData", JSON.stringify({ passengers, contact }));
      navigate("/seat-selection", {
        state: {
          flight: flight
        }
      });
    } catch (error) {
      alert("Failed to save passenger details. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="passenger-page">
        <br></br>

        <div className="passenger-page__container">
          <h2>Passenger Details</h2>
          <p>Please provide information for all passengers</p>

          <form onSubmit={handleSubmit}>
            {passengers.map((p, i) => (
              <div key={i} className="passenger-page__card">
                <h3>
                  Passenger {i + 1}
                  {i === 0 && " (Primary Contact)"}
                </h3>

                <div className="passenger-page__grid">
                  <div>
                    <label>Title</label>
                    <select
                      value={p.title}
                      onChange={(e) =>
                        handlePassengerChange(i, "title", e.target.value)
                      }
                    >
                      <option>Select</option>
                      <option>Mr</option>
                      <option>Ms</option>
                      <option>Mrs</option>
                    </select>
                  </div>

                  <div>
                    <label>First Name</label>
                    <input
                      type="text"
                      placeholder="First name"
                      value={p.firstName}
                      onChange={(e) =>
                        handlePassengerChange(i, "firstName", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label>Last Name</label>
                    <input
                      type="text"
                      placeholder="Last name"
                      value={p.lastName}
                      onChange={(e) =>
                        handlePassengerChange(i, "lastName", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      value={p.dob}
                      onChange={(e) =>
                        handlePassengerChange(i, "dob", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label>Gender</label>
                    <select
                      value={p.gender}
                      onChange={(e) =>
                        handlePassengerChange(i, "gender", e.target.value)
                      }
                    >
                      <option>Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <h4>Travel Document</h4>
                <div className="passenger-page__grid">
                  <div>
                    <label>Nationality</label>
                    <input
                      type="text"
                      placeholder="Country"
                      value={p.nationality}
                      onChange={(e) =>
                        handlePassengerChange(i, "nationality", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label>Passport Number</label>
                    <input
                      type="text"
                      placeholder="Passport number"
                      value={p.passport}
                      onChange={(e) =>
                        handlePassengerChange(i, "passport", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label>Passport Expiry</label>
                    <input
                      type="date"
                      value={p.expiry}
                      onChange={(e) =>
                        handlePassengerChange(i, "expiry", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="passenger-page__add-btn"
              onClick={addPassenger}
            >
              + Add Another Passenger
            </button>

            {/* Contact Info Section */}
            <div className="passenger-page__card contact">
              <h3>Contact Information</h3>
              <p>
                We'll send booking confirmation and updates to these details.
              </p>

              <div className="passenger-page__grid">
                <div>
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={contact.email}
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={contact.phone}
                    onChange={(e) =>
                      setContact({ ...contact, phone: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="passenger-page__actions">
              <button type="button" className="passenger-page__back-btn">
                Back to Search
              </button>
              <button type="submit" className="passenger-page__continue-btn">
                Select Seats
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PassengerDetails;
