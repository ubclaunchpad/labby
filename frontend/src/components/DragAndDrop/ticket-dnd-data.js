import { v4 as uuidv4 } from "uuid";

export const ticketBoardData = {
  // tasks:{},
  tasks: {
    "task-1": {
      id: "task-1",
      code: "SOW123",
      title: "This is the ticket  title",
      assignees: [],
      reminder: false,
    },
    "task-2": {
      id: "task-2",
      code: "SOW124",
      title: "This is the ticket  title",
      assignees: [],
      reminder: false,
    },
    "task-3": {
      id: "task-3",
      code: "SOW125",
      title: "This is the ticket  title",
      assignees: [],
      reminder: false,
    },
    "task-4": {
      id: "task-4",
      code: "SOW126",
      title: "This is the ticket  title",
      assignees: [],
      reminder: false,
    },
    "task-5": {
      id: "task-5",
      code: "SOW127",
      title: "This is the ticket  title",
      assignees: [],
      reminder: false,
    },
    "task-6": {
      id: "task-6",
      code: "SOW128",
      title: "This is the ticket  title",
      assignees: [],
      reminder: false,
    },
    "task-7": {
      id: "task-7",
      code: "SOW129",
      title: "This is the ticket  title",
      assignees: [],
      reminder: false,
    },
    "task-8": {
      id: "task-8",
      code: "SOW130",
      title: "This is the ticket  title",
      assignees: [],
      reminder: false,
    },
    "task-9": {
      id: "task-9",
      code: "SOW131",
      title: "This is the ticket  title",
      assignees: [],
      reminder: false,
    },
  },
  columns: {
    "adopt-me": {
      id: "adopt-me",
      title: "Adopt me",
      taskIds: ["task-1", "task-2", "task-3"],
      //   taskIds: [],
    },
    todo: {
      id: "todo",
      title: "Todo",
      taskIds: ["task-4"],
      //   taskIds: [],
    },
    "in-progress": {
      id: "in-progress",
      title: "In Progress",
      taskIds: ["task-5", "task-6", "task-7", "task-8"],
      //   taskIds: [],
    },
    completed: {
      id: "completed",
      title: "Completed",
      taskIds: ["task-9"],
      //   taskIds: [],
    },
  },
  columnOrder: ["adopt-me", "todo", "in-progress", "completed"],
};
