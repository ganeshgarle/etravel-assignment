import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import SelectBox from "./"; // Path to your SelectBox component

// Mock the onSelectCallback function
const mockOnSelectCallback = jest.fn();

describe("SelectBox Component", () => {
  beforeEach(() => {
    // Clear any previous mock calls before each test
    mockOnSelectCallback.mockClear();
  });

  test("renders with default title and options", async () => {
    render(<SelectBox onSelectCallback={mockOnSelectCallback} />);

    // Ensure the dropdown button title is the default "Sort by"
    expect(screen.getByText("Sort by")).toBeInTheDocument();

    // Open the dropdown by clicking on the button
    fireEvent.click(screen.getByText("Sort by"));

    // Wait for the dropdown options to be rendered
    await waitFor(() => screen.getByText("Year"));
    await waitFor(() => screen.getByText("Episode"));

    // Check if the dropdown has the default options
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Episode")).toBeInTheDocument();
  });

  test("calls onSelectCallback with the correct value when an option is selected", async () => {
    render(<SelectBox onSelectCallback={mockOnSelectCallback} />);

    // Open the dropdown by clicking on the button
    fireEvent.click(screen.getByText("Sort by"));

    // Wait for the dropdown options to be rendered
    await waitFor(() => screen.getByText("Year"));

    // Simulate a click on the "Year" option
    act(() => {
      fireEvent.click(screen.getByText("Year"));
    });

    // Check if onSelectCallback was called with "Year"
    expect(mockOnSelectCallback).toHaveBeenCalledWith("Year");

    // Simulate a click on the "Episode" option
    act(() => {
      fireEvent.click(screen.getByText("Episode"));
    });

    // Check if onSelectCallback was called with "Episode"
    expect(mockOnSelectCallback).toHaveBeenCalledWith("Episode");
  });

  test("renders with custom title and options", async () => {
    const customTitle = "Filter by";
    const customOptions = ["Date", "Rating", "Duration"];

    render(
      <SelectBox
        title={customTitle}
        option={customOptions}
        onSelectCallback={mockOnSelectCallback}
      />
    );

    // Ensure the custom title is rendered
    expect(screen.getByText(customTitle)).toBeInTheDocument();

    // Open the dropdown and wait for custom options to appear
    fireEvent.click(screen.getByText(customTitle));
    await waitFor(() => screen.getByText("Date"));
    await waitFor(() => screen.getByText("Rating"));
    await waitFor(() => screen.getByText("Duration"));

    // Check if the custom options are rendered
    customOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  test("does not call onSelectCallback if no option is clicked", () => {
    render(<SelectBox onSelectCallback={mockOnSelectCallback} />);

    // Check if the mock function is not called when no option is selected
    expect(mockOnSelectCallback).not.toHaveBeenCalled();
  });
});
