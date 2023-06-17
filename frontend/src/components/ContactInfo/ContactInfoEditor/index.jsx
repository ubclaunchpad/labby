import "./index.css";
import "../../index.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import X from "../../../assets/X.png";
import DragDots from "../../../assets/DragDots.png";
import {
  DELETE_QUESTION,
  LOAD_QUESTION,
  SAVE_QUESTION,
} from "../../../redux/actions/questionActions";
import { SET_LOGIC_QUESTION } from "../../../redux/actions/logicActions";
import EditComponentFooter from "../../EditComponentFooter";

function ContactInfoEditor({ question }) {
  const dispatch = useDispatch();
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );
  const [questionNum, setQuestionNum] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

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
          <div className="contact-info-row">
            <span className="contact-info-field-label">Full Name</span>
            <input
              className="contact-info-user-input"
              placeholder="User Types Here... "
            />
          </div>
          <div className="contact-info-row">
            <span className="contact-info-field-label">Institution</span>
            <input
              className="contact-info-user-input"
              placeholder="User Types Here... "
            />
          </div>
          <div className="contact-info-row">
            <span className="contact-info-field-label">Email</span>
            <input
              className="contact-info-user-input"
              placeholder="User Types Here... "
            />
          </div>
          <div className="contact-info-row">
            <span className="contact-info-field-label">Telephone</span>
            <input
              className="contact-info-user-input"
              placeholder="User Types Here... "
            />
          </div>
          <div className="contact-info-row">
            <span className="contact-info-field-label">Financial Contact</span>
            <input
              className="contact-info-user-input"
              placeholder="User Types Here... "
            />
          </div>
          <div className="contact-info-row">
            <span className="contact-info-field-label">Additional Fields For Internal Customers</span>
          </div>
          <div className="contact-info-row">
            <span className="contact-info-field-label">Investigator(s)</span>
            <input
              className="contact-info-user-input"
              placeholder="User Types Here... "
            />
          </div>
          <div className="contact-info-row">
            <span className="contact-info-field-label">UBC Worktag (XX###)</span>
            <input
              className="contact-info-user-input"
              placeholder="User Types Here... "
            />
          </div>
          <div className="contact-info-row">
            <span className="contact-info-field-label">Additional Fields For External Customers</span>
          </div>
          <div className="contact-info-row">
            <span className="contact-info-field-label">Address</span>
            <input
              className="contact-info-user-input"
              placeholder="User Types Here... "
            />
          </div>
          <div className="contact-info-row">
            <span className="contact-info-field-label">Account Information</span>
            <input
              className="contact-info-user-input"
              placeholder="User Types Here... "
            />
          </div>
        </div>
      </div>
      {/* Copy Everything Except Content Above For Reusability */}
      <EditComponentFooter question={question} />
    </div>
  );
}

export default ContactInfoEditor;
