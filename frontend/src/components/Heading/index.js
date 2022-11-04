import { Input } from "antd";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import X from "../../assets/X.png";
import "./index.css";
import "../index.css";
import {
  DELETE_QUESTION,
  SAVE_QUESTION,
} from "../../redux/actions/questionActions";

function Heading({ question }) {
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
            dispatch({
              type: DELETE_QUESTION,
              payload: {
                question_id: question.question_id,
              },
            });
          }}
        />
      </div>
      <div className="text-box-container">
        <Input.TextArea
          placeholder="User types here..."
          // onBlur={(text) => {
          //   dispatch({
          //     type: SAVE_QUESTION,
          //     payload: {
          //       ...question,
          //       question_type: "textAnswer",
          //       question_text: text.target.value,
          //       question_index: question.position_index,
          //     },
          //   });
          // }}

          // TODO: Fix dispatch call
          onBlur={() => {
            console.log("TODO: Fix this dispatch call");
          }}
          rows={3}
          className="text-box"
        />
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

export default Heading;
