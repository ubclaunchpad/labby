import { Upload } from "antd";
import "./index.css";
import DownloadIcon from "../../assets/FileDownload.png";
import AWS from "aws-sdk";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import X from "../../assets/X.png";
import "./index.css";
import "../../index.css";
import {
  DELETE_QUESTION,
  SAVE_QUESTION,
} from "../../redux/actions/questionActions";
import { SET_LOGIC_QUESTION } from "../../redux/actions/logicActions";

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
          }}
        />
      </div>
      <div className="download-file-container">
        <Dragger {...props} style={{ borderRadius: 10 }}>
          <img className="download-icon" src={DownloadIcon} alt="Download File" />
          <p>Download File</p>
        </Dragger>
      </div>
      <div className="GlobalEditorComponentFooter">
        <div className="GlobalEditorLogicAdded">Logic Added</div>
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
            }}
          />
          Required
        </div>
      </div>
    </div>
  );
}

export default FileDownload;
