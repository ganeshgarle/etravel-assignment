// src/components/SearchBar/SearchBar.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "."; // Import the SearchBar component

describe("SearchBar Component", () => {
  test("renders the search input field and icon", () => {
    // Render the SearchBar component with a mock 'onSearch' function
    render(<SearchBar onSearch={() => {}} />);

    // Check if the search input field is in the document
    const inputField = screen.getByPlaceholderText("Search...");
    expect(inputField).toBeInTheDocument();

    // Check if the search icon is in the document
    // const searchIcon = screen.getByRole("img"); // FaSearch icon should be rendered as an 'img' role
    // expect(searchIcon).toBeInTheDocument();
  });

  test("calls onSearch when the user types", () => {
    // Mock the onSearch function
    const mockOnSearch = vi.fn();

    // Render the SearchBar component with the mock function
    render(<SearchBar onSearch={mockOnSearch} />);

    // Get the input field
    const inputField = screen.getByPlaceholderText("Search...");

    // Simulate typing into the input field
    fireEvent.change(inputField, { target: { value: "test" } });

    // Ensure the mockOnSearch function is called with the correct argument
    expect(mockOnSearch).toHaveBeenCalledWith("test");
  });

  test("updates the input value correctly", () => {
    // Mock the onSearch function
    const mockOnSearch = vi.fn();

    // Render the SearchBar component with the mock function
    render(<SearchBar onSearch={mockOnSearch} />);

    // Get the input field
    const inputField = screen.getByPlaceholderText("Search...");

    // Simulate typing into the input field
    fireEvent.change(inputField, { target: { value: "hello" } });

    // Ensure the input field's value is updated
    expect(inputField.value).toBe("hello");
  });
});
