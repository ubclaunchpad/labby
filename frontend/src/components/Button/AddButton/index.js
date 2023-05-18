import React from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import { appColor } from "../../../constants";

function AddButton({ handleAdd }) {
    return (
        <button
            className="AddButton"
            style={{
                backgroundColor: appColor.lightGray,
                color: appColor.gray,
            }}
            onMouseOver={(e) => {
                e.target.style.backgroundColor = "#627BF6";
                e.target.style.color = "#FFFFFF";
            }}
            onMouseOut={(e) => {
                e.target.style.backgroundColor = appColor.lightGray;
                e.target.style.color = appColor.gray;
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
