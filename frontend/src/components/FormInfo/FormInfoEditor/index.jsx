import "./index.css";
import "../../index.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import X from "../../../assets/X.png";
import DragDots from "../../../assets/DragDots.png";
import {
  DELETE_ANSWER,
  DELETE_QUESTION,
  LOAD_QUESTION,
  SAVE_ANSWER,
  SAVE_QUESTION,
} from "../../../redux/actions/questionActions";
import { SET_LOGIC_QUESTION } from "../../../redux/actions/logicActions";
import EditComponentFooter from "../../EditComponentFooter";
import { getQuestionOptions } from "../../../utils/componentUtils";
import uuid from "react-uuid";

function FormInfoEditor({ question }) {
  const dispatch = useDispatch();
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );
  const answerList = useSelector((state) => state.questionReducer.answerList);
  const [questionNum, setQuestionNum] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setQuestionNum(`Q${question.position_index}`);
    setTitle(question.question);
    setNote(question.question_note);
  }, [question]);

  useEffect(() => {
    var optionList = getQuestionOptions(answerList, question);
    optionList.push("");
    setOptions(optionList);
  }, [answerList, question]);

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
      {/* Copy Everything Except Content Below For Reusability */}
      <div className="contact-info-container">
        <img className="GlobalDragDot" src={DragDots} alt="DragDots" />
        <div className="contact-info-container-inner">
          {options.map((option, index) => {
            return (
              <div className="contact-info-row" key={option.answer_id ?? index}>
                <input
                  className="form-editor-info-user-input"
                  placeholder="Type New Field Input Here..."
                  defaultValue={option.answer}
                  onBlur={(e) => {
                    const answerVal = e.target.value;
                    if (answerVal.trim() !== "") {
                      dispatch({
                        type: SAVE_ANSWER,
                        payload: {
                          answer_id: option.answer_id ?? uuid(),
                          fk_question_id: question.question_id,
                          question_type: question.question_type,
                          answer: answerVal,
                          form_id: question.fk_form_id,
                        },
                      });
                    } else {
                      dispatch({
                        type: DELETE_ANSWER,
                        payload: {
                          answer_id: option.answer_id,
                          form_id: question.fk_form_id,
                        },
                      });
                    }
                    setOptions([]);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* Copy Everything Except Content Above For Reusability */}
      <EditComponentFooter question={question} />
    </div>
  );
}

export default FormInfoEditor;
