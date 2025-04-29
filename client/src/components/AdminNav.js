import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light px-3 d-flex justify-content-between align-items-center">
      {/* Logo / Brand */}
      <a className="navbar-brand fw-bold" href="#">
        Hello Admin,
      </a>

      {/* Navbar Icons */}
      <div className="d-flex align-items-center">
        {/* Notification Icon */}
        <button className="btn position-relative me-3">
          <i className="bi bi-bell fs-5"></i>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </button>

        {/* Dark Mode Toggle */}
        <button className="btn me-3">
          <i className="bi bi-moon fs-5"></i>
        </button>

        {/* Profile Picture */}
        <img
          src="/images/admin.jpg"
          alt="Profile"
          className="rounded-circle"
          style={{ width: "40px", height: "40px", objectFit: "cover" }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
