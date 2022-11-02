import "./index.css";
import "../index.css";
import { useEffect, useState } from "react";
import X from "../../assets/X.png";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Checkbox, FormGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import {
  SAVE_ANSWER,
  SAVE_QUESTION,
} from "../../redux/actions/questionActions";

function MultiSelect({ question }) {
  const dispatch = useDispatch();

  const [options, setOptions] = useState([]);
  const answerList = useSelector((state) => state.questionReducer.answerList);

  const [questionNum, setQuestionNum] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log(question);
    setQuestionNum(`Q${question.position_index}`);
    setTitle(question.question);
  }, [question]);

  useEffect(() => {
    console.log(answerList);
    setOptions(answerList[question.question_id] ?? []);
  }, [answerList, question]);

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
      <div className="single-select-options-container">
        <FormControl>
          <FormGroup>
            {options.map((option, index) => {
              return (
                <div className="single-select-option" key={index}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={option.answer}
                  />
                </div>
              );
            })}
          </FormGroup>
          <div className="new-question-input-container">
            <div className="new-question-checkbox">
              <FormControlLabel control={<Checkbox />} />
            </div>

            <input
              type="text"
              className="new-question-input"
              defaultValue={""}
              placeholder="Click to add new option "
              onBlur={(e) => {
                const answerVal = e.target.value;
                if (answerVal.trim() !== "") {
                  dispatch({
                    type: SAVE_ANSWER,
                    payload: {
                      answer_id: uuid(),
                      fk_question_id: question.question_id,
                      question_type: question.question_type,
                      answer: answerVal,
                    },
                  });
                }
                e.target.value = "";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const answerVal = e.target.value;
                  if (answerVal.trim() !== "") {
                    dispatch({
                      type: SAVE_ANSWER,
                      payload: {
                        answer_id: uuid(),
                        fk_question_id: question.question_id,
                        question_type: question.question_type,
                        answer: answerVal,
                      },
                    });
                  }
                  e.target.value = "";
                }
              }}
            />
          </div>
        </FormControl>
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

export default MultiSelect;
