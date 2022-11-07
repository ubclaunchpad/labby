import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { LOAD_QUESTION } from "../../redux/actions/questionActions";
import BuilderLibrary from "../../components/BuilderLibrary";
import FormBuilder from "../../components/FormBuilder";
import Header from "../../components/Header";
import { QuestionData } from "../../components/DragAndDrop/question-dnd-data";
import "./edit-request.css";

function EditRequest() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LOAD_QUESTION });
  }, [dispatch]);

  const [data, setData] = useState(QuestionData);

  const dragEndHandler = (result) => {
    // console.log(data);
    const { destination, source, draggableId } = result;
    if (!destination) {
      //If element is not dropped in a QuestionBuilder
      return;
    }
    if (result.source.droppableId===result.destination.droppableId){
      //TODO: enable reordering in Question dropbox later
      return
    }
    console.log(`
        Element dropped 
        draggable id:${result.draggableId}. 
        source-id:${result.source.droppableId}.
        source-order:${result.source.index}.
        destination-id:${result.destination.droppableId}.
        destination-order:${result.destination.index}.
    `);
    const newDroppedComponentsIds = Array.from(data.droppedComponentsIds);
    newDroppedComponentsIds.push(draggableId);
    const newData = {
      ...data,
      droppedComponentsIds: newDroppedComponentsIds,
    };
    setData(newData);
    console.log(data);
  };

  return (
    <div className="EditRequestPage">
      <div style={{ backgroundColor: "green", width: "100px" }}>{Header()}</div>
      <DragDropContext onDragEnd={dragEndHandler}>
        {/* <div style={{ flex: 6 }}>{FormBuilder()}</div> */}
        <div style={{ flex: 6 }}><FormBuilder data={data}/></div>
        <div style={{ flex: 2 }}>{BuilderLibrary()}</div>
      </DragDropContext>
    </div>
  );
}

export default EditRequest;
