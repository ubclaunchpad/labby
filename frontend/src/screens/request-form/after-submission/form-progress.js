import React from "react";

import "./form-progress.css";

function FormProgress() {
  return (
    <div className="formProgressPage">
      <h2>Your requested services</h2>
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

export default FormProgress;
