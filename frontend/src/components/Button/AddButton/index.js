import React from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import { appColor } from "../../../constants";

function AddButton({ handleAdd }) {
    return (
        <button
            className="AddButton"
            style={{
                backgroundColor: appColor.primaryLight,
                color: appColor.white,
            }}
            onMouseOver={(e) => {
                e.target.style.backgroundColor = appColor.primary;
                e.target.style.color = "#FFFFFF";
            }}
            onMouseOut={(e) => {
                e.target.style.backgroundColor = appColor.primaryLight;
                e.target.style.color = appColor.white;
            }}
            onClick={() => {
                handleAdd();
            }}
        >
            Add
        </button>
    );
};

export default AddButton;
