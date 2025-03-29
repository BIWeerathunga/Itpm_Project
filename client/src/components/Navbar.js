import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const MyNavbar = () => {
  const [navbarColor, setNavbarColor] = useState("rgba(255, 255, 255, 0)");

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarColor("rgba(0, 0, 0, 0.9)"); // Dark color on scroll
    } else {
      setNavbarColor("rgba(255, 255, 255, 0)"); // Transparent at top
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: navbarColor,
        transition: "0.4s ease-in-out",
        height: "130px", // Reduce navbar height
        paddingTop: "0",
        paddingBottom: "0",
        display: "flex",
        alignItems: "center",
      }}
      fixed="top"
    >
      <Container
        className="d-flex align-items-center justify-content-between mt-n2 ms-n2"
        style={{ marginTop: "-5px", marginLeft: "285px" }}
      >
        {/* Left-side navigation links */}
        <Nav className="d-flex gap-5">
          <Nav.Link href="#" className="text-white fs-5">
            Home
          </Nav.Link>
          <Nav.Link href="#" className="text-white fs-5">
            About
          </Nav.Link>
          <Nav.Link href="#" className="text-white fs-5">
            Destinations
          </Nav.Link>
        </Nav>

        {/* Centered Logo */}
        <Navbar.Brand href="#" className="mx-auto">
          <img src="/images/navlogo.png" alt="Logo" height="auto" width="170" />
        </Navbar.Brand>

        {/* Right-side navigation links */}
        <Nav className="d-flex gap-5">
        <Link to="/tours" className="text-white fs-5 nav-link">Tours</Link>

          <Nav.Link
            href="#"
            className="text-white fs-5 fw-semi-bold border border-white rounded px-3 py-1"
          >
            Sign In
          </Nav.Link>
          <Nav.Link
            href="#"
            className="text-white fs-5 fw-semi-bold border border-white rounded px-3 py-1"
          >
            Sign Up
          </Nav.Link>
        </Nav>

        {/* Navbar toggler for mobile view */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border-blue"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-lg-none text-center w-100">
            <Nav.Link href="#" className="text-blue">
              Home
            </Nav.Link>
            <Nav.Link href="#" className="text-blue">
              About
            </Nav.Link>
            <Nav.Link href="#" className="text-blue">
              Services
            </Nav.Link>
            <Nav.Link href="#" className="text-blue">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
