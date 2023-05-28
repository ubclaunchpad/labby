import { Input } from "antd";
import "./index.css";
import "../index.css";
import Divider from "../Divider";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import {
  ADD_DRAFT,
  ADD_RESPONSE,
  REMOVE_SINGLE_RESPONSE,
} from "../../redux/actions/formActions";
import { useEffect, useState } from "react";

function TextAnswer({ question }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const draftList = useSelector((state) => state.formReducer.draftList);
  const [answer, setAnswer] = useState();

  useEffect(() => {
    const draftAnswer = draftList.filter((draft) => draft.question_id === question.question_id)
    if (draftAnswer.length > 0) {
      setAnswer(draftAnswer[0].answer)

      dispatch({
        type: REMOVE_SINGLE_RESPONSE,
        payload: {
          question: question,
        },
      });
      dispatch({
        type: ADD_RESPONSE,
        payload: {
          id: uuid(),
          response: draftAnswer[0].answer,
          question: question,
        },
      });
    }
  }, [question, draftList, dispatch]);

  return (
    <div className="GlobalCustomerQuestionContainer">
      <div className="GlobalQuestionTitle">
        {question.question}{" "}
        <p style={{ color: "red" }}>{question.mandatory ? "*" : ""}</p>
      </div>
      <div className="customer__component__subtitle">
        {question.question_note}
      </div>
      <div className="text-box-container-ta-cust">
        {question.numerical_only ? (
          <Input
            placeholder="Type numerical answer here..."
            className="text-box-ta-cust"
            type="number"
            defaultValue={answer}
            onBlur={(e) => {
              if (e.target.value !== "") {
                dispatch({
                  type: REMOVE_SINGLE_RESPONSE,
                  payload: {
                    question: question,
                  },
                });
                dispatch({
                  type: ADD_RESPONSE,
                  payload: {
                    id: uuid(),
                    response: e.target.value,
                    question: question,
                  },
                });
                const draftObj = {
                  draft_id: question.question_id + "_" + currentUser.user_id,
                  fk_user_id: currentUser.user_id,
                  fk_form_id: question.fk_form_id,
                  fk_question_id: question.question_id,
                  answer: e.target.value,
                }
                dispatch({
                  type: ADD_DRAFT,
                  payload: draftObj,
                })
              } else {
                dispatch({
                  type: REMOVE_SINGLE_RESPONSE,
                  payload: {
                    question: question,
                  },
                });
              }
            }}
          />
        ) : (
          <Input.TextArea
            placeholder="Type alphanumeric answer here..."
            autoSize={{
              minRows: 1,
              maxRows: 20,
            }}
            defaultValue={answer}
            className="text-box-ta-cust"
            onBlur={(e) => {
              if (e.target.value !== "") {
                dispatch({
                  type: REMOVE_SINGLE_RESPONSE,
                  payload: {
                    question: question,
                  },
                });
                dispatch({
                  type: ADD_RESPONSE,
                  payload: {
                    id: uuid(),
                    response: e.target.value,
                    question: question,
                  },
                });
                const draftObj = {
                  draft_id: question.question_id + "_" + currentUser.user_id,
                  fk_user_id: currentUser.user_id,
                  fk_form_id: question.fk_form_id,
                  fk_question_id: question.question_id,
                  answer: e.target.value,
                }
                dispatch({
                  type: ADD_DRAFT,
                  payload: draftObj,
                })
              } else {
                dispatch({
                  type: REMOVE_SINGLE_RESPONSE,
                  payload: {
                    question: question,
                  },
                });
              }
            }}
          />
        )}
      </div>
      <Divider />
    </div>
  );
}

export default TextAnswer;
