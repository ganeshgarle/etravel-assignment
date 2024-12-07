import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// Define the types for props
interface SelectBoxProps {
  title?: string; // Optional prop with default value
  option?: string[]; // Optional prop with default value
  onSelectCallback: (item: string) => void; // Callback function
}

const SelectBox: React.FC<SelectBoxProps> = ({
  title = "Sort by",
  option = ["Year", "Episode"],
  onSelectCallback,
}) => {
  return (
    <DropdownButton id="dropdown-basic-button" title={title}>
      {option.map((item) => (
        <Dropdown.Item onClick={() => onSelectCallback(item)} key={item}>
          {item}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default SelectBox;
