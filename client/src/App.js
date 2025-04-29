import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminLayout from "./layouts/AdminLayout"; // Wraps Admin pages with Sidebar
import "bootstrap/dist/css/bootstrap.min.css";

import BookTour from "./pages/BookTour";
import UserTours from "./pages/UserTours";
import MyBookings from "./pages/MyBookings";


function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes (Without Sidebar) */}
        <Route path="/" element={<Home />} />
        
        <Route path="/tours" element={<UserTours/>}/>
        <Route path="/tours/:tourId/book" element={<BookTour />} />
        <Route path="/my-bookings" element={<MyBookings />} />

    
        {/* Admin Routes (With Sidebar) */}
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
