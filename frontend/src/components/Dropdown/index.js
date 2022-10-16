import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
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
  const [selectedValue, setSelectedValue] = useState("Option0");
  //Maybe pass handler function as a prop
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="dropdownContainer">
      <label className="label">{label} </label><br/>
      <select value={selectedValue} onChange={handleChange}>
        <option value="option0">Option 0</option>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>

      {/* For debugging */}
      <p>User selected {selectedValue}</p>
    </div>
  );
};

//Another dropdown component using react select library (https://react-select.com/home)
export const DropdownAdvanced = ({
  label = defaultLabel,
  options = defaultOptions,
}) => {
  //declare state in App.js instead
  const [selectedOption, setSelectedOption] = useState("Option1");
  //Maybe pass handler function as a prop
  //TODO: debug the state changes
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const animatedComponents = makeAnimated();
  return (
    <div className="dropdownContainer">
      <form>
        <label className="label">{label}</label>
        <Select
          defaultValue={[options[0],options[2]]}
          options={options}
          onChange={handleChange}
          closeMenuOnSelect={true}
          isMulti
          components={animatedComponents}
        />
        <p>User selected {selectedOption}</p>
      </form>
    </div>
  );
};

