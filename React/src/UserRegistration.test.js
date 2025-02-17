import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import UserRegistration from "./UserRegistration";

describe("UserRegistration Component", () => {

  test("renders form fields and submit button", () => {
    render(
      <MemoryRouter>
        <UserRegistration />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Your first name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Choose a strong password")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });
});