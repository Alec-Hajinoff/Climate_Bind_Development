import React, { useState } from "react";
import "./ClaimDataCapture.css";
import LogoutComponent from "./LogoutComponent";
import { useNavigate } from "react-router-dom";
import { captureClaimData } from "./ApiService";

function ClaimDataCapture() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    damage_loss_cause: "",
    incident_time_date: "",
    local_authority_report: null,
    damaged_items_list: "",
    damaged_items_receipts: null,
    photographs: null,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await captureClaimData(formData);
      if (data.success) {
        navigate("/SubmittedClaim");
      } else {
        setErrorMessage("Submission failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-center">
      <div className="d-flex justify-content-end mb-3">
        <LogoutComponent />
      </div>
      <form onSubmit={handleSubmit}>
      <div className="container my-4">
      <h4 className="mb-3">Select the postcode of the area you'd like your policy to cover</h4>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter postcode (e.g. SW1A 1AA)"
          //value={postcode}
          //onChange={(e) => setPostcode(e.target.value)}
        />
      </div>

      <h4 className="mb-3">Select Events Covered</h4>
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="wind"
          //checked={selectedEvent === 'wind'}
          //onChange={() => handleEventSelection('wind')}
        />
        <label className="form-check-label" htmlFor="wind">
          Wind &gt; 50 km/h
        </label>
      </div>
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="rain"
          //checked={selectedEvent === 'rain'}
          //onChange={() => handleEventSelection('rain')}
        />
        <label className="form-check-label" htmlFor="rain">
          Rainfall &gt; 100 mm in 24h
        </label>
      </div>
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="drought"
          //checked={selectedEvent === 'drought'}
          //onChange={() => handleEventSelection('drought')}
        />
        <label className="form-check-label" htmlFor="drought">
          Drought (No rain &gt; 10 days)
        </label>
      </div>
      <div className="form-check mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          id="temperature"
          //checked={selectedEvent === 'temperature'}
          //onChange={() => handleEventSelection('temperature')}
        />
        <label className="form-check-label" htmlFor="temperature">
          Temperature &gt; 40°C
        </label>
      </div>

      <div className="mt-4">
        <h5>The payout for this cover and for this area will be:</h5>
        <p className="lead">{/*{payout !== null ? `£${payout}` : '—'}*/}</p>
      </div>

      <div className="mt-3">
        <h5>The monthly premium for this cover is:</h5>
        <p className="lead">{/*{premium !== null ? `£${premium}` : '—'}*/}</p>
      </div>
    </div>
        {/*<table className="table table-bordered">
          <tbody>
            <tr>
              <th scope="row" className="col-8 align-middle ">
                Describe the weather event that caused the damage
              </th>
              <td className="col-8">
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  pattern="[a-zA-Z ]+"
                  name="damage_loss_cause"
                  value={formData.damage_loss_cause}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                <label htmlFor="incidenttime">
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
                  value={formData.incident_time_date}
                  onChange={handleChange}
                  required
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
                  required
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
                  value={formData.damaged_items_list}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Upload receipts for damaged / lost items (take a photo of all
                receipts and upload one image or multiple images in one PDF)
              </th>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*,.pdf"
                  name="damaged_items_receipts"
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Upload a photo of the damages (one image or multiple images in
                one PDF)
              </th>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*,.pdf"
                  name="photographs"
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Upload contractor repair estimates (take a photo of all
                estimates and upload one image or multiple estimates in one PDF)
              </th>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*,.pdf"
                  name="contractor_repair_estimates"
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Please enter the amount you are claiming in insurance USD $
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
                  required
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
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>*/}
        <div className="d-flex justify-content-end mb-3">
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
        </div>
      </form>
    </div>
  );
}

export default ClaimDataCapture;
/*
import React, { useState } from "react";
import "./ClaimDataCapture.css";
import LogoutComponent from "./LogoutComponent";
import { useNavigate } from "react-router-dom";
import { captureClaimData } from "./ApiService";

function ClaimDataCapture() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    damage_loss_cause: "",
    incident_time_date: "",
    local_authority_report: null,
    damaged_items_list: "",
    damaged_items_receipts: null,
    photographs: null,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await captureClaimData(formData);
      if (data.success) {
        navigate("/SubmittedClaim");
      } else {
        setErrorMessage("Submission failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
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
              <th scope="row" className="col-8 align-middle ">
                Describe the weather event that caused the damage
              </th>
              <td className="col-8">
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  pattern="[a-zA-Z ]+"
                  name="damage_loss_cause"
                  value={formData.damage_loss_cause}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                <label htmlFor="incidenttime">
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
                  value={formData.incident_time_date}
                  onChange={handleChange}
                  required
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
                  required
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
                  value={formData.damaged_items_list}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Upload receipts for damaged / lost items (take a photo of all
                receipts and upload one image or multiple images in one PDF)
              </th>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*,.pdf"
                  name="damaged_items_receipts"
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Upload a photo of the damages (one image or multiple images in
                one PDF)
              </th>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*,.pdf"
                  name="photographs"
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Upload contractor repair estimates (take a photo of all
                estimates and upload one image or multiple estimates in one PDF)
              </th>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*,.pdf"
                  name="contractor_repair_estimates"
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Please enter the amount you are claiming in insurance USD $
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
                  required
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
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-end mb-3">
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
        </div>
      </form>
    </div>
  );
}

export default ClaimDataCapture;
*/