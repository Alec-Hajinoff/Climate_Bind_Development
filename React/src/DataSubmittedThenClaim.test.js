import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import DataSubmittedThenClaim from "./DataSubmittedThenClaim";

describe("DataSubmittedThenClaim Component", () => {
  test("renders the thank you message and ClaimDataCapture component", () => {
    render(
      <Router>
        <DataSubmittedThenClaim />
      </Router>
    );

    expect(
      screen.getByText(/Thank you for submitting your/i)
    ).toBeInTheDocument();

    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
