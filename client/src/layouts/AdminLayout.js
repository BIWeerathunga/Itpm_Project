import React from "react";
import { Routes, Route } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import BookTour from "../pages/Admin/Tours/BookTour"; // Book a tour
import TourList from "../pages/Admin/Tours/TourList"; // Tour list
import DestinationIndex from "../pages/Admin/Destination/Index";
import CreateTour from "../pages/Admin/Tours/createTour";
import EditTour from "../pages/Admin/Tours/editTour";
import Navbar from "../components/AdminNav";

function AdminLayout() {
  return (
    <div>
<Navbar/>
    <div className="d-flex">
      {/* Sidebar always appears for admin routes */}
      <SidebarMenu />

      {/* Admin Content */}
      <div className="flex-grow-1 p-3">
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="destination/index" element={<DestinationIndex />} />
          <Route path="tours/index" element={<TourList />} />
          <Route path="tours/book" element={<BookTour />} />
          <Route path="tours/create" element={<CreateTour />} />
          <Route path="tours/edit/:id" element={<EditTour />} />
        </Routes>
      </div>
    </div>
    </div>
  );
}

export default AdminLayout;


