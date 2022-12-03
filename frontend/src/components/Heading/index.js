import "./index.css";
import "../index.css";

function Heading({ question }) {
  return (
    <div className="GlobalCustomerQuestionContainer">
      <div className="QuestionTitle">{question.question}</div>
    </div>
  );
}

export default Heading;
