import { useState } from "react";
import styled from "styled-components";
import StrictModeDroppable from "./StrictModeDroppable";
import { DraggableElement } from "../BuilderLibrary/ComponentLibrary";
import {QuestionData} from "./question-dnd-data";
import {componentsSideViewData} from "./component-sideview-dnd-data.js";

const QuestionContainer = styled.div`
  border: ${(props) =>
    props.isDraggingOver ? "2px dashed #666666" : "2px solid #666666"};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  min-height: 300px;
  font-size: 16px;
  padding: 18px;
  margin-bottom: 30px;
`;

export const QuestionBuilder = () => {
  const [data, setData] = useState(QuestionData);
  return (
    <StrictModeDroppable droppableId="question-builder">
      {(provided, snapshot) => (
        <QuestionContainer
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
        >
          Drag and Drop to add components( Heading is an example)
          {data.droppedComponentsIds.map((componentId, index) =>
              {
                const componentToRender =
                  componentsSideViewData.components[componentId].component;
                // const newComponentId = uuidv4();
                const newComponentId = componentId;
                return (
                  <DraggableElement
                    ComponentToRender={componentToRender}
                    key={newComponentId}
                    id={newComponentId}
                    index={index}
                  />
                );
              }
            )}
          {provided.placeholder}
        </QuestionContainer>
      )}
    </StrictModeDroppable>
  );
};
