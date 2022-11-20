import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import "./TextInput.css";

import {
  DELETE_QUESTION,
  LOAD_QUESTION,
  SAVE_QUESTION,
} from "../../redux/actions/questionActions";

function CustomerTextAnswer({ question }) {
  return (
    <div className="GlobalEditorComponent">
      <div className="GlobalEditorComponentHeader">
        <div className="customer__text-answer__title">{question.question}</div>
      </div>
      <div className="text-box-container">
        <Input.TextArea
          placeholder="Start typing here... "
          rows={3}
          className="text-box"
        />
      </div>
    </div>
  );
}

export default CustomerTextAnswer;
