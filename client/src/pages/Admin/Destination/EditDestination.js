/*import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditDestination = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState({
    destinationName: "",
    district: "",
    province: "",
    category: "",
    keyHighlights: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/destinations/${id}`)
      .then((response) => {
        const data = response.data.destinations;
        setDestination({
          ...data,
          keyHighlights: data.keyHighlights.join(", "),
        });
      })
      .catch((error) => console.error("Error fetching destination:", error));
  }, [id]);

  const handleChange = (e) => {
    setDestination({ ...destination, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/destinations/${id}`, {
        ...destination,
        keyHighlights: destination.keyHighlights.split(","),
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating destination:", error);
    }
  };

  return (
    <div>
      <h2>Edit Destination</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="destinationName"
          value={destination.destinationName}
          className="form-control mb-2"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="district"
          value={destination.district}
          className="form-control mb-2"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="province"
          value={destination.province}
          className="form-control mb-2"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          value={destination.category}
          className="form-control mb-2"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="keyHighlights"
          value={destination.keyHighlights}
          className="form-control mb-2"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">
          Update Destination
        </button>
      </form>
    </div>
  );
};

export default EditDestination;*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditDestination() {
  const [input, setInputs] = useState({
    destinationName: "",
    district: "",
    province: "",
    category: "",
    description: "",
    keyHighlights: ["", "", "", "", ""], // Initialize keyHighlights array
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/destinations/${id}`
        );
        setInputs(res.data.destination); // Corrected API response handling
      } catch (error) {
        console.error("Error fetching destination:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios.put(`http://localhost:5000/api/destinations/${id}`, {
      destinationName: String(input.destinationName),
      district: String(input.district), // Fixed district mapping
      province: String(input.province),
      category: String(input.category),
      description: String(input.description),
      keyHighlights: input.keyHighlights, // Ensure it's sent correctly
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleKeyHighlightChange = (index, value) => {
    setInputs((prevState) => {
      const newHighlights = [...prevState.keyHighlights];
      newHighlights[index] = value;
      return { ...prevState, keyHighlights: newHighlights };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    await sendRequest();
    navigate("/admin/destination/list");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <form
        className="p-4 border rounded shadow bg-light"
        style={{ marginLeft: "40px", width: "900px" }}
        onSubmit={handleSubmit}
      >
        <h3>Edit Destination</h3>

        <div className="form-group">
          <label htmlFor="destination-name">Destination Name</label>
          <input
            type="text"
            className="form-control"
            name="destinationName"
            id="destination-name"
            value={input.destinationName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="district">District</label>
          <input
            type="text"
            className="form-control"
            name="district"
            id="district"
            value={input.district}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="province">Province</label>
          <input
            type="text"
            className="form-control"
            name="province"
            id="province"
            value={input.province}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="category">Category Select</label>
          <select
            className="form-control"
            name="category"
            id="category"
            value={input.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              -- Select Category --
            </option>
            <option value="Adventure Travel">Adventure Travel</option>
            <option value="Cultural Travel">Cultural Travel</option>
            <option value="Luxury Travel">Luxury Travel</option>
            <option value="Religious Travel">Religious Travel</option>
          </select>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={input.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <h6 className="mt-3">Key Highlights of Destination</h6>
        <div className="row">
          {input.keyHighlights.map((highlight, index) => (
            <div className="form-group col-md-6 mt-3" key={index}>
              <input
                type="text"
                className="form-control"
                value={highlight}
                onChange={(e) =>
                  handleKeyHighlightChange(index, e.target.value)
                }
                required
              />
            </div>
          ))}
        </div>

        <h6 className="mt-3">Main Image</h6>
        <div className="form-group">
          <input type="file" className="form-control-file" id="mainImage" />
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

        <button type="submit" className="btn btn-primary mt-3 w-100">
          Update Destination
        </button>
      </form>
    </div>
  );
}

export default EditDestination;
