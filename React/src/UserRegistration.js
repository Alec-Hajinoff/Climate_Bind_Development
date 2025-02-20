import React, { useState } from "react";
import blue from "./blue.svg";
import "./UserRegistration.css";
import { useNavigate } from "react-router-dom";
import RegisteredPage from "./RegisteredPage.js";

function UserRegistration() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [emailError, setEmailError] = useState('');

  // List of valid TLDs
  const validTLDs = ['com', 'net', 'org', 'edu', 'gov', 'io', 'co'];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address (e.g., example@domain.com).';
    }

    // Extract the domain part
    const domain = email.split('@')[1];
    const tld = domain.split('.').pop(); // Get the TLD (e.g., "com")

    // Check if the TLD is valid
    if (!validTLDs.includes(tld)) {
      return `The email domain must end with a valid TLD (e.g., ${validTLDs.join(', ')}).`;
    }

    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear email error when the user starts typing
    if (name === 'email') {
        setEmailError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValidationError = validateEmail(formData.email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    setEmailError('');
    setLoading(true);

    fetch("http://localhost:8001/Climate_Bind_Development/form_capture.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            navigate("/RegisteredPage");
          } else {
            setErrorMessage("Registration failed. Please try again.");
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
          type="text"
          pattern="[a-zA-Z ]+"
          className="form-control"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
          placeholder="Your first name"
        />
      </div>
      <div className="form-group">
        
      <div className="form-group">
        <input
          autoComplete="off"
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email address"
        />
        {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
      </div>
      
      </div>
      <div className="form-group">
        <input
          autoComplete="off"
          type="password"

          minlength="8"
          
          className="form-control"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Choose a strong password"
        />
      </div>
      <div id="error-message" className="error" aria-live="polite">
        {errorMessage}
      </div>
      <button type="submit" className="btn btn-secondary">
        Register
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
          id="spinnerRegister"
          style={{ display: loading ? "inline-block" : "none" }}
        ></span>
      </button>
      <div id="registerPlaceholder"></div>
    </form>
  );
}

export default UserRegistration;