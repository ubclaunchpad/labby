import { Input } from "antd";
import "./index.css";
import "../index.css";
import Divider from "../Divider";

function TextAnswer({ question }) {
  return (
    <div className="GlobalCustomerQuestionContainer">
      <div className="GlobalQuestionTitle">{question.question}</div>
      <div className="text-box-container">
        <Input.TextArea
          placeholder="User types here..."
          rows={5}
          className="text-box"
        />
      </div>
      <Divider />
    </div>
  );
}

export default TextAnswer;
