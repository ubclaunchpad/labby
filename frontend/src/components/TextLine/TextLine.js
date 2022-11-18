import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "./index.css";
import "../index.css";

function Heading({ question }) {
  return (
    <div className="GlobalEditorComponent  GlobalEditorComponent--heading ">
      <div className="GlobalEditorComponentHeader">
        <div> {question.question} </div>
      </div>
    </div>
  );
}

export default Heading;
