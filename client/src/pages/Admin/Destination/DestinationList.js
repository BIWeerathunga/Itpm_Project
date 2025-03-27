import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DestinationList = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/destinations")
      .then((response) => setDestinations(response.data.destinations))
      .catch((error) => console.error("Error fetching destinations:", error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/destinations/${id}`);
      setDestinations(destinations.filter((dest) => dest._id !== id));
    } catch (error) {
      console.error("Error deleting destination:", error);
    }
  };

  return (
    <div className="container mt-4">
      {/* Search Bar and Add Icon */}
      <div
        className="d-flex justify-content-between align-items-center mb-3 "
        style={{ marginLeft: "110px" }}
      >
        {/* Search Bar */}
        <div className="col-md-5">
          <div className="input-group">
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search"
            />
            <button type="button" className="btn btn-primary">
              <i className="bi bi-search"></i> {/* Bootstrap icon */}
            </button>
          </div>
        </div>

        {/* Add Icon */}
        <Link
          to="/add"
          className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: "40px", height: "40px", marginRight: "130px" }}
        >
          <i className="bi bi-plus-lg fs-4"></i> {/* Bootstrap Plus Icon */}
        </Link>
      </div>

      {/* Destination Table */}
      <table
        className="table table-responsive-md table-hover table-bordered"
        style={{ width: "80%", marginLeft: "110px" }}
      >
        <thead>
          <tr>
            <th className="px-3 py-3">Name</th>
            <th className="px-3 py-3">Category</th>
            <th className="px-3 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {destinations.map((dest) => (
            <tr key={dest._id}>
              <td>{dest.destinationName}</td>
              <td>{dest.category}</td>
              <td>
                <Link
                  to={`/admin/destination/edit/${dest._id}`}
                  className="btn btn-warning me-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(dest._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DestinationList;
