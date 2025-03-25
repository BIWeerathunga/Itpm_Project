import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDestination = () => {
  const [destination, setDestination] = useState({
    destinationName: "",
    district: "",
    province: "",
    category: "",
    description: "",
    keyHighlights: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setDestination({ ...destination, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/destinations", {
        ...destination,
        keyHighlights: destination.keyHighlights.split(","),
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding destination:", error);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-200 "
      style={{ height: "350px", marginTop: "250px" }}
    >
      <form
        className="p-4 border rounded shadow bg-light"
        style={{ marginLeft: "40px", width: "900px" }}
        onSubmit={handleSubmit}
      >
        <h3>Add Destinations</h3>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="destination-name">Destination Name</label>
            <input
              type="text"
              className="form-control"
              name="destinationName"
              id="destination-name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="district">District</label>
            <input
              type="text"
              className="form-control"
              name="district"
              id="district"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-6 mt-3">
            <label htmlFor="province">Province</label>
            <input
              type="text"
              className="form-control"
              name="province"
              id="province"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6 mt-3">
            <label htmlFor="category">Category Select</label>
            <select
              className="form-control"
              name="category"
              id="category"
              onChange={handleChange}
              required
            >
              <option value="" disabled selected>
                -- Select Category --
              </option>
              <option>Adventure Travel</option>
              <option>Cultural Travel</option>
              <option>Luxury Travel</option>
              <option>Religious Travel</option>
            </select>
          </div>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <h6 className="mt-3">Key Highlights of Destination</h6>
        <div className="row">
          {[...Array(5)].map((_, index) => (
            <div className="form-group col-md-6 mt-3" key={index}>
              <input
                type="text"
                className="form-control"
                id={`highlight${index + 1}`}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </div>

        <h6 className="mt-3">Main Image</h6>
        <div className="form-group">
          <input type="file" className="image/*" id="mainImage" />
        </div>

        <h6 className="mt-3">Sub Images</h6>
        <div className="row">
          {[...Array(3)].map((_, index) => (
            <div className="form-group col-md-4" key={index}>
              <input
                type="file"
                className="form-control-file"
                id={`images${index + 1}`}
              />
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddDestination;
