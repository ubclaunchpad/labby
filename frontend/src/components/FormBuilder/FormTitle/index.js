import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appColor } from "../../../constants";
import { SAVE_FORM } from "../../../redux/actions/formActions";
import { LOAD_QUESTION, SAVE_QUESTION } from "../../../redux/actions/questionActions";
import "./index.css";

function FormTitle() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [formId, setFormId] = useState(window.location.pathname.split("/")[2]);
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );

  useEffect(() => {
    if (questionList[0]) {
      setTitle(questionList[0].question);
    }
    setFormId(window.location.pathname.split("/")[2]);
  }, [questionList]);

  return (
    <div
      className="FormTitleInput"
      style={{ backgroundColor: appColor.primaryWhite }}
    >
      <input
        className="FormTitleTextInput"
        defaultValue={title}
        placeholder="Type your form name here..."
        onBlur={(text) => {
          dispatch({
            type: SAVE_FORM,
            payload: {
              form_id: formId,
              form_name: text.target.value,
            }
          })
          dispatch({
            type: SAVE_QUESTION,
            payload: {
              question_id: formId,
              form_id: formId,
              question_title: text.target.value,
              question_type: "heading",
              question_index: 0,
              mandatory: false,
              clinical: false,
            },
          });
          dispatch({ type: LOAD_QUESTION, payload: formId });
        }}
      />
    </div>
  );
}

export default FormTitle;
