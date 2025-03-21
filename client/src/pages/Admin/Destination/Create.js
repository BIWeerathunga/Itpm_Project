import React from "react";

function Create() {
  return (
    <div
      className="d-flex align-items-center justify-content-center vh-300 "
      style={{ height: "350px", marginTop: "250px" }}
    >
      <form
        className="p-4 border rounded shadow bg-light"
        style={{ marginLeft: "-1220px", width: "900px" }}
      >
        <h3>Add Destinations</h3>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="destination-name">Destination Name</label>
            <input type="text" className="form-control" id="destination-name" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="district">District</label>
            <input type="text" className="form-control" id="district" />
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-6 mt-3">
            <label htmlFor="province">Province</label>
            <input type="text" className="form-control" id="province" />
          </div>
          <div className="form-group col-md-6 mt-3">
            <label htmlFor="category">Category Select</label>
            <select className="form-control" id="category">
              <option value="" disabled selected>
                -- Select Category --
              </option>
              <option value="1">Adventure Travel</option>
              <option value="2">Cultural Travel</option>
              <option value="3">Luxury Travel</option>
              <option value="4">Religious Travel</option>
            </select>
          </div>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
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

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Create;
