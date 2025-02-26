import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ClaimCalculations from "./ClaimCalculations";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { name: "Insurer A", email: "insurerA@example.com", payout: "1000" },
        { name: "Insurer B", email: "insurerB@example.com", payout: "2000" },
      ]),
  })
);

describe("ClaimCalculations Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders table with fetched data", async () => {
    render(
      <Router>
        <ClaimCalculations />
      </Router>
    );

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(screen.getByText("Name of your insurer")).toBeInTheDocument();
    expect(screen.getByText("Their email address")).toBeInTheDocument();
    expect(screen.getByText("The amount they owe you")).toBeInTheDocument();

    expect(screen.getByText("Insurer A")).toBeInTheDocument();
    expect(screen.getByText("insurerA@example.com")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();

    expect(screen.getByText("Insurer B")).toBeInTheDocument();
    expect(screen.getByText("insurerB@example.com")).toBeInTheDocument();
    expect(screen.getByText("2000")).toBeInTheDocument();
  });
});
