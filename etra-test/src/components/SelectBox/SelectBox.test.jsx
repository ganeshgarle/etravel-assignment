// src/components/SelectBox/SelectBox.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectBox from "."; // Import the SelectBox component

describe("SelectBox Component", () => {
  test("renders the dropdown button with the correct title", () => {
    render(
      <SelectBox title="Sort by" option={[]} onSelectCallback={() => {}} />
    );

    // Check if the dropdown button renders with the correct title
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Sort by");
  });

  test("renders the options based on the option prop", () => {
    const options = ["Year", "Episode", "Name"];
    render(
      <SelectBox title="Sort by" option={options} onSelectCallback={() => {}} />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button); // Simulate clicking to open the dropdown

    // Check if the dropdown menu has the correct options
    options.forEach((option) => {
      const dropdownItem = screen.getByText(option); // Now it should find the option in the document
      expect(dropdownItem).toBeInTheDocument();
    });
  });

  test("calls onSelectCallback when an option is selected", () => {
    const options = ["Year", "Episode"];
    const mockOnSelect = vi.fn();

    render(
      <SelectBox
        title="Sort by"
        option={options}
        onSelectCallback={mockOnSelect}
      />
    );

    // Get the dropdown button and open the dropdown
    const button = screen.getByRole("button");
    fireEvent.click(button); // Simulate clicking to open the dropdown

    // Simulate clicking on an option (e.g., "Year")
    const option = screen.getByText("Year");
    fireEvent.click(option);

    // Ensure that the callback function is called with the correct argument
    expect(mockOnSelect).toHaveBeenCalledWith("Year");
  });
});
