import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import FormImg from "../../../assets/Form.png";
import { LOAD_PUBLISHED_FORMS } from "../../../redux/actions/formActions";
import { LOAD_USER_SURVEY } from "../../../redux/actions/userActions";

import "./form-progress.css";

function FormProgress() {
  const dispatch = useDispatch();
  const publishedForms = useSelector(
    (state) => state.formReducer.publishedFormList
  );
  const userRequestList = useSelector(
    (state) => state.userReducer.userRequestList
  );

  useEffect(() => {
    dispatch({ type: LOAD_PUBLISHED_FORMS });
    dispatch({ type: LOAD_USER_SURVEY });
  }, [dispatch]);

  function progressToNum(progress) {
    if (progress === "open") {
      return 0;
    } else if (progress === "blocked") {
      return 25;
    } else if (progress === "progress") {
      return 50;
    }
  }

  return (
    <div className="formProgressPage">
      <div className="signout">
        <button className="signoutBtn" type="button">
          Sign out
        </button>
      </div>
      <h2 className="pageTitle">MAPcore Services</h2>

      <div className="wrapper">
        <div className="newServices">
          <h3>Request a new service</h3>
          <div className="newServicesWrapper">
            {publishedForms.map((form, idx) => {
              return <NewService key={idx} serviceForm={form} />;
            })}
          </div>
        </div>

        <div className="requestedServices">
          <h3>Your requested services</h3>
          {userRequestList
            .filter((item) => item.task_state !== "completed")
            .map((request, idx) => {
              const progress = progressToNum(request.task_state);
              return (
                <ProgressItem
                  key={idx}
                  code={`SOW${request.task_id}`}
                  progress={progress}
                  comments={request.task_description}
                />
              );
            })}

          <hr />
          <h4>Completed Requests</h4>
          {userRequestList
            .filter((item) => item.task_state === "completed")
            .map((request, idx) => {
              return (
                <ProgressItem
                  key={idx}
                  code={`SOW${request.task_id}`}
                  progress={100}
                  comments={request.task_description}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

const ProgressItem = ({ code, progress, comments = "" }) => {
  return (
    <div className="progressItem">
      <h3>{code}</h3>
      <ProgressBar completed={progress} />
      <p className="commentTitle">Comments: </p>
      <p className="comments">{comments}</p>
    </div>
  );
};

function ProgressBar({ completed }) {
  return (
    <div className="progressBar">
      0% <progress max={100} value={completed}>{`${completed}%`}</progress> 100%
    </div>
  );
}

function NewService({ serviceForm }) {
  return (
    <NavLink className="newService" to={`/request/${serviceForm.form_id}`}>
      <img src={FormImg} alt="formIcon" className="formIcon" />
      {serviceForm.form_name}
    </NavLink>
  );
}

export default FormProgress;
