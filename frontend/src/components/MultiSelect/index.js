import "./index.css";
import "../index.css";
import { useEffect, useState } from "react";
import X from "../../assets/X.png";
import DragDots from "../../assets/DragDots.png";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import {
  DELETE_ANSWER,
  DELETE_QUESTION,
  LOAD_QUESTION,
  SAVE_ANSWER,
  SAVE_QUESTION,
} from "../../redux/actions/questionActions";
import {
  SET_LOGIC_QUESTION,
  SET_LOGIC_VIEW_QUESTION,
} from "../../redux/actions/logicActions";
import { TOGGLE_LOGIC } from "../../redux/actions/uiActions";

function MultiSelect({ question }) {
  const dispatch = useDispatch();
  const logicList = useSelector((state) => state.logicReducer.logicList);
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );

  const [options, setOptions] = useState([]);
  const answerList = useSelector((state) => state.questionReducer.answerList);

  const [questionNum, setQuestionNum] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    setQuestionNum(`Q${question.position_index ?? 0}`);
    setTitle(question.question ?? "");
  }, [question]);

  useEffect(() => {
    var optionList = answerList[question.question_id ?? ""] ?? [];
    optionList = optionList.sort((a, b) => {
      let fa = a.answer;
      let fb = b.answer;

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    optionList = optionList.filter((option) => option !== "");
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
      <div className="customer__component__subtitle">Select all that apply</div>

      {/* Copy Everything Except Content Below For Reusability */}
      <div className="single-select-options-container">
        <img className="GlobalDragDot" src={DragDots} alt="DragDots" />
        <FormControl style={{ width: "100%" }}>
          {options.map((option, index) => {
            return (
              <div className="single-select-option" key={index}>
                <FormControlLabel control={<Checkbox />} />
                <input
                  type="text"
                  className="new-question-input"
                  defaultValue={option.answer}
                  placeholder="Click to add new option "
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
                        },
                      });
                    } else {
                      dispatch({
                        type: DELETE_ANSWER,
                        payload: {
                          answer_id: option.answer_id,
                        },
                      });
                    }
                    setOptions([]);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.target.blur();
                    }
                  }}
                />
              </div>
            );
          })}
        </FormControl>
      </div>
      {/* Copy Everything Except Content Above For Reusability */}
      <div className="GlobalEditorComponentFooter"></div>
    </div>
  );
}

export default MultiSelect;
