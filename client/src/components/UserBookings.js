import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Spinner, Alert, Modal } from "react-bootstrap";
import axios from "axios";
import { format } from "date-fns";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bookings/user");
      setBookings(response.data.bookings || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings.");
      setLoading(false);
    }
  };

  const handleDeleteClick = (booking) => {
    setSelectedBooking(booking);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedBooking) return;

    setDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${selectedBooking._id}`);
      setBookings(bookings.filter((b) => b._id !== selectedBooking._id));
      setShowDeleteModal(false);
      setSelectedBooking(null);
    } catch (err) {
      console.error("Error deleting booking:", err);
      setError("Failed to delete booking.");
    } finally {
      setDeleting(false);
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

  return (
    <Container className="my-5">
      <h2 className="mb-4">My Bookings</h2>

      {bookings.length === 0 ? (
        <Alert variant="info">You have no bookings yet.</Alert>
      ) : (
        <Row>
          {bookings.map((booking) => (
            <Col key={booking._id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow">
                <Card.Body>
                  <Card.Title>{booking.tourName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Booking ID: {booking._id}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Date:</strong> {format(new Date(booking.date), "PPP")}
                    <br />
                    <strong>Number of People:</strong> {booking.numberOfPeople}
                    <br />
                    <strong>Total Price:</strong> ${booking.totalPrice}
                    <br />
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        booking.status === "confirmed"
                          ? "bg-success"
                          : booking.status === "pending"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </Card.Text>
                  {booking.specialRequests && (
                    <Card.Text>
                      <strong>Special Requests:</strong>
                      <br />
                      {booking.specialRequests}
                    </Card.Text>
                  )}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteClick(booking)}
                    disabled={booking.status === "confirmed"}
                  >
                    Cancel Booking
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this booking? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Cancelling...
              </>
            ) : (
              "Cancel Booking"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserBookings; 