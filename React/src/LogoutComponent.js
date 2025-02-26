import React from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutComponent.css";

const LogoutComponent = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:8001/Climate_Bind_Development/logout_component.php",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
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
