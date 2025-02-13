import React from "react";
import blue from "./blue.svg";
import "./SubmittedClaim.css";
import UserLogin from "./UserLogin.js";
import ClaimCalculations from "./ClaimCalculations.js";

function SubmittedClaim() {
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-12">
          <p>Thank you for submitting your insurance claim! Your insurers, amounts they each owe you, and their contacts are listed below:</p>
          <ClaimCalculations />
        </div>
      </div>
    </div>
  );
}

export default SubmittedClaim;
