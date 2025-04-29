import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tours")
      .then((res) => {
        setTours(res.data.tours || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tours", err);
        setError("Failed to load tours.");
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Explore Our Tours</h2>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && tours.length === 0 && (
        <Alert variant="info">No tours available at the moment.</Alert>
      )}

      <Row>
        {tours.map((tour) => (
          <Col key={tour._id} sm={12} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow">
              <Card.Img
                variant="top"
                src={`http://localhost:5000/uploads/${tour.mainImage}`}
                alt={tour.title}
                style={{ height: "200px", objectFit: "cover" }}
                onError={(e) => (e.target.src = "/images/tou.png")}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{tour.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{tour.location}</Card.Subtitle>
                <Card.Text className="flex-grow-1">
                  {tour.description?.substring(0, 100)}...
                </Card.Text>
                <p className="fw-bold mb-2">Price: ${tour.price}</p>
                <p className="text-muted mb-3">Duration: {tour.duration}</p>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/tours/${tour._id}/book`)}
                >
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserTours;
