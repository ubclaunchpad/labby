import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Divider from "../Divider";
import "./index.css";
import uuid from "react-uuid";
import {
  ADD_DRAFT,
  ADD_RESPONSE,
  REMOVE_PROJECT_RESPONSE,
} from "../../redux/actions/formActions";
import { GET_PROJECT } from "../../redux/actions/billingActions";

function ProjectSelector({ question }) {
  const dispatch = useDispatch();
  const projectList = useSelector((state) => state.projectReducer.projectList);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const draftList = useSelector((state) => state.formReducer.draftList);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (event) => {
    const selected = JSON.parse(event.target.value);
    dispatch({
      type: REMOVE_PROJECT_RESPONSE,
      payload: {
        question: question,
      },
    });
    dispatch({
      type: ADD_RESPONSE,
      payload: {
        id: uuid(),
        response: selected.project_id,
        question: selected,
        question_info: question,
      },
    });
    setSelectedValue(selected);

    const draftObj = {
      draft_id: question.question_id + currentUser.user_id,
      fk_user_id: currentUser.user_id,
      fk_form_id: question.fk_form_id,
      fk_question_id: question.question_id,
      answer: selected.project_id,
    };
    dispatch({
      type: ADD_DRAFT,
      payload: draftObj,
    });
  };

  useEffect(() => {
    dispatch({ type: GET_PROJECT });
  }, [dispatch]);

  useEffect(() => {
    const draft = draftList.find(
      (draft) => draft.fk_question_id === question.question_id
    );

    if (draft) {
      const value = projectList.find(
        (option) => option.project_id === draft.answer
      );
      if (value) {
        setSelectedValue(value);
        dispatch({
          type: ADD_RESPONSE,
          payload: {
            id: uuid(),
            response: value.project_id,
            question: value,
            question_info: question,
          },
        });
      }
    }
  }, [dispatch, draftList, projectList, question]);


  return (
    <div className="GlobalCustomerQuestionContainer">
      <div className="GlobalQuestionTitle">
        Please select your project
        <p style={{ color: "red" }}>{question.mandatory ? "*" : ""}</p>
      </div>
      <div className="GlobalQuestionSubtitle">{question.question_note}</div>
      <select className="select" onChange={handleChange}>
        {selectedValue === null && <option key={"Default"} value={""} />}
        <option key={"NO-PROJECT"} value={JSON.stringify({ project_id: null })}>
          No Project
        </option>
        {projectList.map((option) => (
          <option key={option.project_id} value={JSON.stringify(option)} selected={selectedValue && option.project_id === selectedValue.project_id}>
            {option.project_name}
          </option>
        ))}
      </select>
      <Divider />
    </div>
  );
}

export default ProjectSelector;
