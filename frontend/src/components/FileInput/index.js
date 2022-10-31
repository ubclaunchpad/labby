import React, { useState } from "react";
import { message, Upload } from "antd";
import "./index.css";
import UploadIcon from "../../assets/FileUpload.png";
import CloseIcon from "../../assets/Close.png";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox, ClickAwayListener } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_QUESTION } from "../../redux/actions/questionActions";
import AWS from "aws-sdk";
const { Dragger } = Upload;

const defaultLabel = "File Input Title: ";

const getDatetime = () => {
  return new Date().toLocaleString().replaceAll("/", "");
};

const config = new AWS.Config({
  // Deprecated method of passing accessKeyId and secretAccessKey -- could not get new method to work
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  region: "ca-central-1",
});

const props = {
  multiple: true,
  customRequest({ file, onError, onProgress, onSuccess }) {
    AWS.config.update(config);

    const S3 = new AWS.S3({});
    console.log("DEBUG filename: ", file.name);
    console.log("DEBUG file type ", file.type);

    const objParams = {
      Bucket: "labby-app",
      // TODO: Check how we should name object keys
      Key: `fileInput/${getDatetime()}/${file.name}`,
      Body: file,
      ContentType: file.type,
    };

    // TODO: Need to change where it only uploads to bucket upon form submission
    S3.putObject(objParams)
      .on("httpUploadProgress", function ({ loaded, total }) {
        onProgress(
          {
            percent: Math.round((loaded / total) * 100),
          },
          file
        );
      })
      .send(function (err, data) {
        if (err) {
          onError();
          console.log("Issue in S3.putObject.send()");
          console.log(`Error Code: ${err.code}`);
          console.log(`Error Message: ${err.message}`);
        } else {
          onSuccess(data.response, file);
          console.log("Send completed in S3.putObject.send()");
        }
      });
  },
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
            // DOUBLE CHECK HOW THIS SHOULD GO ==========================
            setQuestionName(e.target.value);
            dispatch({
              type: SAVE_QUESTION,
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
        <Dragger {...props}>
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
