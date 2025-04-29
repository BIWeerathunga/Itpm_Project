import React from "react";
import { Container } from "react-bootstrap";
import BookingForm from "../components/BookingForm";

const BookTour = () => {
  return (
    <Container fluid className="px-0">
      <div className="bg-primary text-white py-5 mb-4">
        <Container>
          <h1>Book Your Tour</h1>
          <p className="lead">Fill in your details to secure your spot</p>
        </Container>
      </div>
      <Container>
        <BookingForm />
      </Container>
    </Container>
  );
};

export default BookTour; 