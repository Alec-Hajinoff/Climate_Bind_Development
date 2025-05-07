import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import ClaimDataCapture from "../ClaimDataCapture";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("ClaimDataCapture", () => {
  let navigateMock;

  beforeEach(() => {
    navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the claim data capture form", () => {
    render(<ClaimDataCapture />);

    expect(
      screen.getByText(/Select the postcode of the area/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText("Select events you'd like your policy to cover:")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("submits the form and navigates to ClaimSubmitted on success", async () => {
    render(<ClaimDataCapture />);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8001/Climate_Bind_Development/claim_data_capture.php",
      expect.any(Object)
    );
    expect(navigateMock).toHaveBeenCalledWith("/SubmittedClaim");
  });

  it("displays an error message when submission fails", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: false }),
      })
    );

    render(<ClaimDataCapture />);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(
      screen.getByText("Submission failed. Please try again.")
    ).toBeInTheDocument();
  });

  it("displays an error message when fetch fails", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Network error"))
    );
  
    render(<ClaimDataCapture />);
  
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);
  
    expect(
      await screen.findByText("An error occurred.")
    ).toBeInTheDocument();
});
});
