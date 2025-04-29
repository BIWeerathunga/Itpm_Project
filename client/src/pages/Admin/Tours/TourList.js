import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Alert, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TourList = () => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchTours = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tours");
      setTours(res.data.tours);
      setFilteredTours(res.data.tours);
    } catch (err) {
      console.error("Error fetching tours:", err);
      setError("Failed to load tours.");
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this tour?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/tours/${id}`);
      fetchTours();
    } catch (err) {
      console.error("Error deleting tour:", err);
      setError("Failed to delete tour.");
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = tours.filter((tour) =>
      tour.title.toLowerCase().includes(value) ||
      tour.location.toLowerCase().includes(value) ||
      tour.price.toString() === value
    );

    setFilteredTours(filtered);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Tour List</h3>
        <Button variant="success" onClick={() => navigate("/admin/tours/create")}>
          + Add New Tour
        </Button>
      </div>

      {/* Single Search Bar */}
      <Form className="mb-4" style={{width:"30%"}}>
        <Form.Control
          type="text"
          placeholder="Search by title, location or price"
          value={search}
          onChange={handleSearchChange}
        />
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      {filteredTours.length === 0 ? (
        <Alert variant="info">No tours found.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Location</th>
              <th>Price ($)</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTours.map((tour) => (
              <tr key={tour._id}>
                <td>
                  <img
                    src={`http://localhost:5000/uploads/${tour.mainImage}`}
                    alt={tour.title}
                    width="100"
                    height="60"
                    style={{ objectFit: "cover" }}
                    onError={(e) => (e.target.src = "/images/tou.png")}
                  />
                </td>
                <td>{tour.title}</td>
                <td>{tour.location}</td>
                <td>{tour.price}</td>
                <td>{tour.duration}</td>
                <td>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => navigate(`/admin/tours/edit/${tour._id}`)}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(tour._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TourList;
