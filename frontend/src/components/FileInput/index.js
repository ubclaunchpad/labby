import { Upload } from "antd";
import "./index.css";
import UploadIcon from "../../assets/FileUpload.png";
// import AWS from "aws-sdk";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import X from "../../assets/X.png";
import "./index.css";
import "../../index.css";
import {
  DELETE_QUESTION,
  SAVE_QUESTION,
} from "../../redux/actions/questionActions";
import { SET_LOGIC_QUESTION, SET_LOGIC_VIEW_QUESTION } from "../../redux/actions/logicActions";
import { TOGGLE_LOGIC } from "../../redux/actions/uiActions";

const { Dragger } = Upload;

// const getDatetime = () => {
//   return new Date()
//     .toLocaleString("en-CA", {
//       hour12: false,
//     })
//     .replaceAll("/", "")
//     .replace(",", "");
// };

// const config = new AWS.Config({
//   // Deprecated method of passing accessKeyId and secretAccessKey -- could not get new method to work
//   accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
//   secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
//   region: "ca-central-1",
// });

// USE FOR CLIENT-SIDED COMPONENT
const props = {
  onChange: () => {
    console.log("Uploading to S3 disabled on lab-sided component");
  },

  //  ============= UNCOMMENT BELOW FOR CLIENT-SIDED COMPONENT ===============
  //   multiple: true,
  //   customRequest({ file, onError, onProgress, onSuccess }) {
  //     AWS.config.update(config);
  //     const S3 = new AWS.S3({});
  //     console.log("DEBUG filename: ", file.name);
  //     console.log("DEBUG file type ", file.type);
  //     const objParams = {
  //       Bucket: "labby-app",
  //       // TODO: Eventually change object key to question number + random generated ID/number
  //       // need to save the randomly generated ID/number so it can also be retrieved
  //       Key: `fileInput/${getDatetime()}/${file.name}`,
  //       Body: file,
  //       ContentType: file.type,
  //     };
  //     // TODO: Need to change where it only uploads to bucket upon form submission
  //     S3.putObject(objParams)
  //       .on("httpUploadProgress", function ({ loaded, total }) {
  //         onProgress(
  //           {
  //             percent: Math.round((loaded / total) * 100),
  //           },
  //           file
  //         );
  //       })
  //       .send(function (err, data) {
  //         if (err) {
  //           onError();
  //           console.log("Issue in S3.putObject.send()");
  //           console.log(`Error Code: ${err.code}`);
  //           console.log(`Error Message: ${err.message}`);
  //         } else {
  //           onSuccess(data.response, file);
  //           console.log("Send completed in S3.putObject.send()");
  //         }
  //       });
  //   },
  // ============= UNCOMMENT ABOVE FOR CLIENT-SIDED COMPONENT ===============
};

function FileInput({ question }) {
  const dispatch = useDispatch();
  const logicList = useSelector((state) => state.logicReducer.logicList);
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
      <div className="upload-file-container">
        <Dragger {...props} style={{ borderRadius: 10 }}>
          <img className="upload-icon" src={UploadIcon} alt="Upload File" />
          <p>Drag and Drop Files</p>
        </Dragger>
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
            }}
          />
          Required
        </div>
      </div>
    </div>
  );
}

export default FileInput;
