import React from "react";
import blue from "./blue.svg";
import "./AccountDataCapture.css";

function AccountDataCapture() {
  return (
    <div className="container text-center">
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
                //placeholder="Surname"
                //required
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
                className="form-control" //required
                autoComplete="off"
                name="date_of_birth"
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
                //required
              />
            </td>
          </tr>
          <tr>
            <th scope="row" className="align-middle">
              Phone number
            </th>
            <td>
              <input
                type="tel"
                className="form-control"
                name="phone"
                //placeholder="Enter Phone Number"
                //required
              />
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
                //required
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
                //required
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
                //required
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
                //required
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
                className="form-control" //required
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
                className="form-control"
                name="square_footage"
                //placeholder="National Insurance Number"
                //required
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
                //required
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
                //required
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
                className="form-control"
                name="number_levels"
                //placeholder="(e.g., wood, brick, etc.)"
                //required
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
                //required
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
                //required
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
                //required
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
                //required
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
                //required
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
                //required
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
                //placeholder="(if mortgaged)"
                //required
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
                //placeholder="(if mortgaged)"
                //required
              />
            </td>
          </tr>
          <tr>
            <th scope="row" className="align-middle">
              Amount of monthly premium committed to the policy
            </th>
            <td>
              <input
                type="text"
                className="form-control"
                //placeholder="(if mortgaged)"
                //required
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
                //placeholder="(if mortgaged)"
                //required
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AccountDataCapture;
