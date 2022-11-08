import { useEffect, useState } from "react";
import styled from "styled-components";
import StrictModeDroppable from "./StrictModeDroppable";
import { DraggableElement } from "../BuilderLibrary/ComponentLibrary";
import { componentsSideViewData } from "./component-sideview-dnd-data.js";
import { v4 as uuidv4 } from "uuid";
import MultiSelect from "../MultiSelect";
import { appColor } from "../../constants";
import "./index.css";

const QuestionContainer = styled.div`
  border: ${(props) =>
    props.isDraggingOver ? "2px dashed #666666" : "2px dashed #EEEEEE"};
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

const defaultQuestion = {
  question_id: uuidv4(),
  question: "Untitled Question",
  question_type: "multiselect",
  position_index: 1,
  mandatory: false,
};

export const QuestionBuilder = (props) => {
  const { data } = props;

  return (
    <StrictModeDroppable droppableId="question-builder">
      {(provided, snapshot) => (
        <QuestionContainer
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {data.droppedComponentsOrder.map((componentId, index) => {
            const componentToRenderObject = data.droppedComponents.filter(
              (component) => {
                return component.id === componentId;
              }
            );
            // const componentToRender = componentToRenderObject[0].component;
            const componentToRender = () => (
                <div
                  className="FormDragBuilderQuestion"
                  key={defaultQuestion.question_id}
                  style={{ color: appColor.gray }}
                >
                  <MultiSelect question={defaultQuestion} />
                </div>
            );
            const newComponentId = componentToRenderObject[0].id;
            return (
              <DraggableElement
                ComponentToRender={componentToRender}
                key={newComponentId}
                id={newComponentId}
                index={index}
              />
            );
          })}
          {provided.placeholder}
        </QuestionContainer>
      )}
    </StrictModeDroppable>
  );
};
