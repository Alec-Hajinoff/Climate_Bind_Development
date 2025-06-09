import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PremiumPaymentRequest from "../PremiumPaymentRequest";
import { ethers } from "ethers";

// Mock ethers
jest.mock("ethers");

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("PremiumPaymentRequest Component", () => {
  // Mock implementation of window.ethereum
  const mockEthereum = {
    request: jest.fn(),
  };

  // Mock contract instance
  const mockContract = {
    payPremium: jest.fn(),
  };

  // Mock transaction
  const mockTransaction = {
    wait: jest.fn(),
    hash: "0x123",
  };

  beforeEach(() => {
    // Setup window.ethereum mock
    global.window.ethereum = mockEthereum;
    
    // Setup ethers mocks
    ethers.providers.Web3Provider = jest.fn().mockImplementation(() => ({
      getSigner: () => ({
        getAddress: jest.fn(),
      }),
    }));
    
    ethers.Contract = jest.fn().mockImplementation(() => mockContract);
    
    // Clear all mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    delete global.window.ethereum;
  });

  test("renders pay premium button", () => {
    renderWithRouter(<PremiumPaymentRequest />);
    expect(screen.getByText("Pay Premium")).toBeInTheDocument();
  });

  test("shows processing state when transaction is in progress", async () => {
    mockContract.payPremium.mockResolvedValue(mockTransaction);
    mockTransaction.wait.mockResolvedValue({});

    renderWithRouter(<PremiumPaymentRequest />);
    
    const button = screen.getByText("Pay Premium");
    fireEvent.click(button);

    expect(screen.getByText("Processing...")).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText("Pay Premium")).toBeInTheDocument();
    });
  });

  test("handles MetaMask not installed", async () => {
    delete global.window.ethereum;
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouter(<PremiumPaymentRequest />);
    
    const button = screen.getByText("Pay Premium");
    fireEvent.click(button);

    expect(alertMock).toHaveBeenCalledWith("Please install MetaMask first.");
    alertMock.mockRestore();
  });

  test("handles successful transaction", async () => {
    mockContract.payPremium.mockResolvedValue(mockTransaction);
    mockTransaction.wait.mockResolvedValue({});
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    renderWithRouter(<PremiumPaymentRequest />);
    
    const button = screen.getByText("Pay Premium");
    fireEvent.click(button);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("Transaction successful:", "0x123");
    });

    consoleSpy.mockRestore();
  });

  test("handles transaction error", async () => {
    mockContract.payPremium.mockRejectedValue(new Error("Transaction failed"));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    renderWithRouter(<PremiumPaymentRequest />);
    
    const button = screen.getByText("Pay Premium");
    fireEvent.click(button);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
});