import { v4 as uuidv4 } from "uuid";

export const ticketBoardData = {
  tasks: {
    "task-1": { id: "task-1", content: "SOW123" },
    "task-2": { id: "task-2", content: "SOW124" },
    "task-3": { id: "task-3", content: "SOW125" },
    "task-4": { id: "task-4", content: "SOW126" },
  },
  columns: {
    "adopt-me": {
      id: "adopt-me",
      title: "Adopt me",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    todo: {
      id: "todo",
      title: "Todo",
      taskIds: [],
    },
    "in-progress": {
      id: "in-progress",
      title: "In Progress",
      taskIds: [],
    },
    completed: {
      id: "completed",
      title: "Completed",
      taskIds: [],
    },
  },
  columnOrder: ["adopt-me", "todo", "in-progress", "completed"],
};
