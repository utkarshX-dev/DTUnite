import { useState } from "react";
import axios from "axios";
function FeedbackPage() {
    const [feedbackDetails, setFeedbackDetails] = useState({
        name: "",
        email: "",
        feedback: ""
    });
    const handleFeedbackChange = (e) => {
        setFeedbackDetails({
            ...feedbackDetails,
            [e.target.name]: e.target.value
        });
    }
   const [msg, setMsg] = useState("");
   const [err, setErr] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
         e.preventDefault();
    try {
      const { name, email, feedback } = feedbackDetails;
      const response = await axios.post(`${process.env.REACT_APP_API_BASE}/api/feedback`, {
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
        <div className="container my-5 ">
            <h1 className="text-center text-primary fw-bold mb-4">Feedback</h1>
            {msg && <div className="alert alert-success text-center">{msg}</div>}
            {err && <div className="alert alert-danger text-center">{err}</div>}
            <p className="text-center text-muted mb-4" style={{ fontSize: "1.15rem" }}>
                We value your feedback! Please share your thoughts and suggestions to help us improve.
            </p>
             
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-semibold">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Your Name" name="name" value={feedbackDetails.name} onChange={handleFeedbackChange} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-semibold">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="you@example.com" required name="email" value={feedbackDetails.email} onChange={handleFeedbackChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="feedback" className="form-label fw-semibold">Feedback</label>
                            <textarea className="form-control" name="feedback" id="feedback" rows="5" placeholder="Your feedback" value={feedbackDetails.feedback} onChange={handleFeedbackChange} required></textarea>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary fw-bold">
                                Submit Feedback
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FeedbackPage;