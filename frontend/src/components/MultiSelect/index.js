import "./index.css";
import { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import {
  DELETE_ANSWER,
  SAVE_ANSWER,
} from "../../redux/actions/questionActions";

function MultiSelect({ question }) {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const answerList = useSelector((state) => state.questionReducer.answerList);

  useEffect(() => {
    console.log(answerList);
    var optionList = answerList[question.question_id ?? ""] ?? [];
    if (!optionList.includes("")) {
      optionList.push("");
    }
    setOptions(optionList);
  }, [answerList, question]);

  return (
    <div className="GlobalEditorComponent">
      <div className="GlobalEditorComponentHeader">
        <div className="customer__component__title">{question.question}</div>
      </div>
      <div className="customer__component__subtitle">Select all that apply</div>

      {/* Copy Everything Except Content Below For Reusability */}
      <div className="single-select-options-container">
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
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
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
