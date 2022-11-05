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
    <div className="GlobalEditorComponent  GlobalEditorComponent--heading ">
      <div className="GlobalEditorComponentHeader">
        <input
          className="GlobalEditorQuestionTitleInput"
          defaultValue={title}
          placeholder="Type your heading here..."
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
     
      <div className="GlobalEditorComponentFooter">
        <div className="GlobalEditorLogicAdded">Logic Added</div>
      </div>
    </div>
  );
}

export default Heading;
