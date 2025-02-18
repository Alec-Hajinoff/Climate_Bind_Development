import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserRegistration from "./UserRegistration.js"; 

describe("UserRegistration Component", () => {
  it("should render the first name input with the correct placeholder", () => {
    render(
      <BrowserRouter>
        <UserRegistration />
      </BrowserRouter>
    );
    const firstNameInput = screen.getByPlaceholderText("Your first name");
    expect(firstNameInput).toBeInTheDocument();
  });
});