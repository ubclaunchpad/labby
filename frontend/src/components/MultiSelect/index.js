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
  const costEstimateMap = useSelector(
    (state) => state.costEstimateReducer.costEstimateList
  );
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quantityMap, setQuantityMap] = useState({});

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

  function parseQuantity(quantity) {
    let numbers = quantity.match(/\d+/g);
    if (numbers === null) {
      return [1, `1 unit`];
    }
    if (numbers.length === 1) {
      return [parseInt(numbers[0]), `${parseInt(numbers[0])} units`];
    }
    let multiplied = parseInt(numbers[0]) * parseInt(numbers[1]);
    return [
      multiplied,
      `${parseInt(numbers[0])} X ${parseInt(numbers[1])} = ${multiplied} units`,
    ];
  }

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
                {(selectedAnswers.includes(option.answer_id) && costEstimateMap.has(option.answer)) ? (
                  <div className="quantityBox">
                    <input
                      className="quantityInput"
                      onBlur={(e) => {
                        let quantity = parseQuantity(e.target.value);
                        setQuantityMap({
                          ...quantityMap,
                          [option.answer_id]: quantity,
                        });
                        dispatch({
                          type: ADD_RESPONSE,
                          payload: {
                            id: uuid(),
                            response: option.answer_id,
                            question: option,
                            quantity: quantity[0],
                          },
                        });
                      }}
                    />
                    <div>
                      {quantityMap[option.answer_id]
                        ? quantityMap[option.answer_id][1]
                        : ""}
                    </div>
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
