import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BookingForm = () => {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    numberOfPeople: 1,
    specialRequests: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { tourId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tours/${tourId}`);
        setTour(response.data.tour);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tour:", err);
        setError("Failed to load tour details.");
        setLoading(false);
      }
    };

    fetchTour();
  }, [tourId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const bookingData = {
        ...formData,
        tourId,
        tourName: tour.title,
        totalPrice: tour.price * formData.numberOfPeople,
      };

      await axios.post("http://localhost:5000/api/bookings", bookingData);
      setSubmitSuccess(true);
      setTimeout(() => {
        navigate("/my-bookings");
      }, 2000);
    } catch (err) {
      console.error("Error creating booking:", err);
      setError("Failed to create booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (submitSuccess) {
    return (
      <Container className="my-5">
        <Alert variant="success">
          Booking successful! Redirecting to your bookings...
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">Book Tour: {tour?.title}</h2>
      <Form onSubmit={handleSubmit} className="shadow p-4 rounded">
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tour Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of People</Form.Label>
          <Form.Control
            type="number"
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Special Requests</Form.Label>
          <Form.Control
            as="textarea"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows={3}
          />
        </Form.Group>

        <div className="mb-3">
          <h5>Price Summary</h5>
          <p>Price per person: ${tour?.price}</p>
          <p>Total Price: ${tour?.price * formData.numberOfPeople}</p>
        </div>

        <Button
          variant="primary"
          type="submit"
          disabled={submitting}
          className="w-100"
        >
          {submitting ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Processing...
            </>
          ) : (
            "Confirm Booking"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default BookingForm; 