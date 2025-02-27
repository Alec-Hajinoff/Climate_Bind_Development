import React, { useState, useEffect } from "react";
import "./ClaimCalculations.css";
import LogoutComponent from "./LogoutComponent";

function ClaimCalculations() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost:8001/Climate_Bind_Development/claim_calculations.php",
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => console.error("Error fetching table data:", error));
  }, []);

  return (
    <div className="container text-center">
      <div className="d-flex justify-content-end mb-3">
        <LogoutComponent />
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name of your insurer</th>
            <th>Their email address</th>
            <th>Phone number</th>
            <th>Address</th>
            <th>The amount they owe you USD $</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.phone}</td>
              <td>{row.address}</td>
              <td>{row.payout}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClaimCalculations;