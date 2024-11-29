import { render, screen, fireEvent } from "@testing-library/react";
import MyButton from "./MyButton";

test("renders MyButton with correct text", () => {
  render(<MyButton text="Click Me" />);
  const button = screen.getByText(/click me/i);
  expect(button).toBeInTheDocument();
});

test("calls onClick function when button is clicked", () => {
  const handleClick = vi.fn();
  render(<MyButton text="Click Me" onClick={handleClick} />);
  const button = screen.getByText(/click me/i);
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
