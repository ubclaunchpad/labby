// Leave example task  comment as reference for expected structure

const initialTasks = {
  //   "task-1": {
  //     id: "task-1",
  //     code: "SOW123",
  //     title: "This is the ticket  title",
  //     assignees: [],
  //     reminder: true,
  //     subtasks: [
  //       { id: "123", completed: true, name: "subtask 1" },
  //       { id: "456", completed: false, name: "subtask 2" },
  //       { id: "789", completed: true, name: "subtask 3" },
  //       { id: "10", completed: true, name: "subtask 3" },
  //     ],
  //   },
}

export const ticketBoardData = {
  filters: ["new", "todo", "progress", "completed"],
  tasks: initialTasks,
  columns: {
    todo: {
      id: "todo",
      title: "Todo",
      taskIds: [],
    },
    open: {
      id: "open",
      title: "Adopt Me",
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
  columnOrder: ["open", "todo", "progress", "completed"],
  colors: { 1: "#D4D145", 2: "#CF6973" },
};
