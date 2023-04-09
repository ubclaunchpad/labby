import "./index.css";
import "../index.css";
import { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Divider from "../Divider";
import {
  ADD_RESPONSE,
  REMOVE_RESPONSE,
  ADD_OTHER_RESPONSE,
  REMOVE_OTHER_RESPONSE,
} from "../../redux/actions/formActions";
import uuid from "react-uuid";
import ClinicalBox from "../ClinicalBox";
import QuantityBox from "../QuantityBox";

function MultiSelect({ question }) {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const answerList = useSelector((state) => state.questionReducer.answerList);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  

  useEffect(() => {
    var optionList = answerList[question.question_id ?? ""] ?? [];
    optionList = optionList.sort((a, b) => {
      let fa = a.added_on;
      let fb = b.added_on;

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
              <div className="selectionBox" key={index}>
                <div className="single-select-option">
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
                                question: option,
                              },
                            });
                            setSelectedAnswers([
                              ...selectedAnswers,
                              option.answer_id,
                            ]);
                          } else {
                            dispatch({
                              type: REMOVE_RESPONSE,
                              payload: {
                                response: option.answer_id,
                                question: option,
                              },
                            });
                            setSelectedAnswers(
                              selectedAnswers.filter(
                                (answer) => answer !== option.answer_id
                              )
                            );
                          }
                        }}
                      />
                    }
                  />
                  <div className="new-question-input">{option.answer}</div>
                </div>
                {selectedAnswers.includes(option.answer_id) &&
                option.quantifiable ? (
                  <QuantityBox option={option} />
                ) : null}
                {selectedAnswers.includes(option.answer_id) &&
                question.clinical ? (
                  <ClinicalBox question={question} option={option} />
                ) : null}
                {selectedAnswers.includes(option.answer_id) &&
                option.answer === "Other" ? (
                  <div className="quantityBox">
                    <input
                      className="quantityInput"
                      required
                      onBlur={(e) => {
                        const inputValue = e.target.value;
                        if (inputValue.trim() === "") {
                          const errorMessage = "This field is required";
                          const popup = document.createElement("div");
                          popup.className = "popup";
                          popup.textContent = errorMessage;
                          e.target.parentNode.appendChild(popup);

                          //set timer for warning
                          setTimeout(() => {
                            e.target.parentNode.removeChild(popup);
                          }, 3000);

                          dispatch({
                            type: REMOVE_OTHER_RESPONSE,
                            payload: { question: question },
                          });
                        } else {
                          dispatch({
                            type: ADD_OTHER_RESPONSE,
                            payload: {
                              id: uuid(),
                              response: "OTHER_" + inputValue,
                              question: question,
                            },
                          });
                        }
                      }}
                    />
                  </div>
                ) : null}
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
