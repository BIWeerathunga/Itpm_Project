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
    keyHighlights: [""], // Array for multiple highlights
    mainImage: null,
    subImages: [], // Array for multiple sub-images
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files, id } = e.target;

    if (type === "file") {
      if (id === "mainImage") {
        setDestination({ ...destination, mainImage: files[0] });
      } else if (id === "subImages") {
        setDestination({
          ...destination,
          subImages: Array.from(files),
        });
      }
    } else {
      setDestination({ ...destination, [name]: value });
    }
  };

  const handleKeyHighlightChange = (index, value) => {
    const newHighlights = [...destination.keyHighlights];
    newHighlights[index] = value;
    setDestination({ ...destination, keyHighlights: newHighlights });
  };

  const addKeyHighlightField = () => {
    setDestination({
      ...destination,
      keyHighlights: [...destination.keyHighlights, ""],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append non-file fields
    Object.keys(destination).forEach((key) => {
      if (
        key !== "mainImage" &&
        key !== "subImages" &&
        key !== "keyHighlights"
      ) {
        formData.append(key, destination[key]);
      }
    });

    // Append keyHighlights as a JSON string
    formData.append("keyHighlights", JSON.stringify(destination.keyHighlights));

    // Append main image and sub-images
    if (destination.mainImage) {
      formData.append("mainImage", destination.mainImage);
    }

    destination.subImages.forEach((image) => {
      formData.append("subImages", image);
    });

    try {
      await axios.post("http://localhost:5000/api/destinations", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/"); // Navigate to the desired page after submission
    } catch (error) {
      console.error("Error adding destination:", error);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ marginTop: "250px" }}
    >
      <form
        className="p-4 border rounded shadow bg-light"
        style={{ width: "900px" }}
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
              value={destination.destinationName}
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
              value={destination.district}
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
              value={destination.province}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6 mt-3">
            <label htmlFor="category">Category</label>
            <select
              className="form-control"
              name="category"
              value={destination.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
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
            name="description"
            rows="3"
            value={destination.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <h6 className="mt-3">Key Highlights</h6>
        {destination.keyHighlights.map((highlight, index) => (
          <div key={index} className="form-group mt-2">
            <input
              type="text"
              className="form-control"
              value={highlight}
              onChange={(e) => handleKeyHighlightChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary mt-2"
          onClick={addKeyHighlightField}
        >
          Add More Highlights
        </button>

        <h6 className="mt-3">Main Image</h6>
        <div className="form-group">
          <input
            type="file"
            className="form-control"
            id="mainImage"
            onChange={handleChange}
            accept="image/*"
          />
        </div>

        <h6 className="mt-3">Sub Images</h6>
        <div className="form-group">
          <input
            type="file"
            className="form-control"
            id="subImages"
            onChange={handleChange}
            accept="image/*"
            multiple
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddDestination;
