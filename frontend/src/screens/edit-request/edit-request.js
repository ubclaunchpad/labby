import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { LOAD_QUESTION } from "../../redux/actions/questionActions";
import BuilderLibrary from "../../components/BuilderLibrary";
import FormBuilder from "../../components/FormBuilder";
import Header from "../../components/Header";
import {
  QuestionData,
  componentsSideViewData,
} from "../../components/DragAndDrop/component-sideview-dnd-data";
import "./edit-request.css";
import LogicView from "../../components/LogicView";

function EditRequest() {
  const dispatch = useDispatch();
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );

  useEffect(() => {
    dispatch({ type: LOAD_QUESTION });
  }, [dispatch]);

  const [data, setData] = useState(questionList);

  const dragEndHandler = (result) => {
    console.log(result);
    const { destination, source, draggableId } = result;
    const droppedOutside = !destination; //If element is not dropped in a QuestionBuilder
    const droppedOnSamePlace =
      destination &&
      destination.droppableId === source.droppableId &&
      destination.index === source.index; //If element dragged around its own box and order of the draggable element didn't change
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
      //To reorder elements in Question dropbox
      const newDroppedComponentsOrder = Array.from(data.droppedComponentsOrder);
      newDroppedComponentsOrder.splice(source.index, 1);
      newDroppedComponentsOrder.splice(destination.index, 0, draggableId);
      const newData = {
        ...data,
        droppedComponentsOrder: newDroppedComponentsOrder,
      };
      setData(newData);
      return;
    }

    const newDroppedComponentId = uuidv4();

    const newDroppedComponentsOrder = Array.from(data.droppedComponentsOrder);
    newDroppedComponentsOrder.push(newDroppedComponentId);

    const newDroppedComponents = Array.from(data.droppedComponents);
    const newDroppedComponent = {
      originId: draggableId,
      id: newDroppedComponentId,
      component: componentsSideViewData.components[draggableId].component,
    };
    newDroppedComponents.push(newDroppedComponent);
    console.log(newDroppedComponents);

    const newData = {
      ...data,
      droppedComponents: newDroppedComponents,
      droppedComponentsOrder: newDroppedComponentsOrder,
    };
    setData(newData);
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
