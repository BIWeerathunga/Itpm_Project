import React from "react";
import { Routes, Route } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import DestinationList from "../pages/Admin/Destination/DestinationList";
import AddDestination from "../pages/Admin/Destination/AddDestination";
import EditDestination from "../pages/Admin/Destination/EditDestination";
import FeedbackIndex from '../pages/Admin/Feedback/Index';
import Login from "../pages/Admin/Auth/Login";
import Navbar from "../components/AdminNav";

function AdminLayout() {
  return (
    <div>
      <Navbar />
      <div className="container-fluid p-0">
        <div className="row">
          {/* Sidebar takes 3 columns */}
          <div className="col-md-2 bg-light min-vh-100">
            <SidebarMenu />
          </div>

          {/* Main content takes 9 columns */}
          <div className="col-md-10 p-3" style={{ overflowX: "hidden" }}>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="destination/list" element={<DestinationList />} />
              <Route path="destination/create" element={<AddDestination />} />
              <Route path="feedback" element={<FeedbackIndex />} />
              
              <Route
                path="destination/edit/:id"
                element={<EditDestination />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
