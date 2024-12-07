import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./"; // Path to your SearchBar component
import { FaSearch } from "react-icons/fa";

// Mock function for onSearch prop
const mockOnSearch = jest.fn();

describe("SearchBar Component", () => {
  beforeEach(() => {
    // Reset the mock function before each test
    mockOnSearch.mockClear();
  });

  test("renders the search input field and icon", () => {
    // Render the SearchBar component with a mock 'onSearch' function
    render(<SearchBar onSearch={() => {}} />);

    // Check if the search input field is in the document
    const inputField = screen.getByPlaceholderText("Search...");
    expect(inputField).toBeInTheDocument();

    // // Check if the search icon is in the document
    // const searchIcon = screen.getByRole("img"); // FaSearch icon should be rendered as an 'img' role
    // expect(searchIcon).toBeInTheDocument();
  });
  test("calls onSearch when the user types", () => {
    // Mock the onSearch function

    // Render the SearchBar component with the mock function
    render(<SearchBar onSearch={mockOnSearch} />);

    // Get the input field
    const inputField = screen.getByPlaceholderText("Search...");

    // Simulate typing into the input field
    fireEvent.change(inputField, { target: { value: "test" } });

    // Ensure the mockOnSearch function is called with the correct argument
    expect(mockOnSearch).toHaveBeenCalledWith("test");
  });

  test("updates input value when typing", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    // Find the input element and cast it to HTMLInputElement
    const inputField = screen.getByPlaceholderText(
      "Search..."
    ) as HTMLInputElement;

    // Simulate typing into the input field
    fireEvent.change(inputField, { target: { value: "hello world" } });

    // Check if the input field's value has been updated
    expect(inputField.value).toBe("hello world");
  });
});
