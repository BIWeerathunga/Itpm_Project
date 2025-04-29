import React from "react";
import { Container } from "react-bootstrap";
import UserBookings from "../components/UserBookings";

const MyBookings = () => {
  return (
    <Container fluid className="px-0">
      <div className="bg-primary text-white py-5 mb-4">
        <Container>
          <h1>My Bookings</h1>
          <p className="lead">Manage your tour bookings</p>
        </Container>
      </div>
      <Container>
        <UserBookings />
      </Container>
    </Container>
  );
};

export default MyBookings; 