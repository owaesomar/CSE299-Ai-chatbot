import React, { useState } from "react";
import "./Contact.css";
import Navbar from "../components/Navbar/Navbar";
import phoneicon from "../components/assets/phone-call.svg";
import mailicon from "../components/assets/mail.svg";
import locicon from "../components/assets/map-pin.svg";
import twittericon from "../components/assets/twitter.svg";
import instaicon from "../components/assets/instagram.svg";
import xicon from "../components/assets/x.svg";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you could send formData to your backend via an API call.
    console.log("Form Data:", formData);

    // Display a success message and clear the form.
    setSuccessMessage(
      "Thank you for contacting us! We will get back to you soon."
    );
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-container">
      <Navbar></Navbar>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="contactContainer">
        <div className="contact1">
          <div className="contactBox1">
            <h1>Contact Information</h1>
            <h3>We are one call away</h3>
          </div>
          <div className="social">
            <div className="social1">
              <img src={phoneicon} alt="" />
              <h3>+880 2132 133</h3>
            </div>
            <div className="social1">
              <img src={mailicon} alt="" />
              <h3>AuraAi@gmail.com</h3>
            </div>
            <div className="social1">
              <img src={locicon} alt="" />
              <h3>Dhaka,Bangladesh</h3>
            </div>
          </div>
          <div className="socialFooter">
            <img src={twittericon} alt="" />
            <img src={xicon} alt="" />
            <img src={instaicon} alt="" />
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            class="underline-input"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            class="underline-input"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            required
          />

          <label htmlFor="subject">Subject</label>
          <input
            class="underline-input"
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            class="underline-input"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
