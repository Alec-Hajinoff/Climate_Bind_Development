import React from "react";
import blue from "./blue.svg";
import "./DataSubmittedThenClaim.css";
import UserLogin from "./UserLogin.js";

function DataSubmittedThenClaim() {
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-12 col-md-8">
          <p>Thank you for submitting your data!</p>
        </div>
        {/*
        <div className="col-12 col-md-4">
          <p className="footer">Registered user login:</p>
          <UserLogin />
        </div>
    */}
      </div>
    </div>
  );
}

export default DataSubmittedThenClaim;
