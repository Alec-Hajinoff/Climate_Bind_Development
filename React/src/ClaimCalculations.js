import React, { useState } from "react";
import blue from "./blue.svg";
import "./ClaimCalculations.css";
import { useNavigate } from "react-router-dom";

function ClaimCalculations() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    damage_loss_cause: "",
    incident_time_date: "",
    local_authority_report: null,
    damaged_items_list: "",
    damaged_items_receipts: null,
    photographs: null,
    replacement_value: null,
    contractor_repair_estimates: null,
    claim_amount: null,
    bank_account_number_claim: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    fetch(
      "http://localhost:8001/Climate_Bind_Development/claim_data_capture.php",
      {
        method: "POST",
        body: data,
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate("/SubmittedClaim");
        } else {
          setErrorMessage("Submission failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("An error occurred.");
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="container text-center">
      <table className="table table-bordered">
            <thead>
              <tr>
                <th>Insurer</th>
                <th>Amount Owed</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Insurer A</td>
                <td>$1000</td>
                <td>contactA@example.com</td>
              </tr>
              <tr>
                <td>Insurer B</td>
                <td>$2000</td>
                <td>contactB@example.com</td>
              </tr>
            </tbody>
          </table>
    </div>
  );
}

export default ClaimCalculations;
