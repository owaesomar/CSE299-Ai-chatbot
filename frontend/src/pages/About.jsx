import React from "react";
import "./About.css";
import Navbar from "../components/Navbar/Navbar";

const About = () => {
  return (
    <div className="about-container">
      <Navbar></Navbar>
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-overlay">
          <h1>About Our Company</h1>
          <p>Innovative. Passionate. Dedicated to excellence.</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to deliver exceptional products and services that
            empower people and transform industries. We are committed to
            innovation, quality, and building lasting relationships.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Vision</h2>
          <p>
            We envision a future where technology and creativity blend
            seamlessly to drive progress and solve real-world challenges. Our
            vision is to be at the forefront of this change.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Team</h2>
          <p>
            Our team of experts is driven by passion and innovation. Together,
            we create solutions that make a difference, delivering outstanding
            value to our customers and partners.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
