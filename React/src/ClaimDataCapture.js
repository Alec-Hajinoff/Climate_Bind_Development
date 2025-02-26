import React, { useState } from "react";
import blue from "./blue.svg";
import "./ClaimDataCapture.css";
import LogoutComponent from "./LogoutComponent";
import { useNavigate } from "react-router-dom";

function ClaimDataCapture() {
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
      <div className="d-flex justify-content-end mb-3">
        <LogoutComponent />
      </div>
      <form onSubmit={handleSubmit}>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th scope="row" className="align-middle ">
                Describe the weather event that caused the damage
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  pattern="[a-zA-Z ]+"
                  name="damage_loss_cause"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                <label for="incidenttime">
                  Select the date of the incident
                </label>
              </th>
              <td>
                <input
                  id="incidenttime"
                  type="date"
                  className="form-control"
                  autoComplete="off"
                  name="incident_time_date"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Upload a local authority or police confirmation of property
                damage
              </th>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*,.pdf"
                  name="local_authority_report"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                List all damaged or lost items
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="damaged_items_list"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                If available, upload receipts for damaged / lost items
              </th>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*,.pdf"
                  name="damaged_items_receipts"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Upload a photo of the damages
              </th>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*,.pdf"
                  name="photographs"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                <label for="replacementvalue">
                  Estimate the repair or replacement value
                </label>
              </th>
              <td>
                <input
                  id="replacementvalue"
                  type="number"
                  step="1"
                  className="form-control"
                  name="replacement_value"
                  autoComplete="off"
                  value={formData.replacement_value}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Upload contractor repair estimates
              </th>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*,.pdf"
                  name="contractor_repair_estimates"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Please enter amount are you claiming in insurance
              </th>
              <td>
                <input
                  type="number"
                  step="1"
                  className="form-control"
                  name="claim_amount"
                  autoComplete="off"
                  value={formData.claim_amount}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Please enter your bank name and account details
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="bank_account_number_claim"
                  placeholder="(where your claim amount will be paid)"
                  autoComplete="off"
                  value={formData.bank_account_number_claim}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                <div id="error-message" className="error" aria-live="polite">
                  {errorMessage}
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary"
                  id="loginBtnOne"
                >
                  Submit
                  <span
                    role="status"
                    aria-hidden="true"
                    id="spinnerLogin"
                    style={{ display: loading ? "inline-block" : "none" }}
                  ></span>
                </button>
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="bank_account_number"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default ClaimDataCapture;
