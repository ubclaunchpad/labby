import React from "react";
import Add from "../../assets/Add.png";

export const AssigneeIcon = ({
  label,
  textColor = "white",
  shapeColor = "black",
  className,
  empty = false,
}) => {
  if (empty) {
    return (
      <div className={className}>
        <svg
          width="25"
          height="25"
          viewBox="-2 -2 29 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              d="M0 0H12.5C19.4036 0 25 5.59644 25 12.5C25 19.4036 19.4036 25 12.5 25C5.59644 25 0 19.4036 0 12.5V0Z"
              stroke="#E0E0E0"
              strokeWidth={2}
              strokeDasharray="3 3"
            />
          </g>
        </svg>
        <div
          style={{
            position: "absolute",
            width: 25,
            textAlign: "center",
            top: "15%",
            left: 0,
            fontSize: 10,
            color: textColor,
          }}
        >
          <img
            style={{ width: 10, height: 10 }}
            src={Add}
            alt="Add a New Assignee"
          />
        </div>
      </div>
    );
  }

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
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          width: 25,
          textAlign: "center",
          top: "20%",
          left: 0,
          fontSize: 10,
          color: textColor,
        }}
      >
        {label}
      </div>
    </div>
  );
};
