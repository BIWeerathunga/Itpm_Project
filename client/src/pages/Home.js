import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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

      {/* About Us Section */}
      <div style={styles.section}>
        <h2>About Us</h2>
        <p>
          TravelMate is your go-to travel companion, offering the best
          experiences around the world.
        </p>
      </div>

      {/* Popular Destinations Section */}
      <div style={styles.section}>
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

      {/* Services Section */}
      <div style={styles.section}>
        <h2>Our Services</h2>
        <p>
          We offer flight bookings, hotel reservations, guided tours, and more.
        </p>
      </div>

      {/* Testimonials Section */}
      <div style={styles.section}>
        <h2>What Our Clients Say</h2>
        <div style={styles.card}>
          <p>"TravelMate made my trip unforgettable!" - Alex</p>
        </div>
        <div style={styles.card}>
          <p>"Great service and amazing destinations." - Sarah</p>
        </div>
      </div>

      {/* Contact Us Section */}
      <div style={styles.section}>
        <h2>Contact Us</h2>
        <p>Email: support@travelmate.com | Phone: +1 234 567 890</p>
      </div>
    </>
  );
};

export default Home;
