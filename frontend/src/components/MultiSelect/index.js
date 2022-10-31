import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import "./index.css";
import { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Checkbox, FormGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { REPLACE_QUESTION } from "../../redux/actions/questionActions";

export const MultiSelect = ({ questionNumber }) => {
  const [options, setOptions] = useState([]);
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );
  useEffect(() => {
    console.log(questionList);
  }, [questionList]);

  const dispatch = useDispatch();
  const [newOption, setNewOption] = useState("");
  const [questionName, setQuestionName] = useState("");
  const optionsMap = options.map((option, index) => {
    return <FormControlLabel control={<Checkbox />} label={option} />;
  });
  const onNewOptionChange = (e) => {
    let newOptionsArray = options;
    if (!newOptionsArray.includes(newOption.trim()) && newOption.trim() != "") {
      newOptionsArray.push(newOption);
      setOptions(newOptionsArray);
    }
  };

  // When we figure out how to on delete:
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
          title="Add a question name "
          placeholder="Click to type your question here "
          type="text"
          name="name"
          value={questionName}
          onChange={(e) => {
            setQuestionName(e.target.value);
            dispatch({
              type: REPLACE_QUESTION,
              payload: {
                questionIndex: questionNumber,
                questionObject: {
                  question_type: "multiSelect",
                  question_title: questionName,
                  queston_index: questionNumber,
                  question_options: options,
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
            }}
          >
            <FontAwesomeIcon icon={faX} className="question-cancel-icon" />
          </button>
        </div>
      </div>
      <div className="single-select-options-container">
        <div className="single-select-options">
          <FormControl>
            <FormGroup>
              {options.map((option, index) => {
                return (
                  <div className="single-select-option">
                    <FormControlLabel control={<Checkbox />} label={option} />
                  </div>
                );
              })}
            </FormGroup>
            <div className="new-question-input-container">
              <div className="new-question-checkbox">
                <FormControlLabel control={<Checkbox />} />
              </div>

              <div>
                <input
                  type="text"
                  className="new-question-input"
                  title="Add an option"
                  value={newOption}
                  placeholder="Click to add new option "
                  onChange={(e) => {
                    setNewOption(e.target.value);
                  }}
                  onBlur={(e) => {
                    onNewOptionChange(e);
                    setNewOption("");
                    dispatch({
                      type: REPLACE_QUESTION,
                      payload: {
                        questionIndex: questionNumber,
                        questionObject: {
                          question_type: "multiSelect",
                          question_title: questionName,
                          queston_index: questionNumber,
                          question_options: options,
                          question_id: questionList[questionNumber].question_id,
                        },
                      },
                    });
                  }}
                  //   If we want to have key down functionality as well:
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onNewOptionChange(e);
                      setNewOption("");
                      dispatch({
                        type: REPLACE_QUESTION,
                        payload: {
                          questionIndex: questionNumber,
                          questionObject: {
                            question_type: "singleSelect",
                            question_title: questionName,
                            queston_index: questionNumber,
                            question_options: options,
                            question_id:
                              questionList[questionNumber].question_id,
                          },
                        },
                      });
                    }
                  }}
                ></input>
              </div>
            </div>
          </FormControl>
        </div>
      </div>
      <div className="question-footer-row">
        <div
          className="question-logic-added-sign"
          title="Make this question required"
        >
          Logic Added
        </div>
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
