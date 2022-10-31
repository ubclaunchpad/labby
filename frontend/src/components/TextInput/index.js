import React, { useState } from "react";
import { Input } from "antd";
import "./index.css";
import CloseIcon from "../../assets/Close.png";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { REPLACE_QUESTION } from "../../redux/actions/questionActions";

export const TextInput = ({ questionNumber }) => {
  const dispatch = useDispatch();
  const [questionName, setQuestionName] = useState("");
  const [questionText, setQuestionText] = useState("");
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );

  return (
    <div className="text-input-question-builder-container">
      <div className="question-header-row">
        <div className="question-number-container">
          <div className="question-number-text">Q{questionNumber}</div>
        </div>
        <input
          className="question-name-input"
          placeholder="Click to type your question here "
          type="text"
          name="name"
          value={questionName}
          onChange={(e) => {
            // DOUBLE CHECK HOW THIS SHOULD GO ==========================
            setQuestionName(e.target.value);
            dispatch({
              type: REPLACE_QUESTION,
              payload: {
                questionIndex: questionNumber,
                questionObject: {
                  question_type: "textInput",
                  question_title: questionName,
                  queston_index: questionNumber,
                  question_text: questionText,
                  question_id: questionList[questionNumber].question_id,
                },
              },
            });
          }}
        />
        <div className="question-close-button-container">
          <button
            className="question-cancel-button"
            onClick={() => {
              console.log("Clicked the Remove Button");
              // TODO: Add remove function
            }}
          >
            <img className="close-icon" src={CloseIcon} alt="Close Question" />
          </button>
        </div>
      </div>
      <div className="text-box-container">
        <Input.TextArea
          placeholder="User types here..."
          onChange={(e) => {
            setQuestionText(e.target.value);
            dispatch({
              type: REPLACE_QUESTION,
              payload: {
                questionIndex: questionNumber,
                questionObject: {
                  question_type: "textInput",
                  question_title: questionName,
                  queston_index: questionNumber,
                  question_text: questionText,
                  question_id: questionList[questionNumber].question_id,
                },
              },
            });
          }}
          rows={3}
          className="text-box"
        />
      </div>
      <div className="question-footer-row">
        <div className="question-logic-added-sign">Logic Added</div>
        <div className="question-required-checkbox">
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: "#AEAEAE",
                }}
                // onChange={handleChange}
              />
            }
            label={"Required"}
          />
        </div>
      </div>
    </div>
  );
};

// // Regular Single-lined Text Input
// export const TextInput = ({
//   label = defaultLabel,
//   placeholder = defaultPlaceholder,
//   maxLength = defaultMaxLength,
// }) => {
//   const [textValue, setTextValue] = useState(placeholder);

//   const handleChange = (event) => {
//     setTextValue(event.target.value);
//   };

//   return (
//     <DefaultCard>
//       <label className="label">{label}</label>
//       <br />
//       <Input
//         placeholder={placeholder}
//         onChange={handleChange}
//         // We can set character limit for input
//         maxLength={maxLength}
//         size={"medium"}
//         showCount
//       />

//       {/* for debugging */}
//       <p>Text Input Value: {textValue}</p>
//     </DefaultCard>
//   );
// };

// // Multilined Text Input
// export const TextInputMultiline = ({
//   label = defaultLabel,
//   placeholder = defaultPlaceholder,
//   rows = defaultRows,
// }) => {
//   const [textValue, setTextValue] = useState(placeholder);

//   const handleChange = (event) => {
//     setTextValue(event.target.value);
//   };

//   return (
//     <DefaultCard>
//       <label className="label">{label}</label>
//       <br />
//       <Input.TextArea
//         placeholder={placeholder}
//         onChange={handleChange}
//         // We can set the number of rows for this bigger input box
//         rows={rows}
//       />

//       {/* for debugging */}
//       <p>Text Input Value: {textValue}</p>
//     </DefaultCard>
//   );
// };
