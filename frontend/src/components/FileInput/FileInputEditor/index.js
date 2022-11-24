import { Upload } from "antd";
import "./index.css";
import UploadIcon from "../../../assets/FileUpload.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import X from "../../../assets/X.png";
import DragDots from "../../../assets/DragDots.png";
import "./index.css";
import "../../index.css";
import {
  DELETE_QUESTION,
  LOAD_QUESTION,
  SAVE_QUESTION,
} from "../../../redux/actions/questionActions";
import {
  SET_LOGIC_QUESTION,
  SET_LOGIC_VIEW_QUESTION,
} from "../../../redux/actions/logicActions";
import { TOGGLE_LOGIC } from "../../../redux/actions/uiActions";

const { Dragger } = Upload;

const props = {
  onChange: () => {
    console.log("Uploading to S3 disabled on lab-sided component");
  },
};

function FileInputEditor({ question }) {
  const dispatch = useDispatch();
  const logicList = useSelector((state) => state.logicReducer.logicList);
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );
  const [questionNum, setQuestionNum] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
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
            questionList.forEach((questionObj) => {
              if (questionObj.position_index >= question.position_index) {
                questionObj.question_index = questionObj.position_index - 1;
                questionObj.question_title = questionObj.question;
                dispatch({ type: SAVE_QUESTION, payload: questionObj });
              }
            });
            dispatch({
              type: DELETE_QUESTION,
              payload: {
                question_id: question.question_id,
              },
            });
            dispatch({ type: LOAD_QUESTION });
          }}
        />
      </div>
      <div className="upload-file-container">
        <img className="GlobalDragDot" src={DragDots} alt="DragDots" />
        <div className="upload-file-container-inner">
          <Dragger {...props} style={{ borderRadius: 10 }}>
            <img className="upload-icon" src={UploadIcon} alt="Upload File" />
            <p className="upload-text" style={{ marginBottom: 20 }}>
              Customer Will Upload File Here
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
                  question_title: question.question,
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

export default FileInputEditor;
