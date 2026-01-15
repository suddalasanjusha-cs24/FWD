import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SeatSelectionPage from "./components/SeatSelectionPage";
import Signup from "./components/Signup";
import SearchFlight from "./components/SearchFlight";
import SearchPage from "./components/SearchPage";
import PassengerDetails from "./components/PassengerDetails"
import Confirmation from "./components/Confirmation"
import Payment from "./components/Payment"
import Contact from "./components/ContactUs"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/seat-selection" element={<SeatSelectionPage />} />
        <Route path="/signup" element = {<Signup/>}/>
        <Route path="/search" element = {<SearchFlight/>}/>
        <Route path="/search_page" element = {<SearchPage/>}/>
        <Route path="/details" element = {<PassengerDetails/>}/>
        <Route path="/confirm" element = {<Confirmation/>}/>
        <Route path="/payment" element = {<Payment/>}/>
        <Route path="/contact" element = {<Contact/>}/>
      </Routes>
    </Router>
  );
}

export default App;



