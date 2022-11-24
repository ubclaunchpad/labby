import "./index.css";
import "../index.css";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import Divider from "../Divider";
import {
  ADD_RESPONSE,
  REMOVE_SINGLE_RESPONSE,
} from "../../redux/actions/formActions";
import uuid from "react-uuid";

function SingleSelect({ question }) {
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
      <div className="single-select-options-container">
        <FormControl style={{ width: "100%" }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            {options.map((option, index) => {
              return (
                <div className="single-select-option" key={index}>
                  <FormControlLabel
                    value={option.answer}
                    control={
                      <Radio
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch({
                              type: REMOVE_SINGLE_RESPONSE,
                              payload: {
                                question: option,
                              },
                            });
                            dispatch({
                              type: ADD_RESPONSE,
                              payload: {
                                id: uuid(),
                                response: option.answer_id,
                                question: option,
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
          </RadioGroup>
        </FormControl>
      </div>
      <Divider />
    </div>
  );
}

export default SingleSelect;
