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
  ADD_DRAFT,
  DELETE_DRAFT,
} from "../../redux/actions/formActions";
import uuid from "react-uuid";
import ClinicalBox from "../ClinicalBox";
import QuantityBox from "../QuantityBox";
import { getQuestionOptions } from "../../utils/componentUtils";

function MultiSelect({ question }) {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const answerList = useSelector((state) => state.questionReducer.answerList);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const draftList = useSelector((state) => state.formReducer.draftList);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [idPrefix, setIdPrefix] = useState("");

  useEffect(() => {
    setOptions(getQuestionOptions(answerList, question));
    const draftAnswer = draftList.filter(
      (draft) => draft.question_id === question.question_id
    );
    draftAnswer.forEach((draft) => {
      dispatch({
        type: ADD_RESPONSE,
        payload: {
          id: uuid(),
          response: draft.answer,
          question: question,
        },
      });
    });
    setIdPrefix(uuid());
  }, [answerList, question, dispatch, draftList]);

  return (
    <div className="GlobalCustomerQuestionContainer">
      <div className="GlobalQuestionTitle">
        {question.question}{" "}
        <p style={{ color: "red" }}>{question.mandatory ? "*" : ""}</p>
      </div>
      <div className="customer__component__subtitle">
        {question.question_note}
      </div>
      <div className="customer__component__subtitle">Select all that apply</div>
      <div className="single-select-options-container">
        <FormControl style={{ width: "100%" }}>
          {options.map((option, index) => {
            const isChecked = draftList.some((draft) => draft.answer === option.answer_id)
            return (
              <div className="selectionBox" key={index}>
                <div className="single-select-option">
                  <FormControlLabel
                    control={
                      <Checkbox
                        key={idPrefix + option.answer_id}
                        defaultChecked={isChecked}
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
                            const draftObj = {
                              draft_id:
                                option.question_id + currentUser.user_id,
                              fk_user_id: currentUser.user_id,
                              fk_form_id: option.fk_form_id,
                              fk_question_id: option.question_id,
                              answer: option.answer_id,
                            };
                            dispatch({
                              type: ADD_DRAFT,
                              payload: draftObj,
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
                            dispatch({
                              type: DELETE_DRAFT,
                              payload: option.question_id + currentUser.user_id,
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
                {option.answer.toLowerCase().includes("other") ? (
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
                {selectedAnswers.includes(option.answer_id) &&
                  option.quantifiable ? (
                  <QuantityBox option={option} />
                ) : null}
                {selectedAnswers.includes(option.answer_id) &&
                  question.clinical ? (
                  <ClinicalBox question={question} option={option} />
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
