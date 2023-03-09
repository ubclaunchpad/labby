import React from "react";

import FormImg from "../../../assets/Form.png";

import "./form-progress.css";

function FormProgress() {
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
            <NewService serviceForm="MAPCore Service Request Form" />
            <NewService serviceForm="MAPCore Clinical Service Request Form" />
            <NewService serviceForm="MAPCore Consultation Request Form" />
          </div>
        </div>

        <div className="requestedServices">
          <h3>Your requested services</h3>
          <ProgressItem
            code="SOW123"
            progress={25}
            comments="Lorem ipsum dolor sit amet, et paulo voluptatum pro, erat delenit posidonium est in. Ut iisque ornatus eam, ei "
          />
          <ProgressItem code="SOW121" progress={50} />

          <hr />
          <h4>Completed Requests</h4>
          <ProgressItem code="SOW115" progress={100} />
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
    <div className="newService">
      <img src={FormImg} alt="formIcon" className="formIcon" />
      {serviceForm}
    </div>
  );
}

export default FormProgress;
