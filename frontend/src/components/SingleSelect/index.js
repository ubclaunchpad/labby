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
  ADD_DRAFT,
  ADD_RESPONSE,
  REMOVE_SINGLE_RESPONSE,
} from "../../redux/actions/formActions";
import uuid from "react-uuid";
import ClinicalBox from "../ClinicalBox";
import QuantityBox from "../QuantityBox";

function SingleSelect({ question }) {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const answerList = useSelector((state) => state.questionReducer.answerList);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const draftList = useSelector((state) => state.formReducer.draftList);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

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
    const draftAnswer = draftList.filter((draft) => draft.question_id === question.question_id)
    if (draftAnswer.length > 0) {
      setSelectedAnswers([draftAnswer[0].answer])
      const value = optionList.filter((option) => option.answer_id === draftAnswer[0].answer)
      if (value.length > 0) {
        setSelectedValue(value[0].answer)

        dispatch({
          type: REMOVE_SINGLE_RESPONSE,
          payload: {
            question: value[0],
          },
        });
        dispatch({
          type: ADD_RESPONSE,
          payload: {
            id: uuid(),
            response: value[0].answer_id,
            question: value[0],
          },
        });
      }
    }
  }, [answerList, question, draftList, dispatch]);

  return (
    <div className="GlobalCustomerQuestionContainer">
      <div className="GlobalQuestionTitle">
        {question.question}{" "}
        <p style={{ color: "red" }}>{question.mandatory ? "*" : ""}</p>
      </div>
      <div className="customer__component__subtitle">{question.question_note}</div>
      <div className="single-select-options-container">
        <FormControl style={{ width: "100%" }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={selectedValue}
          >
            {options.map((option, index) => {
              return (
                <div className="selectionBox" key={index}>
                  <div className="single-select-option">
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
                              const draftObj = {
                                draft_id: option.question_id + currentUser.user_id,
                                fk_user_id: currentUser.user_id,
                                fk_form_id: option.fk_form_id,
                                fk_question_id: option.question_id,
                                answer: option.answer_id,
                              }
                              dispatch({
                                type: ADD_DRAFT,
                                payload: draftObj,
                              })
                              setSelectedAnswers([
                                option.answer_id,
                              ]);
                              setSelectedValue(option.answer);
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
