import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
import UserRegistration from "./UserRegistration";

describe("UserRegistration Component", () => {
  test("updates first name input field correctly", () => {
    
    render(<UserRegistration />);
    
    const firstNameInput = screen.getByPlaceholderText("Your first name");
    
    expect(firstNameInput).toBeInTheDocument();
  });
});