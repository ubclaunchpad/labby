import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import "./SingleSelect.css";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Button, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_QUESTION } from "../../redux/actions/questionActions";

export const SingleSelect = ({ questionNumber }) => {
  /* TODO: add redux state to this component 
  But is that to the save button when we save to the state or does it always just save to the state whenever we are 
  adding anything to the inputs because that would be a big waste of rerendering and then storing to the redux state. 
  */
  const [options, setOptions] = useState([
    "Cutting",
    "Sauteeing",
    "Filletting",
    "Chopping",
  ]);

  const dispatch = useDispatch();
  const questionType = "SingleSelect";
  const [newOption, setNewOption] = useState("");
  const [questionName, setQuestionName] = useState("");
  const optionsMap = options.map((option, index) => {
    return <FormControlLabel control={<Radio />} label={option} />;
  });
  const onNewOptionChange = (e) => {
    console.log(e.target.value);
    let newOptionsArray = options;
    if (!newOptionsArray.includes(newOption.trim()) && newOption.trim() != "") {
      newOptionsArray.push(newOption);
      setOptions(newOptionsArray);
    }
    console.log(options);
  };

  useEffect(() => {
    // Update the redux state here if we want to go that route
    let question = { questionNumber, questionName, options };
    console.log(question);
  }, [questionName, questionNumber, options, questionType]);

  //   const onDelete = (index) => {
  //     console.log(index);
  //     let newOptionsArray = options;
  //     newOptionsArray.splice(index, 1);
  //     setOptions(newOptionsArray);
  //   };

  return (
    <div className="single-select-question-builder-container">
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
            setQuestionName(e.target.value);
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
            <FontAwesomeIcon icon={faX} className="question-cancel-icon" />
          </button>
        </div>
      </div>
      <div className="single-select-options-container">
        <div className="single-select-options">
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {options.map((option, index) => {
                return (
                  <div className="single-select-option">
                    <FormControlLabel control={<Radio />} label={option} />
                  </div>
                );
              })}
            </RadioGroup>
            <div className="new-question-input-container">
              <div className="new-question-radio">
                <FormControlLabel control={<Radio />} />
              </div>

              <div>
                <input
                  type="text"
                  className="new-question-input"
                  value={newOption}
                  placeholder="Click to add new option "
                  onChange={(e) => {
                    setNewOption(e.target.value);
                  }}
                  onBlur={(e) => {
                    onNewOptionChange(e);
                    setNewOption("");
                    dispatch({
                      type: SAVE_QUESTION,
                      payload: {
                        questionId: 10,
                        question_type: "singleSelect",
                        question_title: questionName,
                        queston_index: questionNumber,
                        options,
                      },
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onNewOptionChange(e);
                      setNewOption("");
                    }
                  }}
                ></input>
              </div>
            </div>
          </FormControl>
        </div>
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
                // checked={isSelected}
                // onChange={handleChange}
                // color={color}
                // checkedIcon={icon ? icon : undefined}
              />
            }
            label={"Required"}
          />
        </div>
      </div>
    </div>
  );
};
