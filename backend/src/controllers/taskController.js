import { Task } from "../models/quote.js";
export default class TaskController {
  tasksMap = new Map();
  isTaskLoaded = false;

  saveTask(req) {
    return new Promise((resolve, reject) => {
      if (
        !req.body.task_title ||
        !req.body.task_state ||
        !req.body.description
      ) {
        return reject({ error: "Error with request body." });
      }
      const TaskModel = new Task();
      const taskData = {
        task_id: Math.floor(Math.random() * 100),
        task_title: req.body.task_title,
        task_description: req.body.task_description,
        task_state: req.body.task_state,
      };
      TaskModel.insertTask(taskData, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  saveSubtask(req) {
    return new Promise((resolve, reject) => {
      if (!req.body.task_title || !req.body.task_state || !req.body.task_id) {
        return reject({ error: "Error with request body." });
      }
      const TaskModel = new Task();
      const subtaskData = {
        subtask_id: Math.floor(Math.random() * 100),
        task_title: req.body.task_title,
        task_state: req.body.task_state,
        task_id: req.body.task_id,
      };
      TaskModel.insertSubtask(subtaskData, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  loadSubtasks() {
    const TaskModel = new Task();
    TaskModel.loadSubtasks((err, result) => {
      if (err) {
        reject({ error: err });
      }
      let subtaskArr;
      for (let subtask in result) {
        let task_id = subtask.fk_task_id;
        if (!this.tasksMap.has(task_id)) {
          subtaskArr = [subtask];
        } else {
          subtaskArr = this.tasksMap.get(task_id);
          subtaskArr.push(subtask);
        }
        this.tasksMap.set(task_id, subtaskArr);
      }
      resolve(result);
    });
  }

  async loadSubtask(taskId, result) {
    if (!this.loadedSubtask) {
      loadSubtasks();
      populateTaskMap(result);
    }
    if (this.tasks.has(taskId)) {
      return this.tasks.get(taskId);
    } else {
      return [];
    }
  }

  populateTaskMap(result) {}
}
