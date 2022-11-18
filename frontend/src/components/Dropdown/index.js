import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Divider from "../Divider";
import "./index.css";

function Dropdown({ question }) {
  const answerList = useSelector((state) => state.questionReducer.answerList);
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    const optionList = answerList[question.question_id ?? ""] ?? [];
    setOptions(optionList);
  }, [answerList, question]);

  return (
    <div className="GlobalCustomerQuestionContainer">
      <div className="GlobalQuestionTitle">{question.question}</div>
      <select
        className="select"
        value={selectedValue ? selectedValue.answer : ""}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.answer_id} value={option}>
            {option.answer}
          </option>
        ))}
      </select>
      <Divider />
    </div>
  );
}

export default Dropdown;
