import React, { useState } from "react";  // Add useState import here
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import feedbackService from '../services/feedbackService';

const FeedbackForm = ({ 
  buttonStyle, 
  iconStyle, 
  onMouseOver, 
  onMouseOut 
}) => {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [refference, setReference] = useState('');
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await feedbackService.createFeedback({
        ...formData,
        rating,
        status: 'pending' 
      });
      setShow(false);
      alert('Thank you for your feedback!');
      // Reset form
      setRating(0);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback');
    }
  };

  return (
    <>
      <Button 
        onClick={() => setShow(true)}
        style={buttonStyle}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        className="btn btn-primary btn-lg"
      >
        <i className="bi bi-pencil-square me-2 fs-2" style={iconStyle}></i>
        <br />
        Give Feedback
      </Button>

      <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Share Your Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group controlId="formRating" className="mb-3">
              <Form.Label>Rating</Form.Label>
              <div>
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;
                  return (
                    <label key={i}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                        style={{ display: "none" }}
                      />
                      <FaStar
                        size={30}
                        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                        style={{ cursor: "pointer", marginRight: "5px" }}
                      />
                    </label>
                  );
                })}
              </div>
            </Form.Group>

            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Label>Your Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setShow(false)} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit Feedback
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FeedbackForm;