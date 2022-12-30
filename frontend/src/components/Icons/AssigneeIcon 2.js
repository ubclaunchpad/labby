import React from "react";

export const AssigneeIcon = ({
  label,
  textColor = "white",
  shapeColor = "black",
  className,
  width = 25,
  height = 25,
}) => {
  console.log(label);
  return (
    <div className={className}>
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M0 0H12.5C19.4036 0 25 5.59644 25 12.5C25 19.4036 19.4036 25 12.5 25C5.59644 25 0 19.4036 0 12.5V0Z"
            fill={shapeColor}
          />
          {/* <text font-size="50" fill="red">
            {label}
          </text> */}
        </g>
      </svg>
    </div>
  );
};
