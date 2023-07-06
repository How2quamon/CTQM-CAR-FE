import { render, screen } from "@testing-library/react";
import HomePage from "../pages/home";

test("renders learn react link", () => {
  render(<HomePage />);
  const linkElement = screen.getByText(/Welcom to home page/i);
  expect(linkElement).toBeInTheDocument();
});
