import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import X from "../../assets/X.png";
import DragDots from "../../assets/DragDots.png";
import "./index.css";
import "../index.css";
import {
  DELETE_QUESTION,
  LOAD_QUESTION,
  SAVE_QUESTION,
} from "../../redux/actions/questionActions";
import {
  SET_LOGIC_QUESTION,
  SET_LOGIC_VIEW_QUESTION,
} from "../../redux/actions/logicActions";
import { TOGGLE_LOGIC } from "../../redux/actions/uiActions";

function Heading({ question }) {
  const dispatch = useDispatch();
  const logicList = useSelector((state) => state.logicReducer.logicList);
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );
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
        <div> {question.question} </div>
      </div>
    </div>
  );
}

export default Heading;
