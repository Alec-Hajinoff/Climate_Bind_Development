import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/New user/i);
  expect(linkElement).toBeInTheDocument();
});
