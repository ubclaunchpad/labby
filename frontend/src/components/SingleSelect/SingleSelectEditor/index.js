import "./index.css";
import "../../index.css";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import X from "../../../assets/X.png";
import DragDots from "../../../assets/DragDots.png";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
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

function SingleSelectEditor({ question }) {
  const dispatch = useDispatch();
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );

  const [options, setOptions] = useState([]);
  const answerList = useSelector((state) => state.questionReducer.answerList);

  const [questionNum, setQuestionNum] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

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
      <div className="single-select-options-container">
        <img className="GlobalDragDot" src={DragDots} alt="DragDots" />
        <FormControl style={{ width: "100%" }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {options.map((option, index) => {
              return (
                <div className="single-select-option" key={index}>
                  <FormControlLabel control={<Radio />} />
                  <input
                    type="text"
                    className="new-question-input"
                    defaultValue={option.answer}
                    placeholder="Click to add new option"
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
                    //   If we want to have key down functionality as well:
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.target.blur();
                      }
                    }}
                  />
                </div>
              );
            })}
          </RadioGroup>
        </FormControl>
      </div>
      {/* Copy Everything Except Content Above For Reusability */}
      <EditComponentFooter question={question} />
    </div>
  );
}

export default SingleSelectEditor;
