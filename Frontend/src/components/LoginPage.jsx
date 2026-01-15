import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "../styles/LoginPage.css";
import loginImage from "../assets/login.png";
import Navbar from "./Navbar";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from;
  const to = location.state?.to;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in all the details");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful ✅");

        if (remember) {
          localStorage.setItem("username", username);
        }

        navigate("/search",
          { state: { from: from, to: to } });
      } else {
        alert(data.message || "Invalid Credentials ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="login-page">
        <header className="Heading">
          <h1>SkyVerse</h1>
        </header>


        <div className="login_container">
          <h2 className="name">LOGIN</h2>
          <img className="login_image" src={loginImage} alt="Login" />
          <p className="detail">Login to book your next travel adventure</p>

          <form onSubmit={handleSubmit}>
            <div className="login">
              <label htmlFor="username">Username</label>
              <input
                className="input_field"
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="login">
              <label htmlFor="password">Password</label>
              <input
                className="input_field"
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "5px",
              }}
            >
              <input
                style={{ width: "30px", marginBottom: "10px" }}
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label style={{ marginBottom: "10px" }} htmlFor="remember">
                Remember Me
              </label>
            </div>

            <button type="submit" className="login_btn">
              LOGIN
            </button>

            <div className="sign_up">
              <p>
                <b>Don't have an account?</b>{" "}
                <Link to="/signup" className="signup">
                  <br />Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
