import "./index.css";
import "../index.css";
import Divider from "../Divider";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_DRAFT,
  ADD_RESPONSE,
  DELETE_DRAFT,
  REMOVE_RESPONSE,
} from "../../redux/actions/formActions";
import { GET_ORGANIZATION } from "../../redux/actions/userActions";
import { useEffect, useState } from "react";
import { getQuestionOptions } from "../../utils/componentUtils";

function FormInfo({ question }) {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);

  const answerList = useSelector((state) => state.questionReducer.answerList);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const draftList = useSelector((state) => state.formReducer.draftList);
  const [selectedValue, setSelectedValue] = useState({});

  useEffect(() => {
    dispatch({ type: GET_ORGANIZATION });
  }, [dispatch]);

  useEffect(() => {
    var optionList = getQuestionOptions(answerList, question);
    setOptions(optionList);
    const draftAnswer = draftList.filter(
      (draft) => draft.question_id === question.question_id
    );
    var selectedMap = {};
    draftAnswer.forEach((draft) => {
      const answerId = draft.draft_id.split("_")[0];
      const value = optionList.filter(
        (option) => option.answer_id === answerId
      );
      selectedMap[draft.draft_id] = draft.answer;
      dispatch({
        type: ADD_RESPONSE,
        payload: {
          id: uuid(),
          response: draft.answer,
          question: value,
        },
      });
    });
    setSelectedValue(selectedMap);
  }, [answerList, question, dispatch, draftList]);

  return (
    <div className="GlobalCustomerQuestionContainer">
      <div className="GlobalQuestionTitle">
        {question.question}{" "}
        <p style={{ color: "red" }}>{question.mandatory ? "*" : ""}</p>
      </div>
      <div className="customer__component__subtitle">{question.question_note}</div>
      <div className="contact-info-container">
        <div className="contact-info-container-inner">
          {options.map((option, index) => {
            return (
              <div className="contact-info-row-customer" key={option.answer_id ?? index}>
                <span className="contact-info-field-label-customer">{option.answer}</span>
                <input
                  className="contact-info-user-input-customer"
                  type="text"
                  placeholder="Type Here... "
                  defaultValue={selectedValue[option.answer_id + "_" + currentUser.user_id] ?? ""}
                  onBlur={(e) => {
                    if (e.target.value !== "") {
                      dispatch({
                        type: REMOVE_RESPONSE,
                        payload: {
                          response: e.target.value,
                          question: option,
                        },
                      });
                      dispatch({
                        type: ADD_RESPONSE,
                        payload: {
                          id: uuid(),
                          response: e.target.value,
                          question: option,
                        },
                      });
                      const draftObj = {
                        draft_id:
                          option.answer_id + "_" + currentUser.user_id,
                        fk_user_id: currentUser.user_id,
                        fk_form_id: option.fk_form_id,
                        fk_question_id: option.question_id,
                        answer: e.target.value,
                      };
                      dispatch({
                        type: ADD_DRAFT,
                        payload: draftObj,
                      });
                    } else {
                      dispatch({
                        type: REMOVE_RESPONSE,
                        payload: {
                          response: e.target.value,
                          question: option,
                        },
                      });
                      dispatch({
                        type: DELETE_DRAFT,
                        payload: option.answer_id + "_" + currentUser.user_id,
                      });
                    }
                  }}
                ></input>
              </div>
            );
          })}
        </div>
      </div>
      <Divider />
    </div>
  );
}

export default FormInfo;
