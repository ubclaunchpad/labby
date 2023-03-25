import { Input } from "antd";
import "./index.css";
import "../index.css";
import Divider from "../Divider";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import {
  ADD_RESPONSE,
  REMOVE_SINGLE_RESPONSE,
} from "../../redux/actions/formActions";

function TextAnswer({ question }) {
  const dispatch = useDispatch();

  return (
    <div className="GlobalCustomerQuestionContainer">
      <div className="GlobalQuestionTitle">
        {question.question}{" "}
        <p style={{ color: "red" }}>{question.mandatory ? "*" : ""}</p>
      </div>
      <div className="text-box-container">
        <Input.TextArea
          placeholder="Type here..."
          autoSize={{
            minRows: 1,
            maxRows: 5,
          }}
          className="text-box"
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
      </div>
      <Divider />
    </div>
  );
}

export default TextAnswer;
