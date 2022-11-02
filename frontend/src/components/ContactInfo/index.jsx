import "./index.css";
import "../index.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import X from "../../assets/X.png";
import "./index.css";
import "../index.css";
import {
  SAVE_QUESTION,
} from "../../redux/actions/questionActions";

function ContactInfo({ question }) {
  const dispatch = useDispatch();
  const [questionNum, setQuestionNum] = useState("");
  const [title, setTitle] = useState("");

  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );
  useEffect(() => {
    console.log(questionList);
  }, [questionList]);

  const [fullName, setFullName] = useState("");
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  useEffect(() => {
    const fields = { fullName, institution, email, telephone };
    console.log(fields);
  }, [fullName, institution, email, telephone]);

  useEffect(() => {
    console.log(question);
    setQuestionNum(`Q${question.position_index}`);
    setTitle(question.question);
  }, [question]);

  return (
    <div className="GlobalEditorComponent">
      <div className="GlobalEditorComponentHeader">
        <div className="GlobalEditorQuestionNumber">{questionNum}</div>
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
            console.log("Delete");
          }}
        />
      </div>
      {/* Copy Everything Except Content Below For Reusability */}
      <div className="contact-info-container">
        <div className="contact-info-row">
          <span className="contact-info-field-label">First Name</span>
          <input
            className="contact-info-user-input"
            type="text"
            placeholder="User Types Here... "
            onBlur={(e) => {
              setFullName(e.target.value);
            }}
          ></input>
        </div>
        <div className="contact-info-row">
          <span className="contact-info-field-label">Institution</span>
          <input
            className="contact-info-user-input"
            type="text"
            placeholder="User Types Here... "
            onBlur={(e) => {
              setInstitution(e.target.value);
            }}
          ></input>
        </div>
        <div className="contact-info-row">
          <span className="contact-info-field-label">Email</span>
          <input
            className="contact-info-user-input"
            type="email"
            placeholder="User Types Here... "
            onBlur={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className="contact-info-row">
          <span className="contact-info-field-label">Telephone</span>
          <input
            className="contact-info-user-input"
            type="number"
            placeholder="User Types Here... "
            onBlur={(e) => {
              setTelephone(e.target.value);
            }}
          ></input>
        </div>
      </div>
      {/* Copy Everything Except Content Above For Reusability */}
      <div className="GlobalEditorComponentFooter">
        <div className="GlobalEditorLogicAdded">Logic Added</div>
        <div className="GlobalEditorRequiredQuestion">
          <Checkbox style={{ color: "#AEAEAE", padding: 3 }} />
          Required
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;