import React, { useState } from "react";
import { Input } from "antd";
import "antd/dist/antd.min.css";
import "./index.css";
import { DefaultCard } from "../Card";

const defaultLabel = "Text Input Title: ";
const defaultPlaceholder = "Placeholder Text";
const defaultMaxLength = 50;
const defaultRows = "3";

// Regular Single-lined Text Input
export const TextInput = ({
  label = defaultLabel,
  placeholder = defaultPlaceholder,
  maxLength = defaultMaxLength,
}) => {
  const [textValue, setTextValue] = useState(placeholder);

  const handleChange = (event) => {
    setTextValue(event.target.value);
  };

  return (
    <DefaultCard>
      <label className="label">{label}</label>
      <br />
      <Input
        placeholder={placeholder}
        onChange={handleChange}
        // We can set character limit for input
        maxLength={maxLength}
        size={"medium"}
        showCount
      />

      {/* for debugging */}
      <p>Text Input Value: {textValue}</p>
    </DefaultCard>
  );
};

// Multilined Text Input
export const TextInputMultiline = ({
  label = defaultLabel,
  placeholder = defaultPlaceholder,
  rows = defaultRows,
}) => {
  const [textValue, setTextValue] = useState(placeholder);

  const handleChange = (event) => {
    setTextValue(event.target.value);
  };

  return (
    <DefaultCard>
      <label className="label">{label}</label>
      <br />
      <Input.TextArea
        placeholder={placeholder}
        onChange={handleChange}
        // We can set the number of rows for this bigger input box
        rows={rows}
      />

      {/* for debugging */}
      <p>Text Input Value: {textValue}</p>
    </DefaultCard>
  );
};
