import "./index.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DownArrow from "../../../assets/Arrow.png";
import { appColor } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  SAVE_LOGIC,
  SET_LOGIC_QUESTION,
} from "../../../redux/actions/logicActions";
import uuid from "react-uuid";

function LogicLibrary() {
  const dispatch = useDispatch();
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );
  const answerList = useSelector((state) => state.questionReducer.answerList);
  const selectedQuestion = useSelector(
    (state) => state.logicReducer.currentLogicQuestion
  );

  const rules = ["Display this question if"];
  const condition = ["Is Selected"];
  const [selectedRule, setSelectedRule] = useState([]);

  const [ifDisplay, setIfDisplay] = useState(rules[0]);
  const [ifThisAnswer, setIfThisAnswer] = useState(null);
  const [ifCondition, setIfCondition] = useState(condition[0]);

  useEffect(() => {
    if (!selectedQuestion && questionList.length > 1) {
      dispatch({
        type: SET_LOGIC_QUESTION,
        payload: questionList[1],
      });
    }
  }, [dispatch, selectedQuestion, questionList]);

  return (
    <div className="LogicView">
      <div className="titleText">{`Display Logic for Q${
        selectedQuestion ? selectedQuestion.position_index : "1"
      }`}</div>
      <div className="subtitleText">Rule</div>
      <div className="selectionBoxView">
        <Select
          className="selectBox"
          displayEmpty
          value={ifDisplay}
          onChange={(e) => {
            setIfDisplay(e.target.value);
          }}
          input={<OutlinedInput />}
          renderValue={(value) => value}
          inputProps={{ "aria-label": "Without label" }}
        >
          {rules.map((rule) => (
            <MenuItem key={rule} value={rule}>
              {rule}
            </MenuItem>
          ))}
        </Select>
      </div>
      <img className="downArrowImage" src={DownArrow} alt="Down Arrow" />
      <div className="subtitleText">Answer</div>
      <div className="selectionBoxView">
        <Select
          className="selectBox"
          value={ifThisAnswer ? ifThisAnswer : ""}
          onChange={(e) => {
            setIfThisAnswer(e.target.value);
          }}
          input={<OutlinedInput />}
          renderValue={(value) => value.question}
          inputProps={{ "aria-label": "Without label" }}
        >
          {questionList.slice(1).map((question) => (
            <MenuItem key={question.question} value={question}>
              {question.question}
            </MenuItem>
          ))}
        </Select>
        {ifThisAnswer &&
          ifThisAnswer.question_id &&
          answerList[ifThisAnswer.question_id] && (
            <div className="answerSelectionBox">
              {answerList[ifThisAnswer.question_id].map(
                (answer) =>
                  answer.answer && (
                    <FormControlLabel
                      key={answer.answer_id}
                      control={
                        <Checkbox
                          defaultChecked={false}
                          onClick={() => {
                            if (selectedRule.includes(answer.answer_id)) {
                              setSelectedRule(
                                selectedRule.filter(
                                  (item) => item !== answer.answer_id
                                )
                              );
                            } else {
                              setSelectedRule([
                                ...selectedRule,
                                answer.answer_id,
                              ]);
                            }
                          }}
                        />
                      }
                      label={answer.answer}
                    />
                  )
              )}
            </div>
          )}
      </div>
      <img className="downArrowImage" src={DownArrow} alt="Down Arrow" />
      <div className="subtitleText">Condition</div>
      <div className="selectionBoxView">
        <Select
          className="selectBox"
          displayEmpty
          value={ifCondition}
          onChange={(e) => {
            setIfCondition(e.target.value);
          }}
          input={<OutlinedInput />}
          renderValue={(value) => value}
          inputProps={{ "aria-label": "Without label" }}
        >
          {condition.map((rule) => (
            <MenuItem key={rule} value={rule}>
              {rule}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="buttonView">
        <button
          className="SaveLogicButton"
          style={{
            backgroundColor: appColor.lightGray,
            color: appColor.gray,
            textAlign: "center",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#4CAF50";
            e.target.style.color = "#FFFFFF";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = appColor.lightGray;
            e.target.style.color = appColor.gray;
          }}
          onClick={() => {
            selectedRule.forEach((rule) => {
              dispatch({
                type: SAVE_LOGIC,
                payload: {
                  condition_id: uuid(),
                  question_id: selectedQuestion.question_id,
                  answer_id: rule,
                  condition_type: 2,
                  parameters: true,
                  result: true,
                },
              });
            });
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default LogicLibrary;
