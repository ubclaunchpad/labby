import "./index.css";
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
import { SuccessToast, WarningToast } from "../../Toasts";

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
    <div className="LogicViewContainer">
      <div className="titleText">{`Display Logic for Q${
        selectedQuestion ? selectedQuestion.position_index : "1"
      }`}</div>
      <div className="subtitleText">Rule</div>
      <div className="selectionBoxView">
        <select
          className="selectBox"
          value={ifDisplay}
          onChange={(e) => {
            setIfDisplay(e.target.value);
          }}
        >
          {rules.map((rule) => (
            <option key={rule} value={rule}>
              {rule}
            </option>
          ))}
        </select>
      </div>
      <img className="downArrowImage" src={DownArrow} alt="Down Arrow" />
      <div className="subtitleText">Answer</div>
      <div className="selectionBoxView">
        <select
          className="selectBox"
          onChange={(e) => {
            setIfThisAnswer(JSON.parse(e.target.value));
          }}
        >
          {ifThisAnswer === null && <option key={"Default"} value={""} />}
          {questionList.slice(1).map((question) => (
            <option key={question.question} value={JSON.stringify(question)}>
              {question.question}
            </option>
          ))}
        </select>
        {ifThisAnswer &&
          ifThisAnswer.question_id &&
          answerList[ifThisAnswer.question_id] && (
            <div className="answerSelectionBox">
              {answerList[ifThisAnswer.question_id].map(
                (answer) =>
                  answer.answer && (
                    <FormControlLabel
                      className="answerSelectionBoxItem"
                      key={answer.answer_id}
                      control={
                        <Checkbox
                          style={{ color: appColor.primaryBlack }}
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
        <select
          className="selectBox"
          value={ifCondition}
          onChange={(e) => {
            setIfCondition(e.target.value);
          }}
        >
          {condition.map((rule) => (
            <option key={rule} value={rule}>
              {rule}
            </option>
          ))}
        </select>
      </div>
      <div className="buttonView">
        <button
          className="SaveLogicButton"
          style={{
            backgroundColor: appColor.primaryLight,
            color: appColor.white,
            textAlign: "center",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = appColor.primaryDark;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = appColor.primaryLight;
          }}
          onClick={() => {
            if (selectedRule.length > 0) {
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
                    form_id: selectedQuestion.fk_form_id,
                  },
                });
              });
              console.log("got here ");
              // <SuccessToast message="Logic Added!" size="large" />;
              SuccessToast("Logic Added!");
            } else {
              WarningToast("Please select at least one answer");
            }
          }}
        >
          Save Logic
        </button>
      </div>
    </div>
  );
}

export default LogicLibrary;
