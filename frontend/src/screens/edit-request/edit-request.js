import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import {
  LOAD_QUESTION,
  REORDER_QUESTION,
  SAVE_QUESTION,
} from "../../redux/actions/questionActions";
import BuilderLibrary from "../../components/BuilderLibrary";
import FormBuilder from "../../components/FormBuilder";
import Header from "../../components/Header";
import "./edit-request.css";
import LogicView from "../../components/LogicView";

function EditRequest() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LOAD_QUESTION });
  }, [dispatch]);

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
      dispatch({
        type: REORDER_QUESTION,
        payload: {
          sourcePosition: source.index,
          destinationPosition: destination.index,
        },
      });
      return;
    }

    const newQuestion = {
      question_id: uuidv4(),
      question_title: "Enter Question Title",
      question_type: draggableId,
      question_index: destination.index + 1,
      mandatory: false,
    }

    dispatch({type: SAVE_QUESTION, payload: newQuestion});
  };

  return (
    <div className="EditRequestPage">
      <div style={{ backgroundColor: "green", width: "100px" }}>{Header()}</div>
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
