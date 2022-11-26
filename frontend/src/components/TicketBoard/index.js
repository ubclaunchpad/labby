import React, { useState } from "react";
import { Input } from "antd";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import StrictModeDroppable from "../DragAndDrop/StrictModeDroppable";
import { ticketBoardData } from "../DragAndDrop/ticket-dnd-data";
// import styled from "styled-components";
import "./index.css";

// const Column = styled.div``

const ticketDragEndHandler = (result) => {
  const { destination, source, draggableId } = result;
  const droppedOutside = !destination;
  const droppedOnSamePlace =
    destination &&
    destination.droppableId === source.droppableId &&
    destination.index === source.index;
  if (droppedOutside || droppedOnSamePlace) {
    return;
  }
  console.log(`
        Task dropped 
        Dragged Task ID:${draggableId}. 
        source-id:${source.droppableId}.
        source-position:${source.index}.
        destination-id:${destination.droppableId}.
        destination-position:${destination.index}.
    `);
};

const Task = (props) => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          className="task"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.task.code}
          <br />
          {props.task.title}
        </div>
      )}
    </Draggable>
  );
};

const TicketBoardColumn = (props) => {
  return (
    <div className="column">
      <div className="columnTitle">{props.column.title}</div>
      <StrictModeDroppable droppableId={props.column.id}>
        {(provided) => (
          <div
            className="taskList"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.tasks.map((task, index) => {
              return <Task key={task.id} task={task} index={index} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  );
};

export const TicketBoard = () => {
  const [ticketBoardDndData, setTicketBoardDndData] = useState(ticketBoardData);
  return (
    <div className="ticketBoardContainer">
      <div className="searchTicketSection">
        <Input placeholder="Search..." className="ticketBoardSearch" />
        <select
          className="ticketBoardDropdown"
          value="Filter..."
          onChange={() => {}}
        >
          <option value="Filter..." disabled>
            Filter
          </option>
          <option value="sectioning">Sectioning</option>
          <option value="macrodisection">Macrodisection</option>
          <option value="scrolling">Scrolling</option>
        </select>
      </div>
      <div className="ticketBoard">
        <DragDropContext onDragEnd={ticketDragEndHandler}>
          {ticketBoardDndData.columnOrder.map((columnId) => {
            const column = ticketBoardDndData.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId) => ticketBoardDndData.tasks[taskId]
            );
            return (
              <TicketBoardColumn key={columnId} column={column} tasks={tasks} />
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};
