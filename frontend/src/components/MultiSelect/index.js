import "./index.css";
import "../index.css";
import { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Divider from "../Divider";
import { ADD_RESPONSE, REMOVE_RESPONSE } from "../../redux/actions/formActions";
import uuid from "react-uuid";

function MultiSelect({ question }) {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const answerList = useSelector((state) => state.questionReducer.answerList);

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
    setOptions(optionList);
  }, [answerList, question]);

  return (
    <div className="GlobalCustomerQuestionContainer">
      <div className="GlobalQuestionTitle">
        {question.question}{" "}
        <p style={{ color: "red" }}>{question.mandatory ? "*" : ""}</p>
      </div>
      <div className="customer__component__subtitle">Select all that apply</div>
      <div className="single-select-options-container">
        <FormControl style={{ width: "100%" }}>
          {options.map((option, index) => {
            return (
              <div className="single-select-option" key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onClick={(e) => {
                        if (e.target.checked) {
                          dispatch({
                            type: ADD_RESPONSE,
                            payload: {
                              id: uuid(),
                              response: option.answer_id,
                              question: question,
                            },
                          });
                        } else {
                          dispatch({
                            type: REMOVE_RESPONSE,
                            payload: {
                              response: option.answer_id,
                              question: question,
                            },
                          });
                        }
                      }}
                    />
                  }
                />
                <div className="new-question-input">{option.answer}</div>
              </div>
            );
          })}
        </FormControl>
      </div>
      <Divider />
    </div>
  );
}

export default MultiSelect;
