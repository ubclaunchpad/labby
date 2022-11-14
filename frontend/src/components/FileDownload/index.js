import { Upload } from "antd";
import "./index.css";
import DownloadIcon from "../../assets/FileDownload.png";
import AWS from "aws-sdk";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import X from "../../assets/X.png";
import DragDots from "../../assets/DragDots.png";
import "./index.css";
import "../../index.css";
import {
  DELETE_QUESTION,
  LOAD_QUESTION,
  SAVE_QUESTION,
} from "../../redux/actions/questionActions";
import {
  SET_LOGIC_QUESTION,
  SET_LOGIC_VIEW_QUESTION,
} from "../../redux/actions/logicActions";
import { TOGGLE_LOGIC } from "../../redux/actions/uiActions";

const { Dragger } = Upload;

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
      Key: `fileInput/${file.name}`,
      Body: file,
      ContentType: file.type,
    };

    S3.putObject(objParams)
      .on("httpDownloadProgress", function ({ loaded, total }) {
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

function FileDownload({ question }) {
  const dispatch = useDispatch();
  const logicList = useSelector((state) => state.logicReducer.logicList);
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );
  const [questionNum, setQuestionNum] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log(question);
    setQuestionNum(`Q${question.position_index}`);
    setTitle(question.question);
  }, [question]);

  return (
    <div className="GlobalEditorComponent">
      <div className="GlobalEditorComponentHeader">
        <div
          className="GlobalEditorQuestionNumber"
          onClick={() => {
            dispatch({
              type: SET_LOGIC_QUESTION,
              payload: question,
            });
          }}
        >
          {questionNum}
        </div>
        <input
          className="GlobalEditorQuestionTitleInput"
          defaultValue={title}
          placeholder="Type your form name here..."
          onBlur={(text) => {
            dispatch({
              type: SAVE_QUESTION,
              payload: {
                ...question,
                question_title: text.target.value,
                question_index: question.position_index,
              },
            });
            dispatch({ type: LOAD_QUESTION });
          }}
        />
        <img
          className="GlobalEditorDelete"
          src={X}
          alt="Delete"
          onClick={() => {
            dispatch({
              type: DELETE_QUESTION,
              payload: {
                question_id: question.question_id,
              },
            });
            questionList.forEach((questionObj) => {
              if (questionObj.position_index >= question.position_index) {
                questionObj.question_index = questionObj.position_index - 1;
                questionObj.question_title = questionObj.question;
                dispatch({ type: SAVE_QUESTION, payload: questionObj });
              }
            });
            dispatch({ type: LOAD_QUESTION });
          }}
        />
      </div>
      <div className="download-file-container">
        <img className="GlobalDragDot" src={DragDots} alt="DragDots" />
        <div className="download-file-container-inner">
          <Dragger {...props} style={{ borderRadius: 10 }}>
            <img
              className="download-icon"
              src={DownloadIcon}
              alt="Download File"
            />
            <p className="download-text" style={{marginBottom: 20}}>
              Upload File For Customer to Download
            </p>
          </Dragger>
        </div>
      </div>
      <div className="GlobalEditorComponentFooter">
        {logicList[question.question_id] ? (
          <div
            className="GlobalEditorLogicAdded"
            onClick={() => {
              dispatch({
                type: TOGGLE_LOGIC,
                payload: true,
              });
              dispatch({
                type: SET_LOGIC_VIEW_QUESTION,
                payload: question,
              });
            }}
          >
            Logic Added
          </div>
        ) : (
          <div />
        )}
        <div className="GlobalEditorRequiredQuestion">
          <Checkbox
            style={{ color: "#AEAEAE", padding: 3 }}
            checked={question.mandatory === 1}
            onClick={(e) => {
              dispatch({
                type: SAVE_QUESTION,
                payload: {
                  ...question,
                  mandatory: e.target.checked,
                  question_index: question.position_index,
                },
              });
              dispatch({ type: LOAD_QUESTION });
            }}
          />
          Required
        </div>
      </div>
    </div>
  );
}

export default FileDownload;
