import React, { useState } from "react";
import { message, Upload } from "antd";
// import "antd/dist/antd.min.css";
import "./index.css";
import UploadIcon from "../../assets/FileUpload.png";
import CloseIcon from "../../assets/Close.png";
import FormControlLabel from "@mui/material/FormControlLabel";
import { autocompleteClasses, Button, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_QUESTION,
  SAVE_QUESTION,
} from "../../redux/actions/questionActions";
const { Dragger } = Upload;

const defaultLabel = "File Input Title: ";

const props = {
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully!`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
  progress: { strokeWidth: 2, showInfo: true },
  className: "upload-file-component",
};

export const FileInput = ({ questionNumber }) => {
  const dispatch = useDispatch();
  const [questionName, setQuestionName] = useState("");
  const [options, setOptions] = useState([]);
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );

  return (
    <div className="file-input-question-builder-container">
      <div className="question-header-row">
        <div className="question-number-container">
          <div className="question-number-text">Q{questionNumber}</div>
        </div>
        <input
          className="question-name-input"
          placeholder="Click to type your question here "
          type="text"
          name="name"
          value={questionName}
          onChange={(e) => {
            setQuestionName(e.target.value);
            dispatch({
              type: SET_QUESTION,
              payload: {
                questionIndex: questionNumber,
                questionObject: {
                  question_type: "fileInput",
                  question_title: questionName,
                  queston_index: questionNumber,
                  question_options: options,
                  question_id: questionList[questionNumber].question_id,
                },
              },
            });
          }}
        />
        <div className="question-close-button-container">
          <button
            className="question-cancel-button"
            onClick={() => {
              console.log("Clicked the Remove Button");
              // TODO: Add remove function
            }}
          >
            <img className="close-icon" src={CloseIcon} alt="Close Question" />
          </button>
        </div>
      </div>
      <div className="upload-file-container">
        <Dragger {...props} style={{ flex: 1 }}>
          <img className="upload-icon" src={UploadIcon} alt="Upload File" />
          <p>Drag and Drop Files</p>
        </Dragger>
      </div>
      <div className="question-footer-row">
        <div className="question-logic-added-sign">Logic Added</div>
        <div className="question-required-checkbox">
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: "#AEAEAE",
                }}
                // onChange={handleChange}
              />
            }
            label={"Required"}
          />
        </div>
      </div>
    </div>
  );
};
