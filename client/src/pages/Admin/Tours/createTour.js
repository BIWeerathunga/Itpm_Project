import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CreateTour = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    duration: "",
    keyHighlights: "",
  });
  const [mainImage, setMainImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    const highlightsArray = form.keyHighlights
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    data.append("title", form.title);
    data.append("description", form.description);
    data.append("location", form.location);
    data.append("price", form.price);
    data.append("duration", form.duration);
    data.append("keyHighlights", JSON.stringify(highlightsArray));
    if (mainImage) data.append("mainImage", mainImage);

    try {
      await axios.post("http://localhost:5000/api/tours", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin/tours/index");
    } catch (err) {
      console.error("Tour creation error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to create tour");
    }
  };

  return (
    <div className="container mt-4" style={{ width: "60%", margin: "0 auto" }}>
      <h3 className="mb-4" style={{textAlign:"center"}}>Create New Tour</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={{
          padding: "30px",
          border: "2px solid black",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={form.title} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            as="textarea"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control name="location" value={form.location} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            type="number"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Duration</Form.Label>
          <Form.Control name="duration" value={form.duration} onChange={handleChange} required />
        </Form.Group>

        

        <Form.Group className="mb-4">
          <Form.Label>Main Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFile} />
        </Form.Group>

        <Button type="submit" variant="primary">
          Create Tour
        </Button>
      </Form>
    </div>
  );
};

export default CreateTour;
