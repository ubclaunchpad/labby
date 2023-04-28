import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Checkbox } from "@mui/material";
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

function TextAnswerEditor({ question }) {
  const dispatch = useDispatch();
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );
  const [questionNum, setQuestionNum] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [numericalAnsOnly, setNumericalAnsOnly] = useState(false);

  useEffect(() => {
    setQuestionNum(`Q${question.position_index}`);
    setTitle(question.question);
    setNote(question.question_note);
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
      <div className="editorInstructions">
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
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                onClick={() => setNumericalAnsOnly(!numericalAnsOnly)}
              />
            }
            label={<span className="">Only allow numerical answers</span>}
          />
        </FormControl>
      </div>
      <div className="text-box-container">
        <img className="GlobalDragDot" src={DragDots} alt="DragDots" />
        {!numericalAnsOnly ? (
          <Input.TextArea
            placeholder="[Height of input automatically adjusts based on content] User types here..."
            autoSize={{
              minRows: 1,
              maxRows: 5,
            }}
            className="text-box"
          />
        ) : (
          <Input
            placeholder="User types numerical answer here..."
            className="text-box"
            type="number"
          />
        )}
      </div>
      <EditComponentFooter question={question} />
    </div>
  );
}

export default TextAnswerEditor;
