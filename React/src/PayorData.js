import React from "react";
import blue from "./blue.svg";
import "./PayorData.css";
import UserLogin from "./UserLogin.js";
import PayorCalculations from "./PayorCalculations.js";

function PayorData() {
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-12">
          <p>
            This is the payor data page!
          </p>
          <PayorCalculations />
        </div>
      </div>
    </div>
  );
}

export default PayorData;
