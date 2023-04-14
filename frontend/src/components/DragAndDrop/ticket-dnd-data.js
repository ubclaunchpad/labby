const initialTasks = {}

// leave here as reference for expected structure of data
const initialTasksStructure = {
  "task-1": {
    id: "task-1",
    code: "SOW123",
    title: "This is the ticket  title",
    assignees: [],
    reminder: true,
    subtasks: [
      { id: "123", completed: true, name: "subtask 1" },
      { id: "456", completed: false, name: "subtask 2" },
      { id: "789", completed: true, name: "subtask 3" },
      { id: "10", completed: true, name: "subtask 3" },
    ],
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
};

export const ticketBoardData = {
  filters: ["open", "blocked", "progress", "completed"],
  tasks: initialTasks,
  columns: {
    blocked: {
      id: "blocked",
      title: "Blocked",
      taskIds: [],
    },
    open: {
      id: "open",
      title: "Open",
      taskIds: [],
    },
    progress: {
      id: "progress",
      title: "In Progress",
      taskIds: [],
    },
    completed: {
      id: "completed",
      title: "Completed",
      taskIds: [],
    },
  },
  columnOrder: ["open", "blocked", "progress", "completed"],
  colors: { 1: "#D4D145", 2: "#CF6973" },
};
