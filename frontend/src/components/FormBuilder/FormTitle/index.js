import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appColor } from "../../../constants";
import { LOAD_QUESTION, SAVE_QUESTION } from "../../../redux/actions/questionActions";
import "./index.css";

function FormTitle() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );

  useEffect(() => {
    if (questionList[0]) {
      setTitle(questionList[0].question);
    }
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
            type: SAVE_QUESTION,
            payload: {
              question_id: 0,
              question_title: text.target.value,
              question_type: "heading",
              question_index: 0,
            },
          });
          dispatch({ type: LOAD_QUESTION });
        }}
      />
    </div>
  );
}

export default FormTitle;
