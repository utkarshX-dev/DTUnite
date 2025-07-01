import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import PostCard from "../PostCard";

function UserPage() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  if (!token || !user) {
    return (
      <div
        className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-gradient"
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
        }}
      >
        <div className="row w-100 justify-content-center align-items-center">
          <div className="col-lg-5 col-md-6 col-12 text-center mb-4 mb-md-0">
            <img
              src="./login.png"
              alt="Not logged in"
              className="img-fluid"
              style={{ maxHeight: 320 }}
            />
          </div>
          <div className="col-lg-5 col-md-6 col-12 text-center">
            <img
              src="./log.jpg"
              alt="Login"
              className="img-fluid mb-3"
              style={{ height: "12rem", maxWidth: "100%" }}
            />
            <p className="fs-4 fw-semibold mb-4">Login To Continue</p>
            <button
              className="btn btn-primary px-4 py-2 fw-semibold rounded-pill shadow-sm"
              style={{ background: "#ff4500", border: "none" }}
              onClick={() => navigate("/auth")}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <div className="row p-5">
        <div className="col-lg-6 col-md-5 col-12 d-flex align-items-center gap-3">
          <Avatar sx={{ bgcolor: deepOrange[500], width: 56, height: 56 }}>
            {user.username[0].toUpperCase()}
          </Avatar>
          <span className="fs-4 fw-bold">
            {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
          </span>
        </div>

        <div className="col-lg-6 mt-4 col-md-5 col-12 d-flex flex-column align-items-end">
          <span className="fs-6 text-muted">Email: {user.email}</span>
          <span className="fs-6 text-muted">
            Joined on:{" "}
            {new Date(user.createdAt).toLocaleDateString() || Date.now()}
          </span>
          <button
            className="btn btn-danger mt-3"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <h1 className="text-center mt-4 mb-4 fw-bold">Your Posts : {user.posts.length}</h1>
      {user.posts && user.posts.length > 0 ? (
        <div className="row">
          {user.posts.map((post) => (
            <div className="col-12" key={post._id}>
              <PostCard
                author={post.author}
                comments={post.comments}
                createdAt={post.createdAt}
                description={post.description}
                image={post.image}
                likedBy={post.likedBy}
                dislikedBy={post.dislikedBy}
                likes={post.likes}
                postId={post._id}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="row">
          <div className="col-12">
            <p className="text-muted text-center">No posts available</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default UserPage;
