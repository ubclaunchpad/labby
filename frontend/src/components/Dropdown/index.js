import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Divider from "../Divider";
import "./index.css";
import uuid from "react-uuid";
import { ADD_RESPONSE } from "../../redux/actions/formActions";

function Dropdown({ question }) {
  const dispatch = useDispatch();
  const answerList = useSelector((state) => state.questionReducer.answerList);
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const handleChange = (event) => {
    const selected = JSON.parse(event.target.value);
    dispatch({
      type: ADD_RESPONSE,
      payload: {
        id: uuid(),
        response: selected.answer,
        question: selected,
      },
    });
    setSelectedValue(selected);
  };

  useEffect(() => {
    const optionList = answerList[question.question_id ?? ""] ?? [];
    setOptions(optionList);
  }, [answerList, question]);

  return (
    <div className="GlobalCustomerQuestionContainer">
      <div className="GlobalQuestionTitle">{question.question}</div>
      <select className="select" onChange={handleChange}>
        {selectedValue === null && <option key={"Default"} value={""} />}
        {options.map((option) => (
          <option key={option.answer_id} value={JSON.stringify(option)}>
            {option.answer}
          </option>
        ))}
      </select>
      <Divider />
    </div>
  );
}

export default Dropdown;
