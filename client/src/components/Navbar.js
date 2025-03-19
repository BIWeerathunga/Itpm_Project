import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const MyNavbar = () => {
  // Renamed component to avoid conflict
  const [navbarColor, setNavbarColor] = useState("transparent");

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarColor("#343a40"); // Dark color on scroll
    } else {
      setNavbarColor("rgba(255, 255, 255, 0.3)"); // Transparent at top
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
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        transition: "0.4s",
      }}
      fixed="top"
    >
      <Container className="d-flex align-items-center justify-content-between">
        {/* Left-side navigation links */}
        <Nav className="d-flex gap-3">
          <Nav.Link href="#" className="text-blue">
            Home
          </Nav.Link>
          <Nav.Link href="#" className="text-blue">
            About
          </Nav.Link>
        </Nav>

        {/* Centered Logo */}
        <Navbar.Brand href="#" className="mx-auto">
          <img src="/images/navlogo.png" alt="Logo" height="150" />
        </Navbar.Brand>

        {/* Right-side navigation links */}
        <Nav className="d-flex gap-3">
          <Nav.Link href="#" className="text-blue">
            Services
          </Nav.Link>
          <Nav.Link href="#" className="text-blue">
            Contact
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
