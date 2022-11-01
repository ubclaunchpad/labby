import { useSelector } from "react-redux";
import { appColor } from "../../constants";
import DropdownEditor from "../Dropdown/DropdownEditor";
import FileInput from "../FileInput";
import MultiSelect from "../MultiSelect";
import { SingleSelect } from "../SingleSelect";
import FormTitle from "./FormTitle";
import "./index.css";

function FormBuilder() {
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );

  function renderQuestion(question) {
    switch (question.question_type) {
      case "multi":
        return <MultiSelect questionNumber={question.position_index} />;
      case "single":
        return <SingleSelect questionNumber={question.position_index} />;
      case "text":
        return question.question + " @ Q" + question.position_index;
      case "dropdown":
        return <DropdownEditor question={question} />;
      case "heading":
        return question.question + " @ Q" + question.position_index;
      case "textline":
        return question.question + " @ Q" + question.position_index;
      case "upload":
        return <FileInput question={question} />;
      case "download":
        return question.question + " @ Q" + question.position_index;
      case "contact":
        return question.question + " @ Q" + question.position_index;
      default:
        return null;
    }
  }

  return (
    <div>
      <div className="FormBuilderHeader FormBuilder">
        <div className="FormBuilderTitle" style={{ color: appColor.gray }}>
          Form Builder
        </div>
        <div className="FormTitle">
          {FormTitle()}
          <div className="FormPreview">
            <button
              className="FormPreviewButton"
              style={{
                backgroundColor: appColor.lightGray,
                color: appColor.gray,
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#4CAF50";
                e.target.style.color = "#FFFFFF";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = appColor.lightGray;
                e.target.style.color = appColor.gray;
              }}
              onClick={() => {
                alert("Preview Not Available Yet!");
              }}
            >
              Preview
            </button>
          </div>
        </div>
      </div>
      <div className="ScrollBox FormBuilder">
        <div className="FormBuilderOutline">
          {questionList.length ? (
            questionList.slice(1).map((question) => {
              return (
                <div
                  className="FormBuilderQuestion"
                  key={question.question_id + question.answer_id}
                  style={{ color: appColor.gray }}
                >
                  {renderQuestion(question)}
                </div>
              );
            })
          ) : (
            <div className="DragAndDropText" style={{ color: appColor.gray }}>
              Drag and drop to add components
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormBuilder;
