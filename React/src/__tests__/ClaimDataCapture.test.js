import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import ClaimDataCapture from "../ClaimDataCapture";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("ClaimDataCapture", () => {
  let navigateMock;

  beforeEach(() => { // Runs before each test case
    navigateMock = jest.fn(); // Mock function to verify routing behaviour
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

    // Check if the form elements are rendered
    expect(
      screen.getByPlaceholderText(
        /Enter latitude of location you are insuring/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(
        /Enter longitude of location you are insuring/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Select events you'd like your policy to cover:")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("submits the form and navigates to ClaimSubmitted on success", async () => {
    render(<ClaimDataCapture />);

    // Simulate user input
    fireEvent.change(
      screen.getByPlaceholderText(
        /Enter latitude of location you are insuring/i
      ),
      { target: { value: "40.7128" } }
    );
    fireEvent.change(
      screen.getByPlaceholderText(
        /Enter longitude of location you are insuring/i
      ),
      { target: { value: "-74.0060" } }
    );
    fireEvent.click(screen.getByLabelText(/Wind > 50 km\/h/i));

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await new Promise((resolve) => setTimeout(resolve, 50));

    // Check if fetch was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String), // URL is dynamic based on the environment
      expect.any(Object)
    );
    // Check if navigation occurred
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

    // Check if the error message is displayed
    expect(
      screen.getByText("Submission failed. Please try again.")
    ).toBeInTheDocument();
  });

  it("displays an error message when fetch fails", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Network error"))
    );

    render(<ClaimDataCapture />);

    // Set required values to trigger useEffect
    fireEvent.change(screen.getByPlaceholderText(/Enter latitude/i), {
      target: { value: "40.7128" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter longitude/i), {
      target: { value: "-74.0060" },
    });
    fireEvent.click(screen.getByLabelText(/Wind > 50 km\/h/i));

    // Wait for the error message to appear
    await screen.findByText("Failed to fetch premium and payout data");

    expect(
      screen.getByText("Failed to fetch premium and payout data")
    ).toBeInTheDocument();
  });
});
