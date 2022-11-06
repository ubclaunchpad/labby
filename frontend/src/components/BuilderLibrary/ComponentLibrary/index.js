import "./index.css";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import StrictModeDroppable from "../../DragAndDrop/StrictModeDroppable";
import styled from "styled-components";
import { componentsSideViewData } from "../../DragAndDrop/component-sideview-dnd-data";

const DraggableElementCard = styled.div``;
const Clone = styled(DraggableElementCard)`
  // + div {
  //   display: none !important;
  // }
`;

export const DraggableElement = (props) => {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <>
          <DraggableElementCard
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {props.ComponentToRender()}
          </DraggableElementCard>
          {/* {snapshot.isDragging && <Clone>{props.ComponentToRender()}</Clone>} */}
        </>
      )}
    </Draggable>
  );
};

const ElementSection = (props) => {
  return (
    <div className="elementContainer">
      <div className="elementsTitle">{props.section.title}</div>
      <StrictModeDroppable droppableId={props.section.id} isDropDisabled={true}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {props.components.map((component, index) => (
              <DraggableElement
                ComponentToRender={component.component}
                key={component.id}
                id={component.id}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  );
};

function ComponentLibrary() {
  const [sideviewData, setSideviewData] = useState(componentsSideViewData);
  return (
    <>
      {sideviewData.sectionOrder.map((sectionId) => {
        const section = sideviewData.sections[sectionId];
        const components = section.componentIds.map(
          (componentId) => sideviewData.components[componentId]
        );
        return (
          <ElementSection
            key={section.id}
            section={section}
            components={components}
          />
        );
      })}
    </>
  );
}

export default ComponentLibrary;
