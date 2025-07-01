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
  const [err, setErr] = useState("");
  const handleFormChange = (e) => {
    setFormDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleAuth = () => {
    setAuth((prev) => !prev);
    setMsg("");
    setErr("");
  };
  const [msg, setMsg] = useState("");
  const handleSubmit = async (e) => {
  e.preventDefault();
  const { username, email, password } = formDetails;
  try {
    setErr("");
    const url = `http://localhost:8080/api/user/${auth ? "login" : "register"}`;
    const payload = auth
      ? { email, password }
      : { username, email, password };
    const response = await axios.post(url, payload);
    if(response.status === 200){
      if (auth) {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/home";
      } else {
        setMsg("Registration successful! You can now log in.");
      }
    }
    console.log(response.data);
  } catch (error) {
    setErr(error?.response?.data?.message);
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
          <form onSubmit={handleSubmit}>
            {err && <p className="text-danger text-center">{err}</p>}
            {msg && <p className="text-success text-center">{msg}</p>}
            {!auth ? (
              <TextField
                label="Username"
                name="username"
                value={formDetails.username}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
              />
            ) : null}
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
            <Button
              type="submit"
              className="mt-3"
              variant="contained"
              color="primary"
              fullWidth
            >
              {auth ? "Login" : "Sign Up"}
            </Button>
            <p
              className="toggle-auth text-center text-muted mt-4"
              onClick={handleAuth}
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
