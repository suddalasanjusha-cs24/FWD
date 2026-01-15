import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";



const Navbar = () => {
    const navigate = useNavigate();
return (
    <nav className="navbar">
        <div className="navbar-container">
            <div className="navbar-logo">✈ SkyVerse</div>
            <ul className="navbar-links">
                <li>
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                <li>
                    <Link to="/search" className="navbar-link">Flights</Link>
                </li>
                <li>
                    <Link to="/contact" className="navbar-link">Contact Us</Link>
                </li>
                
                <li>
                    <button
                        className="navbar-login-btn"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                </li>
            </ul>
        </div>
    </nav>
);
};

export default Navbar;