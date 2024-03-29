import { Upload } from "antd";
import "./index.css";
import DownloadIcon from "../../../assets/FileDownload.png";
import AWS from "aws-sdk";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import X from "../../../assets/X.png";
import DragDots from "../../../assets/DragDots.png";
import "../../../index.css";
import {
  DELETE_ANSWER,
  DELETE_QUESTION,
  LOAD_QUESTION,
  SAVE_ANSWER,
  SAVE_QUESTION,
} from "../../../redux/actions/questionActions";
import { SET_LOGIC_QUESTION } from "../../../redux/actions/logicActions";
import uuid from "react-uuid";
import EditComponentFooter from "../../EditComponentFooter";

const { Dragger } = Upload;

const config = new AWS.Config({
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  region: "ca-central-1",
});

function FileDownloadEditor({ question }) {
  const dispatch = useDispatch();
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );
  const [questionNum, setQuestionNum] = useState("");
  const [title, setTitle] = useState("");
  const answerList = useSelector((state) => state.questionReducer.answerList);
  const [options, setOptions] = useState([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    console.log(question);
    setQuestionNum(`Q${question.position_index}`);
    setTitle(question.question);
    setNote(question.question_note);
  }, [question]);

  useEffect(() => {
    const optionList = answerList[question.question_id ?? ""] ?? [];
    setOptions(optionList);
  }, [answerList, question]);

  function uploadFile({ file, onError, onProgress, onSuccess, question }) {
    AWS.config.update(config);
    const fileName = question.question_id + "_" + file.name;

    const S3 = new AWS.S3({});
    console.log("DEBUG filename: ", fileName);
    console.log("DEBUG file type ", file.type);

    const objParams = {
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: `fileDownload/${fileName}`,
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
          dispatch({
            type: SAVE_ANSWER,
            payload: {
              answer_id: uuid(),
              fk_question_id: question.question_id,
              question_type: question.question_type,
              answer: fileName,
              form_id: question.fk_form_id,
            },
          });
        }
      });
  }

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
          placeholder="Click to write your question here..."
          onBlur={(text) => {
            dispatch({
              type: SAVE_QUESTION,
              payload: {
                ...question,
                form_id: question.fk_form_id,
                question_title: text.target.value,
                question_index: question.position_index,
              },
            });
            dispatch({ type: LOAD_QUESTION, payload: question.fk_form_id });
          }}
        />
        <img
          className="GlobalEditorDelete"
          src={X}
          alt="Delete"
          onClick={() => {
            questionList.forEach((questionObj) => {
              if (questionObj.position_index >= question.position_index) {
                questionObj.question_index = questionObj.position_index - 1;
                questionObj.question_title = questionObj.question;
                questionObj.form_id = questionObj.fk_form_id;
                dispatch({ type: SAVE_QUESTION, payload: questionObj });
              }
            });
            dispatch({
              type: DELETE_QUESTION,
              payload: {
                question_id: question.question_id,
              },
            });
            dispatch({ type: LOAD_QUESTION, payload: question.fk_form_id });
          }}
        />
      </div>
      <input
        className="GlobalEditorQuestionNoteInput"
        defaultValue={note}
        placeholder="Type question note here..."
        onBlur={(text) => {
          dispatch({
            type: SAVE_QUESTION,
            payload: {
              ...question,
              form_id: question.fk_form_id,
              question_title: question.question,
              question_note: text.target.value,
              question_index: question.position_index,
            },
          });
          dispatch({ type: LOAD_QUESTION, payload: question.fk_form_id });
        }}
      />
      <div className="download-file-container">
        <img className="GlobalDragDot" src={DragDots} alt="DragDots" />
        <div className="download-file-container-inner">
          <Dragger
            multiple={true}
            customRequest={({ file, onError, onProgress, onSuccess }) => {
              uploadFile({ file, onError, onProgress, onSuccess, question });
            }}
            showUploadList={false}
            style={{ borderRadius: 10 }}
          >
            <img
              className="download-icon"
              src={DownloadIcon}
              alt="Download File"
            />
            <p className="download-text" style={{ marginBottom: 20 }}>
              Upload File For Customer to Download
            </p>
          </Dragger>
          {options.map((option) => (
            <div
              className="download-file-container-delete"
              key={option.answer_id}
              onClick={() => {
                AWS.config.update(config);
                const S3 = new AWS.S3({});
                const objParams = {
                  Bucket: process.env.REACT_APP_S3_BUCKET,
                  Key: `fileDownload/${option.answer}`,
                };
                S3.deleteObject(objParams, function (err, _) {
                  if (err) {
                    console.log("Issue in S3.deleteObject()");
                    console.log(`Error Code: ${err.code}`);
                    console.log(`Error Message: ${err.message}`);
                  } else {
                    console.log("Delete completed in S3.deleteObject()");
                    dispatch({
                      type: DELETE_ANSWER,
                      payload: {
                        answer_id: option.answer_id,
                        form_id: question.fk_form_id,
                      },
                    });
                    setOptions([]);
                  }
                });
              }}
            >
              <img className="download-icon-delete" src={X} alt="Delete File" />
              <p className="download-text-customer">
                Delete {option.answer.split("_")[1]}
              </p>
            </div>
          ))}
        </div>
      </div>
      <EditComponentFooter question={question} />
    </div>
  );
}

export default FileDownloadEditor;
