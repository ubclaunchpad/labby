import con from "../config/Database.js";

export class Task {
  tasks = new Map();
  loadedSubtask = false;
  insertTask(taskData, result) {
    con.query(
      "CALL save_task(?, ?, ?, ?, ?, ?, ?)",
      [
        taskData.task_uuid,
        taskData.fk_survey_id,
        taskData.fk_form_id,
        taskData.fk_project_id,
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
            result: `Task of ${taskData.title} Saved Successfully for Task ID:`,
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

  //edit subtask status
  updateSubtaskStatus(subtaskId, subtaskStatus, result) {
    con.query(
      "CALL update_task_status(?, ?)",
      [subtaskId, subtaskStatus],
      function (error, _) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `subtask of ${subtaskId} Saved Successfully for subask ID: ${subtaskStatus}`,
          });
        }
      }
    );
  }

  updateTitle(taskId, taskTitle, result) {
    con.query(
      "CALL update_task_title(?, ?)",
      [taskId, taskTitle],
      function (error, _) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Task Title of ${taskId} Saved Successfully with: ${taskTitle}`,
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
            result: `Task of ${taskId} Saved Successfully for Task ID: ${taskId}`,
          });
        }
      }
    );
  }

  updateTaskProject(taskId, taskProject, result) {
    con.query(
      "CALL update_task_project(?, ?)",
      [taskId, taskProject],
      function (error, _) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Task of ${taskId} Saved Successfully for Task ID: ${taskId}`,
          });
        }
      }
    );
  }

  insertSubtask(subtaskData, result) {
    con.query(
      "CALL save_subtask(?, ?, ?, ?, ?)",
      [
        subtaskData.subtask_uuid,
        subtaskData.subtask_title,
        subtaskData.subtask_description,
        subtaskData.subtask_state,
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

  loadAssignee(result) {
    con.query("CALL load_all_assignees", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
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

  //retrieve subtasks by taskID
  loadSubtasksByTaskId(taskId, result) {
    con.query("CALL load_subtasks_by_taskId(?)", [taskId], (err, res) => {
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

  filterTasksByProject(projectId, result) {
    con.query("CALL filter_tasks_by_project(?)", projectId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
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
