import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import possibleAvatar from "./Avatar.js";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import PostCard from "../PostCard";
import EditIcon from "@mui/icons-material/Edit";
import { Skeleton } from "@mui/material";
import { UserContext } from "../../context/UserContext";

function UserPage() {
  const [userAvatar, setUserAvatar] = useState("");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState(
    "Avatar updated successfully!"
  );
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/user", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setTimeout(() => {
          setUser(res.data.user);
          setUserAvatar(res.data.user.avatar || "");
          setLoading(false);
        }, 1200);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }, [token, setUser]);

  const handleAvatarChange = async (src) => {
    try {
      await axios.post(
        "http://localhost:8080/api/user/avatar",
        { avatar: src },
        { headers: { Authorization: token } }
      );
      setUserAvatar(src);
      setUser((prev) => ({ ...prev, avatar: src }));
      setShowAvatarPicker(false);
      setSnackbarMsg("Avatar updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMsg("Unable to change avatar. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account permanently? This action cannot be undone."
      )
    )
      return;
    setDeleting(true);
    try {
      const res = await axios.delete("http://localhost:8080/api/user/delete", {
        headers: { Authorization: token },
      });
      localStorage.removeItem("token");
      setUser(null);
      setUserAvatar("");
      setShowAvatarPicker(false);
      setTimeout(() => {
        navigate("/auth");
        window.location.reload();
      }, 1200);
    } catch (err) {
      setSnackbarMsg("Failed to delete account. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    setDeleting(false);
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  if (!token || (!user && !loading)) {
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
        <div className="col-lg-6 col-md-5 col-12 d-flex flex-column align-items-center gap-2">
          {loading ? (
            <>
              <Skeleton variant="circular" width={56} height={56} />
              <Skeleton
                variant="rectangular"
                width={120}
                height={32}
                sx={{ borderRadius: 2, mt: 2 }}
              />
              <Skeleton
                variant="text"
                width={100}
                sx={{ fontSize: "2rem", mt: 2 }}
              />
            </>
          ) : (
            <>
              {user.avatar && user.avatar.startsWith("/avatars/") ? (
                <Avatar
                  src={user.avatar}
                  sx={{ width: 56, height: 56 }}
                  alt={user.username}
                />
              ) : (
                <Avatar
                  sx={{ bgcolor: deepOrange[500], width: 56, height: 56 }}
                  alt={user.username}
                >
                  {user.username[0].toUpperCase()}
                </Avatar>
              )}
              <button
                className="btn btn-outline-primary btn-sm mt-2 d-flex align-items-center gap-1"
                onClick={() => setShowAvatarPicker((v) => !v)}
                style={{ width: "fit-content" }}
              >
                <EditIcon fontSize="small" />
                Change Avatar
              </button>
              <span className="fs-4 fw-bold mt-2">
                {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
              </span>
            </>
          )}
        </div>

        <div className="col-lg-6 mt-4 col-md-5 col-12 d-flex flex-column align-items-end">
          {loading ? (
            <>
              <Skeleton
                variant="text"
                width={180}
                sx={{ fontSize: "1.2rem", mb: 1 }}
              />
              <Skeleton
                variant="text"
                width={140}
                sx={{ fontSize: "1.2rem", mb: 2 }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={36}
                sx={{ borderRadius: 2 }}
              />
            </>
          ) : (
            <>
              <span className="fs-6 text-muted">Email: {user.email}</span>
              <span className="fs-6 text-muted">
                Joined on:{" "}
                {loading
                  ? ""
                  : new Date(user.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
              </span>
              <button
                className="btn btn-danger mt-3"
                onClick={() => {
                  localStorage.removeItem("token");
                  setUser(null);
                  setUserAvatar("");
                  setShowAvatarPicker(false);
                  navigate("/auth");
                  window.location.reload();
                }}
              >
                Logout
              </button>
              <button
                className="btn btn-outline-danger mt-2"
                style={{ fontWeight: 500 }}
                onClick={handleDeleteAccount}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete Account"}
              </button>
            </>
          )}
        </div>
      </div>

      {showAvatarPicker && !loading && (
        <div className="row mb-4">
          <div className="col-12 d-flex flex-wrap justify-content-center gap-3">
            {Object.values(possibleAvatar).map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`avatar${idx}`}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  border:
                    userAvatar === src ? "3px solid #1976d2" : "2px solid #ccc",
                  cursor: "pointer",
                  objectFit: "cover",
                  transition: "border 0.2s",
                }}
                onClick={() => handleAvatarChange(src)}
              />
            ))}
          </div>
        </div>
      )}

      <h1 className="text-center mt-4 mb-4 fw-bold">
        {loading ? (
          <Skeleton width={180} />
        ) : (
          `Your Posts : ${user.posts.length}`
        )}
      </h1>
      {loading ? (
        <div className="row">
          {[1, 2].map((i) => (
            <div className="col-12 mb-3" key={i}>
              <Skeleton
                variant="rectangular"
                height={120}
                sx={{ borderRadius: 3 }}
              />
            </div>
          ))}
        </div>
      ) : user.posts && user.posts.length > 0 ? (
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root, & .MuiAlert-root": {
            background: snackbarSeverity === "error" ? "#d32f2f" : "#43a047",
            color: "#fff",
            fontWeight: 400,
            fontSize: "1rem",
            fontFamily: "Arial, sans-serif",
            boxShadow: "0 4px 16px 0 rgba(67,160,71,0.12)",
            borderRadius: "0.7rem",
            letterSpacing: 0.5,
            textAlign: "center",
            padding: "0.7rem 1.5rem",
          },
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            background: snackbarSeverity === "error" ? "#d32f2f" : "#43a047",
            color: "#fff",
            fontWeight: 400,
            fontSize: "1rem",
            fontFamily: "Arial, sans-serif",
            borderRadius: "0.7rem",
            letterSpacing: 0.5,
            textAlign: "center",
            padding: "0.7rem 1.5rem",
          }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default UserPage;
