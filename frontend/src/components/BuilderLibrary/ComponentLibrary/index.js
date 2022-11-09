import "./index.css";
import { Draggable } from "react-beautiful-dnd";
import StrictModeDroppable from "../../DragAndDrop/StrictModeDroppable";
import styled from "styled-components";
import { componentsSideViewData } from "../../DragAndDrop/component-sideview-dnd-data";

const DraggableElementCard = styled.div`
  width: 100%;
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
  return (
    <>
      {componentsSideViewData.sectionOrder.map((sectionId) => {
        const section = componentsSideViewData.sections[sectionId];
        const components = section.componentIds.map(
          (componentId) => componentsSideViewData.components[componentId]
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
