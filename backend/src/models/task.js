import con from "../config/Database.js";
// import { QuoteHelper } from "./quoteHelper.js";

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

  insertSubtask(subtaskData, result) {
    con.query(
      "CALL save_subtask(?, ?, ?, ?)",
      [
        subtaskData.subtask_id,
        subtaskData.task_title,
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
    con.query("CALL load_subtasks", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  async getTask() {
    let helper = new QuoteHelper();

    let result = await helper.getAnswerCost(organization, answerId);

    return result;
  }

  deleteCost(answerId, result) {
    con.query("CALL delete_cost(?)", answerId, function (error, results) {
      if (error) {
        console.log("error: ", error);
        result(error, null);
      } else {
        result(null, {
          result: `Cost for Answer ${answerId} Deleted Successfully, Deleted ID: ${results.cost_id}`,
        });
      }
    });
  }
}
