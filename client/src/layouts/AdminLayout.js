import React from "react";
import { Routes, Route } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Index from "../pages/Admin/Destination/Index";
import Create from "../pages/Admin/Destination/Create";

function AdminLayout() {
  return (
    <div className="d-flex">
      {/* Sidebar always appears for admin routes */}
      <SidebarMenu />

      {/* Admin Content */}
      <div className="flex-grow-1 p-3">
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="destination/index" element={<Index />} />
          <Route path="destination/create" element={<Create />} />
          {/* Add more admin pages here */}
        </Routes>
      </div>
    </div>
  );
}

export default AdminLayout;
