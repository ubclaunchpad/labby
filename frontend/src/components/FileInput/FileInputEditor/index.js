import { Upload } from "antd";
import "./index.css";
import UploadIcon from "../../../assets/FileUpload.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import X from "../../../assets/X.png";
import DragDots from "../../../assets/DragDots.png";
import "./index.css";
import "../../index.css";
import {
  DELETE_QUESTION,
  LOAD_QUESTION,
  SAVE_QUESTION,
} from "../../../redux/actions/questionActions";
import { SET_LOGIC_QUESTION } from "../../../redux/actions/logicActions";
import EditComponentFooter from "../../EditComponentFooter";

const { Dragger } = Upload;

const props = {
  onChange: () => {
    console.log("Uploading to S3 disabled on lab-sided component");
  },
};

function FileInputEditor({ question }) {
  const dispatch = useDispatch();
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
      <EditComponentFooter question={question} />
    </div>
  );
}

export default FileInputEditor;
