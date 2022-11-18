import "./index.css";
import { useSelector } from "react-redux";
import { appColor } from "../../constants";
import DropdownEditor from "../Dropdown/DropdownEditor";
import FileInput from "../FileInput";
import TextAnswer from "../TextAnswer";
import MultiSelect from "../MultiSelect";
import SingleSelect from "../SingleSelect";
import FormTitle from "./FormTitle";
import Heading from "../Heading";
import FileDownloadEditor from "../FileDownload/FileDownloadEditor";
import TextLine from "../TextLine";
import { clsx } from "clsx";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import StrictModeDroppable from "../DragAndDrop/StrictModeDroppable";
import { DraggableElement } from "../BuilderLibrary/ComponentLibrary";
import ContactInfoEditor from "../ContactInfo/ContactInfoEditor";

const QuestionContainer = styled.div`
  border: ${(props) =>
    props.isDraggingOver ? "2px dashed #909090" : "2px dashed #ECEDF3"};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 16px;
  padding: 10px;
  padding-bottom: 200px;
  margin-bottom: 100px;
`;

function renderQuestion(question) {
  switch (question.question_type) {
    case "multi":
      return <MultiSelect question={question} />;
    case "single":
      return <SingleSelect question={question} />;
    case "text":
      return <TextAnswer question={question} />;
    case "dropdown":
      return <DropdownEditor question={question} />;
    case "heading":
      return <Heading question={question} />;
    case "textline":
      return <TextLine question={question} />;
    case "upload":
      return <FileInput question={question} />;
    case "download":
      return <FileDownloadEditor question={question} />;
    case "contact":
      return <ContactInfoEditor question={question} />;
    default:
      return null;
  }
}

function FormBuilder() {
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );
  const selectedQuestion = useSelector(
    (state) => state.logicReducer.currentLogicQuestion
  );

  return (
    <div>
      <div className="FormBuilderHeader FormBuilder">
        <div
          className="FormBuilderTitle"
          style={{ color: appColor.primaryBlack }}
        >
          Form Builder
        </div>
        <div className="FormTitle">
          {FormTitle()}
          <div className="FormPreview">
            <NavLink to="/request">
              <button
                className="FormPreviewButton"
                style={{
                  backgroundColor: appColor.primaryLight,
                  color: appColor.white,
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = appColor.primary;
                  e.target.style.color = appColor.white;
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = appColor.primaryLight;
                  e.target.style.color = appColor.white;
                }}
              >
                Preview
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="ScrollBox FormBuilder">
        <StrictModeDroppable droppableId="question-builder">
          {(provided, snapshot) => (
            <QuestionContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {questionList.length ? (
                questionList.slice(1).map((question, index) => {
                  const isHeadingOrTextline =
                    question.question_type === "heading" ||
                    question.question_type === "textline";
                  const isSelected =
                    selectedQuestion &&
                    question &&
                    selectedQuestion.question_id === question.question_id;
                  const componentToRender = () => (
                    <div
                      className={clsx(
                        "FormBuilderQuestion",
                        isHeadingOrTextline && "FormBuilderQuestion--short"
                      )}
                      key={question.question_id}
                      style={{
                        color: appColor.gray,
                        borderColor: isSelected
                          ? appColor.primary
                          : appColor.darkGray,
                        borderWidth: isSelected ? "3px" : "2px",
                      }}
                    >
                      {renderQuestion(question)}
                    </div>
                  );
                  return (
                    <DraggableElement
                      ComponentToRender={componentToRender}
                      key={question.question_id}
                      id={question.question_id}
                      index={index}
                    />
                  );
                })
              ) : (
                <div
                  className="DragAndDropText"
                  style={{ color: appColor.gray }}
                >
                  Drag and drop to add components
                </div>
              )}
              {provided.placeholder}
            </QuestionContainer>
          )}
        </StrictModeDroppable>
      </div>
    </div>
  );
}

export default FormBuilder;
