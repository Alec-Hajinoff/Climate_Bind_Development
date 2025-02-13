import React, { useState, useEffect } from "react";
import "./ClaimCalculations.css";

function ClaimCalculations() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/Climate_Bind_Development/claim_calculations.php", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setTableData(data))
      .catch((error) => console.error("Error fetching table data:", error));
  }, []);

  return (
    <div className="container text-center">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Payout</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.payout}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClaimCalculations;