import { useState } from "react";
import "../../styles/auth.css";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";

function AuthPage() {
  const [auth, setAuth] = useState(false);
  const [formDetails, setFormDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailForOtp, setEmailForOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const handleFormChange = (e) => {
    setFormDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSendOtp = async () => {
    const { username, email, password } = formDetails;
    if (!username || !email || !password) {
      setErr("All fields are required.");
      return;
    }
    try {
      setErr("");
      setMsg("");
      await axios.post("http://localhost:8080/api/user/send-otp", {
        email: formDetails.email,
      });
      setOtpSent(true);
      setEmailForOtp(formDetails.email);
      setMsg("OTP sent to your email.");
    } catch (error) {
      setErr(error?.response?.data?.message || "Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setErr("");
      setMsg("");
      await axios.post("http://localhost:8080/api/user/verify-otp", {
        email: emailForOtp,
        otp,
      });
      setMsg("OTP verified! Now complete your registration.");
      setOtpSent(false);
      setOtpVerified(true);
    } catch (error) {
      setErr(error?.response?.data?.message || "Invalid OTP.");
    }
  };

  const handleAuth = () => {
    setAuth((prev) => !prev);
    setMsg("");
    setErr("");
    setOtpSent(false);
    setOtpVerified(false);
    setFormDetails({
      username: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formDetails;
    if (!auth && !otpVerified) {
      setErr("Please verify your email with OTP before signing up.");
      return;
    }
    try {
      setErr("");
      const url = `http://localhost:8080/api/user/${
        auth ? "login" : "register"
      }`;
      const payload = auth
        ? { email, password }
        : { username, email, password };
      const response = await axios.post(url, payload);
      if (response.status === 200) {
        if (auth) {
          localStorage.setItem("token", response.data.token);
          window.location.href = "/";
        } else {
          setMsg("Registration successful! You can now log in.");
          setOtpVerified(false);
        }
      }
    } catch (error) {
      setErr(error?.response?.data?.message);
      setMsg("");
      if (!auth) setOtpVerified(false);
    }
    setFormDetails({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="authPage-container">
        <div className="container mx-auto my-5 p-4">
          <h2 className="text-center mb-4 fw-bold">
            {auth ? "Login" : "Sign Up"}
          </h2>
          <form
            onSubmit={
              !auth && otpSent
                ? handleVerifyOtp
                : handleSubmit
            }
          >
            {err && <p className="text-danger text-center">{err}</p>}
            {msg && <p className="text-success text-center">{msg}</p>}
            {!auth && !otpSent && (
              <TextField
                label="Username"
                name="username"
                value={formDetails.username}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
              />
            )}
            {!otpSent && (
              <>
                <TextField
                  label="Email"
                  name="email"
                  value={formDetails.email}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formDetails.password}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                  required
                />
                {!auth && !otpVerified && (
                  <Button
                    type="button"
                    className="mt-3"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={handleSendOtp}
                  >
                    Send OTP
                  </Button>
                )}
                {(!auth && otpVerified) && (
                  <Button
                    type="submit"
                    className="mt-3"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Sign Up
                  </Button>
                )}
                {auth && (
                  <Button
                    type="submit"
                    className="mt-3"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Login
                  </Button>
                )}
              </>
            )}
            {otpSent && (
              <>
                <TextField
                  label="Enter OTP"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  className="mt-3"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Verify OTP
                </Button>
              </>
            )}
            <p
              className="toggle-auth text-center text-muted mt-4"
              onClick={handleAuth}
              style={{ cursor: "pointer" }}
            >
              {auth
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
export default AuthPage;