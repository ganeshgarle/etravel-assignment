import { render, screen } from "@testing-library/react";
import Loader from ".";

test("renders the spinner with the correct role and hidden text", () => {
  render(<Loader />);
  const spinner = screen.getByRole("status");
  expect(spinner).toBeInTheDocument();

  // Check if the visually hidden text is present
  const loadingText = screen.getByText(/loading.../i);
  expect(loadingText).toBeInTheDocument();
});
