import React from "react";
import blue from "./blue.svg";
import "./SubmittedClaim.css";
import UserLogin from "./UserLogin.js";

function SubmittedClaim() {
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-12">
          <p>Thank you for submitting your insurance claim! Your insurers, amounts they each owe you, and and their contacts are listed below:</p>
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
      </div>
    </div>
  );
}

export default SubmittedClaim;
