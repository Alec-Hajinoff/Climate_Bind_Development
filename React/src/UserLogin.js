import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import blue from "./blue.svg";
import "./UserLogin.css";

function UserLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("http://localhost:8001/Climate_Bind_Development/login_capture.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data.status === "success") {
          navigate("/AccountPage");
        } else {
          setErrorMessage("Sign in failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("An error occurred.");
      })
      .finally(() => setLoading(false));
  };
  return (
    <form className="row g-2" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          autoComplete="off"
          type="email"
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          className="form-control"
          id="yourEmailLogin"
          name="email"
          required
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          autoComplete="off"
          type="password"
          className="form-control"
          id="yourPasswordLogin"
          name="password"
          required
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div id="error-message-one" className="error" aria-live="polite">
        {errorMessage}
      </div>
      <button type="submit" className="btn btn-secondary" id="loginBtn">
        Login
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
          id="spinnerLogin"
          style={{ display: loading ? "inline-block" : "none" }}
        ></span>
      </button>
      <div id="liveAlertPlaceholder"></div>
    </form>
  );
}

export default UserLogin;
