import React, { useState } from "react";
import "./index.css";

//Default prop values
const defaultLabel = "Dropdown title: ";
const defaultOptions = [
  { label: "Option 1", value: "Option1" },
  { label: "Option 2", value: "Option2" },
  { label: "Option 3", value: "Option3" },
  { label: "Option 4", value: "Option4" },
  { label: "Option 5", value: "Option5" },
];

export const DropdownDefault = ({
  label = defaultLabel,
  options = defaultOptions,
}) => {
  //Maybe declare state in App.js instead and just pass the value as a prop
  const [selectedValue, setSelectedValue] = useState("option0");

  //Maybe pass handler function as a prop
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="dropdownContainer">
      <label>
        {label}
        <select value={selectedValue} onChange={handleChange}>
          <option value="option0">Option 0</option>
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>

      {/* For debugging */}
      <p>User selected {selectedValue}</p>
    </div>
  );
};

//TODO: build another dropdown component using react select library (https://react-select.com/home)
