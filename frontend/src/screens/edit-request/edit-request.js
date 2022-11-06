import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { LOAD_QUESTION } from "../../redux/actions/questionActions";
import BuilderLibrary from "../../components/BuilderLibrary";
import FormBuilder from "../../components/FormBuilder";
import Header from "../../components/Header";
import "./edit-request.css";

function EditRequest() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LOAD_QUESTION });
  }, [dispatch]);

  const dragEndHandler = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      //If element is not dropped in a QuestionBuilder
      return;
    }
    console.log(`
        Element dropped 
        draggable id:${result.draggableId}. 
        source-id:${result.source.droppableId}.
        source-order:${result.source.index}.
        destination-id:${result.destination.droppableId}.
        destination-order:${result.destination.index}.
    `);
  };

  return (
    <div className="EditRequestPage">
      <div style={{ backgroundColor: "green", width: "100px" }}>{Header()}</div>
      <DragDropContext onDragEnd={dragEndHandler}>
        <div style={{ flex: 6 }}>{FormBuilder()}</div>
        <div style={{ flex: 2 }}>{BuilderLibrary()}</div>
      </DragDropContext>
    </div>
  );
}

export default EditRequest;
