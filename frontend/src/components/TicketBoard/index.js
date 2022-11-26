import React, { useState } from "react";
import { Input } from "antd";
import { ticketBoardData } from "../DragAndDrop/ticket-dnd-data";
import "./index.css";

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
          return <div className="column">{column.title}</div>;
        })}
      </div>
    </div>
  );
};
