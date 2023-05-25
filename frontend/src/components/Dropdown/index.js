import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Divider from "../Divider";
import "./index.css";
import uuid from "react-uuid";
import {
  ADD_DRAFT,
  ADD_RESPONSE,
  REMOVE_SINGLE_RESPONSE,
} from "../../redux/actions/formActions";
import { getQuestionOptions } from "../../utils/componentUtils";

function Dropdown({ question }) {
  const dispatch = useDispatch();
  const answerList = useSelector((state) => state.questionReducer.answerList);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const draftList = useSelector((state) => state.formReducer.draftList);
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const handleChange = (event) => {
    const selected = JSON.parse(event.target.value);
    dispatch({
      type: REMOVE_SINGLE_RESPONSE,
      payload: {
        question: question,
      },
    });
    dispatch({
      type: ADD_RESPONSE,
      payload: {
        id: uuid(),
        response: selected.answer,
        question: selected,
      },
    });
    const draftObj = {
      draft_id: selected.question_id + currentUser.user_id,
      fk_user_id: currentUser.user_id,
      fk_form_id: selected.fk_form_id,
      fk_question_id: selected.question_id,
      answer: selected.project_id,
    };
    dispatch({
      type: ADD_DRAFT,
      payload: draftObj,
    });
    setSelectedValue(selected);
  };

  useEffect(() => {
    let optionList = getQuestionOptions(answerList, question);
    setOptions(optionList);

    const draft = draftList.find(
      (draft) => draft.fk_question_id === question.question_id
    );
    if (draft) {
      const value = optionList.find(
        (option) => option.answer_id === draft.answer
      );
      setSelectedValue(value);
      dispatch({
        type: REMOVE_SINGLE_RESPONSE,
        payload: {
          question: question,
        },
      });
      dispatch({
        type: ADD_RESPONSE,
        payload: {
          id: uuid(),
          response: value.answer,
          question: value,
        },
      });
    }
  }, [answerList, question, draftList, dispatch]);

  return (
    <div className="GlobalCustomerQuestionContainer">
      <div className="GlobalQuestionTitle">
        {question.question}{" "}
        <p style={{ color: "red" }}>{question.mandatory ? "*" : ""}</p>
      </div>
      <div className="customer__component__subtitle">
        {question.question_note}
      </div>
      <select
        className="select"
        defaultValue={selectedValue}
        onChange={handleChange}
      >
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
