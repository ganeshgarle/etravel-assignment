// src/components/Loader.test.tsx
import { render, screen } from "@testing-library/react";
import Loader from "./";

describe("Loader Component", () => {
  // Test case to check if the spinner is rendered
  test("should render the spinner with loading text", () => {
    // Render the Loader component
    render(<Loader />);

    // Check if the spinner (role="status") is present in the document
    const spinnerElement = screen.getByRole("status");
    expect(spinnerElement).toBeInTheDocument();

    // Check if the "Loading..." text is visible to screen readers
    const loadingText = screen.getByText(/Loading.../i);
    expect(loadingText).toBeInTheDocument();
  });
});
