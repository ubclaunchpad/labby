import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { appColor } from "../../../constants";
import { useEffect, useState } from "react";
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

const TextBox = () => {
  return <div className="text-box-container"><Input.TextArea
    placeholder="User types here..."
    rows={5}
    className="text-box"
  /></div>;
};


function TextAnswerEditor({ question }) {
  const dispatch = useDispatch();
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );
  const [questionNum, setQuestionNum] = useState("");
  const [title, setTitle] = useState("");
  const [inputList, setInputList] = useState([]);

  useEffect(() => {
    setQuestionNum(`Q${question.position_index}`);
    setTitle(question.question);
    for (let i = 1; i < question.quantity; i++) {
      setInputList(inputList.concat(<TextBox key={inputList.length} />));
    }
  }, [question]);

  const onAddBtnClick = event => {
    setInputList(inputList.concat(<TextBox key={inputList.length} />));
    dispatch({
      type: SAVE_QUESTION,
      payload: {
        ...question,
        form_id: question.fk_form_id,
        question_index: question.position_index,
        quantity: (inputList.length+2),
      },
    });
    //dispatch({ type: LOAD_QUESTION, payload: question.fk_form_id });
  };

  const onSubBtnClick = event => {
    setInputList(inputList.slice(0, inputList.length - 1));
    dispatch({
      type: SAVE_QUESTION,
      payload: {
        ...question,
        form_id: question.fk_form_id,
        question_index: question.position_index,
        quantity: (inputList.length),
      },
    });
  };

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
                quantity: (inputList.length+1),
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
      <div className="text-box-container">
        <img className="GlobalDragDot" src={DragDots} alt="DragDots" />
        <Input.TextArea
          placeholder="User types here..."
          rows={5}
          className="text-box"
        />
      </div>
      {inputList}
      <div className="ControlButtonContainer">
        <button className="add-button"
          style={{
            backgroundColor: appColor.lightGray,
            color: appColor.darkGray,
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = appColor.darkGray;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = appColor.lightGray;
          }}
          onClick={() => {
            onAddBtnClick();
          }}
        > + </button>
        <button className="add-button"
          style={{
            backgroundColor: appColor.lightGray,
            color: appColor.darkGray,
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = appColor.darkGray;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = appColor.lightGray;
          }}
          onClick={() => {
            onSubBtnClick();
          }}
        > - </button>
      </div>
      <EditComponentFooter question={question} />
    </div>
  );
}

export default TextAnswerEditor;
