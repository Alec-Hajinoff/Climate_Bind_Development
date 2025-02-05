import React, { useState } from "react";
import blue from "./blue.svg";
import "./AccountDataCapture.css";
import { useNavigate } from "react-router-dom";

function AccountDataCapture() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    last_name: "",
    date_of_birth: "",
    passport_copy: null,
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
      "http://localhost:8001/Climate_Bind_Development/account_data_capture.php",
      {
        method: "POST",
        body: data,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate("/AccountDataCaptureSubmitted");
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
      <form onSubmit={handleSubmit}>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th scope="row" className="align-middle ">
                Surname
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  pattern="[a-zA-Z ]+"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Date of birth
              </th>
              <td>
                <input
                  type="date"
                  className="form-control"
                  autoComplete="off"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Upload passport copy (page showing photo)
              </th>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*,.pdf"
                  name="passport_copy"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Phone number
              </th>
              <td>
                <input type="tel" className="form-control" name="phone" />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                National insurance number
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="(or National security number)"
                  name="national_insurance"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Address of the property you are insuring
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="(including the post code or zip code)"
                  name="address"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Upload an external image of the property
              </th>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*,.pdf"
                  name="images"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Upload proof of ownership (page showing your name)
              </th>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*,.pdf"
                  name="ownership_proof"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Date of the construction of the property
              </th>
              <td>
                <input
                  type="date"
                  className="form-control"
                  name="date_of_construction"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Square footage of the property
              </th>
              <td>
                <input
                  type="number"
                  step="1"
                  className="form-control"
                  name="square_footage"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Type of home
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="(e.g., semi-detached, townhouse, flat, etc.)"
                  name="type_home"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Building materials
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="(e.g., wood, brick, etc.)"
                  name="building_materials"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Number of stories or levels
              </th>
              <td>
                <input
                  type="number"
                  step="1"
                  className="form-control"
                  name="number_levels"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Roof type and age
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="(e.g., shingle, tile, etc.)"
                  name="roof_type"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Heating, electrical, and plumbing systems
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="(age, type, and condition)"
                  name="heating_systems"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Safety features
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="(e.g., smoke detectors, fire extinguishers, deadbolt locks, etc.)"
                  name="safety_features"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Home improvements or renovations
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="(e.g., updated plumbing, new roof, etc.)"
                  name="home_renovations"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Previous claims history for the home
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="(if any)"
                  name="previous_claims_externally"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Mortgage balance & lender information
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="(if mortgaged)"
                  name="mortgage_lender"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Current and/or previous insurance provider and policy details
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="current_previous_insurance"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                List of previous natural disasters for the location
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="list_previous_disasters"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Amount of monthly premium committed to the policy
              </th>
              <td>
                <input
                  type="number"
                  step="1"
                  className="form-control"
                  name="monthly_premium"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" className="align-middle">
                Bank account details of where the premium amount is held
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="bank_account_number"
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

export default AccountDataCapture;
