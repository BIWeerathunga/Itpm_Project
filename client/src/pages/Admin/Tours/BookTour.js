import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

const BookTour = () => {
  const { tourId } = useParams();
  const [formData, setFormData] = useState({
    userName: "",
    guests: "",
    status: "confirmed",
    specialrequests: "",
    keyHighlights: [],
  });
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("userName", formData.userName);
    data.append("tour", tourId);
    data.append("guests", formData.guests);
    data.append("status", formData.status);
    data.append("specialrequests", formData.specialrequests);
    data.append("keyHighlights", JSON.stringify([])); // optional

    axios.post("/api/bookings", data)
      .then(() => {
        setSuccess("Booking successful!");
        setFormData({
          userName: "",
          guests: "",
          status: "confirmed",
          specialrequests: "",
          keyHighlights: [],
        });
      })
      .catch((err) => console.error("Booking failed", err));
  };

  return (
    <Container className="mt-5">
      <h3>Book This Tour</h3>
      <Form onSubmit={handleBooking}>
        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control type="text" name="userName" value={formData.userName} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>No. of Guests</Form.Label>
          <Form.Control type="number" name="guests" value={formData.guests} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Special Requests</Form.Label>
          <Form.Control as="textarea" name="specialrequests" value={formData.specialrequests} onChange={handleChange} />
        </Form.Group>
        <Button type="submit" variant="success">Confirm Booking</Button>
        {success && <p className="text-success mt-3">{success}</p>}
      </Form>
    </Container>
  );
};

export default BookTour;
