import React from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutComponent.css";

const LogoutComponent = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch("logout.php", {
        method: "POST",
        credentials: "include", // Include cookies in the request
      });

      if (response.ok) {
        // Redirect to MainRegLog.js after successful logout
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutComponent;
