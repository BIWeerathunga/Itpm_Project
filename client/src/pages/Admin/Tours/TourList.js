import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TourList = () => {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/tours")
      .then((res) => setTours(res.data.tours))
      .catch((err) => console.error("Error fetching tours", err));
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Available Tours</h2>
      <Row>
        {tours.map((tour) => (
          <Col md={4} key={tour._id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={`/uploads/${tour.mainImage}`} />
              <Card.Body>
                <Card.Title>{tour.title}</Card.Title>
                <Card.Text>{tour.description}</Card.Text>
                <Button variant="primary" onClick={() => navigate(`/tours/${tour._id}/book`)}>Book Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TourList;

