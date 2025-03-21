import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "../components/Navbar";

const Home = () => {
  // Internal CSS styles
  const styles = {
    videoContainer: {
      position: "relative",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
    },
    video: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    overlay: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      color: "white",
      textAlign: "center",
      padding: "20px",
    },
    heading: {
      fontSize: "3rem",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    subText: {
      fontSize: "1.5rem",
      marginBottom: "20px",
    },
    button: {
      backgroundColor: "#ff6600",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      fontSize: "1.2rem",
      cursor: "pointer",
      transition: "0.3s",
    },
    section: {
      padding: "80px 20px",
      textAlign: "center",
    },
    card: {
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      margin: "10px",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    },
  };

  return (
    <>
      <div>
        <MyNavbar />
        {/* Hero Section */}
        <div style={{ position: "relative" }}>
          {/* Hero Section */}
          <div style={styles.videoContainer}>
            <video style={styles.video} autoPlay loop muted>
              <source src="videos/home.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div style={styles.overlay}>
              <h1 style={styles.heading}>Welcome to TravelMate</h1>
              <p style={styles.subText}>Discover new adventures with us</p>
              <button style={styles.button}>Explore Now</button>
            </div>
          </div>

          {/* Button Group - Placed Outside the Hero Section */}
          <div
            className="btn-group position-absolute start-50 translate-middle-x"
            role="group"
            style={{
              width: "1200px",
              height: "120px",
              top: "calc(100vh - 50px)", // Moves halfway between sections
              transform: "translateY(-50%)", // Centers the button group across sections
              zIndex: 10, // Ensures it stays visible
            }}
          >
            <button
              className="btn btn-primary btn-lg"
              style={{
                backgroundColor: "white",
                color: "#18C5EF",
                fontWeight: "bold",
                borderColor: "white",
                padding: "10px 20px",
                fontSize: "18px",

                border: "2px solid white",
                transition: "color 0.2s ease-in-out",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.target.style.color = "#00308F"; // Change button text color
                const icon = e.target.querySelector("i");
                if (icon) icon.style.color = "#00308F"; // Change icon color only if it exists
              }}
              onMouseOut={(e) => {
                e.target.style.color = "#18C5EF"; // Reset text color
                const icon = e.target.querySelector("i");
                if (icon) icon.style.color = "#18C5EF"; // Reset icon color only if it exists
              }}
            >
              <i
                className="bi bi-graph-up me-2 fs-2"
                style={{ color: "#18C5EF" }}
              ></i>
              <br />
              Manage Expenses
            </button>

            <div
              style={{
                width: "2px",
                height: "120px",
                backgroundColor: "#18C5EF",

                alignSelf: "center", // Adjust this value to move it further down
              }}
            ></div>

            <button
              className="btn btn-primary btn-lg"
              style={{
                backgroundColor: "white",
                color: "#18C5EF",
                fontWeight: "bold",
                borderColor: "white",
                padding: "10px 20px",
                fontSize: "18px",

                border: "2px solid white",
                transition: "color 0.2s ease-in-out",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.target.style.color = "#00308F"; // Change button text color
                const icon = e.target.querySelector("i");
                if (icon) icon.style.color = "#00308F"; // Change icon color only if it exists
              }}
              onMouseOut={(e) => {
                e.target.style.color = "#18C5EF"; // Reset text color
                const icon = e.target.querySelector("i");
                if (icon) icon.style.color = "#18C5EF"; // Reset icon color only if it exists
              }}
            >
              <i
                className="bi bi-chat-dots me-2 fs-2"
                style={{ color: "#18C5EF" }}
              ></i>{" "}
              <br />
              Ask AI
            </button>
            <div
              style={{
                width: "2px",
                height: "120px",
                backgroundColor: "#18C5EF",

                alignSelf: "center", // Adjust this value to move it further down
              }}
            ></div>
            <button
              className="btn btn-primary btn-lg"
              style={{
                backgroundColor: "white",
                color: "#18C5EF",
                fontWeight: "bold",
                borderColor: "white",
                padding: "10px 20px",
                fontSize: "18px",

                border: "2px solid white",
                transition: "color 0.2s ease-in-out",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.target.style.color = "#00308F"; // Change button text color
                const icon = e.target.querySelector("i");
                if (icon) icon.style.color = "#00308F"; // Change icon color only if it exists
              }}
              onMouseOut={(e) => {
                e.target.style.color = "#18C5EF"; // Reset text color
                const icon = e.target.querySelector("i");
                if (icon) icon.style.color = "#18C5EF"; // Reset icon color only if it exists
              }}
            >
              <i
                className="bi bi-translate me-2 fs-2"
                style={{ color: "#18C5EF" }}
              ></i>{" "}
              <br />
              Translate Now
            </button>
            <div
              style={{
                width: "2px",
                height: "120px",
                backgroundColor: "#18C5EF",

                alignSelf: "center", // Adjust this value to move it further down
              }}
            ></div>
            <button
              className="btn btn-primary btn-lg"
              style={{
                backgroundColor: "white",
                color: "#18C5EF",
                fontWeight: "bold",
                borderColor: "white",
                padding: "10px 20px",
                fontSize: "18px",

                border: "2px solid white",
                transition: "color 0.2s ease-in-out",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.target.style.color = "#00308F"; // Change button text color
                const icon = e.target.querySelector("i");
                if (icon) icon.style.color = "#00308F"; // Change icon color only if it exists
              }}
              onMouseOut={(e) => {
                e.target.style.color = "#18C5EF"; // Reset text color
                const icon = e.target.querySelector("i");
                if (icon) icon.style.color = "#18C5EF"; // Reset icon color only if it exists
              }}
            >
              <i
                className="bi bi-pencil-square me-2 fs-2"
                style={{ color: "#18C5EF" }}
              ></i>{" "}
              <br />
              Give Feedback
            </button>
          </div>

          {/* Popular Destinations Section */}
          <div
            style={{
              ...styles.section,
              backgroundColor: "#e9f6f9",
              height: "100vh",
              marginTop: "-100px",
            }}
          >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h2>Popular Destinations</h2>
            <div className="d-flex justify-content-center flex-wrap">
              <div style={styles.card}>
                <h4>Paris</h4>
                <p>The city of love and lights.</p>
              </div>
              <div style={styles.card}>
                <h4>Maldives</h4>
                <p>Crystal clear beaches and luxury resorts.</p>
              </div>
              <div style={styles.card}>
                <h4>New York</h4>
                <p>The city that never sleeps.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div
          style={{
            ...styles.section,
            backgroundColor: "white",
            height: "100vh",
            marginTop: "-100px",
          }}
        >
          <br />
          <br />
          <br />
          <br />
          <br />

          <h2>Our Tours</h2>
          <p>
            We offer flight bookings, hotel reservations, guided tours, and
            more.
          </p>
        </div>

        {/* Testimonials Section */}
        <div
          style={{
            ...styles.section,
            backgroundColor: "#e9f6f9",
            height: "100vh",
            marginTop: "-100px",
          }}
        >
          <h2>What Our Clients Say</h2>
        </div>
      </div>
    </>
  );
};

export default Home;
