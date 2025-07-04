const apiBase = import.meta.env.VITE_API_BASE;
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import possibleAvatar from "./Avatar.js";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import {
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { UserContext } from "../contexts/userContext.jsx";
import AboutUser from "./AboutUser.jsx";
import { useTheme } from "@mui/material/styles";

function UserPage() {
  const [userAvatar, setUserAvatar] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("Avatar updated successfully!");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setLoading(true);
    axios.get(`${apiBase}/api/user`, {
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
        `${apiBase}/api/user/avatar`,
        { avatar: src },
        { headers: { Authorization: token } }
      );
      setUserAvatar(src);
      setUser((prev) => ({ ...prev, avatar: src }));
      setOpenAvatarDialog(false);
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
    setDeleting(true);
    try {
      await axios.delete(`${apiBase}/api/user/delete`, {
        headers: { Authorization: token },
      });
      localStorage.removeItem("token");
      setUser(null);
      setUserAvatar("");
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
    setOpenDeleteDialog(false);
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
      {isMobile ? (
        <Grid container spacing={2} direction="column" alignItems="center" sx={{ pt: 3 }}>
          
          <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                  onClick={() => setOpenAvatarDialog(true)}
                  style={{ width: "fit-content" }}
                >
                  <EditIcon fontSize="small" />
                  Change Avatar
                </button>
                <span className="fs-4 fw-bold mt-2" style={{ wordBreak: "break-word", textAlign: "center" }}>
                  {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                </span>
              </>
            )}
          </Grid>
          
          <Grid item xs={12} sx={{ width: "100%", display: "flex", justifyContent: "center", gap: 2 }}>
            <button
              className="btn btn-danger"
              style={{ minWidth: 110 }}
              onClick={() => {
                localStorage.removeItem("token");
                setUser(null);
                setUserAvatar("");
                navigate("/auth");
                window.location.reload();
              }}
            >
              Logout
            </button>
            <button
              className="btn btn-outline-danger"
              style={{ fontWeight: 500, minWidth: 110 }}
              onClick={() => setOpenDeleteDialog(true)}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete Account"}
            </button>
          </Grid>
         
          <Grid item xs={12} sx={{ width: "100%", mt: 4, textAlign: "center" }}>
            {loading ? (
              <>
                <Skeleton variant="text" width={180} sx={{ fontSize: "1.2rem", mb: 1 }} />
                <Skeleton variant="text" width={140} sx={{ fontSize: "1.2rem", mb: 2 }} />
              </>
            ) : (
              <>
                <span className="fs-6 text-muted" style={{ wordBreak: "break-all", display: "block" }}>
                  Email: {user.email}
                </span>
                <span className="fs-6 text-muted" style={{ display: "block" }}>
                  Joined on:{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </>
            )}
          </Grid>
        </Grid>
      ) : (
       
        <div className="row p-3 p-md-5">
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
                  onClick={() => setOpenAvatarDialog(true)}
                  style={{ width: "fit-content" }}
                >
                  <EditIcon fontSize="small" />
                  Change Avatar
                </button>
                <span className="fs-4 fw-bold mt-2" style={{ wordBreak: "break-word", textAlign: "center" }}>
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
                <span className="fs-6 text-muted" style={{ wordBreak: "break-all" }}>Email: {user.email}</span>
                <span className="fs-6 text-muted">
                  Joined on:{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-IN", {
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
                    navigate("/auth");
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
                <button
                  className="btn btn-outline-danger mt-4"
                  style={{ fontWeight: 500 }}
                  onClick={() => setOpenDeleteDialog(true)}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete Account"}
                </button>
              </>
            )}
          </div>
        </div>
      )}

     
      <Dialog
        open={openAvatarDialog}
        onClose={() => setOpenAvatarDialog(false)}
        PaperProps={{ sx: { borderRadius: 3, minWidth: isMobile ? "90vw" : 400 } }}
      >
        <DialogTitle textAlign="center">Select an Avatar</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} justifyContent="center">
            {Object.values(possibleAvatar).map((src, idx) => (
              <Grid item xs={3} sm={2} md={2} key={idx}>
                <img
                  src={src}
                  alt={`avatar${idx}`}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border:
                      userAvatar === src
                        ? "3px solid #1976d2"
                        : "2px solid #ccc",
                    cursor: "pointer",
                    objectFit: "cover",
                    transition: "border 0.2s",
                  }}
                  onClick={() => handleAvatarChange(src)}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAvatarDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <span>
            Are you sure you want to delete your account permanently? This action cannot be undone.
          </span>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            color="primary"
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAccount}
            color="error"
            variant="contained"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <AboutUser loading={loading} />

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