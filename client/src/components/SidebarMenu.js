import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/dist/dropdown"; // Ensure Bootstrap JavaScript is loaded

function SidebarMenu() {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/admin/login", { replace: true }); // Redirect to login
  };

  return (
    <div
      className="bg-dark text-white d-flex flex-column justify-content-between min-vh-100 p-3"
      style={{
        width: isExpanded ? "250px" : "80px",
        transition: "width 0.3s ease-in-out",
      }}
    >
      {/* Toggle Button */}
      <button
        className="btn text-white mb-1 mt-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <img
          src="/images/navlogo.png"
          alt="Logo"
          className="img-fluid"
          style={{
            width: isExpanded ? "200px" : "50px",
            height: isExpanded ? "200px" : "50px",
            transition: "all 0.3s ease-in-out",
          }}
        />
      </button>

      <button
        className="btn text-white mb-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <i
          className={`bi ${isExpanded ? "bi-chevron-left" : "bi-list"} fs-3`}
        ></i>
      </button>

      {/* Sidebar Links */}
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink
            className="nav-link text-white d-flex align-items-center"
            to="/admin/dashboard"
          >
            <i className="bi bi-speedometer2 fs-5"></i>
            {isExpanded && <span className="ms-2">Dashboard</span>}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link text-white d-flex align-items-center"
            to="/admin/bookings"
          >
            <i className="bi bi-calendar-check fs-5"></i>
            {isExpanded && <span className="ms-2">Bookings</span>}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link text-white d-flex align-items-center"
            to="/admin/users"
          >
            <i className="bi bi-people fs-5"></i>
            {isExpanded && <span className="ms-2">Users</span>}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link text-white d-flex align-items-center"
            to="/admin/destination/list"
          >
            <i className="bi bi-geo-alt fs-5"></i>
            {isExpanded && <span className="ms-2">Destinations</span>}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link text-white d-flex align-items-center"
            to="/admin/tours"
          >
            <i className="bi bi-map fs-5"></i>
            {isExpanded && <span className="ms-2">Tours</span>}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link text-white d-flex align-items-center"
            to="/admin/feedbacks"
          >
            <i className="bi bi-chat-text fs-5"></i>
            {isExpanded && <span className="ms-2">Feedbacks</span>}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link text-white d-flex align-items-center"
            to="/admin/settings"
          >
            <i className="bi bi-gear fs-5"></i>
            {isExpanded && <span className="ms-2">Settings</span>}
          </NavLink>
        </li>
        <li className="nav-item">
          <button
            className="nav-link text-white d-flex align-items-center"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right fs-5"></i>
            {isExpanded && <span className="ms-2">Logout</span>}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SidebarMenu;
