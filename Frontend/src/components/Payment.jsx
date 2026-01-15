import React, { useState } from "react";
import "../styles/Payment.css";
import { useNavigate, useLocation } from "react-router-dom";
import Flights from "./SearchPage";
import Navbar from "./Navbar";

export default function PaymentPage() {
  const [method, setMethod] = useState("credit");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation(); 
  const { flight } = state || { flight: null };
  const { passengers } = state || {};
  const { contact } = state || {};
  const passengerCount = passengers?.length || 0;
  const totalprice = passengerCount * flight.price;
  const handlePayment = (e) => {
    e.preventDefault();
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      navigate("/confirm", { state : {price: totalprice, contact:contact, passengers: passengers}}); 
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <br></br>
      <div style={{ margin: "0 auto", width: "500px"}}>
        <div className="payment">
          <div className="payment-card">
            {/* Left Section */}
            <div className="payment-center">
              <h3 className="section-title">Payment Details</h3>

              <div className="payment-options">
                {["credit", "debit", "upi"].map((option) => (
                  <label
                    key={option}
                    className={`option-box ${
                      method === option ? "active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={option}
                      checked={method === option}
                      onChange={(e) => setMethod(e.target.value)}
                    />
                    {option === "credit"
                      ? "Credit Card"
                      : option === "debit"
                      ? "Debit Card"
                      : "UPI"}
                  </label>
                ))}
              </div>

              {(method === "credit" || method === "debit") && (
                <div className="form-section">
                  <label>
                    Card Number
                    <input type="text" placeholder="Enter card number" />
                  </label>
                  <label>
                    Cardholder Name
                    <input type="text" placeholder="Enter card holder name" />
                  </label>
                  <div className="two-columns">
                    <label>
                      Expiry Date
                      <input type="text" placeholder="MM/YY" />
                    </label>
                    <label>
                      CVV
                      <input type="password" placeholder="***" />
                    </label>
                  </div>
                </div>
              )}

              {method === "upi" && (
                <div className="form-section">
                  <label>
                    UPI ID
                    <input type="text" placeholder="Enter UPI Id" />
                  </label>
                </div>
              )}

              <h3 className="section-title">Billing Address</h3>
              <div className="two-columns">
                <label>
                  First Name
                  <input type="text" placeholder="" />
                </label>
                <label>
                  Last Name
                  <input type="text" placeholder="" />
                </label>
              </div>

              <label>
                Address
                <input type="text" placeholder="" />
              </label>

              <div className="two-columns">
                <label>
                  City
                  <input type="text" placeholder="" />
                </label>
                <label>
                  Pincode
                  <input type="text" placeholder="" />
                </label>
              </div>

              <label>
                Mobile Number
                <input type="text" placeholder="" />
              </label>

              <label>
                Email ID
                <input type="email" placeholder="" />
              </label>

              <button onClick={handlePayment} className="pay-button">
                Continue to Pay {totalprice}
              </button>
            </div>
          </div>

          {showSuccess && (
            <div className="success-popup">
              ✔ Payment processed successfully! Redirecting to confirmation...
            </div>
          )}
        </div>
      </div>
    </>
  );
}
