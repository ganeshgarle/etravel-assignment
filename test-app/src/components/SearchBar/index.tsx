import React, { useState } from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

// Define the types for props
interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Handle change in the search input field
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <Form>
      <InputGroup>
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <FormControl
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
