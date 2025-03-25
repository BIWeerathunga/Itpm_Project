import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminLayout from "./layouts/AdminLayout"; // Wraps Admin pages
import ProtectedRoute from "./layouts/ProtectedRoute"; // Import ProtectedRoute
import Login from "./pages/Admin/Auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        {/* Admin Login Route (No Protection) */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/*" element={<AdminLayout />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
