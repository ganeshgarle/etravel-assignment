import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function SelectBox({ title = "Sort by", option = ['Year', 'Episode'], onSelectCallback }) {
  return (
    <DropdownButton id="dropdown-basic-button" title={title}>
      {option.map((item) => (
        <Dropdown.Item onClick={() => onSelectCallback(item)} key={item}>
          {item}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export default SelectBox;
