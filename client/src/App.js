import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminLayout from "./layouts/AdminLayout"; // Wraps Admin pages with Sidebar
import "bootstrap/dist/css/bootstrap.min.css";
import TourList from "./pages/Tours/TourList";
import BookTour from "./pages/Tours/BookTour";

function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes (Without Sidebar) */}
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<TourList />} />
        <Route path="/tours/:tourId/book" element={<BookTour />} />

        {/* Admin Routes (With Sidebar) */}
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
