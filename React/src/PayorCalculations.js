import React, { useState, useEffect } from "react";
import "./PayorCalculations.css";
import LogoutComponent from "./LogoutComponent";

function PayorCalculations() {
  const [addressData, setAddressData] = useState({});

  useEffect(() => {
    fetch(
      "http://localhost:8001/Climate_Bind_Development/payor_calculations.php",
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => setAddressData(data))
      .catch((error) => console.error("Error fetching address data:", error));
  }, []);

  return (
    <div className="container text-center">
      <div className="d-flex justify-content-end mb-3">
        <LogoutComponent />
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{addressData.address || "No address found"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PayorCalculations;
