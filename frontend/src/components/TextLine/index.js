import "./index.css";
import "../index.css";

function TextLine({ question }) {

  return (
    <div className="GlobalCustomerQuestionContainer">
      <div className="QuestionLine">{question.question}</div>
    </div>
  );
}

export default TextLine;
