import React from "react";
import blue from "./blue.svg";
import "./DataSubmittedThenClaim.css";
import UserLogin from "./UserLogin.js";
import ClaimDataCapture from "./ClaimDataCapture.js";

function DataSubmittedThenClaim() {
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-12">
          <p>
            Thank you for submitting your data! If you'd like to make a claim
            please fill in the form below.
          </p>
          <ClaimDataCapture />
        </div>
      </div>
    </div>
  );
}

export default DataSubmittedThenClaim;
