import React, { useState } from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle change in the search input field
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
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
