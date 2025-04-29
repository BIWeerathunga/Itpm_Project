import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/dist/dropdown"; // Ensure Bootstrap JavaScript is loaded

function SidebarMenu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/admin/login", { replace: true }); // Redirect to login
  };

  return (
    <div
      className="bg-dark text-white d-flex flex-column justify-content-between min-vh-100 p-3"
      style={{ width: "253px", marginLeft: "-12px" }}
    >
      {/* Sidebar Logo */}
      <div className="text-center">
        <img
          src="/images/navlogo.png"
          alt="Logo"
          className="img"
          style={{ width: "180px", height: "180px" }}
        />
      </div>

      {/* Sidebar Links */}
      <ul className="nav flex-column mt-0" style={{ marginBottom: "210px" }}>
        {" "}
        {/* Increased top margin */}
        <li className="nav-item mb-2">
          <NavLink
            className="nav-link text-white d-flex align-items-center"
            to="/admin/dashboard"
          >
            <i className="bi bi-speedometer2 fs-5"></i>
            <span className="ms-3">Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            className="nav-link text-white d-flex align-items-center"
            to="/admin/bookings"
          >
            <i className="bi bi-calendar-check fs-5"></i>
            <span className="ms-3">Bookings</span>
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            className="nav-link text-white d-flex align-items-center"
            to="/admin/users"
          >
            <i className="bi bi-people fs-5"></i>
            <span className="ms-3">Users</span>
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            className="nav-link text-white d-flex align-items-center"
            to="/admin/destination/list"
          >
            <i className="bi bi-geo-alt fs-5"></i>
            <span className="ms-3">Destinations</span>
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            className="nav-link text-white d-flex align-items-center"
            to="/admin/tours"
          >
            <i className="bi bi-map fs-5"></i>
            <span className="ms-3">Tours</span>
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            className="nav-link text-white d-flex align-items-center"
            to="/admin/feedbacks"
          >
            <i className="bi bi-chat-text fs-5"></i>
            <span className="ms-3">Feedbacks</span>
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            className="nav-link text-white d-flex align-items-center"
            to="/admin/settings"
          >
            <i className="bi bi-gear fs-5"></i>
            <span className="ms-3">Settings</span>
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <button
            className="nav-link text-white d-flex align-items-center"
            onClick={handleLogout}
            style={{ background: "none", border: "none" }}
          >
            <i className="bi bi-box-arrow-right fs-5"></i>
            <span className="ms-3">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SidebarMenu;
