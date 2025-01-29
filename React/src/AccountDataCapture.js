import React from "react";
import blue from "./blue.svg";
import "./AccountDataCapture.css";

function AccountDataCapture() {
  return (
    <div classNameName="container text-center">
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
                //placeholder="Surname"
                required
              />
            </td>
          </tr>
          <tr>
            <th scope="row" className="align-middle">
              Date of Birth
            </th>
            <td>
              <input type="date" className="form-control" required />
            </td>
          </tr>
          <tr>
            <th scope="row" className="align-middle">
              Upload Passport Copy (page showing photo)
            </th>
            <td>
              <input
                type="file"
                className="form-control"
                accept="image/*,.pdf"
                required
              />
            </td>
          </tr>
          <tr>
            <th scope="row" className="align-middle">
              Phone Number
            </th>
            <td>
              <input
                type="tel"
                className="form-control"
                //placeholder="Enter Phone Number"
                required
              />
            </td>
          </tr>
          <tr>
            <th scope="row" className="align-middle">
              National Insurance Number
            </th>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="(or National Security Number)"
                required
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
                required
              />
            </td>
          </tr>
          <tr>
            <th scope="row" className="align-middle">
              Upload Proof of Ownership (page showing your name)
            </th>
            <td>
              <input
                type="file"
                className="form-control"
                accept="image/*,.pdf"
                required
              />
            </td>
          </tr>
          <tr>
            <th scope="row" className="align-middle">
              Date of the construction of the property
            </th>
            <td>
              <input type="date" className="form-control" required />
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
                //placeholder="National Insurance Number"
                required
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
                required
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AccountDataCapture;
