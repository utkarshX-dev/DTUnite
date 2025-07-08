import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import axios from "axios";

const apiBase = import.meta.env.VITE_API_BASE;

function NewLFCreate() {
  const navigate = useNavigate();
  const { user, loading } = useContext(UserContext);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const [item, setItem] = useState({
    title: "",
    description: "",
    location: "",
    contact: "",
    image: undefined,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const formData = new FormData();
    formData.append("title", item.title);
    formData.append("description", item.description);
    formData.append("location", item.location);
    formData.append("contact", item.contact);
    formData.append("image", item.image);

    try {
      const res = await axios.post(`${apiBase}/api/lost-and-found`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: user.token,
        },
      });
      navigate("/lost-and-found");
      console.log(res.data.message);
    } catch (err) {
      console.error("Error creating item:", err);
    }
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow p-4" style={{ maxWidth: 500, width: "100%", borderRadius: 16 }}>
        <h2 className="mb-4 text-center" style={{ color: "#1976d2", fontWeight: 700 }}>Create Lost & Found Item</h2>
        <form
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate
          encType="multipart/form-data"
        >
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={item.title}
              onChange={handleChange}
              required
              placeholder="Enter item title"
              style={{ borderRadius: 8 }}
            />
            <div className="invalid-feedback">Title is required.</div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={item.description}
              onChange={handleChange}
              required
              placeholder="Describe the item"
              style={{ borderRadius: 8, minHeight: 80 }}
            ></textarea>
            <div className="invalid-feedback">Description is required.</div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Location</label>
            <input
              type="text"
              name="location"
              className="form-control"
              value={item.location}
              onChange={handleChange}
              required
              placeholder="Where was it lost/found?"
              style={{ borderRadius: 8 }}
            />
            <div className="invalid-feedback">Location is required.</div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Contact</label>
            <input
              type="text"
              name="contact"
              className="form-control"
              value={item.contact}
              onChange={handleChange}
              required
              placeholder="How can someone reach you?"
              style={{ borderRadius: 8 }}
            />
            <div className="invalid-feedback">Contact is required.</div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => {
                setItem((prev) => ({
                  ...prev,
                  image:
                    e.target.files && e.target.files.length > 0
                      ? e.target.files[0]
                      : undefined,
                }));
              }}
              required
              style={{ borderRadius: 8 }}
            />
            <div className="invalid-feedback">Image is required.</div>
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold" style={{ borderRadius: 8, fontSize: "1.1rem" }}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
export default NewLFCreate;