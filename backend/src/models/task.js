import con from "../config/Database.js";

export class Task {
  tasks = new Map();
  loadedSubtask = false;
  insertTask(taskData, result) {
    con.query(
      "CALL save_task(?, ?, ?, ?)",
      [
        taskData.task_id,
        taskData.task_title,
        taskData.task_description,
        taskData.task_state,
      ],
      function (error, results) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Task of ${taskData.title} Saved Successfully for Task ID: ${taskData.task_id}`,
          });
        }
      }
    );
  }

  updateStatus(taskId, taskStatus, result) {
    con.query(
      "CALL update_task_status(?, ?)",
      [taskId, taskStatus],
      function (error, _) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Task of ${taskId} Saved Successfully for Task ID: ${taskStatus}`,
          });
        }
      }
    );
  }

  updateDescription(taskId, taskDescription, result) {
    con.query(
      "CALL update_task_description(?, ?)",
      [taskId, taskDescription],
      function (error, _) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Task of ${taskId} Saved Successfully for Task ID: ${taskDescription}`,
          });
        }
      }
    );
  }

  insertSubtask(subtaskData, result) {
    con.query(
      "CALL save_subtask(?, ?, ?, ?, ?)",
      [
        subtaskData.subtask_id,
        subtaskData.task_title,
        subtaskData.task_description,
        subtaskData.task_state,
        subtaskData.task_id,
      ],
      function (error, results) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Subtask of ${subtaskData.title} Saved Successfully for Subtask ID: ${subtaskData.subtask_id}`,
          });
        }
      }
    );
  }

  loadTasks(result) {
    con.query("CALL load_tasks", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  loadSubtasks(result) {
    con.query("CALL load_tasks_subtasks", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  loadTasksWithSearch(state, result) {
    con.query("CALL load_tasks_state(?)", state, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  deleteTask(taskId, result) {
    con.query("CALL delete_task(?)", taskId, function (error, results) {
      if (error) {
        console.log("error: ", error);
        result(error, null);
      } else {
        result(null, {
          result: `Task ${taskId} Deleted Successfully. Deleted ID: ${results.task_id}`,
        });
      }
    });
  }

  deleteSubtask(subtaskId, result) {
    con.query("CALL delete_subtask(?)", subtaskId, function (error, results) {
      if (error) {
        console.log("error: ", error);
        result(error, null);
      } else {
        result(null, {
          result: `Subtask ${subtaskId} Deleted Successfully. Deleted ID: ${results.subtask_id}`,
        });
      }
    });
  }
}
