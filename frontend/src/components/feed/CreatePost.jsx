import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

function CreatePost() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !description) {
      setMessage("Please fill all the fields");
      setAlertType("error");
      setOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    try {
   await axios.post(`${process.env.REACT_APP_API_BASE}/api/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });

      setMessage("Post created successfully!");
      setAlertType("success");
      setImage(null);
      setDescription("");
      setOpen(true);
      setTimeout(() => {
        navigate("/explore");
      }, 3000);
    } catch (err) {
      setMessage(err?.response?.data?.message || "Something went wrong");
      setAlertType("error");
      setOpen(true);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="bg-white shadow-sm p-4 rounded-4 border">
        <h2 className="mb-4 text-center fw-bold text-primary">Create a New Post</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="form-label fw-semibold">Upload Image</label>
            <input
              type="file"
              className="form-control form-control-lg rounded-3 shadow-sm"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control rounded-3 shadow-sm"
              rows="4"
              placeholder="What's on your mind?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-bold rounded-pill shadow-sm"
            style={{ fontSize: "1.1rem" }}
          >
            Post
          </button>
        </form>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setOpen(false)}
      >
        <Alert severity={alertType} onClose={() => setOpen(false)} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CreatePost;
