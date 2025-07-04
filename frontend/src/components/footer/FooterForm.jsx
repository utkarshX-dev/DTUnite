import React, { useState } from "react";
import axios from "axios";
export default function FooterForm() {
  const [feedbackDetails, setFeedbackDetails] = useState({
    name: "",
    email: "",
    feedback: "",
  });
  const handleFeedbackChange = (e) => {
    setFeedbackDetails({
      ...feedbackDetails,
      [e.target.name]: e.target.value,
    });
  };
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, feedback } = feedbackDetails;
      const response = await axios.post("http://localhost:8080/api/feedback", {
        name,
        email,
        feedback,
      });
      setFeedbackDetails({
        name: "",
        email: "",
        feedback: "",
      });
      setMsg(() => {
        return response.data.message;
      });
      setTimeout(() => {
        setMsg("");
      }, 2000);
    } catch (error) {
       setErr("Failed to submit feedback. Please try again later.");
      setFeedbackDetails({
        name: "",
        email: "",
        feedback: "",
      });
       setTimeout(() => {
        setErr("");
      }, 2000);
    }
  };

  return (
    <div
      className="p-4 rounded shadow-sm bg-white"
      style={{ maxWidth: 500, margin: "0 auto", color: "black" }}
    >
      <h4 className="mb-3 fw-bold text-center">Get in Touch</h4>
      <p className="mb-4 text-muted text-center">
        We’d love to hear from you. Please fill out this form.
      </p>
      {msg && <div className="alert alert-success text-center">{msg}</div>}
      {err && <div className="alert alert-danger text-center">{err}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={feedbackDetails.name}
            onChange={handleFeedbackChange}
            required
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={feedbackDetails.email}
            onChange={handleFeedbackChange}
            required
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="feedback" className="form-label">
            Feedback
          </label>
          <textarea
            className="form-control"
            id="feedback"
            name="feedback"
            rows={3}
            value={feedbackDetails.feedback}
            onChange={handleFeedbackChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Send Message
        </button>
      </form>
    </div>
  );
}
