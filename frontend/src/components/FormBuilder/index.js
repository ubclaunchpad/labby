import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { appColor } from "../../constants";
import DropdownEditor from "../Dropdown/DropdownEditor";
import FileInputEditor from "../FileInput/FileInputEditor";
import TextAnswerEditor from "../TextAnswer/TextAnswerEditor";
import MultiSelectEditor from "../MultiSelect/MultiSelectEditor";
import ContactInfoEditor from "../ContactInfo/ContactInfoEditor";
import SingleSelectEditor from "../SingleSelect/SingleSelectEditor";
import FormTitle from "./FormTitle";
import HeadingEditor from "../Heading/HeadingEditor";
import FileDownloadEditor from "../FileDownload/FileDownloadEditor";
import TextLineEditor from "../TextLine/TextLineEditor";
import { clsx } from "clsx";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components";
import StrictModeDroppable from "../DragAndDrop/StrictModeDroppable";
import { DraggableElement } from "../BuilderLibrary/ComponentLibrary";
import ProjectSelectorEditor from "../ProjectSelector/ProjectSelectorEditor";
import { useEffect, useMemo } from "react";

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
      return <MultiSelectEditor question={question} />;
    case "single":
      return <SingleSelectEditor question={question} />;
    case "text":
      return <TextAnswerEditor question={question} />;
    case "dropdown":
      return <DropdownEditor question={question} />;
    case "heading":
      return <HeadingEditor question={question} />;
    case "textline":
      return <TextLineEditor question={question} />;
    case "upload":
      return <FileInputEditor question={question} />;
    case "download":
      return <FileDownloadEditor question={question} />;
    case "contact":
      return <ContactInfoEditor question={question} />;
    case "project":
      return <ProjectSelectorEditor question={question} />;
    default:
      return null;
  }
}

function FormBuilder() {
  const dispatch = useDispatch();

  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );

  const urgentQuestion = useMemo(() => {
    return {
    question_id: 1,
    question_type: "single",
    question_title: "Is this request urgent?",
    question_description: "",
    question_options: [
      { option_id: "yes", option_text: "Yes" },
      { option_id: "no", option_text: "No" },
    ],
    question_required: true,
    question_order: 1,
    position_index: 1000,
  };
  }, []);

  useEffect(() => {
    dispatch({ type: "ADD_QUESTION", payload: urgentQuestion });
  }, [dispatch, urgentQuestion]);

  const selectedQuestion = useSelector(
    (state) => state.logicReducer.currentLogicQuestion
  );
  const formId = window.location.pathname.split("/")[2];

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
            <NavLink to={`/request/${formId}`}>
              <button
                className="FormPreviewButton"
                style={{
                  backgroundColor: appColor.primaryLight,
                  color: appColor.white,
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = appColor.primary;
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = appColor.primaryLight;
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
              {questionList.length > 1 ? (
                questionList.slice(1).map((question, index) => {
                  if (question.position_index > 0) {
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
                  }
                  return null;
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
              
              <div>
                {renderQuestion(urgentQuestion)}
              </div>

            </QuestionContainer>
          )}
        </StrictModeDroppable>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default FormBuilder;
