import "./index.css";
import "../index.css";

function Heading({ question }) {
  return (
    <div className="GlobalEditorComponent  GlobalEditorComponent--heading ">
      <div className="GlobalEditorComponentHeader">
        <div className="Customer__component__title"> {question.question} </div>
      </div>
    </div>
  );
}

export default Heading;
