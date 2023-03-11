import "./index.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DownArrow from "../../../assets/Arrow.png";
import { appColor } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { SAVE_LOGIC } from "../../../redux/actions/logicActions";
import uuid from "react-uuid";
import { SuccessToast, WarningToast } from "../../Toasts";

function LogicLibrary() {
  const dispatch = useDispatch();
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );
  const answerList = useSelector((state) => state.questionReducer.answerList);
  const logicList = useSelector((state) => state.logicReducer.logicList);

  const rules = ["Display this question if"];
  const condition = ["Is Selected"];
  const [selectedRule, setSelectedRule] = useState([]);

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [ifDisplay, setIfDisplay] = useState(rules[0]);
  const [ifThisAnswer, setIfThisAnswer] = useState(null);
  const [ifCondition, setIfCondition] = useState(condition[0]);

  function sameLogic(questionId, answerId) {
    return Object.values(logicList).some((logic) => {
      let sameQuestion = logic[0].fk_question_id === questionId;
      let sameAnswer = logic[0].fk_answer_id === answerId;
      let sameType = logic[0].condition_type === "2";
      let sameParameter = logic[0].condition_parameter === "";
      return sameQuestion && sameAnswer && sameType && sameParameter;
    });
  }

  return (
    <div className="LogicViewContainer">
      <div className="titleText">Display Logic for</div>
      <div className="subtitleText">Question</div>
      <div className="selectionBoxView">
        <select
          className="selectBox"
          onChange={(e) => {
            setSelectedQuestion(JSON.parse(e.target.value));
          }}
        >
          {questionList.slice(1).map((question) => (
            <option key={question.question_id} value={JSON.stringify(question)}>
              {`Q${question.position_index}: ${question.question}`}
            </option>
          ))}
        </select>
      </div>
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
                if (!sameLogic(selectedQuestion.question_id, rule)) {
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
                  SuccessToast("Logic Added!");
                } else {
                  WarningToast("Duplicate Logic Found! Skipping...");
                }
              });
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
