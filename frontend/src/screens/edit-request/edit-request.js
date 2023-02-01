import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import {
  LOAD_QUESTION,
  SAVE_QUESTION,
} from "../../redux/actions/questionActions";
import BuilderLibrary from "../../components/BuilderLibrary";
import FormBuilder from "../../components/FormBuilder";
import Header from "../../components/Header";
import "./edit-request.css";
import LogicView from "../../components/LogicView";
import { ToastContainer } from "react-toastify";
import { WarningToast } from "../../components/Toasts";

function EditRequest() {
  const dispatch = useDispatch();
  const formId = window.location.pathname.split("/")[2];
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );

  useEffect(() => {
    dispatch({ type: LOAD_QUESTION, payload: formId });
  }, [dispatch, formId]);

  const dragEndHandler = (result) => {
    const { destination, source, draggableId } = result;
    const droppedOutside = !destination; // If element is not dropped in a QuestionBuilder
    const droppedOnSamePlace =
      destination &&
      destination.droppableId === source.droppableId &&
      destination.index === source.index; // If element dragged around its own box and order of the draggable element didn't change
    if (droppedOutside || droppedOnSamePlace) {
      return;
    }
    if (questionList.length === 0) {
      WarningToast("Please Enter a Form Title First");
      return;
    }
    console.log(`
        Element dropped 
        Dragged Element ID:${draggableId}. 
        source-id:${source.droppableId}.
        source-position:${source.index}.
        destination-id:${destination.droppableId}.
        destination-position:${destination.index}.
    `);

    if (source.droppableId === destination.droppableId) {
      // To reorder elements in Question dropbox
      const movedQuestion = questionList[source.index + 1];
      questionList.forEach((questionObj) => {
        if (questionObj.position_index >= source.index + 1) {
          questionObj.question_index = questionObj.position_index - 1;
          questionObj.position_index = questionObj.question_index;
          questionObj.question_title = questionObj.question;
          questionObj.form_id = questionObj.fk_form_id;
          dispatch({ type: SAVE_QUESTION, payload: questionObj });
        }
      });
      questionList.forEach((questionObj) => {
        if (questionObj.position_index >= destination.index + 1) {
          questionObj.question_index = questionObj.position_index + 1;
          questionObj.position_index = questionObj.question_index;
          questionObj.question_title = questionObj.question;
          questionObj.form_id = questionObj.fk_form_id;
          dispatch({ type: SAVE_QUESTION, payload: questionObj });
        }
      });
      movedQuestion.question_index = destination.index + 1;
      movedQuestion.position_index = movedQuestion.question_index;
      movedQuestion.question_title = movedQuestion.question;
      movedQuestion.form_id = movedQuestion.fk_form_id;
      dispatch({ type: SAVE_QUESTION, payload: movedQuestion });
      dispatch({ type: LOAD_QUESTION, payload: formId });
      return;
    }

    const newQuestion = {
      question_id: uuidv4(),
      form_id: formId,
      question_title: "Enter Question Title",
      question_type: draggableId,
      question_index: destination.index + 1,
      mandatory: false,
    };

    dispatch({ type: SAVE_QUESTION, payload: newQuestion });
    const indexLimit = destination.index + 1;

    questionList.forEach((question) => {
      if (question.position_index >= indexLimit) {
        question.question_index = question.position_index + 1;
        question.question_title = question.question;
        question.form_id = question.fk_form_id;
        dispatch({ type: SAVE_QUESTION, payload: question });
      }
    });

    dispatch({ type: LOAD_QUESTION, payload: formId });
  };

  return (
    <div className="EditRequestPage">
      <div className="headerComponent">{Header()}</div>
      <DragDropContext onDragEnd={dragEndHandler}>
        <div style={{ flex: 6 }}>
          <FormBuilder />
        </div>
        <div style={{ flex: 2 }}>{BuilderLibrary()}</div>
        <LogicView />
      </DragDropContext>
    </div>
  );
}

export default EditRequest;
