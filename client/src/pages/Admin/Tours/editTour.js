import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditTour = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    duration: "",
    keyHighlights: "",
    mainImage: "",
  });
  const [mainImageFile, setMainImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tours/${id}`);
        const tour = res.data.tour;

        setForm({
          ...tour,
          keyHighlights: tour.keyHighlights?.join(", "),
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tour:", err);
        setError("Failed to load tour details.");
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setMainImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const highlightsArray = form.keyHighlights
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("location", form.location);
    data.append("price", form.price);
    data.append("duration", form.duration);
    data.append("keyHighlights", JSON.stringify(highlightsArray));

    if (mainImageFile) {
      data.append("mainImage", mainImageFile);
    } else {
      data.append("mainImage", form.mainImage);
    }

    try {
      await axios.put(`http://localhost:5000/api/tours/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin/tours/index");
    } catch (err) {
      console.error("Error updating tour:", err.response?.data || err.message);
      setError("Failed to update tour.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container mt-4" style={{ width: "60%", margin: "0 auto" }}>
      <h3 className="mb-4" style={{textAlign:"center"}}>Edit Tour</h3>
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
            as="textarea"
            required
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
            type="number"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Duration</Form.Label>
          <Form.Control name="duration" value={form.duration} onChange={handleChange} required />
        </Form.Group>

    

        <Form.Group className="mb-3">
          <Form.Label>Current Image Preview</Form.Label>
          <div>
            <img
              src={`http://localhost:5000/uploads/${form.mainImage}`}
              alt="Current tour"
              style={{ maxWidth: "200px", height: "auto" }}
              onError={(e) => (e.target.src = "/images/tou.png")}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Replace Image (optional)</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
        </Form.Group>

        <Button type="submit" variant="primary">
          Update Tour
        </Button>
      </Form>
    </div>
  );
};

export default EditTour;
