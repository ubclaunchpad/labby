import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Divider from "../Divider";
import "./index.css";
import uuid from "react-uuid";
import {
  ADD_RESPONSE,
  REMOVE_PROJECT_RESPONSE,
} from "../../redux/actions/formActions";
import { GET_PROJECT } from "../../redux/actions/billingActions";

function ProjectSelector({ question }) {
  const dispatch = useDispatch();
  const projectList = useSelector((state) => state.projectReducer.projectList);
  const [selectedValue, setSelectedValue] = useState(null);
  const handleChange = (event) => {
    const selected = JSON.parse(event.target.value);
    dispatch({
      type: REMOVE_PROJECT_RESPONSE,
      payload: {
        question: question,
      },
    });
    console.log(selected);
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
  };

  useEffect(() => {
    dispatch({ type: GET_PROJECT });
  }, [dispatch]);


  return (
    <div className="GlobalCustomerQuestionContainer">
      <div className="GlobalQuestionTitle">
        Please select your project
        <p style={{ color: "red" }}>{question.mandatory ? "*" : ""}</p>
      </div>
      <select className="select" onChange={handleChange}>
        {selectedValue === null && <option key={"Default"} value={""} />}
        <option key={"NO-PROJECT"} value={JSON.stringify({ project_id: null })}>
          No Project
        </option>
        {projectList.map((option) => (
          <option key={option.project_id} value={JSON.stringify(option)}>
            {option.project_name}
          </option>
        ))}
      </select>
      <Divider />
    </div>
  );
}

export default ProjectSelector;
