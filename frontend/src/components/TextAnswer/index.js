import { Input } from "antd";
import "./index.css";
import "../index.css";
import Divider from "../Divider";
import { useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import {
  ADD_RESPONSE,
  REMOVE_SINGLE_RESPONSE,
} from "../../redux/actions/formActions";



function TextAnswer({ question }) {
  const [inputList, setInputList] = useState([]);
  const [textAnswer, setTextAnswer] = useState(''); 

  const dispatch = useDispatch();
  
  useEffect(() => {
    console.log(inputList.length, question.quantity-1);
    if(inputList.length !== question.quantity) {
      for (let i = 0; i < (question.quantity); i++) {
        setInputList(inputList.concat(<TextBox key={inputList.length} />));
      }
    }
  });

  const TextBox = () => {
    return <Input.TextArea
      placeholder="Type here..."
      autoSize={{
        minRows: 3,
        maxRows: 5,
      }}
      className="text-box"
      onBlur={(e) => {
        if(e.target.value !== "") {
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
    />;
  };

  return (
    <div className="GlobalCustomerQuestionContainer">
      <div className="GlobalQuestionTitle">
        {question.question}{" "}
        <p style={{ color: "red" }}>{question.mandatory ? "*" : ""}</p>
      </div>
      {inputList}
      <Divider />
    </div>
  );
}

export default TextAnswer;
