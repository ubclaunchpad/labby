import React, { useState } from "react";
import { Input } from "antd";
import { ticketBoardData } from "../DragAndDrop/ticket-dnd-data";
// import styled from "styled-components";
import "./index.css";

// const Column = styled.div``

const Task = (props) => {
  return (
    <div className="task">
      {props.task.code}<br/>
      {props.task.title}
    </div>
  );
};

const TicketBoardColumn = (props) => {
  return (
    <div className="column">
      <div className="columnTitle">{props.column.title}</div>
      <div className="taskList">
        {props.tasks.map((task) => {
          return <Task key={task.id} task={task} />;
        })}
      </div>
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
        {ticketBoardDndData.columnOrder.map((columnId) => {
          const column = ticketBoardDndData.columns[columnId];
          const tasks = column.taskIds.map(
            (taskId) => ticketBoardDndData.tasks[taskId]
          );
          return (
            <TicketBoardColumn key={columnId} column={column} tasks={tasks} />
          );
        })}
      </div>
    </div>
  );
};
