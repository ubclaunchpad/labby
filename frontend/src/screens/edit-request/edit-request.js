import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      //If element dragged around its own box and order of the draggable element didn't change
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
          <FormBuilder data={data} />
        </div>
        <div style={{ flex: 2 }}>{BuilderLibrary()}</div>
        <LogicView />
      </DragDropContext>
    </div>
  );
}

export default EditRequest;
