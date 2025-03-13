import React, { useState, useEffect } from "react";
import "./PayorCalculations.css";
import LogoutComponent from "./LogoutComponent";

function PayorCalculations() {
  const [addressData, setAddressData] = useState({});
  const [claimData, setClaimData] = useState({});

  useEffect(() => {
    fetch(
      "http://localhost:8001/Climate_Bind_Development/payor_calculations.php",
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
   
        setAddressData(data);
       
        if (data && data.claim_data) {
          console.log("Claim data found:", data.claim_data);
          setClaimData(data.claim_data);
        }
      })
      .catch((error) => console.error("Error fetching address data:", error));
  }, []);

  return (
    <div className="container text-center">
      <div className="d-flex justify-content-end mb-3">
        <LogoutComponent />
      </div>

      <table className="table table-bordered">
        <tbody>
          <tr>
            <th style={{ width: "33%" }}>Claimant Name</th>
            <td style={{ width: "67%" }}>
              {addressData.full_name || "No name found"}
            </td>
          </tr>
          <tr>
            <th style={{ width: "33%" }}>Their Email</th>
            <td style={{ width: "67%" }}>
              {addressData.email || "No email found"}
            </td>
          </tr>
          <tr>
            <th style={{ width: "33%" }}>Phone Number</th>
            <td style={{ width: "67%" }}>
              {addressData.phone || "No phone found"}
            </td>
          </tr>
          <tr>
            <th style={{ width: "33%" }}>Address</th>
            <td style={{ width: "67%" }}>
              {addressData.address || "No address found"}
            </td>
          </tr>
          <tr>
            <th style={{ width: "33%" }}>Incident Date</th>
            <td style={{ width: "67%" }}>
              {claimData.incident_date || "Not provided"}
            </td>
          </tr>
          <tr>
            <th style={{ width: "33%" }}>Claim Submission Date</th>
            <td style={{ width: "67%" }}>
              {claimData.submission_date || "Not provided"}
            </td>
          </tr>
          <tr>
            <th style={{ width: "33%" }}>Damage/Loss Cause</th>
            <td style={{ width: "67%" }}>
              {claimData.damage_cause || "Not provided"}
            </td>
          </tr>
          <tr>
            <th style={{ width: "33%" }}>Damaged Items</th>
            <td style={{ width: "67%" }}>
              {claimData.damaged_items || "None listed"}
            </td>
          </tr>
          <tr>
            <th style={{ width: "33%" }}>Replacement Value</th>
            <td style={{ width: "67%" }}>
              {claimData.replacement_value || "0"}
            </td>
          </tr>
          <tr>
            <th style={{ width: "33%" }}>Claim Amount</th>
            <td style={{ width: "67%" }}>
              {claimData.claim_amount || "0"}
            </td>
          </tr>
          <tr>
            <th style={{ width: "33%" }}>Bank Account Number</th>
            <td style={{ width: "67%" }}>
              {claimData.bank_account || "Not provided"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PayorCalculations;